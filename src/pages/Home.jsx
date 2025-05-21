import {
  // Brands,
  Projects,
  Services,
  Testimonial,
} from "../components/common/page-componets";
import GetInTouch from "../components/home/GetInTouch";
import Speciality from "../components/home/Speciality";
import Hero from "../components/home/Hero";
// import { GetInTouch } from "../components/home/home-3";
import Faqs from "./Faqs";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="pt-16 max-w-7xl mx-auto px-4">
        <Speciality />
        <Services />
        <Projects />
        <Testimonial />
        <div id="get-in-touch">
          <GetInTouch />
        </div>
        <Faqs />
      </div>
    </>
  );
};

export default Home;
