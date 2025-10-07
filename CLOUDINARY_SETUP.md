# Cloudinary Setup Instructions

## 📋 Required Setup in Cloudinary Dashboard

To complete the integration, you need to create an **Upload Preset** in your Cloudinary dashboard:

### 1. Login to Cloudinary
- Go to https://cloudinary.com/console
- Login with your account

### 2. Create Upload Preset
- Navigate to **Settings** → **Upload**
- Click **Add upload preset**
- Use these settings:
  - **Preset name**: `fanshub_posts`
  - **Signing mode**: `Unsigned` (important for frontend uploads)
  - **Folder**: `fanshub/posts` (optional, for organization)
  - **Tags**: `fanshub,post` (optional, for organization)
  - **Resource type**: `Auto` (to handle images and videos)

### 3. Optional Optimizations
In the same upload preset, you can configure:
- **Quality**: `Auto` (for automatic optimization)
- **Format**: `Auto` (for best format selection)
- **Max file size**: Set appropriate limits (e.g., 10MB)
- **Allowed formats**: jpg, png, gif, webp, mp4, etc.

## 🔧 Current Configuration

Your app is configured with:
- **Cloud Name**: `dut8xkqb8`
- **API Key**: `966631731617248`
- **Upload Preset**: `fanshub_posts` (you need to create this)

## 🎯 What Happens Now

1. **Post Data** → Saved in Firebase Firestore
2. **Images/Videos** → Uploaded to Cloudinary
3. **File URLs** → Cloudinary URLs stored in Firebase

## 🚀 Benefits

- ✅ **Fast CDN delivery** from Cloudinary
- ✅ **Automatic image optimization**
- ✅ **Transform images on-the-fly** (resize, crop, etc.)
- ✅ **Firebase costs reduced** (no storage usage)
- ✅ **Better performance** for image loading
- ✅ **Advanced image features** (filters, effects, etc.)

## 🧪 Testing

After creating the upload preset:
1. Try creating a post with an image
2. Check the browser console for upload progress
3. Verify the image appears correctly
4. Check your Cloudinary media library for uploaded files

## 🔍 Troubleshooting

### Error: "Upload preset not found"
The code now automatically tries multiple preset names in this order:
1. `fanshub_posts` (recommended - create this)
2. `ml_default` (Cloudinary's default preset)
3. `unsigned_preset` (common fallback name)
4. No preset (basic upload)

**Solution**: Create the `fanshub_posts` preset as described above.

### Common Issues:
1. **Verify the upload preset name** is exactly `fanshub_posts`
2. **Make sure it's set to `Unsigned` mode** (not signed)
3. **Check browser console** for detailed error messages
4. **Verify your Cloudinary cloud name** is `dut8xkqb8`
5. **Save the preset** after creating it in the dashboard

### Still Having Issues?
- Check the Network tab in browser dev tools for the exact API response
- Try uploading a smaller image (< 1MB) first
- Verify your Cloudinary account is active and has upload quota remaining

## 🔐 Security Note

The current setup uses unsigned uploads, which is secure for user-generated content. The API secret is not exposed in the frontend code for security reasons.
