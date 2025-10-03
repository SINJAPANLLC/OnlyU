import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        // Replace with API call later: fetch("/api/reports")
        setReports([
            { id: 101, type: "Spam", user: "John Doe", status: "Pending" },
            { id: 102, type: "Abuse", user: "Jane Smith", status: "Resolved" },
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{t('AdminPage.reportsPage.reportProc')}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">{t('AdminPage.id')}</th>
                            <th className="p-2 border">{t('AdminPage.reportsPage.type')}</th>
                            <th className="p-2 border">{t('AdminPage.reportsPage.user')}</th>
                            <th className="p-2 border">{t('AdminPage.status')}</th>
                            <th className="p-2 border">{t('AdminPage.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id}>
                                <td className="p-2 border">{r.id}</td>
                                <td className="p-2 border">{r.type}</td>
                                <td className="p-2 border">{r.user}</td>
                                <td className="p-2 border">{r.status}</td>
                                <td className="p-2 border">
                                    <button className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                                        {t('AdminPage.reportsPage.resolveBtn')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
