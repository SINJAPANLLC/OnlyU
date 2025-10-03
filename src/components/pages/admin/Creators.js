import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Creators() {
    const [users, setUsers] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        // In future: fetch("/api/users") and setUsers(response)
        setUsers([
            { id: 1, name: "Virat Kohli", status: "Active" },
            { id: 2, name: "Joe Biden", status: "Banned" },
        ]);
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{t('AdminPage.creatorPage.creatorMng')}</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">{t('AdminPage.id')}</th>
                        <th className="p-2 border">{t('AdminPage.userPage.name')}</th>
                        <th className="p-2 border">{t('AdminPage.status')}</th>
                        <th className="p-2 border">{t('AdminPage.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td className="p-2 border">{u.id}</td>
                            <td className="p-2 border">{u.name}</td>
                            <td className="p-2 border">{u.status}</td>
                            <td className="p-2 border">
                                <button className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded">
                                    {t('AdminPage.creatorPage.banBtn')}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
