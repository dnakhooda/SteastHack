import { NextResponse } from "next/server";
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const email = searchParams.get("email");

    const usersRef = db.ref('users');

    if (userId) {
      // If userId is provided, return specific user
      const snapshot = await usersRef.child(userId).once('value');
      if (!snapshot.exists()) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(snapshot.val());
    }

    if (email) {
      // If email is provided, find user by email
      const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
      if (!snapshot.exists()) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // Get the first user that matches the email
      const userData = snapshot.val();
      const userId = Object.keys(userData)[0];
      return NextResponse.json(userData[userId]);
    }

    // If no userId or email, return all users
    const snapshot = await usersRef.once('value');
    const users = snapshot.val() || {};
    return NextResponse.json(Object.values(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
