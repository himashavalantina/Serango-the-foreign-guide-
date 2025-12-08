# SeranGo - Complete UI/UX Specification

## System Overview

**SeranGo** is a comprehensive AI-powered trip planning platform that connects tourists with local guides through intelligent itinerary generation, marketplace bidding, and real-time communication. The platform supports three distinct user roles with dedicated interfaces and features.

---

## Brand Identity

### Colors
- **Primary Orange**: `#F7A160` - Main brand color for primary actions, headings
- **Primary Yellow**: `#F7DC79` - Secondary brand color for highlights and accents
- **Background**: `#FEFCF8` (Ivory/Off-white) - Warm, soft background
- **Error Red**: `#EF4444` - Cancelled status, warnings

### Gradient Patterns
- **Tourist/General**: `linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)`
- **Admin**: `linear-gradient(90deg, #F7A160 0%, #F7DC79 100%)`

### Typography
- Clean, modern sans-serif fonts
- No custom font sizes unless user-specified
- Generous line-height and spacing for readability

### Design Language
- Rounded corners (8-12px radius)
- Soft elevation shadows
- Pastel card backgrounds
- Travel-friendly aesthetic
- Desktop-first with full mobile responsiveness

---

## User Roles

### 1. Tourist
**Description**: Travelers looking to explore destinations with personalized experiences

**Key Features**:
- AI-powered trip planning
- Browse destinations with sustainability scores
- View and compare guide bids
- Real-time chat with guides
- Flight delay notifications
- QR code verification of guides
- Post-trip reviews with photos

### 2. Guide
**Description**: Local experts offering tours and experiences

**Key Features**:
- Browse trip requests and submit bids
- Manage assigned trips
- Personal QR code for tourist verification
- Real-time chat with tourists
- View earnings and reviews
- Trip management dashboard

### 3. Admin
**Description**: Platform managers overseeing operations and quality

**Key Features**:
- Destination management with sustainability scoring
- Guide verification and approval
- Dispute resolution
- Flight notification controller
- System analytics and monitoring
- Platform reports and metrics

---

## Status System

### Trip Status Chips
- **Draft** - Grey (`#9CA3AF`) - Incomplete planning
- **Upcoming** - Orange (`#F7A160`) - Confirmed and scheduled
- **Postponed** - Yellow (`#F7DC79`) - Flight delayed/rescheduled
- **Completed** - Yellow (`#F7DC79`) - Trip finished
- **Cancelled** - Red (`#EF4444`) - Trip cancelled

### Sustainability Scores (0-100)
- **80-100** - Excellent (Yellow `#F7DC79`)
- **60-79** - Good (Yellow `#F7DC79`)
- **40-59** - Fair (Orange `#F7A160`)
- **0-39** - Needs Improvement (Red `#EF4444`)

---

## Complete Page Structure

### Public Pages

#### `/` - Landing Page
**Purpose**: Homepage with brand introduction and feature showcase

**Components**:
- Hero section with animated headline (Motion/Framer Motion)
- Background image with overlay
- CTA: "Plan Trip with AI" button
- 5 feature cards in grid:
  - AI-Powered Planning
  - Expert Local Guides
  - QR Verification
  - Trusted Reviews
  - Sustainable Travel
- Call-to-action section with gradient background
- Responsive grid layout

**Navigation**: None (guest view)

---

### Authentication Pages

#### `/login` - Login (Role-Specific)
**Purpose**: Authenticate users based on selected role

**Variants**:
- Tourist login (`/login?role=tourist`)
- Guide login (`/guide/login`)
- Admin login (`/admin/login`)

**Components**:
- Role-specific icon and color
- Email and password inputs
- Remember me checkbox
- Forgot password link
- Sign up redirect link
- Back to role selection button

**Routing**:
- Tourist → `/home`
- Guide → `/guide/dashboard`
- Admin → `/admin/dashboard`

#### `/signup` - Signup
**Purpose**: New user registration with role selection

**Components**:
- Inline role selection (Tourist/Guide/Admin) with radio buttons
- Full name input
- Email input
- Password and confirm password
- Terms & conditions checkbox
- Submit button with gradient

