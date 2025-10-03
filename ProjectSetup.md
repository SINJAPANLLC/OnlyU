# 🚀 Mobile App Clone Setup Guide

Follow these steps to create your React app with Tailwind CSS v3 and Framer Motion.

## 📋 Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

## 🛠️ Step-by-Step Setup

### 1. Create the Project Directory
```bash
# Create and navigate to project folder
mkdir fans_hub
cd fans_hub
```

### 2. Initialize React App
```bash

# Or if you want to create in a new directory:
npx create-react-app fans_hub
cd fans_hub
```

### 3. Install Required Dependencies
```bash
# Install Tailwind CSS v3 (specific version)
npm install -D tailwindcss@3.4.10 postcss autoprefixer

# Initialize Tailwind config
npx tailwindcss init -p

# Install Framer Motion for animations
npm install framer-motion

# Install Lucide React for icons
npm install lucide-react
```

### 4. Project Structure
Create the following folder structure:
```
mobile-app-clone/
├── public/
├── src/
│   ├── components/
│   │   └── MobileAppHeader.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

### 5. Replace/Create Files
Replace or create the following files with the content provided in the artifacts:

1. **tailwind.config.js** - Tail