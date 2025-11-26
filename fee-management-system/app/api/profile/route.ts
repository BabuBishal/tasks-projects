import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { ProfileResponse, UpdateProfileResponse } from "@/lib/types/api";

// GET /api/profile - Get current user profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Auto-create profile if it doesn't exist (for existing users)
    if (!user.profile) {
      await prisma.userProfile.create({
        data: {
          userId: user.id,
          role: "Staff", // Default role
        },
      });

      // Fetch again with profile
      const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
        include: { profile: true },
      });

      return NextResponse.json<ProfileResponse>(
        updatedUser as unknown as ProfileResponse
      );
    }

    return NextResponse.json<ProfileResponse>(
      user as unknown as ProfileResponse
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT /api/profile - Update user profile
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, position, profilePicture } = body;

    // Find user by ID (not email, since email might be changing)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user basic info
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
    });

    // Update or create profile
    const profile = await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        ...(phone !== undefined && { phone }),
        ...(position !== undefined && { position }),
        ...(profilePicture !== undefined && { profilePicture }),
      },
      create: {
        userId: user.id,
        phone: phone || null,
        position: position || null,
        profilePicture: profilePicture || null,
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "PROFILE_UPDATED",
        description: "User updated their profile",
      },
    });

    return NextResponse.json<UpdateProfileResponse>({
      ...updatedUser,
      profile,
    } as unknown as UpdateProfileResponse);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