**Features**:
- Role-based routing after signup
- Visual role indicators with icons and colors

#### `/role-selection` - Role Selection
**Purpose**: Entry point for choosing user role

**Components**:
- 3 large role cards in grid:
  - **Tourist** - User icon, Purple
  - **Guide** - Globe icon, Orange
  - **Admin** - Shield icon, Yellow
- Each card shows role description
- Hover effects and animations
- SeranGo logo and tagline at top

---

### Tourist Pages

#### `/plan` - AI Trip Planner Form
**Purpose**: Input trip details for AI itinerary generation

**Form Fields**:
- Arrival date & time (date + time inputs)
- Departure date & time (date + time inputs)
- Destination (text input with suggestions)
- Group size (select dropdown: Solo, 2, 3-5, 6+)
- Budget per person (select: Budget $0-500, Moderate $500-1500, Luxury $1500+)
- Areas & activities (checkboxes):
  - Historical Sites
  - Museums & Art
  - Food & Dining
  - Nature & Parks
  - Shopping
  - Nightlife
  - Architecture
  - Local Culture
- Additional preferences (textarea)

**Actions**:
- "Generate AI Itinerary" button → `/itinerary`

#### `/itinerary` - AI-Generated Itinerary Preview
**Purpose**: Display personalized day-by-day itinerary

**Components**:
- Page header with Sparkles icon
- Trip summary (destination, dates, group size)
- Estimated total cost card with DollarSign icon
- Day-by-day accordion cards:
  - Purple header with day and date
  - Activity list with:
    - Time
    - Title
    - Duration
    - Cost
    - Icons (Clock, DollarSign)
  - Separators between activities
- Bottom CTAs:
  - "Modify Itinerary"
  - "Confirm & Find Guides" → `/marketplace`

#### `/destinations` - Destinations Browser
**Purpose**: Explore destinations with sustainability information

**Features**:
- Tab navigation: Trending / New / All Destinations
- Destination cards in grid (3 columns):
  - Hero image
  - Destination name and country
  - **Sustainability Score** component
  - Badge: Trending or New
  - Number of guides available
  - Average price (from)
  - "Plan Trip" button
- Filters and sorting options

**Sustainability Score Display**:
- Leaf icon
- Score value (0-100)
- Color-coded label (Excellent/Good/Fair/Needs Improvement)

#### `/bids` - Guide Bids Comparison
**Purpose**: Review and compare bids from guides

**Components**:
- Trip request summary card:
  - Destination, dates, group size
  - Badge showing number of bids received
- Bid cards (stacked vertically):
  - Guide avatar and name
  - Star rating and review count
  - Certifications badges
  - Languages spoken
  - Bid amount (large, purple)
  - Personal message from guide
  - Timestamp
  - Actions: Message, View Profile, Accept Bid

**Interactions**:
- Accept bid → `/dashboard`
- Message → `/chat`

#### `/marketplace` - Guide Marketplace
**Purpose**: Browse available guides

**Components**:
- Page header with trip summary
- Guide cards in grid (2 columns):
  - Guide photo and name
  - Rating and reviews
  - Experience years
  - Certifications badges
  - Languages badges (mint green)
  - Specialties/areas
  - Bid amount per person (highlighted)
  - Actions: Message, Select Guide

#### `/dashboard` - Tourist Trip Dashboard
**Purpose**: Manage all trips and bookings

**Components**:
- Stats cards (grid):
  - Upcoming Trips (Purple)
  - Completed Trips (Green)
  - Total Spent (Blue)
- "Plan New Trip" button (gradient)
- Trip cards by status:
  - Status chip
  - Destination and dates
  - Guide info with avatar
  - Actions based on status:
    - Upcoming: View Itinerary, Chat, QR Scan
    - Completed: Leave Review

#### `/notifications` - Flight & Trip Notifications
**Purpose**: View flight status and trip alerts

**Notification Types**:
- Flight delay/cancellation
- Booking confirmation
- Guide assignment
- Trip reminders
- Review requests

**Components**:
- Notification cards:
  - Icon with color coding
  - Title and message
  - Timestamp
  - Related trip ID
  - Status chip
  - Action buttons

