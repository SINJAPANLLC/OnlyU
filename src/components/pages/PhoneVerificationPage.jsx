import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Phone, 
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../BottomNavigation';

const PhoneVerificationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: 電話番号入力, 2: 認証コード入力, 3: 完了
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // カウントダウンタイマー
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatPhoneNumber = (value) => {
    // 数字のみ抽出
    const numbers = value.replace(/\D/g, '');
    
    // 日本の電話番号フォーマット
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

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
    setError('');
  };

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.replace(/\D/g, '').length < 10) {
      setError('有効な電話番号を入力してください');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // シミュレーション: 実際のAPIコール
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('SMS sent to:', phoneNumber);
      setStep(2);
      setCountdown(300); // 5分間
      setAttempts(0);
    } catch (err) {
      setError('認証コードの送信に失敗しました。もう一度お試しください。');
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
      // シミュレーション: 実際のAPIコール
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 簡単な検証（実際のアプリでは適切な検証が必要）
      if (verificationCode === '123456') {
        setIsVerified(true);
        setStep(3);
        console.log('Phone verification successful');
      } else {
        setAttempts(prev => prev + 1);
        if (attempts >= 2) {
          setError('認証回数が上限に達しました。最初からやり直してください。');
          setStep(1);
          setPhoneNumber('');
          setVerificationCode('');
          setAttempts(0);
        } else {
          setError(`認証コードが正しくありません。残り試行回数: ${3 - attempts - 1}`);
          setVerificationCode('');
        }
      }
    } catch (err) {
      setError('認証に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(300);
      setAttempts(0);
      setVerificationCode('');
      console.log('Resending SMS to:', phoneNumber);
    } catch (err) {
      setError('認証コードの再送に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setPhoneNumber('');
    setVerificationCode('');
    setCountdown(0);
    setError('');
    setAttempts(0);
    setIsVerified(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="text-pink-600 mr-4"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center">
          <Phone className="w-6 h-6 text-gray-700 mr-2" />
          <h1 className="text-lg font-semibold text-gray-900">電話番号認証</h1>
        </div>
      </div>

      <div className="p-4">
        {/* ステップ1: 電話番号入力 */}
        {step === 1 && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-pink-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">電話番号を入力</h2>
              <p className="text-gray-600">
                認証用のSMSを送信するために、電話番号を入力してください
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="090-1234-5678"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  ハイフンなしで入力してください
                </p>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                onClick={handleSendCode}
                disabled={isLoading || !phoneNumber}
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>送信中...</span>
                  </>
                ) : (
                  <>
                    <span>認証コードを送信</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ステップ2: 認証コード入力 */}
        {step === 2 && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">認証コードを入力</h2>
              <p className="text-gray-600 mb-2">
                {phoneNumber} に送信された6桁のコードを入力してください
              </p>
              {countdown > 0 && (
                <p className="text-sm text-pink-600 flex items-center justify-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>残り時間: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  認証コード
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg text-center tracking-widest"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleVerifyCode}
                  disabled={isLoading || !verificationCode || verificationCode.length !== 6}
                  className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>認証中...</span>
                    </>
                  ) : (
                    <>
                      <span>認証する</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  onClick={handleResendCode}
                  disabled={countdown > 0 || isLoading}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>
                    {countdown > 0 ? `再送信 (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})` : '認証コードを再送信'}
                  </span>
                </button>
              </div>

              <button
                onClick={handleStartOver}
                className="w-full text-pink-600 py-2 font-medium hover:text-pink-700 transition-colors"
              >
                電話番号を変更する
              </button>
            </div>
          </div>
        )}

        {/* ステップ3: 完了 */}
        {step === 3 && (
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">認証完了！</h2>
            <p className="text-gray-600 mb-8">
              電話番号の認証が完了しました。<br />
              {phoneNumber} が認証済みとして登録されました。
            </p>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/settings')}
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-pink-600 transition-colors"
              >
                設定に戻る
              </button>
              
              <button
                onClick={handleStartOver}
                className="w-full text-gray-600 py-2 font-medium hover:text-gray-700 transition-colors"
              >
                別の電話番号を認証する
              </button>
            </div>
          </div>
        )}

        {/* ヘルプ情報 */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">電話番号認証について</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 認証コードは5分間有効です</li>
                <li>• 認証コードは3回まで入力できます</li>
                <li>• 認証コードが届かない場合は、迷惑メールフォルダをご確認ください</li>
                <li>• 認証完了後、電話番号は安全に管理されます</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default PhoneVerificationPage;