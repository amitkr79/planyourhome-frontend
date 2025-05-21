import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import BackToTopButton from "./components/common/BackToTopButton";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import AdminPannel from "./pages/AdminPannel";
import {
  About,
  Services,
  Contact,
  Portifolio,
  Team,
  Faqs,
  PageNotFound,
  Home,
} from "./pages";
import { closeDropdown } from "./features/uiSlice";
import Dropdown from "./components/common/DropDown";
import loaderGif from "./assets/loader.gif";
import WhatsAppButton from "./components/home/WhatsAppButton";

function App() {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startFadeIn, setStartFadeIn] = useState(false);
  const dispatch = useDispatch();
  const route = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    // Simulate loading
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
      // Trigger fade-in after small delay
      setTimeout(() => {
        setStartFadeIn(true);
      }, 50); // very short delay so styles apply properly
    }, 2000);

    return () => clearTimeout(loaderTimeout);
  }, []);

  const handleCloseDropdown = () => {
    dispatch(closeDropdown());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[#2b2b2b] dark:bg-black z-50">
        <img
          src={loaderGif}
          alt="Loading..."
          className="w-32 h-32 object-contain animate-pulse"
        />
      </div>
    );
  }

  const noFooterRoutes = ["/portifolio", "/home/gallery", "/admin-pannel"];
  const hideFooter = noFooterRoutes.includes(route.pathname);

  return (
    <div
      className={`transition-opacity duration-2000 ease-in-out ${
        startFadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <Navbar />
      <Dropdown />
      <div
        className="min-h-screen pb-40"
        onClick={handleCloseDropdown}
        onMouseOver={handleCloseDropdown}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portifolio" element={<Portifolio />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin-pannel" element={<AdminPannel />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      {!hideFooter && (
        <div className="px-[2%] md:px-[6%] bg-[#323232] border border-card-dark">
          <div className="p-5">
            <Footer />
          </div>
        </div>
      )}
      <BackToTopButton showButton={showButton} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
