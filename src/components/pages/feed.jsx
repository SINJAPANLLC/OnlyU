import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal, Play } from 'lucide-react';
import BottomNavigation from '../BottomNavigation';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';

const SocialFeedScreen = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  // Fetch posts from Firebase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching posts for feed...');
      
      // Query all posts ordered by creation date
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(50) // Limit to recent 50 posts for performance
      );
      
      const postsSnapshot = await getDocs(postsQuery);
      const fetchedPosts = [];
      
      console.log('Posts snapshot size:', postsSnapshot.size);
      
      postsSnapshot.forEach((doc) => {
        const postData = doc.data();
        console.log('Feed post data:', postData);
        
        // Only include posts with images
        if (postData.files && Array.isArray(postData.files) && postData.files.length > 0) {
          const firstFile = postData.files[0];
          const imageUrl = firstFile.url || firstFile.secure_url;
          
          if (imageUrl) {
            const processedPost = {
              id: doc.id,
              ...postData,
              imageUrl: imageUrl,
              type: firstFile.type && firstFile.type.startsWith('video/') ? 'video' : 'image',
              date: postData.createdAt ? 
                (postData.createdAt.seconds ? 
                  new Date(postData.createdAt.seconds * 1000) : 
                  new Date(postData.createdAt)
                ) : new Date(),
              title: postData.explanation || 'Untitled Post',
              likes: postData.likes || 0,
              comments: postData.comments || 0,
              userName: postData.userName || 'Anonymous',
              userAvatar: postData.userAvatar || null,
              genres: postData.genres || [],
              tags: postData.tags || ''
            };
            
            fetchedPosts.push(processedPost);
          }
        }
      });
      
      console.log('Processed feed posts:', fetchedPosts);
      
      if (fetchedPosts.length === 0) {
        console.warn('No posts found in feed');
        setError('No posts available. Create your first post!');
      }
      
      setPosts(fetchedPosts);
      
    } catch (error) {
      console.error('Error fetching feed posts:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      setError(`Failed to load feed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle like toggle
  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Handle bookmark toggle
  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Handle video play/pause
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Auto-play video when post changes
  useEffect(() => {
    if (posts.length > 0 && currentPostIndex < posts.length) {
      setIsVideoPlaying(true);
    }
  }, [currentPostIndex, posts]);

  // Get Cloudinary optimized URL
  const getOptimizedImageUrl = (originalUrl, width = 400, height = 600) => {
    if (!originalUrl) return null;
    
    if (originalUrl.includes('cloudinary.com')) {
      try {
        const transformedUrl = originalUrl.replace(
          '/upload/',
          `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
        );
        return transformedUrl;
      } catch (error) {
        console.warn('Error transforming Cloudinary URL:', error);
        return originalUrl;
      }
    }
    
    return originalUrl;
  };

  // Loading state
  if (loading) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-pink-500 border-t-transparent mx-auto mb-4"></div>
          <p>Loading feed...</p>
        </div>
        <BottomNavigation active="Feed" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center p-4 max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Failed to Load Feed</h2>
          <p className="text-red-400 mb-4 text-sm break-words">{error}</p>
          <div className="space-y-2">
            <button 
              onClick={fetchPosts}
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/create-post')}
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create a Post
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-4">
            Check browser console (F12) for more details
          </p>
        </div>
        <BottomNavigation active="Feed" />
      </div>
    );
  }

  // No posts state
  if (posts.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center p-4">
          <div className="text-gray-400 text-6xl mb-4">📷</div>
          <p className="text-gray-400 mb-4">No posts available</p>
          <button 
            onClick={() => navigate('/create-post')}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Create First Post
          </button>
        </div>
        <BottomNavigation active="Feed" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Responsive container - mobile first, tablet and desktop optimized */}
      <div className="w-full max-w-sm mx-auto h-full relative sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* Scrollable container for posts */}
        <div 
          className="h-full overflow-y-auto snap-y snap-mandatory"
          style={{ 
            scrollBehavior: 'smooth',
          }}
          onScroll={(e) => {
            const container = e.target;
            const scrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const newIndex = Math.round(scrollTop / containerHeight);
            
            if (newIndex !== currentPostIndex && newIndex >= 0 && newIndex < posts.length) {
              setCurrentPostIndex(newIndex);
            }
          }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="relative w-full h-screen snap-start snap-always"
              style={{ minHeight: '100vh' }}
            >
        {/* Background Image/Video from Cloudinary */}
        <div className="absolute inset-0">
          {post.type === 'video' ? (
            <video
              ref={index === currentPostIndex ? videoRef : null}
              src={getOptimizedImageUrl(post.imageUrl, 400, 800)}
              className="w-full h-full object-cover cursor-pointer"
              loop
              muted
              playsInline
              autoPlay={index === currentPostIndex}
              onClick={index === currentPostIndex ? toggleVideoPlayback : undefined}
              onError={(e) => {
                console.warn('Feed video failed to load:', post.imageUrl);
                e.target.src = 'https://via.placeholder.com/400x800/444444/ffffff?text=Video+Error';
              }}
              onLoadedData={() => {
                console.log('Video loaded successfully:', post.imageUrl);
              }}
              onPlay={() => index === currentPostIndex && setIsVideoPlaying(true)}
              onPause={() => index === currentPostIndex && setIsVideoPlaying(false)}
            />
          ) : (
            <img
              src={getOptimizedImageUrl(post.imageUrl, 400, 800)}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.warn('Feed image failed to load:', post.imageUrl);
                e.target.src = 'https://via.placeholder.com/400x800/444444/ffffff?text=Image+Error';
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', post.imageUrl);
              }}
            />
          )}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Video Play/Pause Button (if it's a video) */}
        {post.type === 'video' && index === currentPostIndex && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isVideoPlaying ? 0 : 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideoPlayback}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white bg-opacity-90 rounded-full flex items-center justify-center backdrop-blur-sm pointer-events-auto cursor-pointer"
            >
              <Play size={24} className="text-black ml-1 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="currentColor" />
            </motion.div>
          </motion.div>
        )}

        {/* Right Side Actions - responsive positioning and sizing */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute right-2 sm:right-3 md:right-4 bottom-32 sm:bottom-36 md:bottom-40 flex flex-col space-y-4 sm:space-y-5 md:space-y-6 z-20"
        >
          {/* Profile Picture */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="relative"
            onClick={() => {
              console.log('🎯 Navigating to profile:', post.userId, 'for user:', post.userName);
              navigate(`/profile/${post.userId}`);
            }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gray-400 rounded-full border-2 border-white overflow-hidden">
              {post.userAvatar ? (
                <img 
                  src={post.userAvatar} 
                  alt={post.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {post.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

                {/* Like Button */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(post.id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <motion.div
                    animate={{ scale: likedPosts.has(post.id) ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <Heart
                      size={28}
                      className={`${likedPosts.has(post.id) ? 'text-red-500 fill-red-500' : 'text-white'} transition-colors sm:w-8 sm:h-8 md:w-9 md:h-9`}
                    />
                  </motion.div>
                  <span className="text-white text-xs sm:text-sm font-medium">{post.likes}</span>
                </motion.div>

                {/* Comment Button */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <MessageCircle size={28} className="text-white sm:w-8 sm:h-8 md:w-9 md:h-9" />
                  <span className="text-white text-xs sm:text-sm font-medium">{post.comments}</span>
                </motion.div>

                {/* Bookmark Button */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleBookmark(post.id)}
                  className="flex flex-col items-center space-y-1"
                >
                  <Bookmark
                    size={28}
                    className={`${bookmarkedPosts.has(post.id) ? 'text-yellow-400 fill-yellow-400' : 'text-white'} transition-colors sm:w-8 sm:h-8 md:w-9 md:h-9`}
                  />
                </motion.div>
              </motion.div>

              {/* Bottom Content for each post */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-3 pb-20 sm:p-4 sm:pb-24 z-20"
              >
                {/* Profile Info */}
                <div className="mb-2 sm:mb-3">
                  <h3 className="text-white font-semibold text-base sm:text-lg">
                    {post.userName}
                  </h3>
                </div>

                {/* Description */}
                <div className="mb-3 sm:mb-4">
                  <p className="text-white text-xs sm:text-sm leading-relaxed">
                    {post.title}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Show genres as tags */}
                  {post.genres && post.genres.map((genre, genreIndex) => (
                    <motion.span
                      key={`genre-${index}-${genreIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + genreIndex * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 border border-pink-300 rounded-full text-white font-medium text-xs shadow-lg backdrop-blur-sm"
                    >
                      {genre}
                    </motion.span>
                  ))}
                  
                  {/* Show custom tags if available */}
                  {post.tags && post.tags.split(',').filter(tag => tag.trim()).map((tag, tagIndex) => (
                    <motion.span
                      key={`tag-${index}-${tagIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (post.genres?.length || 0) * 0.1 + tagIndex * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 border border-blue-300 rounded-full text-white font-medium text-xs shadow-lg backdrop-blur-sm"
                    >
                      {tag.trim()}
                    </motion.span>
                  ))}
                </div>

                {/* Bottom Info */}
                <div className="flex items-center justify-between text-white text-sm opacity-80">
                  <span>{post.type}</span>
                  <div className="flex items-center space-x-2">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Fixed Top Bar - outside scroll area */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 sm:top-18 md:top-20 left-0 right-0 flex justify-between items-center p-3 sm:p-4 z-30 bg-black bg-opacity-20 backdrop-blur-sm"
        >
          <div className="flex space-x-4 sm:space-x-6 md:space-x-8">
            <span className="text-white text-sm sm:text-base md:text-lg font-medium opacity-60">For You</span>
            <span className="text-white text-sm sm:text-base md:text-lg font-medium">Following</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 sm:w-8 sm:h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
            >
              <Share size={14} className="text-white sm:w-4 sm:h-4" />
            </motion.div>
            <MoreHorizontal size={18} className="text-white sm:w-5 sm:h-5" />
          </div>
        </motion.div>

        {/* Fixed Post counter - outside scroll area */}
        <div className="absolute top-32 left-4 z-30 bg-black bg-opacity-20 rounded-full px-3 py-1 backdrop-blur-sm">
          <span className="text-white text-sm opacity-70">
            {currentPostIndex + 1} / {posts.length}
          </span>
        </div>

        {/* Bottom Navigation - responsive sizing */}
        <BottomNavigation active="Feed" />
      </div>
    </div>
  );
};

export default SocialFeedScreen;