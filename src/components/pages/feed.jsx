import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark, Share, MoreHorizontal, Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowUp, ArrowDown, ChevronUp, ChevronDown, Film } from 'lucide-react';
import VideoPlayer from '../VideoPlayer';
import BottomNavigationWithCreator from '../BottomNavigationWithCreator';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { useUserInteractions } from '../../hooks/useUserInteractions';
import { useUserStats } from '../../context/UserStatsContext';

const SocialFeedScreen = () => {
  const navigate = useNavigate();
  const { likedPosts, savedPosts, toggleLike, toggleSave, isLiked, isSaved } = useUserInteractions();
  
  // useUserStatsのエラーハンドリング
  let updateLikedCount, updateSavedCount;
  try {
    const userStats = useUserStats();
    updateLikedCount = userStats.updateLikedCount;
    updateSavedCount = userStats.updateSavedCount;
  } catch (error) {
    console.warn('UserStats not available:', error);
    updateLikedCount = () => {};
    updateSavedCount = () => {};
  }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [localLikedPosts, setLocalLikedPosts] = useState(new Set());
  const [localSavedPosts, setLocalSavedPosts] = useState(new Set());
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);

  // サンプルデータ（Firebaseが利用できない場合のフォールバック）
  const samplePosts = [
    {
      id: 'sample_1',
      title: '大人気 絶頂動画を...',
      description: '【全員にプレゼント付き🎁】参加は一回限り💖特別...',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      likes: 2000,
      bookmarks: 1800,
      comments: 1900,
      userId: 'creator_1',
      userName: 'クリエイター名',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face',
      userFollowers: 12500,
      tags: ['巨乳', '素人', '個人撮影'],
      createdAt: new Date(Date.now() - 1000 * 60 * 30) // 30分前
    },
    {
      id: 'sample_2',
      title: 'Sweet Dreams Video',
      description: 'Giveaway Event - 限定コンテンツ',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
      likes: 308,
      bookmarks: 293,
      comments: 156,
      userId: 'creator_2',
      userName: 'Yuki',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      userFollowers: 8500,
      tags: ['可愛い', 'ギャル', '個人撮影'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2時間前
    },
    {
      id: 'sample_3',
      title: 'Private Moment',
      description: 'Exclusive Content - 特別な瞬間',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
      likes: 477,
      bookmarks: 402,
      comments: 234,
      userId: 'creator_3',
      userName: 'Airi',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      userFollowers: 15200,
      tags: ['美少女', '制服', '個人撮影'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6時間前
    },
    {
      id: 'sample_4',
      title: 'Live Stream',
      description: 'Active Now - ライブ配信中',
      type: 'video',
      imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      likes: 405,
      bookmarks: 375,
      comments: 189,
      userId: 'creator_4',
      userName: 'Miu',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      userFollowers: 9800,
      tags: ['ライブ', 'リアルタイム', '個人撮影'],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12時間前
    }
  ];

  // Fetch posts from Firebase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching posts for feed...');
      
      // まずサンプルデータを即座に表示（読み込み速度向上）
      const sortedSamplePosts = samplePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedSamplePosts);
      setLoading(false); // サンプルデータ表示後はローディングを終了
      
      // 並行してFirebaseからデータを取得
      try {
        const postsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(20) // 取得数を削減して速度向上
        );
        
        // タイムアウトを設定（2秒）
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Firebase timeout')), 2000)
        );
        
        const queryPromise = getDocs(postsQuery);
        const postsSnapshot = await Promise.race([queryPromise, timeoutPromise]);
        
        const fetchedPosts = [];
        
        console.log('Posts snapshot size:', postsSnapshot.size);
        
        postsSnapshot.forEach((doc) => {
          const postData = doc.data();
          
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
        
        if (fetchedPosts.length > 0) {
          // 新着順にソートしてFirebaseデータで更新
          const sortedPosts = fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(sortedPosts);
          console.log('Firebase data loaded successfully');
        }
        
      } catch (firebaseError) {
        console.log('Firebase timeout or error, using sample data:', firebaseError.message);
        // タイムアウトまたはエラーの場合はサンプルデータのまま
      }
      
    } catch (error) {
      console.error('Error fetching feed posts:', error);
      // エラーが発生した場合はサンプルデータを使用
      setPosts(samplePosts);
      setLoading(false);
    }
  };

  // Load posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle video playback when post changes
  useEffect(() => {
    if (videoRef.current && posts[currentPostIndex]?.type === 'video') {
      console.log('Playing video:', posts[currentPostIndex].videoUrl);
      videoRef.current.play().catch(e => {
        console.log('Auto-play failed:', e);
        setIsVideoPlaying(false);
      });
    }
  }, [currentPostIndex, posts]);

  // Handle like toggle with local state and stats
  const handleToggleLike = async (postId, e) => {
    try {
      e.stopPropagation();
      const wasLiked = localLikedPosts.has(postId);
      
      setLocalLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
          try {
            updateLikedCount(-1);
          } catch (statsError) {
            console.warn('Error updating liked count:', statsError);
          }
        } else {
          newSet.add(postId);
          try {
            updateLikedCount(1);
          } catch (statsError) {
            console.warn('Error updating liked count:', statsError);
          }
        }
        return newSet;
      });
      
      // 非同期でFirebaseにも保存
      toggleLike(postId).catch(error => {
        console.error('Error toggling like:', error);
        try {
          updateLikedCount(wasLiked ? 1 : -1);
        } catch (statsError) {
          console.warn('Error reverting liked count:', statsError);
        }
      });
    } catch (error) {
      console.error('Error in handleToggleLike:', error);
    }
  };

  // Handle bookmark toggle with local state and stats
  const handleToggleBookmark = async (postId, e) => {
    try {
      e.stopPropagation();
      const wasSaved = localSavedPosts.has(postId);
      
      setLocalSavedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
          try {
            updateSavedCount(-1);
          } catch (statsError) {
            console.warn('Error updating saved count:', statsError);
          }
        } else {
          newSet.add(postId);
          try {
            updateSavedCount(1);
          } catch (statsError) {
            console.warn('Error updating saved count:', statsError);
          }
        }
        return newSet;
      });
      
      // 非同期でFirebaseにも保存
      toggleSave(postId).catch(error => {
        console.error('Error toggling save:', error);
        try {
          updateSavedCount(wasSaved ? 1 : -1);
        } catch (statsError) {
          console.warn('Error reverting saved count:', statsError);
        }
      });
    } catch (error) {
      console.error('Error in handleToggleBookmark:', error);
    }
  };

  // Handle video play/pause
  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      try {
        if (isVideoPlaying) {
          console.log('Pausing video');
          videoRef.current.pause();
          setIsVideoPlaying(false);
        } else {
          console.log('Playing video');
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('Video started playing');
              setIsVideoPlaying(true);
            }).catch(error => {
              console.log("Playback failed:", error);
              setIsVideoPlaying(false);
            });
          }
        }
      } catch (error) {
        console.error("Error in toggleVideoPlayback:", error);
        setIsVideoPlaying(false);
      }
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      try {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      } catch (error) {
        console.error("Error in toggleMute:", error);
      }
    }
  };

  // Auto-play video when post changes
  useEffect(() => {
    if (posts.length > 0 && currentPostIndex < posts.length) {
      setIsVideoPlaying(true);
    }
  }, [currentPostIndex, posts]);

  // Handle navigation
  const handleBottomNavClick = (path) => {
    if (path === 'home') navigate('/');
    else if (path === 'ranking') navigate('/rankingpage');
    else if (path === 'account') navigate('/account');
    else navigate('/');
  };

  // Handle post navigation
  const goToNextPost = () => {
    if (currentPostIndex < posts.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPostIndex(currentPostIndex + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToPreviousPost = () => {
    if (currentPostIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentPostIndex(currentPostIndex - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStartY || !touchEndY) return;
    
    const distance = touchStartY - touchEndY;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe) {
      goToNextPost();
    } else if (isDownSwipe) {
      goToPreviousPost();
    }
  };

  // Handle video click to navigate to creator profile
  const handleVideoClick = () => {
    try {
      navigate(`/profile/${posts[currentPostIndex].userId}`);
    } catch (error) {
      console.error('Error navigating to profile:', error);
    }
  };

  // Handle account click to navigate to profile
  const handleAccountClick = (post) => {
    try {
      navigate(`/profile/${post.userId}`);
    } catch (error) {
      console.error('Error navigating to profile:', error);
    }
  };

  // Handle fullscreen button - navigate to video page
  const handleFullscreen = (e) => {
    try {
      e.stopPropagation(); // イベントの伝播を停止
      e.preventDefault(); // デフォルトの動作を防止
      
      console.log('Fullscreen button clicked');
      console.log('Current post:', posts[currentPostIndex]);
      console.log('Post ID:', posts[currentPostIndex]?.id);
      
      // 動画ページに遷移
      const videoId = posts[currentPostIndex]?.id;
      if (videoId) {
        console.log('Navigating to video page:', `/video/${videoId}`);
        navigate(`/video/${videoId}`);
      } else {
        console.error('No video ID found');
        alert('動画IDが見つかりません');
      }
    } catch (error) {
      console.error('Error navigating to video page:', error);
      alert('動画ページに遷移できませんでした');
    }
  };

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
          <p>コンテンツを読み込み中...</p>
        </div>
        <BottomNavigationWithCreator active="Feed" />
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
        <BottomNavigationWithCreator active="Feed" />
      </div>
    );
  }

  // No posts state
  if (posts.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center p-4">
          <div className="text-gray-400 text-6xl mb-4">📷</div>
          <p className="text-gray-400 mb-4">コンテンツがありません</p>
          <button 
            onClick={() => navigate('/create-post')}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Create First Post
          </button>
        </div>
        <BottomNavigationWithCreator active="Feed" />
      </div>
    );
  }

  // 投稿がない場合の処理
  if (!posts || posts.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-lg mb-4">投稿がありません</p>
          <p className="text-sm text-gray-400">新しい投稿をお待ちください</p>
        </div>
        <BottomNavigationWithCreator active="Feed" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Top Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <motion.span 
            className="text-white text-lg font-bold border-b-2 border-white pb-1"
            whileTap={{ scale: 0.95 }}
          >
            おすすめ
          </motion.span>
          <motion.span 
            className="text-white text-lg font-medium opacity-70"
            whileTap={{ scale: 0.95 }}
          >
            フォロー中
          </motion.span>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              try {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  alert('URLをクリップボードにコピーしました');
                }).catch(error => {
                  console.log('Error copying to clipboard:', error);
                  alert('シェア機能が利用できません');
                });
              } catch (error) {
                console.error('Error in share action:', error);
                alert('シェア機能でエラーが発生しました');
              }
            }}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <Share size={18} className="text-white" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              try {
                console.log('Download clicked');
                alert('ダウンロード機能は準備中です');
              } catch (error) {
                console.error('Error in download action:', error);
                alert('ダウンロードでエラーが発生しました');
              }
            }}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <ArrowDown size={18} className="text-white" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              try {
                console.log('More options clicked');
                alert('オプション機能は準備中です');
              } catch (error) {
                console.error('Error in more options action:', error);
                alert('オプション機能でエラーが発生しました');
              }
            }}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <MoreHorizontal size={18} className="text-white" />
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className="w-full h-full relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >

        {/* Current Post */}
        {posts[currentPostIndex] && (
          <motion.div 
            className="absolute inset-0"
            key={currentPostIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Video/Image */}
            <div className="absolute inset-0">
              {posts[currentPostIndex].type === 'video' ? (
                <VideoPlayer
                  videoUrl={posts[currentPostIndex].videoUrl}
                  posterUrl={posts[currentPostIndex].thumbnail}
                  title={posts[currentPostIndex].title}
                  isSubscribed={true} // 仮にtrueに設定（実際はユーザーのサブスク状況を確認）
                  onQualityChange={(quality) => {
                    console.log('Quality changed to:', quality);
                  }}
                />
              ) : (
                <img
                  src={getOptimizedImageUrl(posts[currentPostIndex].imageUrl)}
                  alt={posts[currentPostIndex].title}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Blur overlay */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
            </div>

            {/* Center Play Button for videos */}
            {posts[currentPostIndex].type === 'video' && !isVideoPlaying && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <button
                  onClick={toggleVideoPlayback}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Play size={32} className="text-white ml-1" />
                </button>
              </motion.div>
            )}

            {/* Right Side Actions */}
            <div className="absolute right-3 bottom-32 z-20 flex flex-col space-y-3">
              {/* Swipe Indicator */}
              <motion.div 
                className="flex flex-col items-center space-y-1 cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // スワイプインジケーターをタップした場合のアクション
                  console.log('Swipe indicator clicked');
                  // 次の投稿に移動
                  goToNextPost();
                }}
              >
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <ChevronDown size={20} className="text-white" />
                </div>
                <span className="text-white text-xs font-semibold">Swipe</span>
                <div className="w-1 h-8 bg-white/30 rounded-full relative">
                  <div className="w-1 h-2 bg-white rounded-full absolute top-0"></div>
                </div>
              </motion.div>

              {/* Creator Profile */}
              <motion.div 
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAccountClick(posts[currentPostIndex])}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={posts[currentPostIndex].userAvatar}
                    alt={posts[currentPostIndex].userName}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
              </motion.div>


              {/* Like Button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleToggleLike(posts[currentPostIndex].id, e)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="flex flex-col items-center space-y-1"
              >
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Heart
                    size={20}
                    className={`${localLikedPosts.has(posts[currentPostIndex].id) ? 'text-red-500 fill-red-500' : 'text-white'}`}
                  />
                </div>
                <span className="text-white text-xs font-semibold">{posts[currentPostIndex].likes}</span>
              </motion.div>

              {/* Bookmark Button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleToggleBookmark(posts[currentPostIndex].id, e)}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="flex flex-col items-center space-y-1"
              >
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bookmark
                    size={20}
                    className={`${localSavedPosts.has(posts[currentPostIndex].id) ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`}
                  />
                </div>
                <span className="text-white text-xs font-semibold">{posts[currentPostIndex].bookmarks}</span>
              </motion.div>

              {/* Comment Button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('Comment clicked');
                  // コメントページに遷移（将来的に実装）
                  // navigate(`/comments/${posts[currentPostIndex].id}`);
                  alert('コメント機能は準備中です');
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="flex flex-col items-center space-y-1 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <span className="text-white text-xs font-semibold">{posts[currentPostIndex].comments}</span>
              </motion.div>

              {/* Share Button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  try {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                      alert('URLをクリップボードにコピーしました');
                    }).catch(error => {
                      console.log('Error copying to clipboard:', error);
                      alert('シェア機能が利用できません');
                    });
                  } catch (error) {
                    console.error('Error in share action:', error);
                    alert('シェア機能でエラーが発生しました');
                  }
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="flex flex-col items-center space-y-1 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Share size={20} className="text-white" />
                </div>
                <span className="text-white text-xs font-semibold">シェア</span>
              </motion.div>

              {/* Mute Button for videos */}
              {posts[currentPostIndex].type === 'video' && (
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    {isMuted ? (
                      <VolumeX size={20} className="text-white" />
                    ) : (
                      <Volume2 size={20} className="text-white" />
                    )}
                  </div>
                  <span className="text-white text-xs font-semibold">
                    {isMuted ? 'ミュート' : '音声'}
                  </span>
                </motion.div>
              )}

              {/* Fullscreen Button */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={handleFullscreen}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="flex flex-col items-center space-y-1 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-5 h-5 border-2 border-white rounded"></div>
                </div>
                <span className="text-white text-xs font-semibold">全画面</span>
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6">
              {/* Watch Main Video Button */}
              <div className="mb-3 flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVideoClick}
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Film size={14} className="mr-1" />
                  <span className="font-semibold text-xs">本編を視聴する &gt;</span>
                </motion.button>
              </div>

              {/* Video Title */}
              <div className="text-white text-base font-bold mb-2">
                P活専門動画 {posts[currentPostIndex].userName}
              </div>

              {/* Video Description */}
              <div className="text-white text-sm mb-3 line-clamp-2">
                {posts[currentPostIndex].description}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {posts[currentPostIndex].tags?.map((tag, index) => (
                  <span key={index} className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="flex items-center justify-between text-white text-xs mb-2">
                <span>サンプル</span>
                <span>0:02 / 0:30</span>
                <span>1日前</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-1 relative">
                <div className="bg-pink-500 h-1 rounded-full" style={{ width: '6.7%' }}>
                  <div className="w-2 h-2 bg-pink-500 rounded-full absolute -top-0.5 -right-0.5"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}


      </div>

      <BottomNavigationWithCreator active="Feed" onNavClick={handleBottomNavClick} />
    </div>
  );
};

export default SocialFeedScreen;