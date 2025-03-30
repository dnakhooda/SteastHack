import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
  }
}

const db = admin.database();

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Query the Realtime Database to find the user
    const usersRef = db.ref('users');
    const snapshot = await usersRef
      .orderByChild('email')
      .equalTo(email)
      .once('value');

    const userData = snapshot.val();

    // Check if user exists
    if (!userData) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Get the user ID from the snapshot
    const userId = Object.keys(userData)[0];
    const storedHashedPassword = userData[userId].password;

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Authentication successful
    return NextResponse.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 