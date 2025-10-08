import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, Grid3x3, Video, Image as ImageIcon, ChevronDown, Heart, Bookmark
} from 'lucide-react';
import BottomNavigation from '../BottomNavigation';
import { t } from 'i18next';
import { useUserInteractions } from '../../hooks/useUserInteractions';
import { useUserStats } from '../../context/UserStatsContext';

const UserContentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { likedPosts, savedPosts, toggleLike, toggleSave, isLiked, isSaved } = useUserInteractions();
    const { stats, updateLikedCount, updateSavedCount } = useUserStats();
    // const { contentType = 'purchased' } = useParams();

    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('New');
    const [activeTab, setActiveTab] = useState('purchased');
    const [localLikedPosts, setLocalLikedPosts] = useState(new Set());
    const [localSavedPosts, setLocalSavedPosts] = useState(new Set());

    // const [dropdownFilter, setDropdownFilter] = useState('All');

    // THEN use useEffect to update based on location
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);
    // Sample data for different content types
    const contentData = {
        purchased: [], // Empty as shown in your first image
        liked: [
            {
                id: 1,
                title: '【社会人彼氏持ち専門学生ちゃんどぉしがま潮吹きえっち（前編）】（1時...',
                author: '雄 -YUU- 彼氏持ち、人妻、ママをNTR',
                likes: '1.4K',
                bookmarks: '1.3K',
                timeAgo: '1 year ago',
                type: 'video',
                thumbnail: 'https://picsum.photos/300/200?random=1',
                userId: 'creator_1',
                user: {
                    id: 'creator_1',
                    name: '雄 -YUU- 彼氏持ち、人妻、ママをNTR',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                }
            },
            {
                id: 2,
                title: '【人生を狂わせるほどの感度を持った6歳と4歳の2児のママ。浮気バレの家族...',
                author: '雄 -YUU- 彼氏持ち、人妻、ママをNTR',
                likes: '29',
                bookmarks: '8',
                timeAgo: '2 days ago',
                type: 'video',
                thumbnail: 'https://picsum.photos/300/200?random=2',
                userId: 'creator_1',
                user: {
                    id: 'creator_1',
                    name: '雄 -YUU- 彼氏持ち、人妻、ママをNTR',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
                }
            },
            {
                id: 3,
                title: '【奇跡の80%OFF】バズり過ぎで消えた超人気作が完全版として降臨! ⚡ こ...',
                author: 'Creator Name',
                likes: '540',
                bookmarks: '490',
                timeAgo: 'a month ago',
                type: 'image',
                thumbnail: 'https://picsum.photos/300/200?random=3',
                userId: 'creator_2',
                user: {
                    id: 'creator_2',
                    name: 'Creator Name',
                    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face'
                }
            }
        ],
        saved: [
            {
                id: 4,
                title: 'Saved content example',
                author: 'Another Creator',
                likes: '150',
                bookmarks: '80',
                timeAgo: '3 days ago',
                type: 'video',
                thumbnail: 'https://picsum.photos/300/200?random=4',
                userId: 'creator_3',
                user: {
                    id: 'creator_3',
                    name: 'Another Creator',
                    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
                }
            }
        ],
        viewingHistory: [
            {
                id: 5,
                title: 'Recently viewed content',
                author: 'Popular Creator',
                likes: '200',
                bookmarks: '100',
                timeAgo: 'Today',
                type: 'image',
                thumbnail: 'https://picsum.photos/300/200?random=5',
                userId: 'creator_4',
                user: {
                    id: 'creator_4',
                    name: 'Popular Creator',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
                }
            }
        ]
    };

    const currentData = contentData[activeTab] || [];

    const handleNavigation = (path) => {
        if (path === 'home') navigate('/');
        else if (path === 'feed') navigate('/feed');
        else if (path === 'messages') navigate('/messages');
        else if (path === 'ranking') navigate('/rankingpage');
        else if (path === 'account') navigate('/account');
        else navigate('/');
    };

    // クリック機能
    const handleVideoClick = (post) => {
        navigate(`/video/${post.id}`);
    };

    const handleAccountClick = (post) => {
        navigate(`/profile/${post.userId || post.id}`);
    };

    const handleLikeClick = (postId, e) => {
        e.stopPropagation();
        console.log('Like clicked for post:', postId);
        const wasLiked = localLikedPosts.has(postId);
        
        setLocalLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
                console.log('Removed like from local state');
                updateLikedCount(-1); // 統計を減らす
            } else {
                newSet.add(postId);
                console.log('Added like to local state');
                updateLikedCount(1); // 統計を増やす
            }
            return newSet;
        });
        
        // 非同期でFirebaseにも保存
        toggleLike(postId).catch(error => {
            console.error('Error toggling like:', error);
            // エラーの場合は統計を元に戻す
            updateLikedCount(wasLiked ? 1 : -1);
        });
    };

    const handleSaveClick = (postId, e) => {
        e.stopPropagation();
        console.log('Save clicked for post:', postId);
        const wasSaved = localSavedPosts.has(postId);
        
        setLocalSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
                console.log('Removed save from local state');
                updateSavedCount(-1); // 統計を減らす
            } else {
                newSet.add(postId);
                console.log('Added save to local state');
                updateSavedCount(1); // 統計を増やす
            }
            return newSet;
        });
        
        // 非同期でFirebaseにも保存
        toggleSave(postId).catch(error => {
            console.error('Error toggling save:', error);
            // エラーの場合は統計を元に戻す
            updateSavedCount(wasSaved ? 1 : -1);
        });
    };

    // Update when location state changes
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    // Dynamic page title based on activeTab
    const getPageTitle = () => {
        const titles = {
            purchased: t('postLibrary.purchased'),
            liked: t('postLibrary.liked'),
            saved: t('postLibrary.saved'),
            viewingHistory: t('postLibrary.viewingHistory')
        };
        return titles[activeTab] || 'Posts';
    };

    // Debug: Log to see what you're receiving
    console.log('Location state:', location.state);
    console.log('Active tab:', activeTab);
    console.log('Button name:', location.state?.buttonName);

    // const getPageTitle = () => {
    //     const titles = {
    //         purchased: t('postLibrary.purchased'),
    //         liked: t('postLibrary.liked'),
    //         saved: t('postLibrary.saved'),
    //         viewingHistory: t('postLibrary.viewingHistory')
    //     };
    //     console.log('Active Tab:', activeTab);
    //     return titles[activeTab] || 'Posts';
    // };

    // const getSortLabel = () => {
    //     return activeTab === 'viewingHistory' ? 'Viewing date' : 'New';
    // };

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-2 border-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Grid3x3 size={24} className="text-pink-500" />
            </div>
            <p className="text-pink-500 font-semibold">コンテンツがありません</p>
        </div>
    );

    const PostCard = ({ post }) => (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail - クリックで動画ページへ */}
            <div 
                className="relative cursor-pointer"
                onClick={() => handleVideoClick(post)}
            >
                <div className="w-full h-40 bg-yellow-400 flex items-center justify-center">
                    {/* Yellow placeholder as shown in your images */}
                    <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-1 py-0.5 rounded">
                        {post.type === 'video' ? '4:32' : 'IMG'}
                    </div>
                    {post.type === 'video' && (
                        <div className="absolute top-2 left-2">
                            <Video size={16} className="text-white" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-medium mb-2 line-clamp-2">
                    {post.title}
                </h3>

                {/* Author - クリックでプロフィールページへ */}
                <div 
                    className="flex items-center mb-2 cursor-pointer"
                    onClick={() => handleAccountClick(post)}
                >
                    <img
                        src={post.user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=20&h=20&fit=crop"}
                        alt="Author"
                        className="w-5 h-5 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-600 truncate">{post.author}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                        <div 
                            className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded"
                            onClick={(e) => handleLikeClick(post.id, e)}
                        >
                            <Heart 
                                size={12} 
                                className={`${localLikedPosts.has(post.id) ? 'text-red-500 fill-current' : 'text-pink-500'}`} 
                            />
                            <span>{post.likes}</span>
                        </div>
                        <div 
                            className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 p-1 rounded"
                            onClick={(e) => handleSaveClick(post.id, e)}
                        >
                            <Bookmark 
                                size={12} 
                                className={`${localSavedPosts.has(post.id) ? 'text-blue-500 fill-current' : 'text-pink-500'}`} 
                            />
                            <span>{post.bookmarks}</span>
                        </div>
                    </div>
                    <span>{post.timeAgo}</span>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <button onClick={() => navigate(-1)} className="p-2">
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <h1 className="text-base font-semibold">{getPageTitle()}</h1>
                    <div className="w-8"></div>
                </div>

                {/* Stats Cards */}
                <div className="bg-white px-4 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-4 gap-3">
                        {/* 購入済み */}
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Video size={20} className="text-gray-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-600">購入済み</div>
                            <div className="text-lg font-bold text-gray-800">{stats.purchased}</div>
                        </div>
                        
                        {/* 保存済み */}
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Bookmark size={20} className="text-gray-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-600">保存済み</div>
                            <div className="text-lg font-bold text-gray-800">{stats.saved}</div>
                        </div>
                        
                        {/* いいね */}
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Heart size={20} className="text-gray-600" />
                            </div>
                            <div className="text-sm font-medium text-gray-600">いいね</div>
                            <div className="text-lg font-bold text-gray-800">{stats.liked}</div>
                        </div>
                        
                        {/* 視聴履歴 */}
                        <div className="text-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <div className="w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-600">視聴履歴</div>
                            <div className="text-lg font-bold text-gray-800">{stats.viewingHistory}</div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white px-4 py-3 border-b border-gray-200">
                    <div className="flex space-x-2 overflow-x-auto">
                        {[
                            { key: 'purchased', label: t('postLibrary.all') },
                            { key: 'liked', label: t('postLibrary.liked') },
                            { key: 'saved', label: t('postLibrary.saved') },
                            { key: 'viewingHistory', label: t('postLibrary.viewingHistory') }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key
                                    ? 'bg-pink-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-3 py-1 rounded border text-sm ${filter === 'all'
                                    ? 'border-pink-600 text-pink-600 bg-pink-50'
                                    : 'border-gray-300 text-gray-600'
                                    }`}
                            >
                                すべて
                            </button>
                            <button
                                onClick={() => setFilter('video')}
                                className={`p-2 rounded border ${filter === 'video'
                                    ? 'border-pink-600 text-pink-600 bg-pink-50'
                                    : 'border-gray-300 text-gray-600'
                                    }`}
                            >
                                <Video size={16} />
                            </button>
                            <button
                                onClick={() => setFilter('image')}
                                className={`p-2 rounded border ${filter === 'image'
                                    ? 'border-pink-600 text-pink-600 bg-pink-50'
                                    : 'border-gray-300 text-gray-600'
                                    }`}
                            >
                                <ImageIcon size={16} />
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                            >
                                <option value="New">{t('postLibrary.new')}</option>
                                <option value="Viewing date">{t('postLibrary.viewingdate')}</option>
                                <option value="Most liked">{t('postLibrary.mostLiked')}</option>
                            </select>

                            <button className="p-2 border border-gray-300 rounded">
                                <ChevronDown size={16} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Date Section (for viewing history) */}
                {activeTab === 'viewingHistory' && currentData.length > 0 && (
                    <div className="bg-white px-4 py-3 border-b border-gray-200">
                        <h2 className="font-semibold text-gray-900">{t('postLibrary.today')}</h2>
                    </div>
                )}

                {/* Content */}
                <div className="p-4">
                    {currentData.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {currentData.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <BottomNavigation activeTab="Account" handleNavigation={handleNavigation} />
        </>
    );
};

export default UserContentPage;
