import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowLeft, Grid3x3, Video, Image as ImageIcon, ChevronDown, Heart, Bookmark
} from 'lucide-react';
import BottomNavigation from '../BottomNavigation';
import { t } from 'i18next';

const UserContentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { contentType = 'purchased' } = useParams();

    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('New');
    const [activeTab, setActiveTab] = useState('purchased');

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
                thumbnail: 'https://picsum.photos/300/200?random=1'
            },
            {
                id: 2,
                title: '【人生を狂わせるほどの感度を持った6歳と4歳の2児のママ。浮気バレの家族...',
                author: '雄 -YUU- 彼氏持ち、人妻、ママをNTR',
                likes: '29',
                bookmarks: '8',
                timeAgo: '2 days ago',
                type: 'video',
                thumbnail: 'https://picsum.photos/300/200?random=2'
            },
            {
                id: 3,
                title: '【奇跡の80%OFF】バズり過ぎで消えた超人気作が完全版として降臨! ⚡ こ...',
                author: 'Creator Name',
                likes: '540',
                bookmarks: '490',
                timeAgo: 'a month ago',
                type: 'image',
                thumbnail: 'https://picsum.photos/300/200?random=3'
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
                thumbnail: 'https://picsum.photos/300/200?random=4'
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
                thumbnail: 'https://picsum.photos/300/200?random=5'
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

    // Update when location state changes
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    // Dynamic page title based on activeTab
    const getPageTitle = () => {
        const titles = {
            purchased: 'Purchased posts',
            liked: 'Liked posts',
            saved: 'Saved posts',
            viewingHistory: 'Viewing history'
        };
        return titles[activeTab] || 'Posts';
    };

    // Debug: Log to see what you're receiving
    console.log('Location state:', location.state);
    console.log('Active tab:', activeTab);
    console.log('Button name:', location.state?.buttonName);

    // const getPageTitle = () => {
    //     const titles = {
    //         purchased: 'Purchased posts',
    //         liked: 'Liked posts',
    //         saved: 'Saved posts',
    //         viewingHistory: 'Viewing history'
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
            <p className="text-pink-500 font-semibold">No posts</p>
        </div>
    );

    const PostCard = ({ post }) => (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="relative">
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

                {/* Author */}
                <div className="flex items-center mb-2">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=20&h=20&fit=crop"
                        alt="Author"
                        className="w-5 h-5 rounded-full mr-2"
                    />
                    <span className="text-xs text-gray-600 truncate">{post.author}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                            <Heart size={12} className="text-pink-500" />
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Bookmark size={12} className="text-pink-500" />
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
                                All
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
