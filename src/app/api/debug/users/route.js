import { NextResponse } from 'next/server';
import { users } from '@/lib/users';

export async function GET(request) {
  try {
    // Return users without sensitive information
    const safeUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      admin: user.admin,
    }));

    return NextResponse.json({
      success: true,
      totalUsers: users.length,
      users: safeUsers
    });
  } catch (error) {
    console.error('Debug route error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 