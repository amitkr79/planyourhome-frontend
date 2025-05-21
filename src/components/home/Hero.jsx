import { useEffect, useState } from "react";
import bg1 from "../../assets/hero/hero1.jpg";
import bg2 from "../../assets/hero/hero2.jpg";
import bg3 from "../../assets/hero/hero3.jpg";
import bg4 from "../../assets/hero/hero4.jpg";
import bg5 from "../../assets/hero/hero5.jpg";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [bg1, bg2, bg3, bg4, bg5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col sm:flex-row">
      {/* Left Content - Full width on mobile, 20% on desktop */}
      <div className="w-full sm:w-[20%] bg-[#2b2b2b] backdrop-blur-md p-4 sm:p-6 md:p-8 flex flex-col items-center sm:items-start sm:justify-center z-30 relative">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center sm:text-left sm:rotate-[-90deg] lg:rotate-0 mb-4 sm:mb-0">
          PLAN <mark className="px-1 text-white bg-blue-600 rounded-sm">YOUR</mark> HOME
        </h1>
        
        <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-white text-center sm:text-left">
          Turning your vision into reality — because we work for your dream.
        </p>

        {/* Social Icons - Row on mobile, Column on desktop */}
        <div className="z-30 gap-4 my-4 sm:my-6 flex flex-row sm:flex-col items-center">
          <div className="icon-box bg-dark-light hover:bg-hover-color-dark"><FiFacebook /></div>
          <div className="icon-box bg-dark-light hover:bg-hover-color-dark"><FaTwitter /></div>
          <div className="icon-box bg-dark-light hover:bg-hover-color-dark"><FaInstagram /></div>
          <div className="icon-box bg-dark-light hover:bg-hover-color-dark"><FaLinkedin /></div>
        </div>
      </div>

      {/* Right Background Images Layer - Full width on mobile, 80% on desktop */}
      <div className="w-full sm:w-[80%] h-full relative z-0 flex-1">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentBg === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default Hero;
