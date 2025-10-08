import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Share2,
    Heart,
    MessageCircle,
    Bookmark,
    MoreHorizontal,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Settings,
    Download,
    Flag,
    User,
    Clock,
    Eye,
    ThumbsUp,
    ThumbsDown,
    Repeat,
    SkipBack,
    SkipForward,
    Maximize2,
    Minimize2,
    CheckCircle
} from 'lucide-react';
import BottomNavigationWithCreator from '../BottomNavigationWithCreator';

const VideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

    // サンプル動画データ
    const videoData = {
        id: id,
        title: '特別なコンテンツ - ミルク',
        description: 'ファンの皆様への特別なコンテンツです。\n\n#OnlyU #ミルク #特別動画',
        creator: {
            name: 'ミルク',
            username: '@milk_av',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face',
            isVerified: true
        },
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // サンプル動画URL
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop',
        duration: '02:47',
        views: 15420,
        likes: 892,
        comments: 156,
        uploadDate: '2024-03-15',
        tags: ['特別', 'ファン限定', 'ミルク'],
        isFree: true,
        price: 0
    };

    const comments = [
        {
            id: 1,
            user: {
                name: 'ファン1',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                username: '@fan1'
            },
            content: '素晴らしいコンテンツですね！',
            time: '2時間前',
            likes: 12
        },
        {
            id: 2,
            user: {
                name: 'ファン2',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=40&h=40&fit=crop&crop=face',
                username: '@fan2'
            },
            content: 'いつもありがとうございます！',
            time: '3時間前',
            likes: 8
        }
    ];

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const updateTime = () => setCurrentTime(video.currentTime);
            const updateDuration = () => setDuration(video.duration);
            
            video.addEventListener('timeupdate', updateTime);
            video.addEventListener('loadedmetadata', updateDuration);
            
            return () => {
                video.removeEventListener('timeupdate', updateTime);
                video.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (video) {
            video.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        const rect = e.currentTarget.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        const newTime = pos * duration;
        
        if (video) {
            video.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = async () => {
        const shareData = {
            title: videoData.title,
            text: `${videoData.creator.name}の動画をチェック！`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('動画URLをクリップボードにコピーしました！');
            }
        } catch (error) {
            console.error('シェアに失敗しました:', error);
            setShowShareModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
                <button onClick={() => navigate(-1)} className="p-2 bg-black/50 rounded-full">
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <button onClick={handleShare} className="p-2 bg-black/50 rounded-full">
                    <Share2 size={20} className="text-white" />
                </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full h-screen">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster={videoData.thumbnail}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={togglePlay}
                >
                    <source src={videoData.videoUrl} type="video/mp4" />
                    お使いのブラウザは動画の再生をサポートしていません。
                </video>

                {/* Play/Pause Overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={togglePlay}
                            className="bg-black/50 rounded-full p-6 hover:bg-black/70 transition-colors"
                        >
                            <Play size={40} className="text-white ml-1" />
                        </button>
                    </div>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div
                            className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
                            onClick={handleSeek}
                        >
                            <div
                                className="h-full bg-pink-500 rounded-full"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                            <button onClick={togglePlay}>
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>
                            
                            <button onClick={toggleMute}>
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>
                            
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-20 h-1 bg-white/30 rounded-full appearance-none"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <span className="text-sm">{formatTime(currentTime)}</span>
                            <span className="text-white/50">/</span>
                            <span className="text-sm">{formatTime(duration)}</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button onClick={() => setIsFullscreen(!isFullscreen)}>
                                {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Video Info */}
            <div className="bg-white p-4 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-gray-900 mb-2">{videoData.title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span className="flex items-center">
                                <Eye size={16} className="mr-1" />
                                {videoData.views.toLocaleString()}回再生
                            </span>
                            <span className="flex items-center">
                                <Clock size={16} className="mr-1" />
                                {videoData.uploadDate}
                            </span>
                        </div>
                    </div>
                    <button className="p-2">
                        <MoreHorizontal size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Creator Info */}
                <div className="flex items-center space-x-3">
                    <img
                        src={videoData.creator.avatar}
                        alt={videoData.creator.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900">{videoData.creator.name}</h3>
                            {videoData.creator.isVerified && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{videoData.creator.username}</p>
                    </div>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        フォロー
                    </button>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-800 whitespace-pre-line">{videoData.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {videoData.tags.map((tag, index) => (
                            <span key={index} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={handleLike}
                            className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
                        >
                            <Heart size={24} className={isLiked ? 'fill-current' : ''} />
                            <span className="font-medium">{videoData.likes}</span>
                        </button>
                        
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center space-x-2 text-gray-600"
                        >
                            <MessageCircle size={24} />
                            <span className="font-medium">{videoData.comments}</span>
                        </button>
                        
                        <button
                            onClick={handleBookmark}
                            className={`${isBookmarked ? 'text-yellow-500' : 'text-gray-600'}`}
                        >
                            <Bookmark size={24} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                    </div>
                    
                    <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 text-gray-600"
                    >
                        <Share2 size={24} />
                    </button>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-900 mb-4">コメント ({videoData.comments})</h3>
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="flex space-x-3">
                                    <img
                                        src={comment.user.avatar}
                                        alt={comment.user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <span className="font-medium text-gray-900">{comment.user.name}</span>
                                            <span className="text-sm text-gray-500">{comment.time}</span>
                                        </div>
                                        <p className="text-gray-800 text-sm">{comment.content}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                                                <ThumbsUp size={16} />
                                                <span className="text-xs">{comment.likes}</span>
                                            </button>
                                            <button className="text-gray-500 hover:text-gray-700">
                                                <ThumbsDown size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Add Comment */}
                        <div className="mt-4 flex space-x-3">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                                alt="Your avatar"
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1 flex">
                                <input
                                    type="text"
                                    placeholder="コメントを追加..."
                                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                                <button className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition-colors">
                                    送信
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">動画をシェア</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-2xl">📱</span>
                                <span className="text-gray-900">アプリでシェア</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-2xl">📋</span>
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

            <BottomNavigationWithCreator active="home" />
        </div>
    );
};

export default VideoPage;