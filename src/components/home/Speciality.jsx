import { FiCheck, FiLayers, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Speciality = () => {
    const navigate = useNavigate();
  return (
    <div className="pt-5 pb-16">
      <div className="flex flex-wrap gap-10">
        <div className="flex-1 basis-[20rem]">
          <h1 className="sub-heading">about us</h1>
          <h1 className="heading">
            Expert Architecture & Home Design for Your Dream Space
          </h1>
          <p className="mt-3">
            We specialize in creating innovative, personalized home designs that
            reflect your style and needs. Our expert team blends creativity with
            precision to craft spaces that are both beautiful and functional.
            Whether it's a remodel or a new build, we bring your dream home to
            life with care and expertise.
          </p>
          <div className="mt-4">
            <div className="flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Outstanding Property</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Professional and experienced human resource</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Provide the best services for users</p>
            </div>
            <div className="mt-2 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <FiCheck />
              </div>
              <p>Modern city locations and exceptional lifestyle</p>
            </div>
           
               <button className="mt-4 flex btn btn-primary" onClick={()=>navigate("/about-us")}>read more</button>
          </div>
        </div>
        <div className="flex-1 basis-[20rem]">
          <div className="relative">
            <img
              src="/images/property (5).jpg"
              alt=""
              className="rounded-lg w-full sm:h-[400px] object-cover"
            />
            <div className="absolute -bottom-10 sm:bottom-5 -left-2 md:-left-20">
              <div className="p-3 bg-[#272727] rounded-lg shadow-md w-72 flex-center-between gap-x-3 dark:bg-dark-light">
                <h1>We have been serving our customers for over 6 years</h1>
                <div className="icon-box text-primary !bg-primary/20">
                  <FiUsers />
                </div>
              </div>
              <div className="p-3 mt-4 ml-8 bg-[#272727] rounded-lg shadow-md w-72 flex-center-between gap-x-3 dark:bg-dark-light">
                <h1>
                  Working with the symbol and reputation of trustworthy trait
                </h1>
                <div className="icon-box text-primary !bg-primary/20">
                  <FiLayers />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speciality;
