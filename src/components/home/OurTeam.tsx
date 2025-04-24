"use client";
import Image from "next/image";
import Title from "../title/Title";

const teamMembers = [
  {
    id: 1,
    name: "Ayesha Patel",
    title: "CEO & Founder",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3KiSIDrnzsI3Ec0hLkEAwqCrk9mbrqdb8Gg&s",
  },
  {
    id: 2,
    name: "Jinwoo Park",
    title: "Lead Developer",
    image:
      "https://i.cbc.ca/1.7469429.1740604701!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/jinwoo-park-1.jpg?im=Resize%3D780",
  },
  {
    id: 3,
    name: "Siti Nurhaliza",
    title: "Marketing Head",
    image: "https://apicms.mstar.com.my/uploads/images/2025/03/18/3219266.jpg",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    title: "UI/UX Designer",
    image:
      "https://indianexpress.com/wp-content/uploads/2024/03/2022031812591975Interview_Banner_Image_D_Ravikumar-removebg-preview.png",
  },
  {
    id: 5,
    name: "Mei Ling Tan",
    title: "Project Manager",
    image:
      "https://media.licdn.com/dms/image/v2/C5603AQFR4O8LLKhuVQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1556723935475?e=2147483647&v=beta&t=uqc-UPlgF87TF8oUt1nHQcPY9F_4UCKL3Hbduvdo1Ks",
  },
  {
    id: 6,
    name: "Hiroshi Yamamoto",
    title: "Business Analyst",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjoobWvPl8PyYEZlBTl_HzOzCLpd1MxD_eg&s",
  },
];

const OurTeam = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 text-white text-center">
      <Title
        title="Meet Our Team"
        subTitle=" Our team consists of experienced web developers, digital marketing
          experts, and creative professionals who are passionate about helping
          your business succeed in the digital landscape."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative backdrop-blur-3xl bg-white/5 border border-white/30 p-6 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={200}
              height={200}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white"
            />
            <h3 className="mt-4 text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-gray-300">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
