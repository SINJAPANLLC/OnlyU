import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MoreHorizontal, Send, Smile, Image } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: '1',
      user: {
        name: 'ユキ',
        username: 'yuki_model',
        avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        online: true
      },
      lastMessage: 'ありがとうございます！✨',
      timestamp: '2分前',
      unread: 2
    },
    {
      id: '2',
      user: {
        name: 'あい',
        username: 'ai_creator',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        online: false
      },
      lastMessage: '今度コラボしませんか？',
      timestamp: '1時間前',
      unread: 0
    },
    {
      id: '3',
      user: {
        name: 'みく',
        username: 'miku_photo',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
        online: true
      },
      lastMessage: '写真見ました！素敵ですね',
      timestamp: '3時間前',
      unread: 1
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      content: 'こんにちは！投稿を見させていただきました',
      timestamp: '14:30',
      isOwn: false
    },
    {
      id: '2',
      senderId: '1',
      content: 'ありがとうございます！気に入っていただけて嬉しいです😊',
      timestamp: '14:32',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      content: 'とても素敵な写真ですね！どちらで撮影されましたか？',
      timestamp: '14:33',
      isOwn: false
    },
    {
      id: '4',
      senderId: '1',
      content: '東京の新宿御苑で撮影しました。桜がとても綺麗でした🌸',
      timestamp: '14:35',
      isOwn: true
    },
    {
      id: '5',
      senderId: '2',
      content: 'ありがとうございます！✨',
      timestamp: '14:36',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Here you would send the message to your backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 py-6"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[600px] flex">
        {/* Chat List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">メッセージ</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="メッセージを検索"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-full">
            {conversations.map((conversation, index) => (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedChat === conversation.id ? 'bg-pink-50 border-r-2 border-pink-500' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.user.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.user.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <p className="text-gray-600 text-sm truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConversation.user.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConversation.user.name}</h3>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.user.online ? 'オンライン' : '最後のアクティビティ: 1時間前'}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isOwn
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-all"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-all"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="メッセージを入力..."
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p>メッセージを選択してください</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;