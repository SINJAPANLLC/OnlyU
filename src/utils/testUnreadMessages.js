// Test utility for simulating unread messages
// Place this in your browser console or create a test component

const testUnreadMessages = async () => {
  console.log('🧪 Testing unread messages feature...');
  
  // Get current user from Firebase Auth
  const currentUser = window.firebase?.auth()?.currentUser;
  if (!currentUser) {
    console.error('❌ No user logged in. Please log in first.');
    return;
  }

  const { rtdb } = await import('../firebase');
  const { ref, set } = await import('firebase/database');

  // Create a test conversation from another user
  const testUserId = 'test_user_' + Date.now();
  const chatId = [currentUser.uid, testUserId].sort().join('_');
  
  try {
    // Step 1: Create a conversation with a message from another user
    const chatData = {
      userId: testUserId,
      userName: 'Test User',
      userAvatar: 'https://via.placeholder.com/40',
      lastMessage: 'Hello! This is a test message to check unread count.',
      lastMessageTime: Date.now(),
      lastSenderId: testUserId // Important: different from current user
    };

    // Add to current user's chat list
    await set(ref(rtdb, `userChats/${currentUser.uid}/${chatId}`), chatData);
    
    console.log('✅ Test conversation created!');
    console.log('📱 Check your bottom navigation - you should see a red badge!');
    
    // Step 2: After 5 seconds, create another message
    setTimeout(async () => {
      const newChatData = {
        ...chatData,
        lastMessage: 'This is message #2 for testing!',
        lastMessageTime: Date.now(),
      };
      
      await set(ref(rtdb, `userChats/${currentUser.uid}/${chatId}`), newChatData);
      console.log('✅ Second test message sent!');
    }, 5000);

  } catch (error) {
    console.error('❌ Error creating test conversation:', error);
  }
};

// Auto-run if in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Test function available: testUnreadMessages()');
}

export { testUnreadMessages };