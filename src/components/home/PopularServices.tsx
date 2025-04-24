import Title from "../title/Title";

import PopularServicesCarosal from "./PopularServicesCarosal";

const PopularServices = () => {
  return (
    <div className="w-full px-5 max-w-7xl mx-auto py-12">
      <Title
        subTitle="Explore the range of services we offer to help you buy, sell, and thrive in the marketplace."
        title="Our Services"
      />
      <PopularServicesCarosal />
    </div>
  );
};

export default PopularServices;
