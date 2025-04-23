import Title from "../title/Title";

import PopularServicesCarosal from "./PopularServicesCarosal";

const PopularServices = () => {
  return (
    <div className="w-full px-5 max-w-7xl mx-auto py-12">
      <Title subTitle="Popular services" title="our services" />
      <PopularServicesCarosal />
    </div>
  );
};

export default PopularServices;
