import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "/features" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About us", href: "about-us" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Custom Floral Arrangements",
    description:
      "Create stunning and personalized floral arrangements effortlessly with our intuitive design tools.",
  },
  {
    icon: < BatteryCharging/>,
    text: "Seasonal Flower Options",
    description:
      "Choose from a diverse range of seasonal flowers to match any occasion or time of year, ensuring your arrangements are always fresh and relevant.",
  },
  {
    icon: < Fingerprint />,
    text: "Pre-Made Designs",
    description:
      "Get inspired and start quickly with a selection of beautifully crafted pre-made floral designs for every event and celebration.",
  },
  {
    icon: <ShieldHalf />,
    text: "Real-Time Floral Preview",
    description:
      "See your flower arrangements come to life in real-time, allowing you to make adjustments and see instant results as you design.",
  },
  {
    icon: < PlugZap/>,
    text: "Collaborative Flower Design",
    description:
      "Work with others to create exquisite floral arrangements, sharing ideas and making collaborative adjustments seamlessly.",
  },
  {
    icon: < GlobeLock/>,
    text: "Floral Trends Dashboard",
    description:
      "Access insights into popular floral trends and customer preferences with our integrated trends dashboard, helping you stay ahead in the floral industry.",
  },
];


export const checklistItems = [
  {
    title: "Effortless Flower Arrangement",
    description:
      "Create stunning floral arrangements with ease and showcase the beauty of nature's finest blooms.",
  },
  {
    title: "Review Flower Designs with Confidence",
    description:
      "Ensure your floral designs meet the highest standards with our intuitive review tools.",
  },
  {
    title: "AI-Powered Floral Suggestions",
    description:
      "Receive intelligent recommendations for flower combinations and arrangements to save time and enhance creativity.",
  },
  {
    title: "Share Your Floral Creations Quickly",
    description:
      "Easily share your beautiful floral arrangements with friends and clients, making every occasion special.",
  },
];


export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
