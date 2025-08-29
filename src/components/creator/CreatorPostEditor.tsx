import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CreatorPostEditor = () => {
  const [postType] = useState<'text' | 'image' | 'video' | 'premium'>('text');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [visibility] = useState<'public' | 'private' | 'subscribers_only'>('public');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ type: postType, title, content, visibility });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">新しい投稿を作成</h1>
        <p className="text-gray-600">ファンと共有したいコンテンツを投稿しましょう</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="投稿のタイトルを入力..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">コンテンツ</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="ファンと共有したい内容を入力..."
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            下書き保存
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatorPostEditor;
