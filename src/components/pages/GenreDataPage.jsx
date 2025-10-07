import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Video, Image as ImageIcon, Heart, Bookmark, ChevronRight, ArrowUpDown } from 'lucide-react';
import BottomNavigation from '../BottomNavigation';

export const genreData = [
    { name: '運営Pik UP', count: '410,177 posts', color: 'from-pink-500 to-purple-600' },
    { name: 'ハメ撮り', count: '147,577 posts', color: 'from-purple-500 to-indigo-600' },
    { name: 'オナニー', count: '104,474 posts', color: 'from-red-500 to-pink-600' },
    { name: 'フェラチオ', count: '96,852 posts', color: 'from-orange-500 to-red-600' },
    { name: '複数プレイ', count: '83,925 posts', color: 'from-green-500 to-teal-600' },
    { name: '人妻', count: '72,199 posts', color: 'from-blue-500 to-purple-600' },
    { name: '潮吹き', count: '65,989 posts', color: 'from-pink-500 to-red-600' },
    { name: 'アブノーマル', count: '60,114 posts', color: 'from-purple-500 to-pink-600' }
];

const GenrePage = () => {
    const { genreName } = useParams();
    const navigate = useNavigate();

    const [activeGenre, setActiveGenre] = useState(genreName || '運営Pik UP');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('Sort by popularity');

    useEffect(() => {
        if (genreName) {
            setActiveGenre(decodeURIComponent(genreName));
        }
    }, [genreName]);

    const handleNavigation = (path) => {
        if (path === 'home') navigate('/');
        else if (path === 'feed') navigate('/feed');
        else if (path === 'messages') navigate('/messages');
        else if (path === 'ranking') navigate('/rankingpage');
        else if (path === 'account') navigate('/account');
        else navigate('/');
    };

    // Sample posts data - replace with your actual data
    const posts = [
        {
            id: 1,
            title: '🎁天公開映像プレゼント企画開催中🎁※3日間限定【本編無料】テンパで...',
            author: 'Creator Name',
            likes: 125,
            bookmarks: 101,
            timeAgo: '1 day ago',
            type: 'video'
        },
        {
            id: 2,
            title: 'かほちゃん、🐻が見える動画です☆ えろうな体操服を見つけたのでお着...',
            author: 'Another Creator',
            likes: 141,
            bookmarks: 54,
            timeAgo: '1 day ago',
            type: 'image'
        },
        {
            id: 3,
            title: 'Sample video post 3',
            author: 'Creator 3',
            likes: 89,
            bookmarks: 67,
            timeAgo: '2 days ago',
            type: 'video'
        },
        {
            id: 4,
            title: 'Sample image post 4',
            author: 'Creator 4',
            likes: 203,
            bookmarks: 156,
            timeAgo: '3 days ago',
            type: 'image'
        }
    ];

    const filteredPosts = posts.filter(post =>
        filterType === 'all' || post.type === filterType
    );

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-10">
                    <button onClick={() => navigate(-1)} className="p-1">
                        <ArrowLeft size={20} className="text-gray-700" />
                    </button>
                    <div className="flex-1 mx-3">
                        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
                            <Search size={16} className="text-gray-500 mr-2" />
                            <span className="text-pink-600 text-sm font-medium mr-2">🎀 {activeGenre}</span>
                            <input
                                type="text"
                                placeholder="Please enter a search keyword"
                                className="bg-transparent flex-1 text-sm text-gray-500 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* View Rankings Link */}
                <div className="bg-white px-4 py-3 border-b border-gray-200">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => navigate(`/rankings/${activeGenre}`)}
                    >
                        <span className="text-pink-600 text-sm font-medium">🎀 View the rankings of {activeGenre}.</span>
                        <ChevronRight size={16} className="text-pink-600" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white px-4 py-4">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                        Recommended posts in the genre '{activeGenre}'.
                    </h2>

                    {/* Filter Controls */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setFilterType('all')}
                                className={`px-3 py-1 text-sm rounded border ${filterType === 'all'
                                    ? 'bg-pink-600 text-white border-pink-600'
                                    : 'bg-white text-gray-600 border-gray-300'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterType('video')}
                                className={`p-2 rounded border ${filterType === 'video'
                                    ? 'bg-pink-600 text-white border-pink-600'
                                    : 'bg-white text-gray-600 border-gray-300'
                                    }`}
                            >
                                <Video size={16} />
                            </button>
                            <button
                                onClick={() => setFilterType('image')}
                                className={`p-2 rounded border ${filterType === 'image'
                                    ? 'bg-pink-600 text-white border-pink-600'
                                    : 'bg-white text-gray-600 border-gray-300'
                                    }`}
                            >
                                <ImageIcon size={16} />
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded text-sm bg-white"
                            >
                                <option>Sort by popularity</option>
                                <option>Sort by newest</option>
                                <option>Sort by oldest</option>
                                <option>Sort by most liked</option>
                            </select>
                            <ArrowUpDown size={16} className="text-gray-500" />
                        </div>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                                {/* Thumbnail */}
                                <div className="relative">
                                    <div className="w-full h-40 bg-yellow-400 flex items-center justify-center">
                                        {post.type === 'video' && (
                                            <div className="absolute bottom-2 right-2 text-white text-xs bg-black/50 px-1 py-0.5 rounded">
                                                4:32
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-3">
                                    <h3 className="text-sm font-medium mb-2 line-clamp-2 leading-tight">
                                        {post.title}
                                    </h3>

                                    {/* Author */}
                                    <div className="flex items-center mb-2">
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=20&h=20&fit=crop"
                                            alt="Author"
                                            className="w-4 h-4 rounded-full mr-2"
                                        />
                                        <span className="text-xs text-gray-600 truncate">{post.author}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center space-x-1">
                                                <Heart size={12} className="text-pink-500" />
                                                <span>{post.likes}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Bookmark size={12} className="text-pink-500" />
                                                <span>{post.bookmarks}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNavigation activeTab="Ranking" handleNavigation={handleNavigation} />
        </>
    );
};

export default GenrePage;
