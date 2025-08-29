import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const CreatorProfile = () => {
  const { t } = useLanguage();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('creator.profile.title')}</h1>
      <p className="text-gray-600">{t('creator.profile.description')}</p>
    </div>
  );
};

export default CreatorProfile;
