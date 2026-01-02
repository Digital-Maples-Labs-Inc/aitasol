#!/bin/bash

# Script to set up GitHub repository and push code
# Usage: ./setup-github.sh <your-github-username> <repository-name>

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./setup-github.sh <your-github-username> <repository-name>"
  echo "Example: ./setup-github.sh takawiramundure aitasol-education-consultancy"
  exit 1
fi

GITHUB_USER=$1
REPO_NAME=$2

echo "Setting up GitHub repository..."
echo "Repository: $GITHUB_USER/$REPO_NAME"

# Add remote origin
git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git 2>/dev/null || git remote set-url origin https://github.com/$GITHUB_USER/$REPO_NAME.git

echo ""
echo "✅ Remote added: https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo ""
echo "Next steps:"
echo "1. Create the repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: $REPO_NAME"
echo "   - Description: Education consultancy website with React Native Web, Firebase, and inline editing"
echo "   - Visibility: Choose Public or Private"
echo "   - DO NOT initialize with README, .gitignore, or license (we already have these)"
echo "   - Click 'Create repository'"
echo ""
echo "2. Push your code:"
echo "   git push -u origin main"
echo ""
echo "Or if you prefer SSH:"
echo "   git remote set-url origin git@github.com:$GITHUB_USER/$REPO_NAME.git"
echo "   git push -u origin main"

