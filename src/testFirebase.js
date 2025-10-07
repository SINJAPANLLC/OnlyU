import { db, rtdb } from './firebase';
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import { ref, set, serverTimestamp } from 'firebase/database';

// Test Firebase Connection
export const testFirebaseConnection = async () => {
  console.log('🚀 Starting Firebase Connection Test...');
  
  try {
    // Test 1: Basic Firestore write
    console.log('Test 1: Testing Firestore write...');
    const testDoc = doc(db, 'test', 'connection');
    await setDoc(testDoc, { 
      test: true, 
      timestamp: new Date().toISOString(),
      message: 'Firebase connection test successful'
    });
    console.log('✅ Test 1 passed: Firestore write successful');
    
    // Test 2: Firestore read
    console.log('Test 2: Testing Firestore read...');
    const testQuery = query(collection(db, 'test'));
    const testSnapshot = await getDocs(testQuery);
    console.log('✅ Test 2 passed: Firestore read successful, found', testSnapshot.size, 'documents');
    
    // Test 3: Realtime Database write
    console.log('Test 3: Testing Realtime Database write...');
    const testRef = ref(rtdb, 'test/connection');
    await set(testRef, {
      test: true,
      timestamp: serverTimestamp(),
      message: 'Realtime Database test successful'
    });
    console.log('✅ Test 3 passed: Realtime Database write successful');
    
    // Test 3b: Test userChats path specifically (used in messages)
    console.log('Test 3b: Testing userChats path...');
    const userChatsTestRef = ref(rtdb, 'userChats/test_user/test_chat');
    await set(userChatsTestRef, {
      test: true,
      message: 'userChats path test',
      timestamp: serverTimestamp()
    });
    console.log('✅ Test 3b passed: userChats path accessible');
    
    // Test 4: Check users collection
    console.log('Test 4: Checking users collection...');
    try {
      const usersQuery = query(collection(db, 'users'));
      const usersSnapshot = await getDocs(usersQuery);
      console.log('✅ Test 4 passed: Users collection accessible');
      console.log('   - Users collection exists:', !usersSnapshot.empty);
      console.log('   - Number of users:', usersSnapshot.size);
      
      if (usersSnapshot.size > 0) {
        usersSnapshot.forEach((doc) => {
          console.log('   - User:', doc.id, doc.data());
        });
      }
    } catch (error) {
      console.log('⚠️  Test 4 warning: Users collection issue:', error.message);
    }
    
    // Test 5: Check posts collection
    console.log('Test 5: Checking posts collection...');
    try {
      const postsQuery = query(collection(db, 'posts'));
      const postsSnapshot = await getDocs(postsQuery);
      console.log('✅ Test 5 passed: Posts collection accessible');
      console.log('   - Posts collection exists:', !postsSnapshot.empty);
      console.log('   - Number of posts:', postsSnapshot.size);
    } catch (error) {
      console.log('⚠️  Test 5 warning: Posts collection issue:', error.message);
    }
    
    console.log('🎉 All Firebase tests completed successfully!');
    return true;
    
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    
    // Provide specific error guidance
    if (error.code === 'permission-denied') {
      console.error('🔒 PERMISSION DENIED - Possible causes:');
      console.error('   1. Firebase Security Rules are too restrictive');
      console.error('   2. User not properly authenticated');
      console.error('   3. Insufficient permissions for current user');
    } else if (error.code === 'unavailable') {
      console.error('🌐 NETWORK UNAVAILABLE - Possible causes:');
      console.error('   1. No internet connection');
      console.error('   2. Firebase services are down');
      console.error('   3. Network firewall blocking Firebase');
    } else if (error.code === 'not-found') {
      console.error('🔍 NOT FOUND - Possible causes:');
      console.error('   1. Firebase project doesn\'t exist');
      console.error('   2. Collection doesn\'t exist yet');
      console.error('   3. Wrong project configuration');
    }
    
    return false;
  }
};

// Export for use in components
export default testFirebaseConnection;