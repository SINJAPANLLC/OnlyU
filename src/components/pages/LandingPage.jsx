import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowRight, 
    Heart, 
    Star, 
    Users, 
    Shield, 
    Zap,
    ChevronDown,
    Play,
    Download,
    Share2,
    MessageCircle,
    Crown,
    Lock,
    CheckCircle
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // 画像データ（提供された画像のURL）
    const images = [
        {
            id: 1,
            title: "プライベートSNSならOnly-U",
            subtitle: "「あなたの推しを育てる、特別な場所。」",
            description: "Only-Uは、クリエイターとファンをつなぐ特別なプラットフォームです。",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
            type: "hero"
        },
        {
            id: 2,
            title: "好きなことを表現する",
            subtitle: "「好きなことを表現する。それだけで、推しの心に届く。」",
            description: "あなたの個性を自由に表現し、ファンとの特別なつながりを築きましょう。",
            image: "https://images.unsplash.com/photo-1494790108755-2616c933448c?w=800&h=600&fit=crop",
            type: "expression"
        },
        {
            id: 3,
            title: "あなたが主役",
            subtitle: "「――ここでは、あなたが主役。」",
            description: "あなたの物語に、値札をつけてはいけない。でも応援は受け取れる。",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
            type: "protagonist"
        },
        {
            id: 4,
            title: "稼げるファンクラブ",
            subtitle: "稼げるファンクラブで、物語に彩りを",
            description: "Only-Uで、あなたの物語を始めよう。",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
            type: "monetization"
        }
    ];

    // 自動スライド機能
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    // スクロールアニメーション
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsVisible(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetStarted = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleScrollToNext = () => {
        const nextSection = document.getElementById('features');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <Heart className="w-8 h-8 text-pink-500" />
                                <Heart className="w-8 h-8 text-pink-500 -ml-2" />
                            </div>
                            <span className="text-2xl font-bold text-pink-500">nly U</span>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-pink-500 transition-colors">機能</a>
                            <a href="#pricing" className="text-gray-700 hover:text-pink-500 transition-colors">料金</a>
                            <a href="#about" className="text-gray-700 hover:text-pink-500 transition-colors">About</a>
                        </nav>

                        {/* CTA Buttons */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleLogin}
                                className="text-gray-700 hover:text-pink-500 transition-colors"
                            >
                                ログイン
                            </button>
                            <button
                                onClick={handleGetStarted}
                                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                            >
                                無料登録
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={images[currentImage].image}
                        alt={images[currentImage].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {images[currentImage].title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-pink-200">
                        {images[currentImage].subtitle}
                    </p>
                    <p className="text-lg mb-12 text-gray-200 max-w-2xl mx-auto">
                        {images[currentImage].description}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={handleGetStarted}
                            className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>無料登録</span>
                            <ArrowRight size={20} />
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-500 transition-colors">
                            詳細を見る
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                    <button onClick={handleScrollToNext} className="flex flex-col items-center space-y-2">
                        <span className="text-sm">SCROLL</span>
                        <ChevronDown size={24} />
                    </button>
                </div>

                {/* Image Navigation Dots */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                currentImage === index ? 'bg-pink-500' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            あなたの物語を始めよう
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Only-Uで、あなたの物語を始めよう。稼げるファンクラブで、物語に彩りを。
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <Heart className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                プライベートSNS
                            </h3>
                            <p className="text-gray-600">
                                あなたの推しを育てる、特別な場所。安全でプライベートな環境で、ファンとのつながりを深めましょう。
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <Star className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                自由な表現
                            </h3>
                            <p className="text-gray-600">
                                好きなことを表現する。それだけで、推しの心に届く。あなたの個性を自由に表現できます。
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <Crown className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                あなたが主役
                            </h3>
                            <p className="text-gray-600">
                                ここでは、あなたが主役。あなたの物語に、値札をつけてはいけない。でも応援は受け取れる。
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <Zap className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                稼げるファンクラブ
                            </h3>
                            <p className="text-gray-600">
                                稼げるファンクラブで、物語に彩りを。あなたのコンテンツで収益を生み出しましょう。
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <Shield className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                安全・安心
                            </h3>
                            <p className="text-gray-600">
                                プライバシーを最優先に、安全で安心して使えるプラットフォームです。
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <Users className="w-8 h-8 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                コミュニティ
                            </h3>
                            <p className="text-gray-600">
                                同じ志を持つクリエイターやファンとのコミュニティで、新しいつながりを見つけましょう。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Only-Uで、あなたの物語を始めよう
                    </h2>
                    <p className="text-xl text-pink-100 mb-8">
                        今すぐ無料で登録して、特別な場所で自分らしさを表現しましょう
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="bg-white text-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mx-auto"
                    >
                        <span>無料登録</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <Heart className="w-8 h-8 text-pink-500" />
                                <Heart className="w-8 h-8 text-pink-500 -ml-2" />
                                <span className="text-2xl font-bold text-pink-500">nly U</span>
                            </div>
                            <p className="text-gray-400">
                                あなたの推しを育てる、特別な場所。
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">サービス</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">機能</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">料金</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">サポート</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">会社情報</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">採用情報</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-4">法的事項</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">特定商取引法</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Only-U. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
