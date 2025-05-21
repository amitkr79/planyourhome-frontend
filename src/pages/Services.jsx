import {
  Categories,
  Services as ServicesList,
} from "../components/common/page-componets";

const Services = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <ServicesList />
      <Categories />
    </div>
  );
};

export default Services;
