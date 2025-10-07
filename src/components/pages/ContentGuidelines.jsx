import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ContentGuidelines = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center mr-10">
                    掲載ガイドライン
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6 max-w-4xl mx-auto overflow-y-auto pb-8"
            >
                <div className="text-left space-y-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-black mb-6">掲載ガイドライン</h1>
                    
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-black mb-4">1. 禁止コンテンツ</h2>
                            <div className="text-black leading-relaxed space-y-2">
                                <p>以下のコンテンツは掲載を禁止します：</p>
                                <ul className="list-disc list-inside pl-6 space-y-1">
                                    <li>18歳未満の人物が関与するコンテンツ</li>
                                    <li>強制・脅迫・暴力を伴うコンテンツ</li>
                                    <li>動物との性的行為を描写するコンテンツ</li>
                                    <li>排泄物や血液を過度に描写するコンテンツ</li>
                                    <li>違法薬物の使用を推奨するコンテンツ</li>
                                    <li>自殺や自傷行為を助長するコンテンツ</li>
                                    <li>第三者の著作権を侵害するコンテンツ</li>
                                    <li>虚偽の情報や詐欺的なコンテンツ</li>
                                    <li>生成AIにより作成されたコンテンツ</li>
                                    <li>その他、弊社が不適切と判断したコンテンツ</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-black mb-4">2. 掲載要件</h2>
                            <div className="text-black leading-relaxed space-y-2">
                                <p>コンテンツを掲載する際は以下を遵守してください：</p>
                                <ul className="list-disc list-inside pl-6 space-y-1">
                                    <li>出演者の年齢確認書類の提出</li>
                                    <li>出演同意書の取得</li>
                                    <li>映像送信型性風俗特殊営業の届出</li>
                                    <li>適切なモザイク処理の実施</li>
                                    <li>正確な情報の提供</li>
                                    <li>プライバシーの保護</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-black mb-4">3. コンテンツの品質基準</h2>
                            <div className="text-black leading-relaxed space-y-2">
                                <ul className="list-disc list-inside pl-6 space-y-1">
                                    <li>映像・音声の品質が良好であること</li>
                                    <li>適切な照明と撮影環境であること</li>
                                    <li>明確で理解しやすいタイトルと説明文</li>
                                    <li>適切なカテゴリ分類</li>
                                    <li>正確なタグ付け</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-black mb-4">4. コミュニケーションガイドライン</h2>
                            <div className="text-black leading-relaxed space-y-2">
                                <ul className="list-disc list-inside pl-6 space-y-1">
                                    <li>相手を尊重した丁寧なコミュニケーション</li>
                                    <li>ハラスメント行為の禁止</li>
                                    <li>個人情報の適切な取り扱い</li>
                                    <li>スパム行為の禁止</li>
                                    <li>適切な言語の使用</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-black mb-4">5. 違反時の措置</h2>
                            <div className="text-black leading-relaxed space-y-2">
                                <p>ガイドライン違反が発覚した場合、以下の措置を講じます：</p>
                                <ul className="list-disc list-inside pl-6 space-y-1">
                                    <li>コンテンツの削除</li>
                                    <li>アカウントの一時停止</li>
                                    <li>アカウントの永久停止</li>
                                    <li>法的措置の検討</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                            <p className="text-yellow-800 text-sm">
                                <strong>注意：</strong>本ガイドラインは、安全で適切なサービス提供のために定められています。
                                全てのユーザーは本ガイドラインを遵守し、責任ある利用をお願いします。
                                疑問点がございましたら、サポートまでお問い合わせください。
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContentGuidelines;
