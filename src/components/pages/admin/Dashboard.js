import React from "react";
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{t('AdminPage.dashboardPage.stats')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white rounded-xl shadow">{t('AdminPage.dashboardPage.views')}: 12,340</div>
        <div className="p-4 bg-white rounded-xl shadow">{t('AdminPage.dashboardPage.followers')}: 1,230</div>
        <div className="p-4 bg-white rounded-xl shadow">{t('AdminPage.dashboardPage.ltv')}: $3,210</div>
      </div>
    </div>
  );
}
