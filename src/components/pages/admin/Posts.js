import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, getDoc } from "firebase/firestore";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    // Fetch all posts from Firebase
    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching posts from Firebase...');
            
            // Create query to get all posts, ordered by creation date (newest first)
            const postsQuery = query(
                collection(db, 'posts'),
                orderBy('createdAt', 'desc')
            );
            
            const postsSnapshot = await getDocs(postsQuery);
            const postsData = [];
            
            // Process each post
            for (const postDoc of postsSnapshot.docs) {
                const postData = postDoc.data();
                
                // Get user information for each post
                let userName = 'Unknown User';
                let userEmail = '';
                if (postData.userId) {
                    try {
                        const userDoc = await getDoc(doc(db, 'users', postData.userId));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            userName = userData.displayName || userData.name || 'Unknown User';
                            userEmail = userData.email || '';
                        }
                    } catch (userError) {
                        console.warn('Could not fetch user data for post:', postDoc.id);
                    }
                }
                
                // Process post data
                const processedPost = {
                    id: postDoc.id,
                    title: postData.explanation || postData.title || 'Untitled Post',
                    userId: postData.userId || 'Unknown',
                    userName: userName,
                    userEmail: userEmail,
                    status: postData.isPublic !== false ? 'Public' : 'Private',
                    isPublic: postData.isPublic !== false,
                    createdAt: postData.createdAt || null,
                    likes: postData.likes || 0,
                    comments: postData.comments || 0,
                    genre: postData.genre || [],
                    tags: postData.tags || [],
                    files: postData.files || [],
                    filesCount: postData.files ? postData.files.length : 0,
                    hasImages: postData.files ? postData.files.some(f => f.type && f.type.startsWith('image/')) : false,
                    hasVideos: postData.files ? postData.files.some(f => f.type && f.type.startsWith('video/')) : false,
                    // Get first image for thumbnail
                    thumbnailUrl: postData.files && postData.files.length > 0 ? 
                        (postData.files[0].url || postData.files[0].secure_url || null) : null
                };
                
                postsData.push(processedPost);
            }
            
            console.log(`Found ${postsData.length} posts:`, postsData);
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError(`Failed to load posts: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Toggle post visibility (public/private)
    const handleToggleVisibility = async (postId, currentStatus) => {
        try {
            const postRef = doc(db, 'posts', postId);
            const newStatus = !currentStatus;
            
            await updateDoc(postRef, {
                isPublic: newStatus,
                lastModified: new Date().toISOString()
            });
            
            // Update local state
            setPosts(posts.map(post => 
                post.id === postId 
                    ? { ...post, isPublic: newStatus, status: newStatus ? 'Public' : 'Private' }
                    : post
            ));
            
            console.log(`Post ${postId} ${newStatus ? 'made public' : 'made private'} successfully`);
        } catch (error) {
            console.error('Error updating post visibility:', error);
            alert('Failed to update post visibility. Please try again.');
        }
    };

    // Delete post
    const handleDeletePost = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return;
        }

        try {
            await deleteDoc(doc(db, 'posts', postId));
            
            // Update local state
            setPosts(posts.filter(post => post.id !== postId));
            
            console.log(`Post ${postId} deleted successfully`);
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. Please try again.');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = dateString.seconds ? new Date(dateString.seconds * 1000) : new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    // Generate thumbnail URL for Cloudinary images
    const getThumbnailUrl = (originalUrl) => {
        if (!originalUrl) return null;
        if (originalUrl.includes('cloudinary.com')) {
            try {
                return originalUrl.replace('/upload/', '/upload/w_80,h_80,c_fill,q_auto,f_auto/');
            } catch (error) {
                return originalUrl;
            }
        }
        return originalUrl;
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('AdminPage.postsPage.postMng')}</h2>
                <div className="flex items-center justify-between">
                    <p className="text-gray-600">Total Posts: {posts.length}</p>
                    <button
                        onClick={fetchPosts}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading posts...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <div className="text-red-400 text-xl mr-3">⚠️</div>
                        <div>
                            <h3 className="text-red-800 font-medium">Error Loading Posts</h3>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchPosts}
                        className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Try Again
                    </button>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-4xl mb-4">📝</div>
                    <p className="text-gray-600">コンテンツがありません</p>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Preview
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('AdminPage.postsPage.stitle')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Content
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('AdminPage.status')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Engagement
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('AdminPage.action')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {posts.map((post, index) => (
                                    <tr key={post.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                                {post.thumbnailUrl ? (
                                                    <img
                                                        src={getThumbnailUrl(post.thumbnailUrl)}
                                                        alt="Post thumbnail"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-xs text-center">
                                                        {post.hasImages ? '🖼️' : post.hasVideos ? '🎥' : '📝'}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                {post.title}
                                            </div>
                                            <div className="text-sm text-gray-500">ID: {post.id.slice(0, 8)}...</div>
                                            {post.genre.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {post.genre.slice(0, 2).map((g, i) => (
                                                        <span key={i} className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                                            {g}
                                                        </span>
                                                    ))}
                                                    {post.genre.length > 2 && (
                                                        <span className="text-xs text-gray-500">+{post.genre.length - 2}</span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{post.userName}</div>
                                            <div className="text-sm text-gray-500">{post.userEmail}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                                    {post.filesCount} files
                                                </span>
                                                {post.hasImages && (
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                        Images
                                                    </span>
                                                )}
                                                {post.hasVideos && (
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        Videos
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                post.status === 'Public'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                    ❤️ {post.likes}
                                                </span>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    💬 {post.comments}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(post.createdAt)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex flex-col space-y-2">
                                                <button
                                                    onClick={() => handleToggleVisibility(post.id, post.isPublic)}
                                                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                                        post.isPublic
                                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    }`}
                                                >
                                                    {post.isPublic ? 'Make Private' : 'Make Public'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
