// Firebase configuration and Firestore data model
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Firestore Collections
export const COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
  REPORTS: 'reports'
};

// Data Models

// User Model
export interface FirestoreUser {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  role: 'manager' | 'creator' | 'fan';
  status: 'active' | 'banned';
  followers: number;
  following: number;
  isVerified: boolean;
  joinedDate: string;
  createdAt: string;
}

// Post Model
export interface FirestorePost {
  id: string;
  creatorId: string;
  content: string;
  contentUrl?: string;
  type: 'image' | 'video' | 'text';
  status: 'public' | 'private' | 'removed';
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

// Report Model
export interface FirestoreReport {
  id: string;
  postId: string;
  reporterId: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

// Firestore Functions

// Create user with role
export const createUserWithRole = async (userData: Omit<FirestoreUser, 'id'>, uid: string) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, uid);
    await setDoc(userRef, {
      ...userData,
      id: uid,
      createdAt: new Date().toISOString()
    });
    return { success: true, userId: uid };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error };
  }
};

// Get user by ID
export const getUserById = async (userId: string) => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { success: true, user: userSnap.data() as FirestoreUser };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, error };
  }
};

// Get all users (manager only)
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, COLLECTIONS.USERS);
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const users: FirestoreUser[] = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as FirestoreUser);
    });
    return { success: true, users };
  } catch (error) {
    console.error('Error getting users:', error);
    return { success: false, error };
  }
};

// Update user role (manager only)
export const updateUserRole = async (userId: string, newRole: 'manager' | 'creator' | 'fan') => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(userRef, {
      role: newRole,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user role:', error);
    return { success: false, error };
  }
};

// Ban/Unban user (manager only)
export const updateUserStatus = async (userId: string, status: 'active' | 'banned') => {
  try {
    const userRef = doc(db, COLLECTIONS.USERS, userId);
    await updateDoc(userRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user status:', error);
    return { success: false, error };
  }
};

// Create post (creator only)
export const createPost = async (postData: Omit<FirestorePost, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const postsRef = collection(db, COLLECTIONS.POSTS);
    const newPostRef = doc(postsRef);
    const newPost: FirestorePost = {
      ...postData,
      id: newPostRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(newPostRef, newPost);
    return { success: true, postId: newPostRef.id };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, error };
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const postsRef = collection(db, COLLECTIONS.POSTS);
    const q = query(postsRef, where('status', '!=', 'removed'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const posts: FirestorePost[] = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data() as FirestorePost);
    });
    return { success: true, posts };
  } catch (error) {
    console.error('Error getting posts:', error);
    return { success: false, error };
  }
};

// Delete post (manager or creator of post)
export const deletePost = async (postId: string) => {
  try {
    const postRef = doc(db, COLLECTIONS.POSTS, postId);
    await updateDoc(postRef, {
      status: 'removed',
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error };
  }
};

// Create report (fan only)
export const createReport = async (reportData: Omit<FirestoreReport, 'id' | 'timestamp'>) => {
  try {
    const reportsRef = collection(db, COLLECTIONS.REPORTS);
    const newReportRef = doc(reportsRef);
    const newReport: FirestoreReport = {
      ...reportData,
      id: newReportRef.id,
      timestamp: new Date().toISOString()
    };
    await setDoc(newReportRef, newReport);
    return { success: true, reportId: newReportRef.id };
  } catch (error) {
    console.error('Error creating report:', error);
    return { success: false, error };
  }
};

// Get all reports (manager only)
export const getAllReports = async () => {
  try {
    const reportsRef = collection(db, COLLECTIONS.REPORTS);
    const q = query(reportsRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const reports: FirestoreReport[] = [];
    querySnapshot.forEach((doc) => {
      reports.push(doc.data() as FirestoreReport);
    });
    return { success: true, reports };
  } catch (error) {
    console.error('Error getting reports:', error);
    return { success: false, error };
  }
};

// Resolve report (manager only)
export const resolveReport = async (reportId: string, status: 'resolved' | 'dismissed') => {
  try {
    const reportRef = doc(db, COLLECTIONS.REPORTS, reportId);
    await updateDoc(reportRef, {
      status,
      resolvedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error('Error resolving report:', error);
    return { success: false, error };
  }
};

export default app;
