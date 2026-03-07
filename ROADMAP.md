# Real-Time Chat App: Roadmap & Improvements

This document outlines the current state of the project, identified areas for architectural improvement, and proposed new features to evolve this into a fully functioning, production-ready real-time chat application.

## 🏗️ Current State
- **Frontend Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS & Shadcn UI (Radix UI)
- **Icons**: Lucide React
- **Data & Logic**: Currently using localized mock data (`src/lib/data.ts`) with simulated delays (via `setTimeout`) to mimic real-time network requests and typing indicators.

## 🛠️ Technical Improvements (Architecture & Code Quality)

- [ ] **Global State Management**: Transition from localized React state (`useState`) to a robust global state manager like **Zustand** or **Redux Toolkit** to clean up prop-drilling and manage user sessions, online statuses, and active chats efficiently.
- [ ] **Backend Validation & Database**: Integrate a real database (e.g., **PostgreSQL** via Prisma/Drizzle or **MongoDB**) to persist user profiles, chat history, and friend requests.
- [ ] **Secure Authentication**: Replace static auth forms with a secure authentication provider like **NextAuth.js (Auth.js)**, **Clerk**, or **Supabase Auth** to handle sign-ups, log-ins, and session tokens.
- [ ] **API Layer Setup**: Implement Next.js **Server Actions** or API Routes (`app/api/*`) to handle real database operations (CRUD) securely.
- [ ] **Component Refactoring**: Break down large, complex UI components (like `ChatWindow.tsx`) into smaller, reusable pieces (e.g., extracting message list rendering, input handling, and specific hooks).

## ✨ Proposed New Features

- [ ] **Real-Time Messaging Engine 🚀**: Implement true bidirectional WebSockets communication using **Socket.io**, **Pusher**, or **Supabase Realtime** to replace the current mock simulation.
- [ ] **Media & File Sharing 📎**: Allow users to share images, documents, and media within conversations using cloud storage solutions like **AWS S3**, **Cloudinary**, or **Uploadthing**.
- [ ] **Advanced Chat Indicators 👀**: Build real-time typing indicators broadcasted across connected clients and add sophisticated message delivery/read receipts (Sent -> Delivered -> Read).
- [ ] **WebRTC Video & Audio Calls 📞**: Make the existing UI call buttons fully functional by integrating **WebRTC** (or a managed service like **LiveKit** or **ZegoCloud**) for peer-to-peer media streaming.
- [ ] **Push Notifications 🔔**: Introduce Web Push Notifications via Service Workers to alert users of new messages or friend requests even when the app is minimized or running in the background.
- [ ] **Voice Notes 🎙️**: Add in-app audio recording capabilities (via MediaRecorder API) to the chat input for sending quick voice messages.
- [ ] **End-to-End Encryption (E2EE) 🔒**: Enhance privacy by implementing E2EE using the Web Crypto API, ensuring message contents are encrypted on the client side before ever reaching the server.
