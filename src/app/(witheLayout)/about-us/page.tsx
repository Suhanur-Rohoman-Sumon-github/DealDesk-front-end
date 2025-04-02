import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Empowering professionals with high-quality keyboards for ultimate
          efficiency.
        </p>
      </div>

      {/* Company Mission */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="mt-4 text-gray-600">
            At TypoTech, we are dedicated to providing top-notch keyboards
            designed for both professionals and enthusiasts. Our goal is to
            enhance your typing experience with precision, comfort, and
            durability.
          </p>
        </div>
        <Image
          src="/images/mission.jpg"
          alt="Our Mission"
          className="rounded-lg shadow-lg"
          width={500} // Replace with the actual width of your image
          height={300} // Replace with the actual height of your image
        />
      </div>

        <Image
          src="/images/story.jpg"
          alt="Our Story"
          className="rounded-lg shadow-lg"
          width={500} // Replace with the actual width of your image
          height={300} // Replace with the actual height of your image
        />
        <div>
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="mt-4 text-gray-600">
            Founded in 2020, TypoTech was born from a passion for high-quality
            keyboards. Our team of experts has spent years researching and
            developing the best typing solutions tailored to your needs.
          </p>
      </div>
    </div>
  );
};

export default AboutUs;
