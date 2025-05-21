import {
  BiBuildingHouse,
  BiBuildings,
  BiFullscreen,
  BiHomeAlt,
  BiMoney,
  BiShieldAlt2,
} from "react-icons/bi";
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaintRoller,
  FaTwitter,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa";
import { FiHeadphones } from "react-icons/fi";


export const testimonials = [
  {
    id: 1,
    name: "Wabz Braize",
    role: "Front-end developer",
    image: "/images/avatar.png",
    reviewText:
      "Working with this team was a fantastic experience. Their attention to detail and innovative design solutions transformed our project into something truly remarkable. Highly recommend their services!",
  },
  {
    id: 2,
    name: "Ethan Hunt",
    role: "Backend engineer",
    image: "/images/avatar-1.png",
    reviewText:
      "The professionalism and expertise of this company made our property development process seamless. They delivered on time and exceeded our expectations with their technical skills.",
  },
  {
    id: 3,
    name: "Raven Kent",
    role: "UI Designer",
    image: "/images/avatar-2.png",
    reviewText:
      "I was impressed by the creativity and dedication of the design team. They brought our vision to life with stunning visuals and a user-friendly interface for our real estate platform.",
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Wabz Braize",
    role: "Front-end developer",
    image: "/images/avatar.png",
  },
  {
    id: 2,
    name: "Ethan Hunt",
    role: "Backend  engineer",
    image: "/images/avatar-1.png",
  },
  {
    id: 3,
    name: "Raven Kent",
    role: "UI Designer",
    image: "/images/avatar-2.png",
  },
  {
    id: 4,
    name: "John Doe",
    role: "Web developer",
    image: "/images/avatar-3.png",
  },
  {
    id: 5,
    name: "John Doe",
    role: "Web developer",
    image: "/images/avatar-3.png",
  },
  {
    id: 6,
    name: "Raven Kent",
    role: "UI Designer",
    image: "/images/avatar-2.png",
  },
  {
    id: 7,
    name: "Ethan Hunt",
    role: "Backend  engineer",
    image: "/images/avatar-1.png",
  },
  {
    id: 8,
    name: "Wabz Braize",
    role: "Front-end developer",
    image: "/images/avatar.png",
  },
];

export const services = [
  {
    id: 1,
    name: "luxury apartment",
    icon: <BiBuildingHouse />,
    text: "We specialize in designing and developing high-end luxury apartments with modern amenities and premium finishes to elevate your living experience.",
  },
  {
    id: 2,
    name: "architectural design",
    icon: <BiFullscreen />,
    text: "Our expert architects create innovative and sustainable designs tailored to your needs, ensuring aesthetic appeal and functional excellence.",
  },
  {
    id: 3,
    name: "extra security",
    icon: <BiShieldAlt2 />,
    text: "We provide advanced security solutions, including 24/7 surveillance and smart home systems, to ensure the safety of your property.",
  },
  {
    id: 4,
    name: "Home remodelling",
    icon: <BiHomeAlt />,
    text: "Transform your home with our comprehensive remodelling services, from modern interiors to energy-efficient upgrades, customized to your style.",
  },
  {
    id: 5,
    name: "office renovation",
    icon: <FaPaintRoller />,
    text: "Revamp your workspace with our office renovation services, designed to enhance productivity and create a professional environment.",
  },
  {
    id: 6,
    name: "24/7 support",
    icon: <FiHeadphones />,
    text: "Our dedicated support team is available around the clock to assist with any questions or concerns about your property needs.",
  },
];

export const projects = [
  {
    id: 1,
    name: "Apartment",
    number: 20,
    image: "/images/property (17).jpg",
  },
  {
    id: 2,
    name: "Office",
    number: 23,
    image: "/images/property (1).jpeg",
  },
  {
    id: 3,
    name: "Townhouse",
    number: 36,
    image: "/images/property (21).jpg",
  },
  {
    id: 4,
    name: "living room",
    number: 12,
    image: "/images/property (1).jpg",
  },
  {
    id: 5,
    name: "Real estate",
    number: 36,
    image: "/images/property (20).jpg",
  },
  {
    id: 6,
    name: "luxury apartment",
    number: 14,
    image: "/images/property (18).jpg",
  },
];

