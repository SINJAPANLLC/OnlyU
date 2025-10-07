# Supabase + Firebase Integration Setup Guide

## Overview
Your app now uses a hybrid approach:
- **Supabase**: For image storage (PostgreSQL + Storage)
- **Firebase**: For other data (posts metadata, user data, messaging)

## Required Setup Steps

### 1. Get Your Supabase Anonymous Key

**You have the database connection, but for the React app you need the API credentials:**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (ikvfbddbatyedwqbyntd)
3. Go to Settings → API
4. Copy the "anon public" key (it looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
5. Copy the "Project URL" (should be: `https://ikvfbddbatyedwqbyntd.supabase.co`)
6. Update your `.env` file:

```env
REACT_APP_SUPABASE_URL=https://ikvfbddbatyedwqbyntd.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Note**: The database connection string you provided (`postgresql://postgres:JRGVrg_zWxuZ3@3@db.ikvfbddbatyedwqbyntd.supabase.co:5432/postgres`) is for direct database access, but the React app uses the Supabase client which needs the API URL and anon key.

### 2. Create Storage Bucket in Supabase

1. In your Supabase Dashboard, go to Storage
2. Create a new bucket named: `post-images`
3. Set the bucket to **Public** (so images can be accessed via URL)
4. Configure bucket policies if needed for security

### 3. Optional: Configure Row Level Security (RLS)

For better security, you can set up RLS policies in your Supabase Storage:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow public read access to images
CREATE POLICY "Allow public downloads" ON storage.objects
FOR SELECT USING (bucket_id = 'post-images');
```

## How It Works Now

### Image Upload Flow:
1. User selects images in CreatePostPage
2. Images are uploaded to **Supabase Storage**
3. Supabase returns public URLs for the images
4. Post metadata (including image URLs) is saved to **Firebase Firestore**

### Data Structure:
- **Supabase**: Stores actual image files
- **Firebase**: Stores post data with Supabase image URLs

```json
{
  "postId": "firebase_doc_id",
  "explanation": "Post description",
  "images": [
    {
      "url": "https://ikvfbddbatyedwqbyntd.supabase.co/storage/v1/object/public/post-images/...",
      "storage": "supabase",
      "path": "public/user_post_0_timestamp.jpg"
    }
  ],
  "userId": "firebase_user_id",
  "createdAt": "firebase_timestamp"
}
```

## Benefits of This Approach

1. **Cost Effective**: Supabase PostgreSQL storage is often cheaper than Firebase Storage
2. **SQL Capabilities**: You can run complex queries on your Supabase database
3. **Reliability**: Firebase for real-time features, Supabase for file storage
4. **Scalability**: Best of both platforms

## Testing

1. Update your `.env` file with the real Supabase anon key
2. Create the `post-images` bucket in Supabase Storage
3. Try creating a post with images
4. Check that images appear in Supabase Storage
5. Verify post data is saved in Firebase Firestore

## Troubleshooting

- If uploads fail, check the browser console for error messages
- Ensure the `post-images` bucket exists and is public
- Verify your Supabase anon key is correct
- Check that CORS is configured in Supabase (usually automatic)

## Next Steps

Once basic upload works, you can:
- Add image compression before upload
- Implement image deletion when posts are deleted
- Add progress indicators for large file uploads
- Set up automatic image optimization in Supabase
