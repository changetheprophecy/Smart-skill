// ============================================================
// MOCK DATA — Smart Skill Exchange
// All data is static/dummy. No backend required.
// ============================================================

export const currentUser = {
  id: 0,
  name: "Alex Rivera",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4",
  bio: "Product designer & photography enthusiast. I love learning new skills and meeting creative minds!",
  location: "San Francisco, CA",
  rating: 4.8,
  reviewCount: 24,
  skillsOffered: ["UI/UX Design", "Figma", "Photography"],
  skillsWanted: ["Python", "Guitar", "Spanish"],
  matchCount: 12,
  joined: "Jan 2024",
};

// Users shown on the swipe page
export const swipeUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffdfbf",
    bio: "Full-stack dev by day, music producer by night. Let's swap skills!",
    location: "New York, NY",
    rating: 4.9,
    reviewCount: 37,
    skillsOffered: ["Python", "Django", "Music Production"],
    skillsWanted: ["UI/UX Design", "Photography", "French"],
    matchPercent: 94,
    joined: "Mar 2023",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=c0aede",
    bio: "Guitar teacher & language lover. Fluent in Spanish, Portuguese, and music!",
    location: "Miami, FL",
    rating: 4.7,
    reviewCount: 19,
    skillsOffered: ["Guitar", "Spanish", "Portuguese"],
    skillsWanted: ["Web Development", "Photography", "Yoga"],
    matchPercent: 88,
    joined: "Jun 2023",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki&backgroundColor=ffd5dc",
    bio: "AI researcher with a passion for origami and Japanese cooking.",
    location: "Seattle, WA",
    rating: 4.6,
    reviewCount: 11,
    skillsOffered: ["Machine Learning", "Python", "Japanese"],
    skillsWanted: ["Figma", "Guitar", "Cooking"],
    matchPercent: 82,
    joined: "Sep 2023",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=d1f0d1",
    bio: "Personal trainer turned entrepreneur. Fitness meets finance!",
    location: "Chicago, IL",
    rating: 4.5,
    reviewCount: 29,
    skillsOffered: ["Personal Training", "Nutrition", "Business Strategy"],
    skillsWanted: ["Graphic Design", "Social Media", "Python"],
    matchPercent: 76,
    joined: "Feb 2024",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&backgroundColor=ffc8e4",
    bio: "French chef & watercolor artist. Art and food are my languages.",
    location: "Austin, TX",
    rating: 4.9,
    reviewCount: 42,
    skillsOffered: ["French Cooking", "Watercolor", "French"],
    skillsWanted: ["Photography", "Video Editing", "Yoga"],
    matchPercent: 71,
    joined: "Nov 2022",
  },
  {
    id: 6,
    name: "Dev Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev&backgroundColor=b6e3f4",
    bio: "iOS developer & tabla player. Bridging tech and tradition.",
    location: "Boston, MA",
    rating: 4.7,
    reviewCount: 16,
    skillsOffered: ["Swift", "iOS Dev", "Tabla"],
    skillsWanted: ["UI/UX Design", "Spanish", "Fitness"],
    matchPercent: 85,
    joined: "Apr 2023",
  },
];

// Matched users shown in the chat sidebar
export const matchedUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffdfbf",
    lastMessage: "Sure! Let's schedule a session 🎵",
    lastTime: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Carlos Mendes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=c0aede",
    lastMessage: "I can teach you guitar on weekends!",
    lastTime: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 6,
    name: "Dev Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev&backgroundColor=b6e3f4",
    lastMessage: "Sounds like a great exchange 👍",
    lastTime: "3h ago",
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=d1f0d1",
    lastMessage: "I'll send over my workout plan",
    lastTime: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Sophie Laurent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie&backgroundColor=ffc8e4",
    lastMessage: "Merci! That photo tip was amazing",
    lastTime: "2d ago",
    unread: 0,
    online: false,
  },
];

// Conversation data keyed by user ID
export const conversations = {
  1: [
    { id: 1, sender: "them", text: "Hey Alex! I saw you're into UI/UX. I've been wanting to learn Figma!", time: "10:02 AM" },
    { id: 2, sender: "me", text: "Hi Priya! Yes! And I've been dying to learn Python. Sounds like a perfect exchange 🎉", time: "10:04 AM" },
    { id: 3, sender: "them", text: "Exactly what I was thinking! I can teach you Python basics and you teach me Figma?", time: "10:05 AM" },
    { id: 4, sender: "me", text: "Deal! When are you free to start? I'm flexible on weekends.", time: "10:07 AM" },
    { id: 5, sender: "them", text: "Saturday afternoons work great for me. How about 2pm your time?", time: "10:09 AM" },
    { id: 6, sender: "me", text: "Perfect! Let's do it. I'll create a Figma workspace for us to use.", time: "10:10 AM" },
    { id: 7, sender: "them", text: "Sure! Let's schedule a session 🎵", time: "10:12 AM" },
  ],
  2: [
    { id: 1, sender: "them", text: "Hola! I noticed you want to learn Spanish. I'm a native speaker!", time: "Yesterday" },
    { id: 2, sender: "me", text: "That's amazing Carlos! I'd love to learn. And I can help with photography if you're interested!", time: "Yesterday" },
    { id: 3, sender: "them", text: "I can teach you guitar on weekends!", time: "Yesterday" },
  ],
  6: [
    { id: 1, sender: "me", text: "Hey Dev! Love that you're into Tabla. I design UI and would love to learn iOS dev.", time: "3h ago" },
    { id: 2, sender: "them", text: "That's perfect! I need someone to help me with my app's UI.", time: "3h ago" },
    { id: 3, sender: "them", text: "Sounds like a great exchange 👍", time: "3h ago" },
  ],
  4: [
    { id: 1, sender: "them", text: "Hey! Saw you need fitness tips. I'm a certified trainer!", time: "Yesterday" },
    { id: 2, sender: "me", text: "Oh wow, that would be incredible! I can help with graphic design in return.", time: "Yesterday" },
    { id: 3, sender: "them", text: "I'll send over my workout plan", time: "Yesterday" },
  ],
  5: [
    { id: 1, sender: "them", text: "Bonjour! Your photography portfolio is stunning!", time: "2d ago" },
    { id: 2, sender: "me", text: "Thank you Sophie! And your watercolors are gorgeous. Maybe we can exchange skills?", time: "2d ago" },
    { id: 3, sender: "them", text: "Merci! That photo tip was amazing", time: "2d ago" },
  ],
};

// Stats for the home page
export const platformStats = [
  { label: "Active Learners", value: "12,400+" },
  { label: "Skills Listed", value: "340+" },
  { label: "Sessions Done", value: "48,000+" },
  { label: "Countries", value: "62" },
];

// Skill categories for the home page
export const skillCategories = [
  { icon: "💻", name: "Technology", count: 89 },
  { icon: "🎨", name: "Creative Arts", count: 64 },
  { icon: "🎵", name: "Music", count: 47 },
  { icon: "🌍", name: "Languages", count: 72 },
  { icon: "🏋️", name: "Fitness", count: 35 },
  { icon: "🍳", name: "Cooking", count: 41 },
];