#### `/chat` - Real-time Messaging
**Purpose**: Communicate with guides

**Layout**:
- Left sidebar: Conversation list with avatars
- Main area: Active conversation
  - Message bubbles (self = gradient, other = grey)
  - Timestamps
  - Send button with gradient

#### `/qr-scan` - QR Code Verification
**Purpose**: Scan guide's QR code on arrival

**Flow**:
1. Instructions card with numbered steps
2. "Ready to Verify?" call-to-action
3. "Scan QR Code" button → Camera view
4. Camera overlay with purple border
5. Success screen with guide info and checkmark

#### `/reviews` - Post-Trip Reviews & Photos
**Purpose**: Leave feedback and upload trip photos

**Components**:
- Trip selector dropdown
- Star rating (1-5)
- Review textarea
- Photo upload (drag & drop, border hover = purple)
- Category ratings:
  - Communication
  - Knowledge
  - Punctuality
  - Value
- Submit button (gradient)

---

### Guide Pages

#### `/guide/dashboard` - Guide Dashboard
**Purpose**: Overview of guide activity and earnings

**Stats Cards** (4 columns):
- Active Bids (Purple) - DollarSign icon
- Assigned Trips (Orange) - Calendar icon
- Total Earnings (Green) - TrendingUp icon
- Average Rating (Yellow) - Star icon

**Active Bids Section**:
- List of pending bids
- Tourist name and destination
- Group size and dates
- Your bid amount
- "Edit Bid" button
- "View All" link → `/guide/bids`

**Assigned Trips Section**:
- Upcoming confirmed trips
- Trip ID and status chip
- Tourist name and destination
- Days until trip starts (if <7 days)
- Earnings amount (green)
- Actions: Message, View Details
- "View All" link → `/guide/assigned`

**Quick Actions** (3 cards):
- Manage Bids
- My QR Code → `/guide/qr`
- My Reviews → `/guide/reviews`

#### `/guide/bids` - Manage Guide Bids
**Purpose**: Browse trip requests and submit/manage bids

**My Active Bids**:
- Current bids with status (Pending/Accepted/Rejected)
- Edit or withdraw options

**Available Trip Requests**:
- Trip request cards:
  - Destination and duration
  - Dates and group size
  - Budget range
  - Tourist preferences
  - "Submit Bid" button → Bid dialog

**Bid Submission Dialog**:
- Bid amount input
- Message to tourist textarea
- Submit button

#### `/guide/assigned` - Assigned Trips
**Purpose**: Manage confirmed trips and tourist details

**Trip Cards**:
- Trip ID and status
- Days until start (if upcoming)
- Earnings amount
- Trip details column:
  - Destination
  - Dates
  - Group size
  - Meeting point and time
- Tourist contact column:
  - Email
  - Phone
  - Special requests
- Actions:
  - Message Tourist
  - Show My QR Code (if starting soon)
  - View Trip Summary (if completed)

#### `/guide/qr` - Guide QR Code Page
**Purpose**: Display guide's verification QR code

**Components**:
- Large QR code display (fake/placeholder)
- Gradient border (Purple to Orange)
- Guide name and ID
- Active & Verified status badge
- Download and Share buttons
- Instructions card with 4 numbered steps

#### `/guide/reviews` - Guide Reviews
**Purpose**: View feedback from tourists

**Rating Overview Card**:
- Large average rating number (Yellow)
- 5-star display
- Total reviews count
- Rating breakdown bars (5-star to 1-star)

**Reviews List**:
- Tourist avatar and name
- Destination and trip date
- Star rating
- Review text
- Photos (if attached)
- Helpful count

---

### Admin Pages

#### `/admin/dashboard` - Admin Dashboard
**Purpose**: Platform overview and management hub

**Stats Cards** (4 columns):
- Total Users (Purple)
- Active Guides (Orange)
- Pending Verifications (Yellow)
- Open Disputes (Red)

**Pending Guide Verifications**:
- Guide cards with:
  - Name, location, experience
  - Documents uploaded count
  - Certifications
  - Actions: Review, Reject, Approve

