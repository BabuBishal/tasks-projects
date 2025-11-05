import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name, id } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const res = await fetch("http://localhost:4000/users");
  const users = await res.json();

  // Check if user already exists
  const existingUser = users.find((u: any) => u.email === email);
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Add user
  const createRes = await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, id }),
  });

  const newUser = await createRes.json();

  return NextResponse.json({ message: "User registered", user: newUser });
}
