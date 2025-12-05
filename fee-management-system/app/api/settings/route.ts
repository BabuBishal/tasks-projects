import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET /api/settings - Get system settings
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get or create default settings
    let settings = await prisma.systemSettings.findFirst();

    if (!settings) {
      // Create default settings if none exist
      settings = await prisma.systemSettings.create({
        data: {},
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update system settings (Admin only)
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true },
    });

    if (!user || user.profile?.role !== "Admin") {
      return NextResponse.json(
        { error: "Forbidden - Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // Get existing settings
    let settings = await prisma.systemSettings.findFirst();

    if (!settings) {
      // Create if doesn't exist
      settings = await prisma.systemSettings.create({
        data: body,
      });
    } else {
      // Update existing
      settings = await prisma.systemSettings.update({
        where: { id: settings.id },
        data: body,
      });
    }

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "SETTINGS_UPDATED",
        description: "Admin updated system settings",
        metadata: body,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
