import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Verification() {
    const [requests, setRequests] = useState([]);
    const {t}=useTranslation();

    useEffect(() => {
        // Replace with API later: fetch("/api/verification")
        setRequests([
            { id: 1, user: "John Doe", type: "KYC", status: "Pending" },
            { id: 2, user: "Jane Smith", type: "Age Check", status: "Approved" },
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{t('AdminPage.verificationPage.identityVer')}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">{t('AdminPage.id')}</th>
                            <th className="p-2 border">{t('AdminPage.verificationPage.user')}</th>
                            <th className="p-2 border">{t('AdminPage.verificationPage.type')}</th>
                            <th className="p-2 border">{t('AdminPage.status')}</th>
                            <th className="p-2 border">{t('AdminPage.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id}>
                                <td className="p-2 border">{req.id}</td>
                                <td className="p-2 border">{req.user}</td>
                                <td className="p-2 border">{req.type}</td>
                                <td className="p-2 border">{req.status}</td>
                                <td className="p-2 border">
                                    <button className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                                        {t('AdminPage.verificationPage.approveBtn')}
                                    </button>
                                    <button className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded">
                                        {t('AdminPage.verificationPage.rejectBtn')}
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
