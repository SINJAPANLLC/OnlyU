import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../../firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy, getDoc } from "firebase/firestore";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Download,
  Upload,
  Clock,
  Users,
  Heart,
  MessageCircle,
  Settings,
  RefreshCw,
  Plus,
  Minus,
  AlertTriangle,
  Shield,
  Ban,
  UserCheck,
  Star,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [showPostDetail, setShowPostDetail] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportFormat, setExportFormat] = useState('csv');
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        draft: 0,
        reported: 0,
        deleted: 0
    });
    const { t } = useTranslation();

    // フィルターオプション
    const statusOptions = [
        { value: 'all', label: 'すべて' },
        { value: 'published', label: '公開済み' },
        { value: 'draft', label: '下書き' },
        { value: 'reported', label: '通報済み' },
        { value: 'deleted', label: '削除済み' }
    ];

    const typeOptions = [
        { value: 'all', label: 'すべて' },
        { value: 'image', label: '画像' },
        { value: 'video', label: '動画' },
        { value: 'text', label: 'テキスト' }
    ];

    // 検索・フィルター処理
    useEffect(() => {
        let filtered = posts;

        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.userName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterStatus !== 'all') {
            filtered = filtered.filter(post => post.status === filterStatus);
        }

        if (filterType !== 'all') {
            filtered = filtered.filter(post => post.type === filterType);
        }

        setFilteredPosts(filtered);
    }, [posts, searchTerm, filterStatus, filterType]);

    // 投稿の選択
    const togglePostSelection = (postId) => {
        setSelectedPosts(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const selectAll = () => {
        setSelectedPosts(filteredPosts.map(post => post.id));
    };

    const deselectAll = () => {
        setSelectedPosts([]);
    };

    // バルクアクション
    const handleBulkAction = async (action) => {
        if (selectedPosts.length === 0) {
            alert('投稿を選択してください');
            return;
        }

        try {
            switch (action) {
                case 'publish':
                    if (window.confirm(`${selectedPosts.length}件の投稿を公開しますか？`)) {
                        for (const postId of selectedPosts) {
                            await updateDoc(doc(db, 'posts', postId), {
                                status: 'published',
                                updatedAt: new Date()
                            });
                        }
                        await fetchPosts();
                        setSelectedPosts([]);
                    }
                    break;
                case 'unpublish':
                    if (window.confirm(`${selectedPosts.length}件の投稿を非公開にしますか？`)) {
                        for (const postId of selectedPosts) {
                            await updateDoc(doc(db, 'posts', postId), {
                                status: 'draft',
                                updatedAt: new Date()
                            });
                        }
                        await fetchPosts();
                        setSelectedPosts([]);
                    }
                    break;
                case 'delete':
                    if (window.confirm(`${selectedPosts.length}件の投稿を削除しますか？この操作は取り消せません。`)) {
                        for (const postId of selectedPosts) {
                            await deleteDoc(doc(db, 'posts', postId));
                        }
                        await fetchPosts();
                        setSelectedPosts([]);
                    }
                    break;
                case 'markReported':
                    if (window.confirm(`${selectedPosts.length}件の投稿を通報済みにマークしますか？`)) {
                        for (const postId of selectedPosts) {
                            await updateDoc(doc(db, 'posts', postId), {
                                status: 'reported',
                                updatedAt: new Date()
                            });
                        }
                        await fetchPosts();
                        setSelectedPosts([]);
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error performing bulk action:', error);
            alert('操作中にエラーが発生しました');
        }
    };

    // エクスポート機能
    const handleExport = () => {
        const dataToExport = filteredPosts.map(post => ({
            ID: post.id,
            タイトル: post.title || 'タイトルなし',
            作成者: post.userName || '不明',
            ステータス: post.status,
            タイプ: post.type,
            作成日: post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : '',
            いいね数: post.likes || 0,
            コメント数: post.comments || 0,
            閲覧数: post.views || 0
        }));

        if (exportFormat === 'csv') {
            const csvContent = convertToCSV(dataToExport);
            downloadCSV(csvContent, 'posts.csv');
        }
        setShowExportModal(false);
    };

    const convertToCSV = (data) => {
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ];
        return csvRows.join('\n');
    };

    const downloadCSV = (content, filename) => {
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // ステータスの色を取得
    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'text-green-600 bg-green-100';
            case 'draft': return 'text-yellow-600 bg-yellow-100';
            case 'reported': return 'text-red-600 bg-red-100';
            case 'deleted': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    // タイプの色を取得
    const getTypeColor = (type) => {
        switch (type) {
            case 'image': return 'text-blue-600 bg-blue-100';
            case 'video': return 'text-purple-600 bg-purple-100';
            case 'text': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

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
            setFilteredPosts(postsData);
            
            // 統計を計算
            setStats({
                total: postsData.length,
                published: postsData.filter(p => p.status === 'published').length,
                draft: postsData.filter(p => p.status === 'draft').length,
                reported: postsData.filter(p => p.status === 'reported').length,
                deleted: postsData.filter(p => p.status === 'deleted').length
            });
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
        <div className="space-y-6">
            {/* ヘッダー */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">投稿管理</h1>
                    <p className="text-gray-600">投稿の管理、公開/非公開、削除を行います</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={fetchPosts}
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>{loading ? '読み込み中...' : '更新'}</span>
                    </button>
                    <button 
                        onClick={() => setShowExportModal(true)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>エクスポート</span>
                    </button>
                </div>
            </div>

            {/* 統計カード */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">総投稿数</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">公開済み</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <Clock className="w-8 h-8 text-yellow-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">下書き</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">通報済み</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.reported}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <Trash2 className="w-8 h-8 text-gray-500" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">削除済み</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.deleted}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* フィルターと検索 */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* 検索 */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="投稿を検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* ステータスフィルター */}
                    <div className="md:w-48">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                            {statusOptions.map(status => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* タイプフィルター */}
                    <div className="md:w-48">
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                            {typeOptions.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* 投稿一覧 */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">投稿一覧</h2>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={selectAll}
                                className="text-sm text-pink-600 hover:text-pink-700"
                            >
                                全選択
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={deselectAll}
                                className="text-sm text-gray-600 hover:text-gray-700"
                            >
                                選択解除
                            </button>
                            {selectedPosts.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300">|</span>
                                    <select
                                        onChange={(e) => handleBulkAction(e.target.value)}
                                        className="text-sm border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="">一括操作</option>
                                        <option value="publish">公開</option>
                                        <option value="unpublish">非公開</option>
                                        <option value="markReported">通報済みマーク</option>
                                        <option value="delete">削除</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                                        onChange={selectedPosts.length === filteredPosts.length ? deselectAll : selectAll}
                                        className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                    />
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    投稿
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    作成者
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ステータス
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    タイプ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    作成日
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    いいね
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    コメント
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    アクション
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            checked={selectedPosts.includes(post.id)}
                                            onChange={() => togglePostSelection(post.id)}
                                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                {post.thumbnailUrl ? (
                                                    <img className="h-12 w-12 rounded-lg object-cover" src={getThumbnailUrl(post.thumbnailUrl)} alt="Post thumbnail" />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                        <span className="text-gray-400 text-sm">
                                                            {post.hasImages ? '🖼️' : post.hasVideos ? '🎥' : '📝'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                                                    {post.title || 'タイトルなし'}
                                                </div>
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {post.content || '内容なし'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {post.userName || '不明'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(post.type)}`}>
                                            {post.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {post.createdAt ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : '不明'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {post.likes || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {post.comments || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setShowPostDetail(post)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleToggleVisibility(post.id, post.status)}
                                                className={`${
                                                    post.status === 'published'
                                                        ? 'text-yellow-600 hover:text-yellow-800'
                                                        : 'text-green-600 hover:text-green-800'
                                                }`}
                                            >
                                                {post.status === 'published' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* エクスポートモーダル */}
            {showExportModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">データエクスポート</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        エクスポート形式
                                    </label>
                                    <select
                                        value={exportFormat}
                                        onChange={(e) => setExportFormat(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                    >
                                        <option value="csv">CSV</option>
                                        <option value="excel">Excel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    onClick={() => setShowExportModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700"
                                >
                                    エクスポート
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