export const brands = [
  "/images/brands/airbnb.png",
  "/images/brands/cisco.png",
  "/images/brands/ebay.png",
  "/images/brands/microsoft.png",
  "/images/brands/uber.png",
];

export const focus = [
  {
    id: 1,
    name: "Buy a New Home",
    icon: <BiHomeAlt />,
    text: "Explore a wide range of properties, from luxury apartments to family homes, with expert guidance to find your perfect home.",
  },
  {
    id: 2,
    name: "Sell a Home",
    icon: <BiMoney />,
    text: "Maximize the value of your property with our professional marketing and sales strategies, ensuring a smooth and profitable sale.",
  },
  {
    id: 4, // Note: ID 3 is skipped in the original; kept as is
    name: "Rent a Home",
    icon: <BiBuildings />,
    text: "Find the ideal rental property, from cozy apartments to spacious townhouses, with flexible terms to suit your lifestyle.",
  },
];

export const categories = [
  {
    id: 1,
    name: "Apartments",
    number: 20,
    image: "/images/property (17).jpg",
  },
  {
    id: 2,
    name: "Offices",
    number: 23,
    image: "/images/property (1).jpeg",
  },
  {
    id: 3,
    name: "Townhouse",
    number: 36,
    image: "/images/property (21).jpg",
  },
  {
    id: 4,
    name: "living room",
    number: 12,
    image: "/images/property (1).jpg",
  },
  {
    id: 5,
    name: "Real estates",
    number: 36,
    image: "/images/property (20).jpg",
  },
  {
    id: 6,
    name: "Condors",
    number: 14,
    image: "/images/property (18).jpg",
  },
];




export const socials = [
  <FaFacebook />,
  <FaTwitter />,
  <FaInstagram />,
  <FaLinkedin />,
  <FaBehance />,
  <FaDribbble />,
  <FaYoutube />,
  <FaVimeo />,
];

export const ratings = [
  {
    id: 1,
    image: "/images/property (14).jpg",
    rating: 4.3,
    name: "Luxury mansion in Oregon",
    price: "450, 000",
  },
  {
    id: 2,
    image: "/images/property (26).jpg",
    rating: 4.3,
    name: "Luxury mansion in Oregon",
    price: "450, 000",
  },
  {
    id: 3,
    image: "/images/property (16).jpg",
    rating: 4.3,
    name: "Luxury mansion in Oregon",
    price: "450, 000",
  },
  {
    id: 4,
    image: "/images/property (18).jpg",
    rating: 4.3,
    name: "Luxury mansion in Oregon",
    price: "450, 000",
  },
];


export const faqs = [
  {
    id: 1,
    question: "How can we help?",
    response:
      "We offer a full range of real estate services, including property buying, selling, renting, and renovation. Our team provides personalized guidance to help you achieve your property goals, whether you're a first-time buyer or an experienced investor.",
  },
  {
    id: 2,
    question: "How can I make a refund from your website?",
    response:
      "To request a refund, please contact our support team via email or phone within 30 days of your purchase. Provide your order details, and we’ll guide you through the process to ensure a smooth resolution.",
  },
  {
    id: 3,
    question: "Do you store any of my information?",
    response:
      "We prioritize your privacy. Any personal information you provide is securely stored and used only to process your transactions or provide services, in compliance with data protection regulations.",
  },
  {
    id: 4,
    question: "Should I talk to the bank before booking a home?",
    response:
      "Yes, we recommend consulting your bank or a financial advisor to secure pre-approval for a mortgage. This helps you understand your budget and streamlines the home-buying process.",
  },
  {
    id: 5,
    question: "How do I make payments using my credit card?",
    response:
      "You can make payments securely on our website by selecting the credit card option at checkout. Enter your card details, and our encrypted payment system will process the transaction instantly.",
  },
  {
    id: 6,
    question: "How do I link multiple accounts with my phone?",
    response:
      "To link multiple accounts, log in to our platform and navigate to the account settings. Use the 'Link Account' feature to add additional profiles, which can all be managed with a single phone number.",
  },
];
