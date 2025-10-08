import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Share2, 
    Heart, 
    MessageCircle, 
    Play, 
    Filter, 
    ChevronDown,
    Edit3,
    CheckCircle,
    Star,
    Video,
    Image,
    Eye,
    EyeOff,
    UserPlus,
    UserMinus,
    Copy,
    ExternalLink
} from 'lucide-react';
import BottomNavigationWithCreator from '../BottomNavigationWithCreator';

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');
    const [showRankings, setShowRankings] = useState(true);
    const [showAllPlans, setShowAllPlans] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [isFollowing, setIsFollowing] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showPlanModal, setShowPlanModal] = useState(null);
    const [contentData, setContentData] = useState([]);

    // サンプルプロフィールデータ（画像に合わせて調整）
    const profileData = {
        id: id,
        name: "ミルク",
        emoji: "🍼",
        username: "@milk_av",
        bio: "Twitter: @milk_av\n\n会った女の子たちと\nOOOOOOO\nOOOOOOOOO",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=200&fit=crop",
        isVerified: true,
        stats: {
            posts: 45,
            likes: 112,
            followers: 217,
            following: 117
        },
        genreRankings: [
            { genre: "美乳", rank: 342 },
            { genre: "オナニー", rank: 452 },
            { genre: "素人", rank: 2350 }
        ],
        isFollowing: isFollowing
    };

    // サブスクリプションプラン
    const subscriptionPlans = [
        {
            id: 1,
            title: "ミルク 最新見放題ぶらん...",
            emoji: "🍼💕",
            price: "¥3,980/月",
            posts: 30,
            description: "ミルクのファン限定3ヶ月以内の最新動画や写真が全て見...",
            isRecommended: true
        },
        {
            id: 2,
            title: "ミルク 過去コンテンツ",
            emoji: "🍼💕",
            price: "¥1,980/月",
            posts: 16,
            description: "ミルクの3ヶ月以上前の動画や写真が見放題"
        },
        {
            id: 3,
            title: "ミルク ワンコインプライス",
            emoji: "🍼💕",
            price: "¥500/月",
            posts: 17,
            description: "ミルクを応援したい方向けプラン 愛くるしいからとりあえ..."
        }
    ];

    // 初期コンテンツデータ
    const initialContentData = [
        { id: 1, type: "video", duration: "1:00:18", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 2, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 3, type: "video", duration: "02:06", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 4, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 5, type: "video", duration: "02:57", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 6, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 7, type: "video", duration: "01:22", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 8, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 9, type: "video", duration: "03:04", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 10, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 11, type: "video", duration: "01:48", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 12, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 13, type: "video", duration: "02:47", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 14, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 15, type: "video", duration: "03:05", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 16, type: "image", likes: 0, comments: 1, isFree: true, isLiked: false, watermark: "MK" },
        { id: 17, type: "image", likes: 0, comments: 1, isFree: true, isLiked: true, watermark: "MK" }
    ];

    // コンテンツデータを初期化
    useEffect(() => {
        setContentData(initialContentData);
    }, []);

    // アクション関数群
    const handleShare = async () => {
        const shareData = {
            title: `${profileData.name}のプロフィール`,
            text: `${profileData.name}のOnlyUプロフィールをチェック！`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // フォールバック: URLをクリップボードにコピー
                await navigator.clipboard.writeText(shareData.url);
                alert('プロフィールURLをクリップボードにコピーしました！');
            }
        } catch (error) {
            console.error('シェアに失敗しました:', error);
            // フォールバック: 手動でコピー
            setShowShareModal(true);
        }
    };

    const handleFollow = async () => {
        try {
            setIsFollowing(!isFollowing);
            // 実際のアプリではAPIを呼び出し
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (!isFollowing) {
                alert(`${profileData.name}をフォローしました！`);
            } else {
                alert(`${profileData.name}のフォローを解除しました。`);
            }
        } catch (error) {
            console.error('フォロー操作に失敗しました:', error);
            setIsFollowing(!isFollowing); // エラー時は元に戻す
        }
    };

    const handleMessage = () => {
        navigate(`/messages?user=${profileData.username}`);
    };

    const handlePlanConfirm = (planId) => {
        setShowPlanModal(planId);
    };

    const handlePlanSubscribe = async (planId) => {
        try {
            const plan = subscriptionPlans.find(p => p.id === planId);
            // 実際のアプリでは決済処理を実装
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert(`${plan.title}に加入しました！`);
            setShowPlanModal(null);
        } catch (error) {
            console.error('プラン加入に失敗しました:', error);
            alert('プラン加入に失敗しました。しばらくしてからお試しください。');
        }
    };

    const handleContentLike = async (contentId) => {
        setContentData(prev => prev.map(item => {
            if (item.id === contentId) {
                return {
                    ...item,
                    isLiked: !item.isLiked,
                    likes: item.isLiked ? item.likes - 1 : item.likes + 1
                };
            }
            return item;
        }));
    };

    const handleContentClick = (contentId) => {
        const content = contentData.find(item => item.id === contentId);
        if (content.type === 'video') {
            navigate(`/video/${contentId}`);
        } else {
            navigate(`/image/${contentId}`);
        }
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
        // フィルターに応じてコンテンツを更新
        let filteredData = initialContentData;
        
        if (filter === 'video') {
            filteredData = initialContentData.filter(item => item.type === 'video');
        } else if (filter === 'image') {
            filteredData = initialContentData.filter(item => item.type === 'image');
        }
        
        setContentData(filteredData);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('プロフィールURLをクリップボードにコピーしました！');
            setShowShareModal(false);
        } catch (error) {
            console.error('コピーに失敗しました:', error);
        }
    };

    const displayedPlans = showAllPlans ? subscriptionPlans : subscriptionPlans.slice(0, 3);

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-black text-white sticky top-0 z-20">
                <button onClick={() => navigate(-1)} className="p-1">
                    <ArrowLeft size={20} />
                </button>
                <button onClick={handleShare} className="p-1">
                    <Share2 size={20} />
                </button>
            </div>

            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-br from-pink-400 via-purple-500 to-blue-500 relative">
                <img
                    src={profileData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Profile Info */}
            <div className="px-4 pb-4 -mt-16 relative">
                <div className="flex items-start justify-between mb-4">
                    {/* Avatar with verification */}
                    <div className="relative">
                        <img
                            src={profileData.avatar}
                            alt={profileData.name}
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                        {profileData.isVerified && (
                            <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 text-white rounded-full" size={20} />
                        )}
                    </div>
                </div>

                {/* Name and username */}
                <div className="mb-3">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        {profileData.name} {profileData.emoji}
                    </h1>
                    <p className="text-gray-500 text-sm">{profileData.username}</p>
                </div>

                {/* Stats */}
                <div className="flex space-x-6 mb-4">
                    <div>
                        <span className="font-bold text-gray-900">{profileData.stats.posts}</span>
                        <span className="text-gray-500 text-sm ml-1">投稿</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-900">{profileData.stats.likes}</span>
                        <span className="text-gray-500 text-sm ml-1">いいね</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-900">{profileData.stats.followers}</span>
                        <span className="text-gray-500 text-sm ml-1">フォロワー</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-900">{profileData.stats.following}</span>
                        <span className="text-gray-500 text-sm ml-1">フォロー</span>
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                    <p className="text-gray-800 text-sm whitespace-pre-line">{profileData.bio}</p>
                </div>

                {/* Genre Rankings */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">ジャンル別ランキング(日間)</h3>
                    <div className="space-y-2">
                        {profileData.genreRankings.map((item, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-gray-700">{item.genre}</span>
                                <span className="font-bold text-gray-900">{item.rank}位</span>
                            </div>
                        ))}
                    </div>
                    
                    {/* Toggle for showing rankings */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                        <span className="text-sm text-gray-600">ジャンル別ランキング(日間)を他ユーザーに表示する</span>
                        <button
                            onClick={() => setShowRankings(!showRankings)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                showRankings ? 'bg-pink-500' : 'bg-gray-300'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    showRankings ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Subscription Plans */}
                <div className="space-y-3 mb-6">
                    {displayedPlans.map((plan) => (
                        <div key={plan.id} className="bg-white border border-gray-200 rounded-lg p-4 relative">
                            {plan.isRecommended && (
                                <div className="absolute -top-2 left-4">
                                    <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">おすすめ</span>
                                </div>
                            )}
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 flex items-center mb-1">
                                        {plan.title} {plan.emoji}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-2">{plan.price} 投稿{plan.posts}件</p>
                                    <p className="text-xs text-gray-500">{plan.description}</p>
                                </div>
                                <button 
                                    onClick={() => handlePlanConfirm(plan.id)}
                                    className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium ml-4 hover:bg-pink-600 transition-colors"
                                >
                                    確認する
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {subscriptionPlans.length > 3 && (
                        <button
                            onClick={() => setShowAllPlans(!showAllPlans)}
                            className="w-full text-center text-gray-600 py-2 flex items-center justify-center space-x-1"
                        >
                            <span>すべてのプランを表示</span>
                            <ChevronDown 
                                size={16} 
                                className={`transition-transform ${showAllPlans ? 'rotate-180' : ''}`} 
                            />
                        </button>
                    )}
                </div>

                {/* Content Tabs */}
                <div className="border-b border-gray-200 mb-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('posts')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'posts' 
                                    ? 'text-pink-500 border-pink-500' 
                                    : 'text-gray-500 border-transparent'
                            }`}
                        >
                            投稿
                        </button>
                        <button
                            onClick={() => setActiveTab('single')}
                            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === 'single' 
                                    ? 'text-pink-500 border-pink-500' 
                                    : 'text-gray-500 border-transparent'
                            }`}
                        >
                            単品販売
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-3 mb-4 overflow-x-auto">
                    <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm">
                        <Filter size={16} />
                        <span>すべてのタグ</span>
                    </button>
                    <button 
                        onClick={() => handleFilterChange('all')}
                        className={`px-3 py-2 rounded-full text-sm font-medium ${
                            selectedFilter === 'all' 
                                ? 'bg-pink-500 text-white' 
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        All
                    </button>
                    <button 
                        onClick={() => handleFilterChange('video')}
                        className={`p-2 rounded-full ${
                            selectedFilter === 'video' 
                                ? 'bg-pink-500 text-white' 
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        <Video size={16} />
                    </button>
                    <button 
                        onClick={() => handleFilterChange('image')}
                        className={`p-2 rounded-full ${
                            selectedFilter === 'image' 
                                ? 'bg-pink-500 text-white' 
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        <Image size={16} />
                    </button>
                    <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm ml-auto">
                        <span>新しい↓</span>
                    </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {contentData.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => handleContentClick(item.id)}
                            className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer"
                        >
                            {/* Placeholder image */}
                            <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">{item.id}</span>
                            </div>
                            
                            {/* FREE badge */}
                            {item.isFree && (
                                <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
                                    FREE
                                </div>
                            )}
                            
                            {/* Watermark */}
                            {item.watermark && (
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {item.watermark}
                                </div>
                            )}
                            
                            {/* Duration for videos */}
                            {item.type === 'video' && item.duration && (
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {item.duration}
                                </div>
                            )}
                            
                            {/* Interaction overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-4 text-white">
                                    <div className="flex items-center space-x-1">
                                        <MessageCircle size={16} />
                                        <span className="text-xs">{item.comments}</span>
                                    </div>
                                    <div 
                                        className="flex items-center space-x-1 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleContentLike(item.id);
                                        }}
                                    >
                                        <Heart 
                                            size={16} 
                                            className={item.isLiked ? 'fill-red-500 text-red-500' : ''} 
                                        />
                                        <span className="text-xs">{item.likes}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Liked button */}
                            {item.isLiked && (
                                <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                    いいね済み
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Profile Button */}
            <div className="fixed bottom-20 left-4 right-4 z-10">
                <button 
                    onClick={handleEditProfile}
                    className="w-full bg-white border-2 border-pink-200 text-pink-600 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:bg-pink-50 transition-colors"
                >
                    <Edit3 size={20} />
                    <span>プロフィールを編集</span>
                </button>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">プロフィールをシェア</h3>
                        <div className="space-y-3">
                            <button
                                onClick={handleCopyLink}
                                className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <Copy size={20} className="text-gray-600" />
                                <span className="text-gray-900">リンクをコピー</span>
                            </button>
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="w-full p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                            >
                                キャンセル
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Plan Modal */}
            {showPlanModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                        {(() => {
                            const plan = subscriptionPlans.find(p => p.id === showPlanModal);
                            return (
                                <>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{plan.price} - 投稿{plan.posts}件</p>
                                    <p className="text-sm text-gray-700 mb-6">{plan.description}</p>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setShowPlanModal(null)}
                                            className="flex-1 p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            キャンセル
                                        </button>
                                        <button
                                            onClick={() => handlePlanSubscribe(plan.id)}
                                            className="flex-1 p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                                        >
                                            加入する
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            <BottomNavigationWithCreator active="account" />
        </div>
    );
};

export default ProfilePage;