# GitHub Repository Setup Guide

## Quick Setup

Your local git repository is already initialized and the initial commit is made! 

## Option 1: Create Repository via GitHub Website (Recommended)

1. **Go to GitHub**: https://github.com/new

2. **Repository Settings**:
   - **Repository name**: `aitasol-education-consultancy` (or your preferred name)
   - **Description**: `Education consultancy website with React Native Web, Firebase, and inline editing`
   - **Visibility**: Choose Public or Private
   - **⚠️ IMPORTANT**: Do NOT check any of these boxes:
     - ❌ Add a README file (we already have one)
     - ❌ Add .gitignore (we already have one)
     - ❌ Choose a license (add later if needed)

3. **Click "Create repository"**

4. **After creating, run these commands**:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/aitasol-education-consultancy.git

# Push your code
git push -u origin main
```

## Option 2: Use the Setup Script

We've created a helper script for you:

```bash
# Run the setup script
./setup-github.sh YOUR_GITHUB_USERNAME REPOSITORY_NAME

# Example:
./setup-github.sh takawiramundure aitasol-education-consultancy
```

Then follow the instructions it prints.

## Option 3: Use GitHub CLI (if installed)

If you have GitHub CLI (`gh`) installed:

```bash
# Create repository and push
gh repo create aitasol-education-consultancy --public --source=. --remote=origin --push
```

## Verify Setup

After pushing, verify everything worked:

```bash
# Check remote
git remote -v

# View commit history
git log --oneline

# Check branch
git branch -a
```

## Next Steps After Pushing

1. **Set up Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `web-build`
   - Add environment variables from `.env`

2. **Configure Firebase Security Rules**:
   - Copy `firestore.rules` to Firebase Console > Firestore > Rules
   - Copy `storage.rules` to Firebase Console > Storage > Rules

3. **Add Repository Badges** (optional):
   - Add badges to README.md for build status, license, etc.

## Troubleshooting

### If push fails with authentication:
```bash
# Use personal access token or SSH
# For HTTPS with token:
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/REPO_NAME.git

# For SSH:
git remote set-url origin git@github.com:YOUR_USERNAME/REPO_NAME.git
```

### If branch name is different:
```bash
# If your default branch is 'master' instead of 'main'
git branch -m main
git push -u origin main
```

### If you need to force push (use with caution):
```bash
git push -u origin main --force
```

## Repository Structure

Your repository includes:
- ✅ Complete source code
- ✅ Configuration files
- ✅ Documentation (README, SETUP, ARCHITECTURE)
- ✅ Firebase security rules
- ✅ Netlify configuration
- ✅ Git ignore file

## Security Notes

⚠️ **Important**: Never commit these files:
- `.env` (already in .gitignore)
- `node_modules/` (already in .gitignore)
- Firebase service account keys
- Any files with API keys or secrets

Your `.gitignore` is already configured to exclude these.

