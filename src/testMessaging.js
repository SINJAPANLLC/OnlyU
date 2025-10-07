import { rtdb } from './firebase';
import { ref, set, serverTimestamp } from 'firebase/database';

// Specific test for messaging functionality
export const testMessagingPermissions = async (currentUser) => {
  if (!currentUser) {
    console.error('❌ No user provided for messaging test');
    return false;
  }

  console.log('🧪 Testing messaging permissions for user:', currentUser.uid);

  try {
    // Test 1: Can we write to userChats for this specific user?
    console.log('Test 1: Testing userChats write permission...');
    const userChatRef = ref(rtdb, `userChats/${currentUser.uid}/test_chat_${Date.now()}`);
    await set(userChatRef, {
      test: true,
      userId: 'test_user',
      userName: 'Test User',
      lastMessage: 'Test message',
      lastMessageTime: Date.now(),
      timestamp: serverTimestamp()
    });
    console.log('✅ Test 1 passed: userChats write permission OK');

    // Test 2: Can we write to chats collection?
    console.log('Test 2: Testing chats write permission...');
    const chatRef = ref(rtdb, `chats/test_chat_${Date.now()}/messages/test_message`);
    await set(chatRef, {
      text: 'Test message',
      senderId: currentUser.uid,
      senderName: currentUser.displayName || 'Test User',
      timestamp: serverTimestamp(),
      type: 'text'
    });
    console.log('✅ Test 2 passed: chats write permission OK');

    console.log('🎉 All messaging permission tests passed!');
    return true;

  } catch (error) {
    console.error('❌ Messaging permission test failed:', error);
    
    if (error.code === 'permission-denied') {
      console.error('🔒 PERMISSION DENIED - Your Firebase Realtime Database Security Rules are blocking this operation');
      console.error('💡 SOLUTION: Update your Firebase Security Rules to allow authenticated users to read/write');
      console.error('📝 Suggested rules for development:');
      console.error(`{
  "rules": {
    "userChats": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "chats": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}`);
    }
    
    return false;
  }
};

export default testMessagingPermissions;