import { useState, useEffect } from "react";
import PortifolioList from "../components/portifolio/PortifolioList";
import { ParallaxBanner } from "react-scroll-parallax";
import banner from "../assets/banner/banner3.png";
import loaderGif from "../assets/loader.gif";

const Portifolio = () => {
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsMounted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#2b2b2b] z-50">
        <img
          src={loaderGif}
          alt="Loading..."
          className="w-32 h-32 object-contain animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className={`pt-15 ${isMounted ? 'animate-fadeIn' : 'opacity-0'} relative`}>
      <ParallaxBanner
        layers={[{ image: banner, speed: -15 }]}
        className="aspect-[2/1]"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 flex items-center justify-center z-20 text-gray-300 text-3xl md:text-5xl font-bold">
          Gallery
        </div>
      </ParallaxBanner>
      <PortifolioList />
    </div>
  );
};

export default Portifolio;