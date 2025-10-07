import React, { useState, useEffect, useCallback } from 'react';
import {
    Heart, MessageCircle, Share2, MoreHorizontal, X, Link2, User, ArrowLeft,
    Grid3X3, List, Pin, Video, Image as ImageIcon, ChevronDown, UserPlus, UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const EnhancedProfilePage = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL parameters
    const { currentUser, loading } = useAuth();
    const [activeTab, setActiveTab] = useState('Post');
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('New');
    const [selectedTags] = useState('All tags');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [showFilters, setShowFilters] = useState(false);
    const [userPosts, setUserPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);
    const [profileUser, setProfileUser] = useState(null); // Store the profile user data
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followLoading, setFollowLoading] = useState(false);
    
    // Determine which user's profile we're viewing
    const isOwnProfile = !userId || userId === currentUser?.uid;
    const targetUserId = userId || currentUser?.uid;

    // Filter and sort options
    const filterOptions = ['All', 'Images', 'Videos'];
    const sortOptions = ['New', 'Popular', 'Old'];

    // Fetch profile user data
    const fetchProfileUser = useCallback(async () => {
        if (!targetUserId) return;

        try {
            const userDoc = await getDoc(doc(db, 'users', targetUserId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setProfileUser({
                    uid: targetUserId,
                    ...userData
                });
                
                // Set followers/following count
                setFollowersCount(userData.followers?.length || 0);
                setFollowingCount(userData.following?.length || 0);
                
                // Check if current user is following this profile
                if (currentUser && !isOwnProfile) {
                    const isCurrentlyFollowing = userData.followers?.includes(currentUser.uid) || false;
                    setIsFollowing(isCurrentlyFollowing);
                    console.log('🔍 Follow status check:', {
                        currentUserId: currentUser.uid,
                        targetUserId,
                        followers: userData.followers,
                        isFollowing: isCurrentlyFollowing
                    });
                }
            } else {
                // If user document doesn't exist, create basic profile from current user
                if (isOwnProfile && currentUser) {
                    const newUserData = {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName || 'User',
                        email: currentUser.email,
                        photoURL: currentUser.photoURL,
                        followers: [],
                        following: [],
                        createdAt: new Date().toISOString()
                    };
                    
                    // Create the user document in Firestore
                    await setDoc(doc(db, 'users', currentUser.uid), newUserData);
                    setProfileUser(newUserData);
                } else {
                    // Profile user not found and not own profile
                    console.log('Profile user not found:', targetUserId);
                }
            }
        } catch (error) {
            console.error('Error fetching profile user:', error);
        }
    }, [targetUserId, currentUser, isOwnProfile]);

    // Handle follow/unfollow
    const handleFollowToggle = async () => {
        if (!currentUser || !targetUserId || isOwnProfile || followLoading) return;

        console.log('🔄 Follow toggle started:', {
            currentUser: currentUser.uid,
            targetUserId,
            isFollowing,
            isOwnProfile
        });

        setFollowLoading(true);
        try {
            const currentUserRef = doc(db, 'users', currentUser.uid);
            const targetUserRef = doc(db, 'users', targetUserId);

            console.log('📄 Checking user documents...');
            // Ensure both user documents exist before updating
            const [currentUserDoc, targetUserDoc] = await Promise.all([
                getDoc(currentUserRef),
                getDoc(targetUserRef)
            ]);

            console.log('📄 User documents status:', {
                currentUserExists: currentUserDoc.exists(),
                targetUserExists: targetUserDoc.exists()
            });

            // Create current user document if it doesn't exist
            if (!currentUserDoc.exists()) {
                await setDoc(currentUserRef, {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName || 'User',
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                    followers: [],
                    following: [],
                    createdAt: new Date().toISOString()
                });
            }

            // Create target user document if it doesn't exist (basic placeholder)
            if (!targetUserDoc.exists()) {
                await setDoc(targetUserRef, {
                    uid: targetUserId,
                    displayName: 'User',
                    followers: [],
                    following: [],
                    createdAt: new Date().toISOString()
                });
            }

            if (isFollowing) {
                // Unfollow
                console.log('👎 Unfollowing user...');
                await updateDoc(currentUserRef, {
                    following: arrayRemove(targetUserId)
                });
                await updateDoc(targetUserRef, {
                    followers: arrayRemove(currentUser.uid)
                });
                setIsFollowing(false);
                setFollowersCount(prev => Math.max(0, prev - 1));
                console.log('✅ Unfollow successful');
            } else {
                // Follow
                console.log('👍 Following user...');
                await updateDoc(currentUserRef, {
                    following: arrayUnion(targetUserId)
                });
                await updateDoc(targetUserRef, {
                    followers: arrayUnion(currentUser.uid)
                });
                setIsFollowing(true);
                setFollowersCount(prev => prev + 1);
                console.log('✅ Follow successful');
            }

            // Refresh profile data to ensure consistency
            await fetchProfileUser();
        } catch (error) {
            console.error('Error toggling follow:', error);
            alert('Failed to update follow status. Please try again.');
        } finally {
            setFollowLoading(false);
        }
    };

    // Debug function to reset follow state
    const resetFollowState = () => {
        console.log('🔄 Resetting follow state...');
        setIsFollowing(false);
        setFollowersCount(0);
        setFollowingCount(0);
        fetchProfileUser();
    };

    // Fetch user posts from Firebase
    const fetchUserPosts = useCallback(async () => {
        if (!targetUserId) return;

        try {
            setPostsLoading(true);
            setPostsError(null);
            
            console.log('Fetching posts for user:', targetUserId);
            
            // Try simple query first without orderBy to avoid index issues
            const postsQuery = query(
                collection(db, 'posts'),
                where('userId', '==', targetUserId)
            );
            
            const postsSnapshot = await getDocs(postsQuery);
            const posts = [];
            
            postsSnapshot.forEach((doc) => {
                const postData = doc.data();
                console.log('Post data:', postData);
                
                // Safely extract image URL - handle different data structures
                let imageUrl = null;
                if (postData.files && Array.isArray(postData.files) && postData.files.length > 0) {
                    // Handle Cloudinary structure
                    const firstFile = postData.files[0];
                    imageUrl = firstFile.url || firstFile.secure_url || null;
                }
                
                // Process the post to extract Cloudinary images
                const processedPost = {
                    id: doc.id,
                    ...postData,
                    // Extract thumbnail from first Cloudinary image
                    imageUrl: imageUrl,
                    // Determine type based on file types
                    type: postData.files && Array.isArray(postData.files) && postData.files.length > 0 
                        ? (postData.files.some(f => f.type && f.type.startsWith('video/')) ? 'video' : 'image')
                        : 'text',
                    // Convert Firebase timestamp to date - handle both serverTimestamp and regular timestamps
                    date: postData.createdAt ? 
                        (postData.createdAt.seconds ? 
                            new Date(postData.createdAt.seconds * 1000).toISOString().split('T')[0] : 
                            new Date(postData.createdAt).toISOString().split('T')[0]
                        ) : new Date().toISOString().split('T')[0],
                    title: postData.explanation || 'Untitled Post',
                    likes: postData.likes || 0,
                    comments: postData.comments || 0,
                    isPinned: false, // You can add pinning functionality later
                    // Add duration for videos if available
                    duration: postData.files && postData.files[0] && postData.files[0].duration ? postData.files[0].duration : null,
                    // Add video thumbnail URL for videos (Cloudinary generates these automatically)
                    videoThumbnail: postData.files && postData.files[0] && postData.files[0].type && postData.files[0].type.startsWith('video/') 
                        ? postData.files[0].url.replace('/upload/', '/upload/so_auto,w_300,h_300,c_fill,q_auto,f_jpg/') 
                        : null
                };
                
                posts.push(processedPost);
            });
            
            // Sort posts by date manually since we removed orderBy from query
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Filter out posts without images to avoid grey boxes
            const postsWithImages = posts.filter(post => post.imageUrl && post.imageUrl.trim() !== '');
            
            console.log('Processed posts:', posts);
            console.log('Posts with images:', postsWithImages);
            setUserPosts(postsWithImages);
            
        } catch (error) {
            console.error('Error fetching user posts:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                stack: error.stack
            });
            
            // More specific error messages
            let errorMessage = 'Failed to load posts';
            if (error.code) {
                switch (error.code) {
                    case 'permission-denied':
                        errorMessage = 'Permission denied. Please check your authentication.';
                        break;
                    case 'failed-precondition':
                        errorMessage = 'Database index required. Please contact support.';
                        break;
                    case 'unavailable':
                        errorMessage = 'Service temporarily unavailable. Please try again.';
                        break;
                    case 'invalid-argument':
                        errorMessage = 'Invalid query. Please try again.';
                        break;
                    default:
                        errorMessage = `Error: ${error.message}`;
                }
            }
            
            setPostsError(errorMessage);
        } finally {
            setPostsLoading(false);
        }
    }, [targetUserId]);

    // Fetch profile user data and posts when component mounts or params change
    useEffect(() => {
        if (targetUserId) {
            fetchProfileUser();
            fetchUserPosts();
        }
    }, [targetUserId, fetchProfileUser, fetchUserPosts]);

    // Watch for currentUser changes to update follow status
    useEffect(() => {
        if (currentUser && profileUser && !isOwnProfile) {
            fetchProfileUser(); // Refresh to get updated follow status
        }
    }, [currentUser, fetchProfileUser, isOwnProfile, profileUser]);

    const [profile] = useState({
        name: currentUser?.displayName || 'User Name',
        username: currentUser?.displayName || 'User Name',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
        verified: true,
        stats: {
            posts: 293,
            likes: '59.3K',
            followers: '108.5K',
            following: 0
        },
        description: '彼氏や旦那とのえっちに満足できていない女の子を、おもちゃ責め、潮吹き、高速ピストンなどのバチボコセックスでイカせまくり、別世界のえっちを体験させる裏垢男子。。彼氏がMであんまりいじめてくれな...',
        rankings: [
            { category: 'Married Woman', position: '1st' },
            { category: 'Pervert', position: '1st' },
            { category: 'Beautiful Breasts', position: '1st' }
        ],
        subscriptionPlan: {
            label: 'Recommendation',
            name: '見放題プラン',
            price: '¥5,000',
            period: 'month',
            posts: 99,
            description: 'こちらのプランでは全ての投稿を見ることができます。入会日から翌...'
        },
        postsData: {
            total: 685,
            images: 194,
            videos: 491
        },
        posts: [
            {
                id: 1,
                imageUrl: 'https://picsum.photos/300/400?random=1',
                isPinned: true,
                type: 'video',
                title: 'Sample video post',
                date: '2024-09-01',
                likes: 120,
                comments: 15
            },
            {
                id: 2,
                imageUrl: 'https://picsum.photos/300/400?random=2',
                isPinned: false,
                type: 'image',
                title: 'Beautiful photo',
                date: '2024-08-30',
                likes: 89,
                comments: 8
            },
            {
                id: 3,
                imageUrl: 'https://picsum.photos/300/400?random=3',
                isPinned: true,
                type: 'video',
                title: 'Another video',
                date: '2024-08-28',
                likes: 256,
                comments: 32
            },
            {
                id: 4,
                imageUrl: 'https://picsum.photos/300/400?random=4',
                isPinned: false,
                type: 'image',
                title: 'Great shot',
                date: '2024-08-25',
                likes: 178,
                comments: 22
            },
            {
                id: 5,
                imageUrl: 'https://picsum.photos/300/400?random=5',
                isPinned: false,
                type: 'video',
                title: 'Video content',
                date: '2024-08-20',
                likes: 340,
                comments: 45
            },
            {
                id: 6,
                imageUrl: 'https://picsum.photos/300/400?random=6',
                isPinned: false,
                type: 'image',
                title: 'Amazing view',
                date: '2024-08-18',
                likes: 95,
                comments: 12
            },
        ]
    });

    // Post Grid Item Component
    const PostGridItem = ({ post, index }) => {
        // Generate Cloudinary thumbnail URL if the image is from Cloudinary
        const getThumbnailUrl = (originalUrl, postType) => {
            if (!originalUrl || originalUrl.trim() === '') {
                return null; // Return null instead of placeholder
            }
            
            // Check if it's a Cloudinary URL
            if (originalUrl.includes('cloudinary.com')) {
                try {
                    // For videos, generate a thumbnail image from the video
                    if (postType === 'video') {
                        const transformedUrl = originalUrl.replace(
                            '/upload/',
                            '/upload/so_auto,w_300,h_300,c_fill,q_auto,f_jpg/'
                        );
                        return transformedUrl;
                    } else {
                        // For images, add transformation for thumbnail: 300x300, crop to fill, quality auto
                        const transformedUrl = originalUrl.replace(
                            '/upload/',
                            '/upload/w_300,h_300,c_fill,q_auto,f_auto/'
                        );
                        return transformedUrl;
                    }
                } catch (error) {
                    console.warn('Error transforming Cloudinary URL:', error);
                    return originalUrl;
                }
            }
            
            return originalUrl;
        };

        const thumbnailUrl = getThumbnailUrl(post.videoThumbnail || post.imageUrl, post.type);
        
        // Don't render if no valid image URL
        if (!thumbnailUrl) {
            return null;
        }

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group cursor-pointer"
            >
                {post.type === 'video' ? (
                    <div className="relative w-full h-full">
                        <img
                            src={thumbnailUrl}
                            alt={post.title || 'Video thumbnail'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                                console.warn('Video thumbnail failed to load:', post.imageUrl);
                                e.target.closest('.aspect-square').style.display = 'none';
                            }}
                            onLoad={() => {
                                console.log('Video thumbnail loaded successfully:', post.imageUrl);
                            }}
                        />
                        {/* Video play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <img
                        src={thumbnailUrl}
                        alt={post.title || 'Post image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                            console.warn('Image failed to load:', post.imageUrl);
                            e.target.closest('.aspect-square').style.display = 'none';
                        }}
                        onLoad={() => {
                            console.log('Image loaded successfully:', post.imageUrl);
                        }}
                    />
                )}
                {post.type === 'video' && (
                    <div className="absolute top-2 right-2">
                        <Video size={16} className="text-white drop-shadow-lg" />
                    </div>
                )}
                {post.type === 'video' && post.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                        {post.duration}
                    </div>
                )}
                {post.isPinned && (
                    <div className="absolute top-2 left-2">
                        <Pin size={16} className="text-yellow-400 drop-shadow-lg" />
                    </div>
                )}
                {/* Video play button overlay */}
                {post.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                            </svg>
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                        <div className="flex items-center justify-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                                <Heart size={14} />
                                <span>{post.likes || 0}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <MessageCircle size={14} />
                                <span>{post.comments || 0}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // Post List Item Component
    const PostListItem = ({ post }) => {
        // Generate Cloudinary thumbnail URL for list view
        const getListThumbnailUrl = (originalUrl, postType) => {
            if (!originalUrl || originalUrl.trim() === '') {
                return null; // Return null instead of placeholder
            }
            
            // Check if it's a Cloudinary URL
            if (originalUrl.includes('cloudinary.com')) {
                try {
                    // For videos, generate a thumbnail image from the video
                    if (postType === 'video') {
                        const transformedUrl = originalUrl.replace(
                            '/upload/',
                            '/upload/so_auto,w_100,h_100,c_fill,q_auto,f_jpg/'
                        );
                        return transformedUrl;
                    } else {
                        // For images, add transformation for list thumbnail: 100x100, crop to fill, quality auto
                        const transformedUrl = originalUrl.replace(
                            '/upload/',
                            '/upload/w_100,h_100,c_fill,q_auto,f_auto/'
                        );
                        return transformedUrl;
                    }
                } catch (error) {
                    console.warn('Error transforming Cloudinary URL for list view:', error);
                    return originalUrl;
                }
            }
            
            return originalUrl;
        };

        const listThumbnailUrl = getListThumbnailUrl(post.videoThumbnail || post.imageUrl, post.type);
        
        // Don't render if no valid image URL
        if (!listThumbnailUrl) {
            return null;
        }

        return (
            <div className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className="flex space-x-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img
                            src={listThumbnailUrl}
                            alt={post.title || 'Post image'}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                                console.warn('List image failed to load:', post.imageUrl);
                                // Hide the entire post item if image fails to load
                                e.target.closest('.p-4').style.display = 'none';
                            }}
                            onLoad={() => {
                                console.log('List image loaded successfully:', post.imageUrl);
                            }}
                        />
                        {post.type === 'video' && (
                            <div className="absolute top-1 right-1">
                                <Video size={12} className="text-white drop-shadow-lg" />
                            </div>
                        )}
                        {post.type === 'video' && post.duration && (
                            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded">
                                {post.duration}
                            </div>
                        )}
                        {post.isPinned && (
                            <div className="absolute top-1 left-1">
                                <Pin size={12} className="text-yellow-400 drop-shadow-lg" />
                            </div>
                        )}
                        {/* Video play button overlay for list view */}
                        {post.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{post.title || 'Untitled Post'}</h3>
                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                                <Heart size={14} />
                                <span>{post.likes || 0}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <MessageCircle size={14} />
                                <span>{post.comments || 0}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreHorizontal size={16} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // If still loading authentication state
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    // If user is not authenticated, redirect to login
    if (!currentUser) {
        navigate('/');
        return null;
    }

    // Debug render state
    console.log('🎨 ProfilePage render:', {
        urlParamUserId: userId,
        currentUser: currentUser?.uid,
        targetUserId,
        isOwnProfile,
        isFollowing,
        followersCount,
        profileUser: profileUser?.uid
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <button onClick={() => navigate(-1)} className="p-1 sm:p-2">
                    <ArrowLeft size={20} className="sm:w-6 sm:h-6 text-gray-700" />
                </button>
                <h1 className="font-semibold text-sm sm:text-lg truncate max-w-[150px] sm:max-w-xs">
                    {profileUser?.displayName || profileUser?.name || profile.name}
                </h1>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <Share2 size={18} className="sm:w-6 sm:h-6 text-gray-700" />
                    <MoreHorizontal size={18} className="sm:w-6 sm:h-6 text-gray-700" />
                </div>
            </div>

            <div className="px-3 sm:px-4 lg:px-6 pb-20">
                {/* Profile Info */}
                <div className="flex items-start space-x-3 sm:space-x-4 py-4 sm:py-6">
                    <div className="relative flex-shrink-0">
                        <img
                            src={profileUser?.photoURL || profileUser?.avatar || profile.avatar}
                            alt={profileUser?.displayName || profileUser?.name || profile.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full shadow-lg border-4 border-white"
                        />
                        {profile.verified && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0 pt-8">
                        <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                    {profileUser?.displayName || profileUser?.name || profile.name}
                                </h1>
                                <p className="text-gray-200 text-sm sm:text-base">
                                    {profileUser?.email || profile.username}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                                {/* Debug info - remove this later */}
                                {process.env.NODE_ENV === 'development' && (
                                    <div className="flex items-center space-x-1">
                                        <div className="text-xs bg-yellow-100 p-1 rounded">
                                            {isOwnProfile ? 'Own' : 'Other'} | {isFollowing ? 'Following' : 'Not Following'}
                                        </div>
                                        <button
                                            onClick={fetchProfileUser}
                                            className="text-xs bg-blue-100 p-1 rounded hover:bg-blue-200"
                                            title="Refresh profile data"
                                        >
                                            🔄
                                        </button>
                                        <button
                                            onClick={resetFollowState}
                                            className="text-xs bg-red-100 p-1 rounded hover:bg-red-200"
                                            title="Reset follow state"
                                        >
                                            🔃
                                        </button>
                                    </div>
                                )}
                                
                                {!isOwnProfile && currentUser && (
                                    <button
                                        onClick={handleFollowToggle}
                                        disabled={followLoading}
                                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                                            isFollowing
                                                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                : 'bg-pink-600 text-white hover:bg-pink-700'
                                        } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {followLoading ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        ) : isFollowing ? (
                                            <>
                                                <UserCheck size={16} />
                                                <span>Following</span>
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus size={16} />
                                                <span>Follow</span>
                                            </>
                                        )}
                                    </button>
                                )}
                                <X size={16} className="sm:w-5 sm:h-5 text-pink-600" />
                                <Link2 size={16} className="sm:w-5 sm:h-5 text-pink-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rest of your existing code stays exactly the same... */}
                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 text-center mb-4 sm:mb-6">
                    <div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">{userPosts.length}</div>
                        <div className="text-xs sm:text-sm text-gray-500">Posts</div>
                    </div>
                    <div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                            {userPosts.reduce((total, post) => total + (post.likes || 0), 0)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">Likes</div>
                    </div>
                    <div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">{followersCount}</div>
                        <div className="text-xs sm:text-sm text-gray-500">Followers</div>
                    </div>
                    <div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold">{followingCount}</div>
                        <div className="text-xs sm:text-sm text-gray-500">Following</div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                    {profile.description}
                </p>

                {/* Genre Rankings */}
                <div className="mb-4 sm:mb-6">
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Genre-based ranking (Daily)</p>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:flex lg:space-x-6">
                        {profile.rankings.map((ranking, index) => (
                            <div key={index} className="text-center">
                                <div className="text-xs sm:text-sm font-medium truncate">{ranking.category}</div>
                                <div className="text-sm sm:text-lg font-bold text-red-500">{ranking.position}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscription Plan */}
                <div className="bg-pink-50 border border-pink-300 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex-1">
                            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                                {profile.subscriptionPlan.label}
                            </span>
                            <h3 className="font-bold text-pink-600 text-base sm:text-lg mb-1">
                                {profile.subscriptionPlan.name}
                            </h3>
                            <div className="flex flex-wrap items-baseline gap-1 mb-2">
                                <span className="font-bold text-sm sm:text-lg">{profile.subscriptionPlan.price}</span>
                                <span className="text-xs sm:text-sm text-gray-600">/ {profile.subscriptionPlan.period}</span>
                                <span className="text-xs sm:text-sm text-gray-600">Posts: {profile.subscriptionPlan.posts}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{profile.subscriptionPlan.description}</p>
                        </div>
                        <button className="bg-pink-600 text-white px-4 sm:px-6 py-2 rounded-full font-semibold hover:bg-pink-700 text-sm sm:text-base w-full sm:w-auto">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 sm:space-x-8 mb-4 sm:mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('Post')}
                        className={`pb-2 border-b-2 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === 'Post'
                            ? 'text-pink-600 border-pink-600'
                            : 'text-gray-400 border-transparent'
                            }`}
                    >
                        Post
                    </button>
                    <button
                        onClick={() => setActiveTab('Single post sales')}
                        className={`pb-2 border-b-2 font-semibold whitespace-nowrap text-sm sm:text-base ${activeTab === 'Single post sales'
                            ? 'text-pink-600 border-pink-600'
                            : 'text-gray-400 border-transparent'
                            }`}
                    >
                        Single post sales
                    </button>
                </div>

                {/* Filters and Controls */}
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                            {/* Tags Filter */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center justify-between w-full sm:w-auto space-x-2 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white"
                                >
                                    <span className="truncate">{selectedTags}</span>
                                    <ChevronDown size={14} className="flex-shrink-0" />
                                </button>
                            </div>

                            {/* Content Type Filter */}
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {filterOptions.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setSelectedFilter(filter)}
                                        className={`px-2 sm:px-3 py-1 text-xs rounded border flex items-center space-x-1 ${selectedFilter === filter
                                            ? 'bg-pink-600 text-white border-pink-600'
                                            : 'bg-white text-gray-600 border-gray-300'
                                            }`}
                                    >
                                        {filter === 'Images' && <ImageIcon size={10} className="sm:w-3 sm:h-3" />}
                                        {filter === 'Videos' && <Video size={10} className="sm:w-3 sm:h-3" />}
                                        <span>{filter}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm bg-white w-full sm:w-auto"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center space-x-2 self-end sm:self-auto">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <Grid3X3 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                <List size={14} className="sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Post Count - Only show posts with images */}
                    <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600 overflow-x-auto">
                        <span className="whitespace-nowrap">{userPosts.length} posts with images</span>
                        <span className="flex items-center space-x-1 whitespace-nowrap">
                            <ImageIcon size={12} className="sm:w-4 sm:h-4" />
                            <span>{userPosts.filter(post => post.type === 'image').length}</span>
                        </span>
                        <span className="flex items-center space-x-1 whitespace-nowrap">
                            <Video size={12} className="sm:w-4 sm:h-4" />
                            <span>{userPosts.filter(post => post.type === 'video').length}</span>
                        </span>
                    </div>
                </div>

                {/* Posts Content */}
                {postsLoading ? (
                    <div className="text-center py-8 sm:py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-500 text-sm sm:text-base">Loading posts...</p>
                    </div>
                ) : postsError ? (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-red-400 text-4xl sm:text-6xl mb-4">⚠️</div>
                        <p className="text-red-500 text-sm sm:text-base">{postsError}</p>
                        <button 
                            onClick={fetchUserPosts}
                            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                ) : userPosts.length > 0 ? (
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 sm:gap-2">
                            {userPosts.map((post, index) => (
                                <PostGridItem key={post.id} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                            {userPosts.map((post) => (
                                <PostListItem key={post.id} post={post} />
                            ))}
                        </div>
                    )
                ) : (
                    <div className="text-center py-8 sm:py-12">
                        <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📷</div>
                        <p className="text-gray-500 text-sm sm:text-base">No posts with images yet</p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-2">Create a post with images to see them here</p>
                        <button 
                            onClick={() => navigate('/create-post')}
                            className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            Create Your First Post
                        </button>
                    </div>
                )}
            </div>

            {/* Bottom Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 flex space-x-2 sm:space-x-3">
                <button className="flex-1 bg-pink-600 text-white py-2 sm:py-3 rounded-full font-semibold flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-pink-700 text-xs sm:text-sm">
                    <Heart size={14} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Send a tip</span>
                    <span className="sm:hidden">Tip</span>
                </button>
                
                {/* Follow/Unfollow Button - Only show if not own profile */}
                {!isOwnProfile && currentUser && (
                    <button
                        onClick={handleFollowToggle}
                        disabled={followLoading}
                        className={`flex-1 py-2 sm:py-3 rounded-full font-semibold flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm transition-all duration-200 ${
                            isFollowing
                                ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                : 'border border-pink-600 text-pink-600 hover:bg-pink-50'
                        } ${followLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {followLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        ) : isFollowing ? (
                            <>
                                <UserCheck size={14} className="sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Following</span>
                                <span className="sm:hidden">Following</span>
                            </>
                        ) : (
                            <>
                                <User size={14} className="sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">+ Follow</span>
                                <span className="sm:hidden">Follow</span>
                            </>
                        )}
                    </button>
                )}
                
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 sm:py-3 rounded-full font-semibold flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-gray-50 text-xs sm:text-sm">
                    <MessageCircle size={14} className="sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Messages</span>
                    <span className="sm:hidden">Msg</span>
                </button>
            </div>
        </div>
    );
};

export default EnhancedProfilePage;
