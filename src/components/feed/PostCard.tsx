import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Lock } from 'lucide-react';
import { Post } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(post.timestamp), {
    addSuffix: true,
    locale: ja
  });

  return (
    <motion.article
      layout
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">{post.author.displayName}</h3>
                {post.author.isVerified && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                {post.isPremium && (
                  <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span className="text-xs font-medium">プレミアム</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500 text-sm">@{post.author.username} · {timeAgo}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-2 px-6 pb-4 ${
          post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
        }`}>
          {post.images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className={`w-full object-cover transition-transform hover:scale-105 ${
                  post.images!.length === 1 ? 'h-96' : 'h-48'
                }`}
              />
              {post.isPremium && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">プレミアム会員限定</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 ${
                post.isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              } transition-colors group`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="font-medium">{post.likes.toLocaleString()}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="font-medium">{post.comments.toLocaleString()}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors group"
            >
              <div className="p-2 rounded-full group-hover:bg-green-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 px-6 py-4"
          >
            <div className="space-y-3">
              <div className="flex space-x-3">
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2"
                  alt="Commenter"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-medium text-sm text-gray-900">みゆき</p>
                    <p className="text-gray-700 text-sm">素敵な写真ですね！✨</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <button className="hover:text-red-500">いいね</button>
                    <button className="hover:text-blue-500">返信</button>
                    <span>2時間前</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2"
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="コメントを追加..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default PostCard;