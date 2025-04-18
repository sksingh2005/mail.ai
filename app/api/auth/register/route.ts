// app/api/auth/register/route.ts
import { db } from '@/db/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: { username }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }
    
    // Hash password (recommended for security)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
      }
    });
    
    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}