import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Share2,
    Heart,
    MessageCircle,
    Bookmark,
    MoreHorizontal,
    Download,
    Flag,
    User,
    Clock,
    Eye,
    ThumbsUp,
    ThumbsDown,
    CheckCircle,
    ZoomIn,
    ZoomOut,
    RotateCw,
    Maximize2,
    Minimize2,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import BottomNavigationWithCreator from '../BottomNavigationWithCreator';

const ImagePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [showFullscreen, setShowFullscreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // サンプル画像データ
    const imageData = {
        id: id,
        title: '特別な写真 - ミルク',
        description: 'ファンの皆様への特別な写真です。\n\n#OnlyU #ミルク #特別写真',
        creator: {
            name: 'ミルク',
            username: '@milk_av',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=150&h=150&fit=crop&crop=face',
            isVerified: true
        },
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
        views: 8750,
        likes: 456,
        comments: 89,
        uploadDate: '2024-03-14',
        tags: ['特別', 'ファン限定', 'ミルク', '写真'],
        isFree: true,
        price: 0,
        width: 800,
        height: 1200
    };

    // 複数画像のサンプル（ギャラリー表示用）
    const galleryImages = [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop'
    ];

    const comments = [
        {
            id: 1,
            user: {
                name: 'ファン1',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                username: '@fan1'
            },
            content: 'とても美しい写真ですね！',
            time: '1時間前',
            likes: 5
        },
        {
            id: 2,
            user: {
                name: 'ファン2',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616c933448c?w=40&h=40&fit=crop&crop=face',
                username: '@fan2'
            },
            content: 'いつも素晴らしいコンテンツをありがとうございます！',
            time: '2時間前',
            likes: 3
        }
    ];

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };

    const handleShare = async () => {
        const shareData = {
            title: imageData.title,
            text: `${imageData.creator.name}の写真をチェック！`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('画像URLをクリップボードにコピーしました！');
            }
        } catch (error) {
            console.error('シェアに失敗しました:', error);
            setShowShareModal(true);
        }
    };

    const handleZoom = (direction) => {
        if (direction === 'in') {
            setZoomLevel(prev => Math.min(prev + 0.5, 3));
        } else {
            setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
        }
        setIsZoomed(zoomLevel !== 1);
    };

    const handleDownload = () => {
        // 実際のアプリでは画像のダウンロード処理を実装
        alert('画像をダウンロードしました！');
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex < galleryImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
                <button onClick={() => navigate(-1)} className="p-2 bg-black/50 rounded-full">
                    <ArrowLeft size={20} className="text-white" />
                </button>
                <div className="flex items-center space-x-2">
                    <button onClick={handleDownload} className="p-2 bg-black/50 rounded-full">
                        <Download size={20} className="text-white" />
                    </button>
                    <button onClick={handleShare} className="p-2 bg-black/50 rounded-full">
                        <Share2 size={20} className="text-white" />
                    </button>
                </div>
            </div>

            {/* Image Viewer */}
            <div className="relative w-full h-screen flex items-center justify-center">
                <div className="relative max-w-full max-h-full">
                    <img
                        src={galleryImages[currentImageIndex]}
                        alt={imageData.title}
                        className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                            isZoomed ? 'cursor-move' : 'cursor-zoom-in'
                        }`}
                        style={{ transform: `scale(${zoomLevel})` }}
                        onClick={() => !isZoomed && setShowFullscreen(true)}
                    />
                    
                    {/* Zoom Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-2">
                        <button
                            onClick={() => handleZoom('out')}
                            className="p-1 text-white hover:bg-white/20 rounded"
                        >
                            <ZoomOut size={20} />
                        </button>
                        <span className="text-white text-sm px-2">
                            {Math.round(zoomLevel * 100)}%
                        </span>
                        <button
                            onClick={() => handleZoom('in')}
                            className="p-1 text-white hover:bg-white/20 rounded"
                        >
                            <ZoomIn size={20} />
                        </button>
                        <button
                            onClick={() => {
                                setZoomLevel(1);
                                setIsZoomed(false);
                            }}
                            className="p-1 text-white hover:bg-white/20 rounded"
                        >
                            <RotateCw size={20} />
                        </button>
                    </div>

                    {/* Gallery Navigation */}
                    {galleryImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePreviousImage}
                                disabled={currentImageIndex === 0}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white disabled:opacity-50"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={handleNextImage}
                                disabled={currentImageIndex === galleryImages.length - 1}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white disabled:opacity-50"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Fullscreen Modal */}
            {showFullscreen && (
                <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <button
                            onClick={() => setShowFullscreen(false)}
                            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white z-10"
                        >
                            <X size={24} />
                        </button>
                        
                        <img
                            src={galleryImages[currentImageIndex]}
                            alt={imageData.title}
                            className="max-w-full max-h-full object-contain"
                        />
                        
                        {galleryImages.length > 1 && (
                            <>
                                <button
                                    onClick={handlePreviousImage}
                                    disabled={currentImageIndex === 0}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white disabled:opacity-50"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    disabled={currentImageIndex === galleryImages.length - 1}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 rounded-full text-white disabled:opacity-50"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Image Info */}
            <div className="bg-white p-4 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-gray-900 mb-2">{imageData.title}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span className="flex items-center">
                                <Eye size={16} className="mr-1" />
                                {imageData.views.toLocaleString()}回閲覧
                            </span>
                            <span className="flex items-center">
                                <Clock size={16} className="mr-1" />
                                {imageData.uploadDate}
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
                        src={imageData.creator.avatar}
                        alt={imageData.creator.name}
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="flex items-center">
                            <h3 className="font-semibold text-gray-900">{imageData.creator.name}</h3>
                            {imageData.creator.isVerified && (
                                <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{imageData.creator.username}</p>
                    </div>
                    <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        フォロー
                    </button>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-800 whitespace-pre-line">{imageData.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {imageData.tags.map((tag, index) => (
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
                            <span className="font-medium">{imageData.likes}</span>
                        </button>
                        
                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center space-x-2 text-gray-600"
                        >
                            <MessageCircle size={24} />
                            <span className="font-medium">{imageData.comments}</span>
                        </button>
                        
                        <button
                            onClick={handleBookmark}
                            className={`${isBookmarked ? 'text-yellow-500' : 'text-gray-600'}`}
                        >
                            <Bookmark size={24} className={isBookmarked ? 'fill-current' : ''} />
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleDownload}
                            className="flex items-center space-x-2 text-gray-600"
                        >
                            <Download size={24} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex items-center space-x-2 text-gray-600"
                        >
                            <Share2 size={24} />
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-900 mb-4">コメント ({imageData.comments})</h3>
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">画像をシェア</h3>
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

export default ImagePage;
