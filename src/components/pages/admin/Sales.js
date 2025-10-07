import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Sales() {
    const [sales, setSales] = useState([]);

    const {t}=useTranslation();
    
    useEffect(() => {
        // Replace with API later: fetch("/api/sales")
        setSales([
            { id: "TXN123", user: "John Doe", amount: 120, status: "Completed" },
            { id: "TXN124", user: "Jane Smith", amount: 90, status: "Pending" },
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4"> {t('AdminPage.salesPage.salesRevenue')}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border">{t('AdminPage.salesPage.transId')}</th>
                            <th className="p-2 border">{t('AdminPage.salesPage.user')}</th>
                            <th className="p-2 border">{t('AdminPage.salesPage.amount')}</th>
                            <th className="p-2 border">{t('AdminPage.status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((s) => (
                            <tr key={s.id}>
                                <td className="p-2 border">{s.id}</td>
                                <td className="p-2 border">{s.user}</td>
                                <td className="p-2 border">${s.amount}</td>
                                <td className="p-2 border">{s.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
