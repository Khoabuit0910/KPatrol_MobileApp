# K-Patrol Mobile App

A modern, responsive control dashboard for the K-Patrol smart patrol robot system.

## 🚀 Features

- **Dashboard** - Real-time robot status monitoring
- **Control** - Joystick and D-Pad controls for robot movement
- **Camera** - Live video feed with quality settings
- **History** - Activity logs and patrol history
- **Settings** - Configuration management

## 🎨 Design

- Modern dark theme with Blue + Gray color scheme
- Responsive design for mobile and desktop
- PWA support for mobile installation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Icons**: Lucide React
- **Real-time**: Socket.io Client

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_WS_URL`

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
```

## 📱 PWA

The app supports Progressive Web App installation:
- Add to home screen on mobile devices
- Offline support (coming soon)
- Push notifications (coming soon)

## 📄 License

MIT License - K-Patrol Team
