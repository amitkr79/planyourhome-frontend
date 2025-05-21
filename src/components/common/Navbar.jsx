import { useState, useEffect, useRef } from "react";
import { FiDelete } from "react-icons/fi";
import { BiMenu, BiBuildingHouse } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { closeSidebar, openSidebar, uiStore } from "../../features/uiSlice";
import { navLinks } from "../../data/navLinks";
import SingleLink from "./SingleLink";

const Navbar = () => {
  const { isSidebarOpen } = useSelector(uiStore);
  const dispatch = useDispatch();
  
  const navbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // Detect when navbar becomes sticky
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const offset = navbarRef.current.offsetTop;
        if (window.scrollY > offset) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    const handleCloseSidebar = (e) => {
      if (e.target.classList.contains("mobile-modal")) dispatch(closeSidebar());
    };

  return (
    <div
      ref={navbarRef}
      className={`navbar fixed w-full z-50 top-0 left-0 py-2 z-99 ${
        isSticky
          ? "bg-[#323232] bg-opacity-95 shadow-lg p-[1.3em_0_0] box-shadow-lg"
          : "transparent"
      }`}
      style={{
         transition: "all 0.4s ease-in-out", 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex-center-between">
        <Link to="/" className="flex-shrink-0 flex-align-center gap-x-1">
          <BiBuildingHouse className="text-3xl text-white" />
          <h1 className="hidden md:block text-white">Planyourhome</h1>
        </Link>

        <div className="flex-align-center gap-x-4">
          {/*-------------------------------------- Desktop Menu------------------------------------- */}
          <ul className="hidden md:flex-align-center text-white">
            {navLinks.map((link) => (
              <SingleLink {...link} key={link.id} />
            ))}
          </ul>

          {/*---------------------------------------- Mobile Menu------------------------------------- */}
           <div
                      className={`lg:hidden mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-50 opacity-0 pointer-events-none transition-a  ${
                        isSidebarOpen && "open"
                      }`}
                      onClick={handleCloseSidebar}
                    >
                      <ul
                        className={`mobile-dialog overflow-auto absolute flex flex-col space-y-4 p-3 bg-[#2b2b2b] dark:bg-card-dark h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${
                          isSidebarOpen && "open"
                        }`}
                      >
                        <div className="border-b flex-center-between dark:border-slate-800">
                          <p className="uppercase">menu</p>
                          <div
                            className="icon-box md:hidden"
                            onClick={() => dispatch(closeSidebar())}
                          >
                            <FiDelete />
                          </div>
                        </div>
                        {navLinks?.map(({ id, linkText, url, subLinks }) => (
                          <ul key={id}>
                            <NavLink
                              to={url}
                              end
                              className="w-fit before:!hidden"
                              onClick={() => dispatch(closeSidebar())}
                            >
                              {linkText}
                            </NavLink>
                            {subLinks?.map(({ id, linkText, url }) => (
                              <ul key={id} className="mt-2">
                                <NavLink
                                  to={url}
                                  end
                                  className="relative ml-8 text-sm before:hidden w-fit after:absolute after:w-2 after:h-2 after:rounded-full after:border-2 after:top-1/2 after:-translate-y-1/2 after:-left-4 dark:after:opacity-50 "
                                  onClick={() => dispatch(closeSidebar())}
                                >
                                  {linkText}
                                </NavLink>
                              </ul>
                            ))}
                          </ul>
                        ))}
                      </ul>
                    </div>

          {/* Mobile Menu Toggle */}
          <div className="icon-box md:hidden" onClick={() => dispatch(openSidebar())}>
            <BiMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
