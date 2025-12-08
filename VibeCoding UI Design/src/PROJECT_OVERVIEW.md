# SeranGo - AI-Powered Trip Planning Platform

## Overview
SeranGo is a comprehensive web platform that connects travelers with local guides using AI-powered trip planning. The application supports three user roles: Tourists (local travelers), Foreigners (international travelers/guides), and Admins (platform management).

## Brand Identity
- **App Name**: SeranGo
- **Primary Color**: #F7A160 (Warm Orange)
- **Secondary Color**: #F7DC79 (Soft Yellow)
- **Gradient**: `linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)`

## User Roles

### Tourist
- Local traveler exploring their region
- Create AI-generated itineraries
- Browse and select guides
- Communicate with guides via chat
- Verify guide identity with QR codes
- Leave reviews after trips

### Foreigner
- International traveler or foreign guide
- Access to all tourist features
- Can work as a guide
- Manage guide profile and certifications

### Admin
- Platform management dashboard
- Verify and approve guides
- Handle disputes between tourists and guides
- View platform analytics and reports
- Flag policy violations

## Key Features

### Authentication Flow
1. **Role Selection**: Choose between Tourist, Foreigner, or Admin
2. **Login**: Role-specific authentication
3. **Signup**: Account creation with role selection

### Core Tourist/Foreigner Features
- **AI Trip Planner**: Input dates, destination, preferences, and budget
- **Itinerary Preview**: View AI-generated day-by-day plans with costs
- **Guide Marketplace**: Browse guides with ratings, bids, certifications, and languages
- **Real-time Chat**: Communicate with selected guides
- **Flight Notifications**: Receive updates on flight delays/cancellations
- **QR Verification**: Scan guide's QR code on arrival for identity verification
- **Reviews & Photos**: Upload trip photos and leave detailed reviews
- **Dashboard**: Manage all trips with status tracking

### Trip Status System
- **Draft** (Grey): Incomplete planning
- **Upcoming** (Orange #F7A160): Confirmed and scheduled
- **Postponed** (Yellow): Flight delayed or rescheduled
- **Completed** (Green): Trip finished
- **Cancelled** (Red): Trip cancelled

### Admin Features
- **Guide Verification**: Review and approve guide applications with documents
- **Dispute Management**: Investigate and resolve conflicts
- **Platform Analytics**: View trips, revenue, and user statistics
- **User Management**: Monitor platform activity

## Pages & Screens

### Public Pages
1. **Role Selection** - Landing page for role choice
2. **Login** - Role-specific authentication
3. **Signup** - Account creation with role picker

### Tourist/Foreigner Pages
4. **Landing/Home** - Hero section with features and CTAs
5. **Trip Planner Form** - Dates, destination, preferences, budget input
6. **Itinerary Preview** - AI-generated plans with confirmation
7. **Guide Marketplace** - Browse and select guides
8. **Chat** - Real-time messaging
9. **Notifications Center** - Flight alerts and trip updates
10. **Dashboard** - Trip management and tracking
11. **QR Verification** - Camera scanner for guide verification
12. **Reviews Gallery** - Post-trip reviews with photos

### Admin Pages
13. **Admin Dashboard** - Platform overview and management

## Technical Stack
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **State Management**: React useState hooks

## Design Principles
- Clean, minimal, high-trust aesthetic
- Card-based sections with soft shadows
- Rounded corners throughout
- Generous spacing and clear visual hierarchy
- Desktop-first with responsive design
- Gradient accents for primary actions

## Status Notifications
- Flight changes automatically update trip status
- Real-time notifications for important events
- Alert badges for urgent items
- Color-coded status chips for quick scanning

## Security Features
- QR code verification for guide identity
- Role-based access control
- Admin dispute resolution
- Certification verification for guides

---

Built with modern web technologies for seamless travel planning experiences.