**Active Disputes**:
- Dispute cards with:
  - Trip ID and status badge
  - Tourist vs Guide
  - Reason for dispute
  - Timestamp
  - "Investigate" button

**Platform Reports**:
- Monthly rows with:
  - Month
  - Trips count
  - Revenue (green)
  - "View Details" button

**Quick Actions** (3 cards):
- Manage Destinations → `/admin/destinations`
- Manage Guides → `/admin/guides`
- Flight Notifications → `/admin/notifications`

#### `/admin/destinations` - Destination Management
**Purpose**: Update destinations and sustainability scores

**Components**:
- "Add Destination" button (gradient)
- Destination cards:
  - Name with MapPin icon
  - Trending and Featured badges
  - **Sustainability Score** (editable)
  - Verified guides count
  - Active trips count
  - Status badge
  - Actions: Edit, Delete

**Edit Destination Dialog**:
- Name input
- Sustainability slider (0-100)
- Mark as Trending toggle
- Mark as Featured toggle
- Save button

#### `/admin/guides` - Guide Management
**Purpose**: Verify, monitor, and manage guides

**Tabs**:
- Pending (verification queue)
- Active (approved guides)
- Flagged (reported guides)

**Pending Tab**:
- Guide cards with:
  - Avatar and basic info
  - Languages and experience
  - Certifications
  - Documents count
  - Actions: View Documents, Reject, Approve Guide

**Active Tab**:
- Guide performance cards:
  - Rating and reviews
  - Active trips
  - Total earnings
  - Languages
  - Actions: View Profile, View Trips, Deactivate

**Flagged Tab**:
- Warning-styled cards (red border):
  - Number of reports
  - Reason/complaint
  - Last incident date
  - Actions: View Reports, Contact, Suspend Account

#### `/admin/notifications` - Flight Notification Management
**Purpose**: Monitor flights and send alerts to tourists

**Active Flights Table**:
- Flight number and route
- Status (On-time / Delayed / Cancelled)
- Delay duration (if applicable)
- Affected tourists and trips count
- Scheduled departure time
- Actions: Send Update, View Affected Trips

**Send Custom Alert Dialog**:
- Flight number input
- Alert type select (Delay / Cancellation / Gate Change / Boarding)
- Message textarea
- Send button

**Recent Notifications**:
- Alert history cards:
  - Alert type badge (Delay = Yellow, Cancellation = Red)
  - Flight number
  - Message sent
  - Recipients count
  - Timestamp

---

## Navigation Structures

### Tourist Navigation Bar
**Logo**: SeranGo (Purple) with Plane icon (Gradient background)

**Links**:
- Destinations
- My Trips
- Notifications
- Messages

### Guide Navigation Bar
**Logo**: SeranGo Guide (Purple) with Plane icon (Purple-Orange gradient)

**Links**:
- Dashboard
- Bids
- Assigned
- Messages
- Logout

### Admin Navigation Bar
**Logo**: SeranGo Admin (Purple) with Shield icon (Purple-Yellow gradient)

**Links**:
- Dashboard
- Destinations
- Guides
- Notifications
- Logout

---

## Key Component Specifications

### SustainabilityScore Component
**Props**:
- `score: number` (0-100)
- `size: "sm" | "md" | "lg"`
- `showLabel: boolean`

**Rendering**:
- Leaf icon (color-coded by score)
- Score value (e.g., "85/100")
- Label (Excellent/Good/Fair/Needs Improvement)
- Rounded pill background with opacity

### StatusChip Component
**Props**:
- `status: "draft" | "upcoming" | "postponed" | "completed" | "cancelled"`

**Styles**:
- Color-coded badges
- Icon optional (Clock for postponed, Check for completed, etc.)

### ImageWithFallback Component
**Purpose**: Display images with fallback handling
**Usage**: All user-generated or external images

---

## Animations & Interactions

### Motion/Framer Motion Usage
**Landing Page Hero**:
- Headline: Fade up with stagger
- Subtitle: Fade up with delay
- CTA button: Fade up with delay

**Feature Cards**:
- Fade up on scroll (viewport trigger)
- Stagger by 0.1s per card

