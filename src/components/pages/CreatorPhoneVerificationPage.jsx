import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowLeft, ArrowRight, RotateCcw, CheckCircle, AlertCircle, Clock, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCreator } from '../../context/CreatorContext';

const CreatorPhoneVerificationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { applyForCreator } = useCreator();
    
    const [step, setStep] = useState(1); // 1: 電話番号入力, 2: 認証コード入力, 3: 完了
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [formData, setFormData] = useState(null);

    // URLパラメータから前のページのデータを取得
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const data = urlParams.get('data');
        if (data) {
            setFormData(JSON.parse(decodeURIComponent(data)));
        }
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length <= 11) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        }
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        setPhoneNumber(formatPhoneNumber(input));
        setError('');
    };

    const handleSendCode = async () => {
        if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
            setError('有効な電話番号を入力してください');
            return;
        }
        
        setIsLoading(true);
        setError('');
        setAttempts(prev => prev + 1);

        try {
            // 実際のアプリでは、SMS送信APIを呼び出し
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (attempts >= 2) {
                throw new Error('認証コードの送信に失敗しました。しばらくしてからお試しください。');
            }
            
            setCountdown(300); // 5分
            setStep(2);
        } catch (err) {
            setError(err.message || '認証コードの送信に失敗しました。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        if (!verificationCode || verificationCode.length !== 6) {
            setError('6桁の認証コードを入力してください');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            // 実際のアプリでは、認証コード検証APIを呼び出し
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (verificationCode !== '123456') {
                throw new Error('認証コードが正しくありません。');
            }
            
            setStep(3);
        } catch (err) {
            setError(err.message || '認証に失敗しました。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;
        
        setIsLoading(true);
        setError('');
        setAttempts(prev => prev + 1);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setCountdown(300);
            alert('認証コードを再送信しました。');
        } catch (err) {
            setError('認証コードの再送信に失敗しました。');
        } finally {
            setIsLoading(false);
        }
    };

    const handleComplete = async () => {
        try {
            // クリエイター申請を送信
            const creatorData = {
                ...formData,
                phoneNumber: phoneNumber.replace(/\D/g, ''),
                verifiedAt: new Date().toISOString()
            };
            
            const result = await applyForCreator(creatorData);
            
            if (result.success) {
                navigate('/creator-registration-complete');
            } else {
                setError(result.error || '申請の送信に失敗しました。');
            }
        } catch (err) {
            setError('申請の送信に失敗しました。');
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">電話番号認証</h2>
                        <p className="text-gray-600 mb-6">
                            本人確認のため、SMSで認証コードを送信します。電話番号を入力してください。
                        </p>
                        
                        <div className="relative mb-4">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="tel"
                                placeholder="電話番号 (例: 090-1234-5678)"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                                disabled={isLoading}
                            />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        
                        <button
                            onClick={handleSendCode}
                            disabled={isLoading || phoneNumber.replace(/\D/g, '').length < 10}
                            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-pink-600 disabled:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <ArrowRight size={20} />
                            )}
                            <span>認証コードを送信</span>
                        </button>
                    </>
                );
                
            case 2:
                return (
                    <>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">認証コード入力</h2>
                        <p className="text-gray-600 mb-6">
                            {phoneNumber} に送信された6桁の認証コードを入力してください。
                        </p>
                        
                        <div className="relative mb-4">
                            <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="6桁の認証コード"
                                value={verificationCode}
                                onChange={(e) => { setVerificationCode(e.target.value); setError(''); }}
                                maxLength={6}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg tracking-widest"
                                disabled={isLoading}
                            />
                        </div>
                        
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={handleResendCode}
                                disabled={isLoading || countdown > 0}
                                className={`text-sm font-medium ${countdown > 0 ? 'text-gray-400' : 'text-pink-600 hover:underline'} flex items-center space-x-1`}
                            >
                                <RotateCcw size={16} />
                                <span>{countdown > 0 ? `再送信 (${Math.floor(countdown / 60)}:${('0' + (countdown % 60)).slice(-2)})` : 'コードを再送信'}</span>
                            </button>
                            <span className="text-sm text-gray-500 flex items-center space-x-1">
                                <Clock size={16} />
                                <span>残り {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}</span>
                            </span>
                        </div>
                        
                        <button
                            onClick={handleVerifyCode}
                            disabled={isLoading || verificationCode.length !== 6}
                            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-pink-600 disabled:bg-gray-300 transition-colors flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <CheckCircle size={20} />
                            )}
                            <span>認証する</span>
                        </button>
                    </>
                );
                
            case 3:
                return (
                    <div className="text-center">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">電話番号認証が完了しました！</h2>
                        <p className="text-gray-600 mb-8">
                            次のステップで書類を提出してください。
                        </p>
                        <button
                            onClick={handleComplete}
                            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-pink-600 transition-colors"
                        >
                            次へ進む
                        </button>
                    </div>
                );
                
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-white p-4 pb-20 max-w-3xl mx-auto"
        >
            {/* Progress bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold">
                        <CheckCircle size={16} />
                    </div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                        情報を入力
                    </span>
                </div>

                <div className="flex-1 flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
                        step >= 2 ? 'bg-pink-500' : 'bg-gray-400'
                    }`}>
                        {step > 2 ? <CheckCircle size={16} /> : '2'}
                    </div>
                    <span className={`ml-2 text-xs sm:text-sm ${
                        step >= 2 ? 'font-semibold' : 'text-gray-500'
                    }`}>
                        電話番号認証
                    </span>
                </div>

                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white font-bold">3</div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                        書類を提出
                    </span>
                </div>

                <div className="flex-1 flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-white font-bold">4</div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-500">
                        書類審査
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6">
                {renderStepContent()}
            </div>

            {/* Back button */}
            {step < 3 && (
                <div className="mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>戻る</span>
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default CreatorPhoneVerificationPage;
