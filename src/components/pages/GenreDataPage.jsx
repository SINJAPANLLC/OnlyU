import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Video, Image as ImageIcon, Heart, Bookmark } from 'lucide-react';
import BottomNavigation from '../BottomNavigation';
import { useUserInteractions } from '../../hooks/useUserInteractions';
import { useUserStats } from '../../context/UserStatsContext';

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
    const { likedPosts, savedPosts, toggleLike, toggleSave, isLiked, isSaved, loading, error } = useUserInteractions();
    const { updateLikedCount, updateSavedCount } = useUserStats();

    const [activeGenre, setActiveGenre] = useState(genreName ? decodeURIComponent(genreName) : '運営Pik UP');
    const [localLikedPosts, setLocalLikedPosts] = useState(new Set());
    const [localSavedPosts, setLocalSavedPosts] = useState(new Set());
    
    // ジャンル名を取得する関数
    const getGenreDisplayName = () => {
        if (activeGenre && activeGenre !== 'undefined') {
            return activeGenre;
        }
        // genreDataから最初のジャンル名を取得
        return genreData[0]?.name || 'ジャンル';
    };

    // クリック機能
    const handleVideoClick = (post) => {
        navigate(`/video/${post.id}`);
    };

    const handleAccountClick = (post) => {
        navigate(`/profile/${post.user.id}`);
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
            author: 'クリエイター名',
            likes: 125,
            bookmarks: 101,
            timeAgo: '1 day ago',
            type: 'video',
            user: {
                id: 'creator_1',
                name: 'クリエイター名',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            }
        },
        {
            id: 2,
            title: 'かほちゃん、🐻が見える動画です☆ えろうな体操服を見つけたのでお着...',
            author: '別のクリエイター',
            likes: 141,
            bookmarks: 54,
            timeAgo: '1 day ago',
            type: 'image',
            user: {
                id: 'creator_2',
                name: '別のクリエイター',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face'
            }
        },
        {
            id: 3,
            title: 'サンプル動画投稿 3',
            author: 'クリエイター 3',
            likes: 89,
            bookmarks: 67,
            timeAgo: '2 days ago',
            type: 'video',
            user: {
                id: 'creator_3',
                name: 'クリエイター 3',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
            }
        },
        {
            id: 4,
            title: 'サンプル画像投稿 4',
            author: 'クリエイター 4',
            likes: 203,
            bookmarks: 156,
            timeAgo: '3 days ago',
            type: 'image',
            user: {
                id: 'creator_4',
                name: 'クリエイター 4',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
            }
        }
    ];

    // 投稿を人気順でソート
    const sortedPosts = [...posts].sort((a, b) => (b.likes + b.bookmarks) - (a.likes + a.bookmarks));

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
                            <input
                                type="text"
                                placeholder="検索キーワードを入力してください"
                                className="bg-transparent flex-1 text-sm text-gray-500 outline-none"
                            />
                        </div>
                    </div>
                </div>


                {/* Content Section */}
                <div className="bg-white px-4 py-4">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">
                        {getGenreDisplayName()}
                    </h2>


                    {/* Posts Grid */}
                    {sortedPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-4xl mb-4">📷</div>
                            <p className="text-gray-500">このジャンルにはまだ投稿がありません</p>
                        </div>
                           ) : (
                               <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                   {sortedPosts.map((post) => (
                                   <div 
                                       key={post.id} 
                                       className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                                   >
                                       {/* Thumbnail - クリックで動画ページへ */}
                                       <div 
                                           className="relative cursor-pointer"
                                           onClick={() => handleVideoClick(post)}
                                       >
                                           <div className={`w-full h-40 flex items-center justify-center ${
                                               post.type === 'video' ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-gradient-to-br from-blue-400 to-indigo-400'
                                           }`}>
                                               <div className="text-white text-center">
                                                   {post.type === 'video' ? (
                                                       <>
                                                           <Video size={24} className="mx-auto mb-1" />
                                                           <div className="text-xs">動画</div>
                                                       </>
                                                   ) : (
                                                       <>
                                                           <ImageIcon size={24} className="mx-auto mb-1" />
                                                           <div className="text-xs">画像</div>
                                                       </>
                                                   )}
                                               </div>
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

                                           {/* Author - クリックでプロフィールページへ */}
                                           <div 
                                               className="flex items-center mb-2 cursor-pointer"
                                               onClick={() => handleAccountClick(post)}
                                           >
                                               <img
                                                   src={post.user.avatar}
                                                   alt="Author"
                                                   className="w-4 h-4 rounded-full mr-2"
                                               />
                                               <span className="text-xs text-gray-600 truncate">{post.author}</span>
                                           </div>

                                           {/* Stats */}
                                           <div className="flex items-center justify-between text-xs text-gray-500">
                                               <div className="flex items-center space-x-2">
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
                                           </div>
                                       </div>
                                   </div>
                               ))}
                               </div>
                           )}
                </div>
            </div>

            <BottomNavigation activeTab="Ranking" handleNavigation={handleNavigation} />
        </>
    );
};

export default GenrePage;
