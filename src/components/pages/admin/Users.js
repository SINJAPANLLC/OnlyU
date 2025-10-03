import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { db } from "../../../firebase";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();

    // Fetch all users from Firebase
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching users from Firebase...');
            
            // Create query to get all users, ordered by creation date (newest first)
            const usersQuery = query(
                collection(db, 'users'),
                orderBy('createdAt', 'desc')
            );
            
            const usersSnapshot = await getDocs(usersQuery);
            const usersData = [];
            
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                usersData.push({
                    id: doc.id,
                    uid: userData.uid || doc.id,
                    name: userData.displayName || userData.name || 'Unknown User',
                    email: userData.email || 'No email',
                    photoURL: userData.photoURL || null,
                    status: userData.isBanned ? 'Banned' : 'Active',
                    isBanned: userData.isBanned || false,
                    createdAt: userData.createdAt || null,
                    followersCount: userData.followers?.length || 0,
                    followingCount: userData.following?.length || 0,
                    lastLogin: userData.lastLogin || null
                });
            });
            
            console.log(`Found ${usersData.length} users:`, usersData);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError(`Failed to load users: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    // Handle ban/unban user
    const handleBanToggle = async (userId, currentBanStatus) => {
        try {
            const userRef = doc(db, 'users', userId);
            const newBanStatus = !currentBanStatus;
            
            await updateDoc(userRef, {
                isBanned: newBanStatus,
                lastModified: new Date().toISOString()
            });
            
            // Update local state
            setUsers(users.map(user => 
                user.id === userId 
                    ? { ...user, isBanned: newBanStatus, status: newBanStatus ? 'Banned' : 'Active' }
                    : user
            ));
            
            console.log(`User ${userId} ${newBanStatus ? 'banned' : 'unbanned'} successfully`);
        } catch (error) {
            console.error('Error updating user ban status:', error);
            alert('Failed to update user status. Please try again.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('AdminPage.userPage.userMng')}</h2>
                <div className="flex items-center justify-between">
                    <p className="text-gray-600">Total Users: {users.length}</p>
                    <button
                        onClick={fetchUsers}
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <div className="text-red-400 text-xl mr-3">⚠️</div>
                        <div>
                            <h3 className="text-red-800 font-medium">Error Loading Users</h3>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                    <button
                        onClick={fetchUsers}
                        className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Try Again
                    </button>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-4xl mb-4">👥</div>
                    <p className="text-gray-600">No users found</p>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profile
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('AdminPage.userPage.name')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('AdminPage.status')}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Followers/Following
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created At
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t('AdminPage.action')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user, index) => (
                                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={user.photoURL || 'https://via.placeholder.com/40x40?text=U'}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/40x40?text=U';
                                                    }}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">ID: {user.uid}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex space-x-2">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                    {user.followersCount} followers
                                                </span>
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                                    {user.followingCount} following
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleBanToggle(user.id, user.isBanned)}
                                                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                                    user.isBanned
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                }`}
                                            >
                                                {user.isBanned ? 'Unban' : t('AdminPage.userPage.banBtn')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
