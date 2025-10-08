import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * ユーザーのいいね・保存データを管理するユーティリティ関数
 */

// ユーザーのインタラクションデータを取得
export const getUserInteractions = async (userId) => {
  try {
    const userDocRef = doc(db, 'userInteractions', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        likedPosts: new Set(data.likedPosts || []),
        savedPosts: new Set(data.savedPosts || []),
        lastUpdated: data.lastUpdated
      };
    } else {
      // ユーザーデータが存在しない場合は空のデータを返す
      return {
        likedPosts: new Set(),
        savedPosts: new Set(),
        lastUpdated: null
      };
    }
  } catch (error) {
    console.error('Error getting user interactions:', error);
    return {
      likedPosts: new Set(),
      savedPosts: new Set(),
      lastUpdated: null
    };
  }
};

// ユーザーのいいねを追加/削除
export const toggleUserLike = async (userId, postId) => {
  try {
    const userDocRef = doc(db, 'userInteractions', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      const likedPosts = data.likedPosts || [];
      
      if (likedPosts.includes(postId)) {
        // いいねを削除
        await updateDoc(userDocRef, {
          likedPosts: arrayRemove(postId),
          lastUpdated: serverTimestamp()
        });
        return false; // いいねが削除された
      } else {
        // いいねを追加
        await updateDoc(userDocRef, {
          likedPosts: arrayUnion(postId),
          lastUpdated: serverTimestamp()
        });
        return true; // いいねが追加された
      }
    } else {
      // ユーザーデータが存在しない場合は新規作成
      await setDoc(userDocRef, {
        likedPosts: [postId],
        savedPosts: [],
        lastUpdated: serverTimestamp()
      });
      return true; // いいねが追加された
    }
  } catch (error) {
    console.error('Error toggling user like:', error);
    throw error;
  }
};

// ユーザーの保存を追加/削除
export const toggleUserSave = async (userId, postId) => {
  try {
    const userDocRef = doc(db, 'userInteractions', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      const savedPosts = data.savedPosts || [];
      
      if (savedPosts.includes(postId)) {
        // 保存を削除
        await updateDoc(userDocRef, {
          savedPosts: arrayRemove(postId),
          lastUpdated: serverTimestamp()
        });
        return false; // 保存が削除された
      } else {
        // 保存を追加
        await updateDoc(userDocRef, {
          savedPosts: arrayUnion(postId),
          lastUpdated: serverTimestamp()
        });
        return true; // 保存が追加された
      }
    } else {
      // ユーザーデータが存在しない場合は新規作成
      await setDoc(userDocRef, {
        likedPosts: [],
        savedPosts: [postId],
        lastUpdated: serverTimestamp()
      });
      return true; // 保存が追加された
    }
  } catch (error) {
    console.error('Error toggling user save:', error);
    throw error;
  }
};

// ユーザーのいいね・保存データを初期化
export const initializeUserInteractions = async (userId) => {
  try {
    const userDocRef = doc(db, 'userInteractions', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        likedPosts: [],
        savedPosts: [],
        lastUpdated: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error initializing user interactions:', error);
    throw error;
  }
};

// ユーザーのいいねした投稿一覧を取得
export const getUserLikedPosts = async (userId) => {
  try {
    const interactions = await getUserInteractions(userId);
    return Array.from(interactions.likedPosts);
  } catch (error) {
    console.error('Error getting user liked posts:', error);
    return [];
  }
};

// ユーザーの保存した投稿一覧を取得
export const getUserSavedPosts = async (userId) => {
  try {
    const interactions = await getUserInteractions(userId);
    return Array.from(interactions.savedPosts);
  } catch (error) {
    console.error('Error getting user saved posts:', error);
    return [];
  }
};
