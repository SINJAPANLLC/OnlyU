import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Smile, Lock, X } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const CreatePost = () => {
  const authContext = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!authContext) return null;

  const { user } = authContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    // Here you would typically send the post to your backend
    console.log('New post:', { content, isPremium, images });
    
    // Reset form
    setContent('');
    setImages([]);
    setIsPremium(false);
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex space-x-4">
        <img
          src={user?.avatar}
          alt={user?.displayName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="今何をしていますか？"
              className="w-full resize-none border-none outline-none text-gray-900 placeholder-gray-500 text-lg leading-relaxed"
              rows={isExpanded ? 3 : 1}
            />
            
            <AnimatePresence>
              {images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-2 my-4"
                >
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-between pt-4 border-t border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => {
                        // Mock image selection
                        const mockImages = [
                          'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
                          'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=600'
                        ];
                        setImages(prev => [...prev, mockImages[prev.length % 2]]);
                      }}
                      className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 hover:bg-pink-50 px-3 py-2 rounded-lg transition-all"
                    >
                      <Image className="w-5 h-5" />
                      <span className="font-medium">画像</span>
                    </button>
                    
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg transition-all"
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsPremium(!isPremium)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                        isPremium
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                      }`}
                    >
                      <Lock className="w-5 h-5" />
                      <span className="font-medium">プレミアム</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="text-gray-500 hover:text-gray-700 font-medium"
                    >
                      キャンセル
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={!content.trim()}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      投稿する
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatePost;