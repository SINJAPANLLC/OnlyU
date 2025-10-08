import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Hash, Triangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const dummyData = {
    freeWords: [
        { id: 1, label: '"k"' }
    ],
    genres: [
        { id: 1, label: 'ギャル' },
        { id: 2, label: 'オナニー' },
        { id: 3, label: '潮吹き' },
        { id: 4, label: '熟女' },
    ],
    tags: [
        { id: 1, label: '美女' },
        { id: 2, label: 'かわいい' },
        { id: 3, label: 'オナニー' },
        { id: 4, label: 'ギャル' },
    ],
    creators: [
        { id: 1, name: '💎👑裏垢日本👑💎', followers: '381,306', posts: '2,624', avatar: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop' },
        { id: 2, name: '莉奈', followers: '280,559', posts: '171', avatar: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=80&h=80&fit=crop' },
        { id: 3, name: 'えむ。', followers: '不明', posts: 'N/A', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=80&h=80&fit=crop' },
    ]
};

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // ジャンルをクリックした時の処理
    const handleGenreClick = (genreName) => {
        navigate(`/genre/${encodeURIComponent(genreName)}`);
    };

    // タグをクリックした時の処理
    const handleTagClick = (tagName) => {
        navigate(`/genre/${encodeURIComponent(tagName)}`);
    };

    // クリエイターをクリックした時の処理
    const handleCreatorClick = (creatorId) => {
        navigate(`/profile/${creatorId}`);
    };

    // フリーワード検索を実行
    const handleFreeWordSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/feed?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    // キーボードでエンターキーが押された時の処理
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleFreeWordSearch();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white flex flex-col"
        >
            {/* Header with back and search input */}
            <div className="flex items-center p-3 border-b border-gray-200">
                <button onClick={() => navigate(-1)} className="text-pink-600 mr-2">
                    <ArrowLeft size={24} />
                </button>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="検索キーワードを入力してください"
                    className="flex-grow border border-pink-600 rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="ml-2 text-gray-400 hover:text-pink-600">
                        ✕
                    </button>
                )}
            </div>

            {/* Search results sections */}
            <div className="flex-grow p-4 overflow-auto">

                {/* Free word search */}
                {searchTerm && (
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">フリーワード検索</h3>
                        <div 
                            className="flex items-center space-x-2 text-pink-600 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                            onClick={handleFreeWordSearch}
                        >
                            <Triangle className="w-5 h-5" />
                            <span className="italic">{`"${searchTerm}"`}</span>
                        </div>
                    </div>
                )}

                {/* Genre */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">ジャンル</h3>
                    {dummyData.genres.map((genre) => (
                        <div 
                            key={genre.id} 
                            className="flex items-center space-x-3 mb-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                            onClick={() => handleGenreClick(genre.label)}
                        >
                            <Triangle className="w-6 h-6 text-pink-300 bg-pink-100 rounded-full p-1" />
                            <span>{genre.label}</span>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">タグ</h3>
                    {dummyData.tags.map((tag) => (
                        <div 
                            key={tag.id} 
                            className="flex items-center space-x-3 mb-3 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                            onClick={() => handleTagClick(tag.label)}
                        >
                            <Hash className="w-6 h-6 text-pink-300 bg-pink-100 rounded-full p-1" />
                            <span>{tag.label}</span>
                        </div>
                    ))}
                </div>

                {/* Creator */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">クリエイター</h3>
                    {dummyData.creators.map((creator) => (
                        <div 
                            key={creator.id} 
                            className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                            onClick={() => handleCreatorClick(creator.id)}
                        >
                            <img
                                src={creator.avatar}
                                alt={creator.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="flex items-center space-x-1">
                                    <span className="text-pink-600 text-lg font-semibold truncate max-w-xs">
                                        {creator.name}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-xs">
                                    {creator.followers} フォロワー &nbsp;|&nbsp; {creator.posts} 投稿
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <BottomNavigation />
        </motion.div>
    );
};

export default SearchPage;
