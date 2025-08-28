# Admin/Moderation System for MyFans

This document explains the role-based admin system implemented for the MyFans platform.

## 🎯 Overview

The system implements three user roles with different permissions:
- **Manager**: Full access to all features and admin dashboard
- **Creator**: Can create/edit/delete their own posts
- **Fan**: Can only view content and report posts

## 🏗️ Architecture

### 1. Data Model

#### Users Collection
```typescript
{
  id: "uid",
  email: "string",
  username: "string",
  displayName: "string",
  avatar: "string",
  bio: "string",
  role: "manager" | "creator" | "fan",
  status: "active" | "banned",
  followers: number,
  following: number,
  isVerified: boolean,
  joinedDate: "string",
  createdAt: "string"
}
```

#### Posts Collection
```typescript
{
  id: "postId",
  creatorId: "uid",
  content: "string",
  contentUrl: "string",
  type: "image" | "video" | "text",
  status: "public" | "private" | "removed",
  likes: number,
  comments: number,
  createdAt: "string",
  updatedAt: "string"
}
```

#### Reports Collection
```typescript
{
  id: "reportId",
  postId: "string",
  reporterId: "string",
  reason: "string",
  timestamp: "string",
  status: "pending" | "resolved" | "dismissed"
}
```

### 2. Security Rules

Firebase security rules enforce role-based access:
- **Manager**: Full access to all collections
- **Creator**: Can manage own posts, read all posts
- **Fan**: Can only read posts and create reports

### 3. Admin Dashboard Features

#### Overview Tab
- Total users, posts, reports statistics
- Banned users count
- Removed posts count

#### Users Management Tab
- View all users with roles and status
- Ban/unban users
- Change user roles (manager only)

#### Posts Management Tab
- View all posts with content and metadata
- Delete posts (manager or post creator)

#### Reports Management Tab
- View all reported posts
- Mark reports as resolved/dismissed
- Take action on reported content

## 🚀 Getting Started

### 1. Setup Firebase

1. Create a Firebase project
2. Enable Firestore Database
3. Copy your Firebase config to `src/firebase/config.ts`
4. Deploy security rules from `firestore.rules`

### 2. Install Dependencies

```bash
npm install firebase
```

### 3. Configure Environment Variables

Create `.env.local`:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 4. Create First Manager User

```typescript
import { createUserWithRole } from './firebase/config';

const managerData = {
  email: "admin@myfans.com",
  username: "admin_manager",
  displayName: "Admin Manager",
  avatar: "https://example.com/avatar.jpg",
  role: "manager",
  status: "active",
  followers: 0,
  following: 0,
  isVerified: true,
  joinedDate: new Date().toISOString()
};

// Create user in Firebase Auth first, then:
createUserWithRole(managerData, authUser.uid);
```

## 🔐 Role Management

### Manager Actions
- View all users and posts
- Ban/unban users
- Change user roles
- Delete any post
- Resolve reports
- Access admin dashboard

### Creator Actions
- Create/edit/delete own posts
- View all public posts
- Cannot access admin features

### Fan Actions
- View public posts
- Report inappropriate content
- Cannot create posts or access admin

## 📱 Admin Dashboard Usage

### Access
1. Login as a manager user
2. Navigate to `/admin` or click "管理者" in sidebar
3. Use tabs to manage different aspects

### User Management
- View user list with roles and status
- Click ban/unban buttons to change user status
- Filter by role or status (future enhancement)

### Content Moderation
- Review reported posts
- Take action on inappropriate content
- Monitor platform activity

## 🛡️ Security Features

### Authentication
- Firebase Auth integration
- Role-based access control
- Session management

### Data Protection
- Firestore security rules
- Input validation
- XSS protection

### Audit Trail
- All admin actions logged
- User activity tracking
- Report history

## 🔧 Customization

### Adding New Roles
1. Update `User` interface in `src/types/index.ts`
2. Add role to security rules
3. Update admin dashboard logic

### Adding New Admin Features
1. Create new component in `src/components/admin/`
2. Add route to `App.tsx`
3. Update sidebar navigation

### Modifying Permissions
1. Edit `firestore.rules`
2. Update role checks in components
3. Test with different user types

## 🧪 Testing

### Test Users
Create test accounts for each role:
- Manager: `admin@test.com`
- Creator: `creator@test.com`
- Fan: `fan@test.com`

### Test Scenarios
1. Manager can access all features
2. Creator can only manage own posts
3. Fan can only view and report
4. Banned users cannot access platform

## 🚨 Troubleshooting

### Common Issues

#### Admin Dashboard Not Accessible
- Check user role is "manager"
- Verify Firebase connection
- Check browser console for errors

#### Security Rules Not Working
- Deploy updated rules to Firebase
- Check rule syntax
- Verify user authentication

#### Data Not Loading
- Check Firestore permissions
- Verify collection names
- Check network requests

### Debug Mode
Enable debug logging in Firebase config:
```typescript
import { connectFirestoreEmulator } from 'firebase/firestore';

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

## 📚 API Reference

### Firebase Functions
- `createUserWithRole()` - Create user with role
- `updateUserRole()` - Change user role
- `updateUserStatus()` - Ban/unban user
- `createPost()` - Create new post
- `deletePost()` - Remove post
- `createReport()` - Report content
- `resolveReport()` - Mark report resolved

### React Components
- `AdminDashboard` - Main admin interface
- `UserManagement` - User administration
- `PostManagement` - Content moderation
- `ReportManagement` - Report handling

## 🤝 Contributing

1. Follow existing code patterns
2. Add TypeScript types for new features
3. Update security rules for new collections
4. Test with all user roles
5. Document new features

## 📄 License

This admin system is part of the MyFans platform and follows the same licensing terms.
