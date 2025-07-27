"use client";
import Image from "next/image";
import Title from "../title/Title";

import leftDecor from "../../../public/assets/stats--purple.svg";
import rightDecor from "../../../public/assets/stats--purple.svg";

const teamMembers = [
  {
    id: 1,
    name: "Ayesha Patel",
    title: "Author of *Mindful Living*",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3KiSIDrnzsI3Ec0hLkEAwqCrk9mbrqdb8Gg&s",
  },
  {
    id: 2,
    name: "Jinwoo Park",
    title: "Novelist of *Whispers of Seoul*",
    image:
      "https://i.cbc.ca/1.7469429.1740604701!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/jinwoo-park-1.jpg?im=Resize%3D780",
  },
  {
    id: 3,
    name: "Siti Nurhaliza",
    title: "Wellness Writer & Poet",
    image: "https://apicms.mstar.com.my/uploads/images/2025/03/18/3219266.jpg",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    title: "Fantasy & Fiction Creator",
    image:
      "https://indianexpress.com/wp-content/uploads/2024/03/2022031812591975Interview_Banner_Image_D_Ravikumar-removebg-preview.png",
  },
  {
    id: 5,
    name: "Mei Ling Tan",
    title: "Illustrator & Storyteller",
    image:
      "https://media.licdn.com/dms/image/v2/C5603AQFR4O8LLKhuVQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1556723935475?e=2147483647&v=beta&t=uqc-UPlgF87TF8oUt1nHQcPY9F_4UCKL3Hbduvdo1Ks",
  },
  {
    id: 6,
    name: "Hiroshi Yamamoto",
    title: "Self-Help & Motivation Expert",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjoobWvPl8PyYEZlBTl_HzOzCLpd1MxD_eg&s",
  },
  {
    id: 7,
    name: "Leila Haddad",
    title: "Romance & Drama Novelist",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=faces&fit=crop&h=200&w=200",
  },
  {
    id: 8,
    name: "Carlos Mendoza",
    title: "Historical Fiction Author",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiiNG6IfM82l7Meq_VmzGTi_OWNI1jAYQVg&s",
  },
];

const OurTeam = () => {
  return (
    <div className="relative max-w-7xl mx-auto py-10 text-white text-center overflow-hidden">
      <Title
        title="Meet Our Authors"
        subTitle="Discover the brilliant minds behind our bestselling eBooks. These talented authors bring stories and knowledge that inspire readers across the globe."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 relative z-10">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative backdrop-blur-3xl bg-white/5 border border-white/30 p-6 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            {/* Decorative Images Left and Right of Profile */}
            <div className="relative flex items-center justify-center">
              <Image
                src={leftDecor}
                alt="Left"
                width={15}
                height={80}
                className="absolute left-0 -translate-x-1/2 top-0"
              />
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white"
              />
              <Image
                src={rightDecor}
                alt="Right"
                width={15}
                height={80}
                className="absolute right-0 translate-x-1/2 top-0"
              />
            </div>
            <h3 className="mt-6 text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-gray-300">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