**CTA Section**:
- Scale up on scroll

### Hover States
- Cards: Increase shadow intensity
- Buttons: Slight scale or brightness shift
- Destination cards: Image scale effect

### Transitions
- Page transitions: Smooth fade
- Tab changes: Fade content
- Dialog/modal: Fade + scale

---

## Responsive Behavior

### Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: 0 - 767px

### Grid Adaptations
- 4-column stats → 2-column → 1-column
- 3-column destinations → 2-column → 1-column
- 2-column marketplace → 1-column

### Navigation
- Desktop: Full horizontal nav
- Mobile: Hamburger menu (if needed) or bottom nav

---

## Flight Postponement Logic

### When a Flight is Delayed/Cancelled:
1. Admin updates flight status in `/admin/notifications`
2. System identifies affected trips
3. Automated notifications sent to:
   - Tourists (via `/notifications`)
   - Guides (via their notification center)
4. Trip status automatically changes to **Postponed** (Yellow)
5. **Itinerary is NOT auto-changed** - flagged for manual review
6. Tourist and guide can coordinate new schedule via chat

---

## Real-time Chat Features

### Message Types
- Text messages
- System notifications (booking confirmed, QR verified, etc.)

### UI Elements
- Conversation list with unread badges
- Active chat view with message history
- Input field with send button
- Timestamp display
- Self messages: Gradient background
- Other messages: Grey background

---

## QR Code Verification Flow

### Tourist Side (`/qr-scan`):
1. View instructions
2. Click "Scan QR Code"
3. Camera opens with purple overlay
4. Scan guide's QR
5. Success: Display verified guide info

### Guide Side (`/guide/qr`):
1. Display QR code prominently
2. Show guide ID and status
3. Download/share options
4. Instructions for tourists

---

## Post-Trip Reviews

### Review Submission (`/reviews`):
- Trip selector (completed trips only)
- 1-5 star rating
- Written review (textarea)
- Photo upload (drag & drop)
- Category ratings (optional):
  - Communication
  - Knowledge
  - Punctuality
  - Value for Money

### Review Display (Guide/Admin view):
- Tourist info
- Star rating
- Review text
- Photos (thumbnail grid)
- Helpful count
- Date

---

## Technology Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** v4.0
- **Shadcn/ui** component library
- **Motion/React** (Framer Motion) for animations
- **Lucide React** for icons

### UI Patterns
- Card-based layouts
- Modal dialogs for forms
- Tabs for multi-view pages
- Accordions for itineraries
- Badges for status and tags
- Avatar components for users

---

## Design Tokens (CSS Variables)

```css
--primary-orange: #F7A160
--secondary-orange: #F7A160
--secondary-yellow: #F7DC79
--bg-ivory: #FEFCF8
--success-yellow: #F7DC79
--error-red: #EF4444
--grey-draft: #9CA3AF
```

---

## Accessibility Considerations

- Proper heading hierarchy
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Focus indicators on all interactive elements
- Alt text for all images

---

## Mock Data & Placeholders

### Sample Destinations
- Santorini, Greece - Sustainability: 85
- Kyoto, Japan - Sustainability: 92
- Lisbon, Portugal - Sustainability: 78
- Paris, France - Sustainability: 72
- Barcelona, Spain - Sustainability: 68
- Reykjavik, Iceland - Sustainability: 95
- Bali, Indonesia - Sustainability: 56
- Dubai, UAE - Sustainability: 48

### Sample Guides
- Sophie Martin (Paris) - Rating: 4.9, 127 reviews
- Maria Garcia (Barcelona) - Rating: 4.8, 102 reviews
- Yuki Tanaka (Tokyo) - Rating: 4.8, 95 reviews
- Ahmed Hassan (Cairo) - Rating: 4.7, 89 reviews

---

## Future Enhancements (Out of Scope)

- Real backend integration
- Actual payment processing
- Live QR code generation
- Real-time WebSocket chat
- Map integration
- Multi-language support
- Mobile native apps
- AI model integration for itinerary generation

---

This specification represents the complete SeranGo platform UI/UX with all requested features integrated and structured for implementation.
