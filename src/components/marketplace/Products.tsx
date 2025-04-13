import React from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    image:
      "https://downloadr2.apkmirror.com/wp-content/uploads/2021/11/98/619819242e738.png",
    title: "Mechanical Keyboard",
    description: "A high-quality mechanical keyboard with RGB lights.",
    price: "$99.99",
    rating: 4,
  },
  {
    image:
      "https://yt3.googleusercontent.com/ytc/AIdro_kS8n4f2hVpjUOy8RgQYogEHnVAzMIMP45jw5tNnlqRF2Q=s900-c-k-c0x00ffffff-no-rj",
    title: "Gaming Mouse",
    description: "Precision mouse designed for gamers with adjustable DPI.",
    price: "$59.99",
    rating: 5,
  },
  {
    image:
      "https://thedigitalbanker.com/wp-content/uploads/2022/11/bank-of-america.jpg",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSau0cpWWQBUME4-_nijhVTZFOPos0nF5_SrQ&s",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://placewise.imgix.net/centercal/stationpark/si/2138881340?w=580&usm=20&q=80&name=store_detail_page_header_store_hero_mutations&h=494&format=auto&fit=crop&crop=entropy&auto=format",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://mallmaverick.imgix.net/web/property_managers/4/properties/178/stores/30209/20201104201553/_system_stores_store_fronts_000_030_209_original_citibank_500px.jpg",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Truist_Financial_logo.svg/2560px-Truist_Financial_logo.svg.png",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTG48sY1zo_ID4ZySmO0XDCyy0jm5nfbHfWJV3MhRwBOBJG5snT",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://static01.nyt.com/images/2021/04/21/business/21econ-brf-jpmorgan/merlin_186614244_0c10a6fb-8489-4ee5-8ddc-3ad68d1ce668-mediumSquareAt3X.jpg",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://chicagoinnovation.com/wp-content/uploads/2022/11/bmoharris.jpg",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://play-lh.googleusercontent.com/5m06VLDUJjzgpj94ETp7O6VnP1KJLiWC9hQW3Vhd60QKbhJnyMz191EVf_II5IZt5J7G=w240-h480-rw",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/State-street-logo-final.svg/2560px-State-street-logo-final.svg.png",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://www.morganstanley.com/etc.clientlibs/msdotcomr4/clientlibs/clientlib-site/resources/img/logo-black.png",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQuUwrjV6SxhgHFqZbeRuS6oES1PwGSvO-jY7DkhWvcQgp8kqSh",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDGV4Z1yHMU4pSYni8rohaN4aZBuGdv4E_ncYO_h2EMX_Jwf_M",
    title: "Gaming Headset",
    description: "Over-ear headset with surround sound and noise cancellation.",
    price: "$149.99",
    rating: 3,
  },
  // Add more products as needed
];

const Products = () => {
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div
        className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-1
          xl:grid-cols-2 
          2xl:grid-cols-3
          gap-4 sm:gap-6 md:gap-6 lg:gap-8"
      >
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
