import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video, Plus, X, Users, ChevronRight } from 'lucide-react';
import BottomNavigation from '../BottomNavigation';
import { useAuth } from '../../context/AuthContext';
import { useUnreadMessages } from '../../context/UnreadMessagesContext';
import { rtdb, db } from '../../firebase';
import { ref, push, onValue, off, serverTimestamp, set } from 'firebase/database';
import { collection, getDocs, query, doc, setDoc } from 'firebase/firestore';
import testFirebaseConnection from '../../testFirebase';
import testMessagingPermissions from '../../testMessaging';

const MessagesUI = () => {
  const { currentUser } = useAuth();
  const { markChatAsRead, lastReadTimes } = useUnreadMessages();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Debug current user status
  useEffect(() => {
    console.log('=== MESSAGE COMPONENT DEBUG ===');
    console.log('Current User:', currentUser);
    console.log('User UID:', currentUser?.uid);
    console.log('User Email:', currentUser?.email);
    console.log('User Display Name:', currentUser?.displayName);
    console.log('================================');
  }, [currentUser]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create sample users for testing
  const createSampleUsers = async () => {
    if (!currentUser) return;

    try {
      const sampleUsers = [
        {
          id: 'user_001',
          displayName: 'Sarah Johnson',
          email: 'sarah@example.com',
          photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          lastSeen: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_002',
          displayName: 'Mike Chen',
          email: 'mike@example.com',
          photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isOnline: false,
          lastSeen: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_003',
          displayName: 'Emma Wilson',
          email: 'emma@example.com',
          photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
          lastSeen: new Date().toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          id: 'user_004',
          displayName: 'Alex Rodriguez',
          email: 'alex@example.com',
          photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          isOnline: false,
          lastSeen: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          createdAt: new Date().toISOString()
        }
      ];

      // Save each user to Firestore
      for (const user of sampleUsers) {
        await setDoc(doc(db, 'users', user.id), user);
      }

      console.log('Sample users created successfully!');
      
      // Reload users to show the new ones
      await loadAvailableUsers();
      
    } catch (error) {
      console.error('Error creating sample users:', error);
    }
  };
  const loadAvailableUsers = useCallback(async () => {
    if (!currentUser) {
      console.log('No current user, cannot load available users');
      return;
    }

    console.log('Loading available users for current user:', currentUser.uid);
    
    try {
      // Add demo user for testing
      const demoUser = {
        id: 'demo_user_123',
        name: 'Demo Creator',
        email: 'demo@fanshub.com',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
      };

      const userMap = new Map();
      
      // Add demo user first
      userMap.set(demoUser.id, demoUser);
      console.log('Added demo user');

      // Method 1: Get users from posts (people who have posted)
      try {
        const postsQuery = query(collection(db, 'posts'));
        const postsSnapshot = await getDocs(postsQuery);
        
        postsSnapshot.forEach((doc) => {
          const post = doc.data();
          if (post.userId && post.userId !== currentUser.uid) {
            userMap.set(post.userId, {
              id: post.userId,
              name: post.userName || 'Anonymous User',
              email: post.userEmail || 'No email',
              avatar: post.userAvatar || 'https://via.placeholder.com/40?text=U'
            });
          }
        });
      } catch (error) {
        console.log('Error fetching users from posts:', error);
      }

      // Method 2: Get all registered users from Firebase users collection (Priority)
      try {
        console.log('Trying to fetch users from Firestore users collection...');
        const usersQuery = query(collection(db, 'users'));
        const usersSnapshot = await getDocs(usersQuery);
        
        console.log('Users snapshot empty?', usersSnapshot.empty);
        console.log('Users snapshot size:', usersSnapshot.size);
        
        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          console.log('Found user in Firestore:', doc.id, userData);
          if (doc.id !== currentUser.uid) {
            userMap.set(doc.id, {
              id: doc.id,
              name: userData.displayName || userData.name || 'Anonymous User',
              email: userData.email || '',
              avatar: userData.photoURL || userData.avatar || 'https://via.placeholder.com/40?text=U'
            });
          }
        });
        console.log('Loaded registered users from Firestore:', userMap.size);
      } catch (error) {
        console.error('Error accessing users collection:', error);
      }

      // Method 3: Get users from posts as backup
      try {
        console.log('Trying to fetch users from posts collection...');
        const postsQuery = query(collection(db, 'posts'));
        const postsSnapshot = await getDocs(postsQuery);
        
        console.log('Posts snapshot empty?', postsSnapshot.empty);
        console.log('Posts snapshot size:', postsSnapshot.size);
        
        postsSnapshot.forEach((doc) => {
          const post = doc.data();
          if (post.userId && post.userId !== currentUser.uid && !userMap.has(post.userId)) {
            console.log('Found user from post:', post.userId, post.userName);
            userMap.set(post.userId, {
              id: post.userId,
              name: post.userName || 'Anonymous User',
              email: post.userEmail || '',
              avatar: post.userAvatar || 'https://via.placeholder.com/40?text=U'
            });
          }
        });
      } catch (error) {
        console.error('Error fetching users from posts:', error);
      }

      const allUsers = Array.from(userMap.values());
      console.log('Total users available for messaging:', allUsers.length);
      console.log('User names:', allUsers.map(u => u.name));
      setAvailableUsers(allUsers);

    } catch (error) {
      console.error('Error loading users:', error);
      setAvailableUsers([]);
    }
  }, [currentUser]);

  // Load available users when component mounts
  useEffect(() => {
    if (currentUser) {
      // First test Firebase connection
      testFirebaseConnection().then((connected) => {
        if (connected) {
          loadAvailableUsers();
        } else {
          console.error('Skipping user loading due to Firebase connection issues');
        }
      });
    }
  }, [currentUser, loadAvailableUsers]);

  // Load conversations for current user
  useEffect(() => {
    if (!currentUser) return;

    const conversationsRef = ref(rtdb, `userChats/${currentUser.uid}`);
    const unsubscribe = onValue(conversationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const conversationsList = Object.entries(data).map(([chatId, chatData]) => ({
          id: chatId,
          ...chatData
        }));
        setConversations(conversationsList.sort((a, b) => b.lastMessageTime - a.lastMessageTime));
      } else {
        setConversations([]);
      }
    });

    return () => off(conversationsRef, 'value', unsubscribe);
  }, [currentUser]);

  // Load messages for active chat
  useEffect(() => {
    if (!activeChat) return;

    const messagesRef = ref(rtdb, `chats/${activeChat.id}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.entries(data).map(([messageId, messageData]) => ({
          id: messageId,
          ...messageData
        }));
        setMessages(messagesList.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMessages([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  }, [activeChat]);

  // Send message function
  const sendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !currentUser || isLoading) return;

    setIsLoading(true);
    try {
      const messageData = {
        text: newMessage.trim(),
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'Anonymous',
        timestamp: serverTimestamp(),
        type: 'text'
      };

      // Add message to chat
      const messagesRef = ref(rtdb, `chats/${activeChat.id}/messages`);
      await push(messagesRef, messageData);

      // Update last message in user chats
      const currentTime = Date.now();
      const chatUpdate = {
        lastMessage: newMessage.trim(),
        lastMessageTime: currentTime,
        lastSenderId: currentUser.uid
      };

      // Update for both users
      await set(ref(rtdb, `userChats/${currentUser.uid}/${activeChat.id}`), {
        ...activeChat,
        ...chatUpdate
      });

      if (activeChat.otherUserId) {
        await set(ref(rtdb, `userChats/${activeChat.otherUserId}/${activeChat.id}`), {
          userId: currentUser.uid,
          userName: currentUser.displayName || 'Anonymous',
          userAvatar: currentUser.photoURL || 'https://via.placeholder.com/40',
          ...chatUpdate
        });
      }

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if conversation has unread messages
  const hasUnreadMessages = (conversation) => {
    if (!conversation || conversation.lastSenderId === currentUser?.uid) {
      return false;
    }
    
    const lastReadTime = lastReadTimes[conversation.id] || 0;
    // Handle Firebase timestamp properly
    let lastMessageTime = conversation.lastMessageTime || 0;
    if (typeof lastMessageTime === 'object' && lastMessageTime.seconds) {
      // Handle Firebase Timestamp object
      lastMessageTime = lastMessageTime.seconds * 1000;
    } else if (typeof lastMessageTime !== 'number') {
      lastMessageTime = Date.now();
    }
    
    return lastMessageTime > lastReadTime && conversation.lastMessage;
  };

  // Handle chat selection and mark as read
  const handleChatSelect = (conversation) => {
    setActiveChat(conversation);
    // Mark this chat as read
    markChatAsRead(conversation.id);
  };

  // Create new chat function
  const createNewChat = async (otherUser) => {
    if (!currentUser) return;

    try {
      const chatId = [currentUser.uid, otherUser.id].sort().join('_');
      const chatData = {
        id: chatId,
        userId: otherUser.id,
        userName: otherUser.name,
        userAvatar: otherUser.avatar,
        lastMessage: '',
        lastMessageTime: Date.now(),
        otherUserId: otherUser.id
      };

      console.log('Creating new chat:', chatData);
      setActiveChat(chatData);
      setShowUserSelect(false);
      console.log('Active chat set to:', chatData);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  // Start new chat and close modal
  const startNewChat = async (user) => {
    await createNewChat(user);
    setShowUserSelect(false);
  };

  // Test function to simulate receiving a message from another user
  const simulateIncomingMessage = async () => {
    console.log('🧪 Starting message simulation test...');
    
    if (!currentUser) {
      console.error('❌ No current user found for simulation');
      alert('❌ Error: No user logged in. Please log in first.');
      return;
    }

    console.log('Current user for simulation:', currentUser.uid);

    try {
      const testUserId = 'test_sender_' + Date.now();
      const chatId = [currentUser.uid, testUserId].sort().join('_');
      
      console.log('Generated test chat ID:', chatId);
      
      const testChatData = {
        userId: testUserId,
        userName: 'Test Sender',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        lastMessage: 'Hey! This is a test message to check unread notifications 📱',
        lastMessageTime: Date.now(),
        lastSenderId: testUserId // Important: different from current user
      };

      console.log('Test chat data:', testChatData);
      console.log('Writing to Firebase path:', `userChats/${currentUser.uid}/${chatId}`);

      // Add to current user's chat list to simulate receiving a message
      await set(ref(rtdb, `userChats/${currentUser.uid}/${chatId}`), testChatData);
      
      console.log('✅ Test message simulated successfully! Check your bottom navigation.');
      alert('📱 Test message sent! Check the bottom navigation for red badge.');
      
    } catch (error) {
      console.error('❌ Detailed error in simulateIncomingMessage:', {
        error: error,
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      
      if (error.code === 'permission-denied') {
        console.error('🔒 Permission denied - Firebase Security Rules may be blocking this operation');
        alert('❌ Permission denied. Check Firebase Security Rules for Realtime Database.');
      } else if (error.code === 'network-request-failed') {
        console.error('🌐 Network request failed - Check internet connection');
        alert('❌ Network error. Check your internet connection.');
      } else {
        console.error('🔥 Firebase error:', error.code, error.message);
        alert(`❌ Firebase error: ${error.message}`);
      }
    }
  };

  // Handle demo chat creation with proper marking as read
  const handleDemoChat = () => {
    const demoUser = {
      id: 'demo_user_123',
      name: 'Demo Creator',
      email: 'demo@fanshub.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face'
    };
    createNewChat(demoUser);
  };

  // Open user selection modal
  const handleNewChatClick = () => {
    loadAvailableUsers();
    setShowUserSelect(true);
  };

  // Handle key press for message input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-3">Please log in</h2>
          <p className="text-gray-500">You need to be logged in to access messages</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-20">
      <div className="flex flex-1 relative">
        {/* Left Sidebar - Conversations List */}
        <div className={`${activeChat ? 'hidden lg:block' : 'block'} w-full lg:w-80 bg-white border-r border-gray-200`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">Messages</h1>
              <button 
                onClick={handleNewChatClick}
                className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-600 flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-pink-100 text-pink-600 rounded-full">
                <span>All</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
                <span>Unread</span>
              </button>
              {/* Test button - only show in development */}
              {process.env.NODE_ENV === 'development' && (
                <button 
                  onClick={simulateIncomingMessage}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                  title="Test unread messages feature"
                >
                  <span>🧪 Test</span>
                </button>
              )}
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length > 0 ? (
              conversations.map((conversation) => {
                const isUnread = hasUnreadMessages(conversation);
                return (
                  <div
                    key={conversation.id}
                    onClick={() => handleChatSelect(conversation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeChat?.id === conversation.id ? 'bg-pink-50 border-pink-200' : ''
                    } ${isUnread ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.userAvatar}
                          alt={conversation.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        {/* Unread indicator */}
                        {isUnread && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium truncate ${
                            isUnread ? 'text-gray-900 font-semibold' : 'text-gray-900'
                          }`}>
                            {conversation.userName}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <p className={`text-sm truncate mt-1 ${
                          isUnread ? 'text-gray-700 font-medium' : 'text-gray-500'
                        }`}>
                          {conversation.lastMessage || 'Start a conversation...'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 text-center">
                <div className="text-gray-400 text-4xl mb-4">💬</div>
                <h3 className="font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-sm text-gray-500 mb-6">Start chatting with creators and fans</p>
                
                {/* Quick Start Demo Chat */}
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">🚀 Try Demo Chat</h4>
                  <p className="text-sm text-gray-600 mb-3">Test the messaging system with our demo user</p>
                  <button 
                    onClick={handleDemoChat}
                    className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 flex items-center space-x-2 mx-auto"
                  >
                    <Send className="w-4 h-4" />
                    <span>Start Demo Chat</span>
                  </button>
                </div>

                <button 
                  onClick={handleNewChatClick}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-200 flex items-center space-x-2 mx-auto"
                >
                  <Users className="w-4 h-4" />
                  <span>Browse All Users</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={`${activeChat ? 'block' : 'hidden lg:block'} flex-1 flex flex-col bg-gray-50`}>
          {/* Debug Info - Remove this later */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-100 p-2 text-xs">
              Debug: activeChat = {activeChat ? `${activeChat.userName} (${activeChat.id})` : 'null'}
            </div>
          )}
          
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveChat(null)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={activeChat.userAvatar}
                    alt={activeChat.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-medium text-gray-900">{activeChat.userName}</h2>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => {
                  const isOwn = message.senderId === currentUser.uid;
                  const showDate = index === 0 || 
                    formatDate(message.timestamp) !== formatDate(messages[index - 1]?.timestamp);

                  return (
                    <div key={message.id}>
                      {showDate && (
                        <div className="text-center text-xs text-gray-500 mb-4">
                          {formatDate(message.timestamp)}
                        </div>
                      )}
                      <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwn 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            isOwn ? 'text-pink-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input - Fixed at bottom with padding for nav bar */}
              <div className="bg-white border-t border-gray-200 p-4 sticky bottom-20">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || isLoading}
                    className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Input helper text */}
                <div className="text-xs text-gray-500 mt-2 text-center">
                  Press Enter to send • Chatting with {activeChat.userName}
                </div>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-200">
                  <div className="relative">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center relative">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-1 left-3 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-pink-100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-3">
                Ready to Start Chatting?
              </h2>
              <p className="text-gray-500 text-center max-w-sm mb-6 leading-relaxed">
                Choose a conversation from the sidebar or start a new chat to see the message input box
              </p>
              
              {/* Quick Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleDemoChat}
                  className="bg-pink-500 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 flex items-center space-x-2 mx-auto"
                >
                  <Send className="w-5 h-5" />
                  <span>Try Demo Chat</span>
                </button>
                
                <button 
                  onClick={handleNewChatClick}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 flex items-center space-x-2 mx-auto"
                >
                  <Users className="w-5 h-5" />
                  <span>Browse Users</span>
                </button>
              </div>
              
              {/* Instruction */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-sm">
                <p className="text-sm text-blue-700 text-center">
                  💡 <strong>Tip:</strong> The message input box will appear once you select a chat!
                </p>
              </div>
              
              {/* Simple Test Chat - Always visible for debugging */}
              <div className="mt-8 w-full max-w-md bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-pink-500 text-white p-3 text-center font-medium">
                  🧪 Test Chat (Always Available)
                </div>
                <div className="p-4 max-h-40 overflow-y-auto bg-gray-50">
                  <div className="text-sm text-gray-500 text-center mb-2">Test messages will appear here</div>
                  {messages.length > 0 && (
                    <div className="space-y-2">
                      {messages.slice(-3).map((msg, idx) => (
                        <div key={idx} className="bg-white p-2 rounded text-sm">
                          <strong>{msg.senderName}:</strong> {msg.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          // Create a temporary active chat if none exists or use existing demo chat
                          if (!activeChat) {
                            handleDemoChat();
                          }
                          sendMessage();
                        }
                      }}
                      placeholder="Type test message..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                      onClick={() => {
                        // Create a temporary active chat if none exists or use existing demo chat
                        if (!activeChat) {
                          handleDemoChat();
                        }
                        sendMessage();
                      }}
                      className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

            {/* User Selection Modal */}
            {showUserSelect && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                      <button
                        onClick={() => setShowUserSelect(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Choose from registered users</p>
                  </div>
                  
                  <div className="p-4 max-h-72 overflow-y-auto">
                    {availableUsers.length === 0 ? (
                      <div className="text-center py-8">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">No registered users found</p>
                        <p className="text-sm text-gray-400 mt-2">Users will appear here when they register</p>
                        
                        <div className="flex flex-col space-y-2 mt-4">
                          {/* Button to test Firebase connection */}
                          <button
                            onClick={() => testFirebaseConnection()}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            🔍 Test Firebase Connection
                          </button>
                          
                          {/* Button to test messaging permissions */}
                          <button
                            onClick={() => testMessagingPermissions(currentUser)}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                          >
                            💬 Test Messaging Permissions
                          </button>
                          
                          {/* Button to create sample users for testing */}
                          <button
                            onClick={createSampleUsers}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                          >
                            ➕ Create Sample Users for Testing
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-700">{availableUsers.length} Users Available</p>
                          <button
                            onClick={createSampleUsers}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                          >
                            Add More
                          </button>
                        </div>
                        
                        {/* Simple name-only list */}
                        {availableUsers.map((user) => (
                          <motion.button
                            key={user.id}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => startNewChat(user)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="ml-3 font-medium text-gray-900 group-hover:text-blue-600">
                                {user.name}
                              </span>
                            </div>
                            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setShowUserSelect(false)}
                      className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </div>
            )}      <BottomNavigation active="Messages" />
    </div>
  );
};

export default MessagesUI;