import { BiCreditCard, BiGlobe, BiHomeAlt } from "react-icons/bi";

const AboutUs = () => {
  return (
    <div className="pt-16 pb-20">
      <div className="flex flex-wrap gap-24">
        <div className="relative flex-1 basis-[18rem] border">
          <img
            src="/images/property (16).jpg"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
          <img
            src="/images/property (26).jpg"
            alt=""
            className="absolute object-cover w-48 h-64 border-4 border-white rounded-lg sm:w-72 sm:h-80 dark:border-dark -bottom-20 -right-2 md:-right-20"
          />
        </div>
        <div className="relative flex-1 basis-[22rem]">
          <h1 className="sub-heading">about us</h1>
          <h1 className="heading">we decorate your home environment</h1>
          <p className="mt-3">
           At our core, we are passionate about creating beautiful, functional, and personalized living spaces. With years of experience in real estate and interior design, our team is dedicated to delivering exceptional quality and innovative solutions for every home.
          </p>
          <div className="mt-4">
            <div className="flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <BiHomeAlt />
              </div>
              <div>
                <h1 className="font-semibold capitalize">
                  the perfect residency
                </h1>
                <p>
                 We design homes that blend comfort and style, ensuring every space reflects your unique lifestyle and preferences.
                </p>
              </div>
            </div>

            <div className="mt-3 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <BiGlobe />
              </div>
              <div>
                <h1 className="font-semibold capitalize">
                  global architect experts
                </h1>
                <p>
                  Our team of world-class architects brings international expertise to create innovative and sustainable designs for your home.
                </p>
              </div>
            </div>

            <div className="mt-3 flex-align-center gap-x-2">
              <div className="icon-box text-primary !bg-primary/20">
                <BiCreditCard />
              </div>
              <div>
                <h1 className="font-semibold capitalize">
                  total payment transparency
                </h1>
                <p>
                 We provide clear and upfront pricing, ensuring you have full confidence in the financial aspects of your project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
