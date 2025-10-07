// Test Post Creator
// Run this in browser console to create a test post

import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const createTestPost = async () => {
  try {
    const testPost = {
      userId: 'test_user_123',
      userName: 'Test User',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
      explanation: 'This is a test post to check if the feed is working properly! 📱',
      files: [
        {
          url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&h=800&fit=crop',
          secure_url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&h=800&fit=crop',
          type: 'image/jpeg',
          publicId: 'test_image_1'
        }
      ],
      genres: ['test'],
      tags: 'test demo sample',
      likes: 0,
      comments: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'posts'), testPost);
    console.log('✅ Test post created with ID:', docRef.id);
    alert('✅ Test post created! Refresh the feed page.');
    return docRef.id;
  } catch (error) {
    console.error('❌ Error creating test post:', error);
    alert('❌ Error: ' + error.message);
    throw error;
  }
};

// For browser console use
window.createTestPost = createTestPost;
