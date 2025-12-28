#!/bin/bash

# K-Patrol Mobile App - Git Push Script
# This script creates organized commits for the mobile-app changes

set -e

# Navigate to mobile-app root directory (parent of scripts folder)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "🚀 K-Patrol Mobile App - Git Push Script"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to commit files
commit_files() {
    local message="$1"
    shift
    local files=("$@")
    
    # Check if any files exist and have changes
    local has_changes=false
    for file in "${files[@]}"; do
        if [[ -f "$file" ]] || [[ -d "$file" ]]; then
            if git status --porcelain "$file" 2>/dev/null | grep -q .; then
                has_changes=true
                break
            fi
        fi
    done
    
    if [[ "$has_changes" == true ]]; then
        for file in "${files[@]}"; do
            if [[ -f "$file" ]] || [[ -d "$file" ]]; then
                git add "$file" 2>/dev/null || true
            fi
        done
        
        if git diff --cached --quiet; then
            echo -e "${YELLOW}⏭️  Skip: $message (no changes)${NC}"
        else
            git commit -m "$message"
            echo -e "${GREEN}✅ Committed: $message${NC}"
        fi
    else
        echo -e "${YELLOW}⏭️  Skip: $message (files not found)${NC}"
    fi
}

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}❌ Not a git repository${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Working directory: $(pwd)${NC}"
echo ""

# Start committing
echo -e "${BLUE}📝 Creating commits...${NC}"
echo ""

# 1. Config files
commit_files "chore: update next.config.js for Netlify deployment" \
    "next.config.js"

commit_files "chore: add netlify.toml configuration" \
    "netlify.toml"

commit_files "docs: add README.md documentation" \
    "README.md"

commit_files "chore: add environment files" \
    ".env.local" ".env.example"

# 2. Tailwind & CSS
commit_files "style: update tailwind.config.ts with Blue+Gray theme" \
    "tailwind.config.ts"

commit_files "style: update globals.css with new theme components" \
    "src/app/globals.css"

# 3. UI Components
commit_files "feat(ui): add Button component with variants" \
    "src/components/ui/Button.tsx"

commit_files "feat(ui): add Card component family" \
    "src/components/ui/Card.tsx"

commit_files "feat(ui): add Input and Textarea components" \
    "src/components/ui/Input.tsx"

commit_files "feat(ui): add Badge and StatusBadge components" \
    "src/components/ui/Badge.tsx"

commit_files "feat(ui): add Modal and ConfirmDialog components" \
    "src/components/ui/Modal.tsx"

commit_files "feat(ui): add Toast notification system" \
    "src/components/ui/Toast.tsx"

commit_files "feat(ui): add Progress bar components" \
    "src/components/ui/Progress.tsx"

commit_files "feat(ui): add UI components index export" \
    "src/components/ui/index.ts"

# 4. Layout Components
commit_files "feat(layout): update Header with notifications dropdown" \
    "src/components/layout/Header.tsx"

commit_files "feat(layout): update Sidebar with robot status panel" \
    "src/components/layout/Sidebar.tsx"

# 5. View Components
commit_files "feat(views): update DashboardView with new theme" \
    "src/components/views/DashboardView.tsx"

commit_files "feat(views): update ControlView with Joystick fix" \
    "src/components/views/ControlView.tsx"

commit_files "feat(views): update CameraView with settings panel" \
    "src/components/views/CameraView.tsx"

commit_files "feat(views): update HistoryView with filters" \
    "src/components/views/HistoryView.tsx"

commit_files "feat(views): update SettingsView with full options" \
    "src/components/views/SettingsView.tsx"

# 6. Store
commit_files "feat(store): enhance robotStore with full state" \
    "src/store/robotStore.ts"

# 7. Hooks
commit_files "feat(hooks): add useSocket WebSocket hook" \
    "src/hooks/useSocket.ts"

commit_files "feat(hooks): add useAuth authentication hook" \
    "src/hooks/useAuth.ts"

commit_files "feat(hooks): add hooks index export" \
    "src/hooks/index.ts"

# 8. Providers
commit_files "feat(providers): add SocketProvider context" \
    "src/providers/SocketProvider.tsx"

commit_files "feat(providers): add AuthProvider context" \
    "src/providers/AuthProvider.tsx"

commit_files "feat(providers): add providers index export" \
    "src/providers/index.ts"

# 9. Auth Pages
commit_files "feat(auth): add Login page with branding" \
    "src/app/login/page.tsx"

commit_files "feat(auth): add Register page with validation" \
    "src/app/register/page.tsx"

commit_files "feat(auth): add Forgot Password page" \
    "src/app/forgot-password/page.tsx"

# 10. App Core
commit_files "feat(app): update layout with ToastProvider" \
    "src/app/layout.tsx"

commit_files "feat(app): update main page component" \
    "src/app/page.tsx"

# 11. Public assets
commit_files "feat(assets): add KPatrol logo files" \
    "public/logo.png" "public/logo_with_branchname.png"

commit_files "feat(pwa): add manifest.json for PWA support" \
    "public/manifest.json"

# 12. Remaining files
commit_files "chore: update package.json dependencies" \
    "package.json"

# Commit any remaining changes
if ! git diff --quiet || ! git diff --cached --quiet; then
    git add -A
    git commit -m "chore: miscellaneous updates and fixes"
    echo -e "${GREEN}✅ Committed: miscellaneous updates${NC}"
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ All commits created successfully!${NC}"
echo ""

# Show commit log
echo -e "${BLUE}📋 Recent commits:${NC}"
git log --oneline -20

echo ""
echo -e "${YELLOW}📤 To push to GitHub, run:${NC}"
echo "   git push origin main"
echo ""
echo -e "${YELLOW}🌐 To deploy on Netlify:${NC}"
echo "   1. Connect repo to Netlify"
echo "   2. Set build command: npm run build"
echo "   3. Set publish directory: .next"
echo ""
