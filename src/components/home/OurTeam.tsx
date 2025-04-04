"use client";
import Image from "next/image";
import Title from "../title/Title";

const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    title: "CEO & Founder",
    image:
      "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Mark Davis",
    title: "Lead Developer",
    image:
      "https://media.istockphoto.com/id/1664876848/photo/happy-crossed-arms-and-portrait-of-asian-man-in-studio-smile-for-career-work-and-job.jpg?s=612x612&w=0&k=20&c=2vYaOMnlmzMEmB441bTWHUyeFXRIh56wE79QAhVWYBk=",
  },
  {
    id: 3,
    name: "Sarah Lee",
    title: "Marketing Head",
    image:
      "https://media.istockphoto.com/id/937519550/photo/successful-young-handsome-american-guy-banker-in-formal-outfit-on-pure-background-with-crossed.jpg?s=612x612&w=0&k=20&c=FytjzWc7etouTdoofqR0InMH5I7Sttu4jPR9BKfy33Y=",
  },
  {
    id: 4,
    name: "James Smith",
    title: "UI/UX Designer",
    image:
      "https://img.freepik.com/premium-photo/face-young-handsome-bearded-man_251136-35800.jpg",
  },
  {
    id: 5,
    name: "Emily Clark",
    title: "Project Manager",
    image:
      "https://media.istockphoto.com/id/640252650/photo/man-showing-thumb-up.jpg?s=612x612&w=0&k=20&c=tnJ6zh-eXikgkRNvK8sXaAGsALcDREwmXkSlAXuB1w8=",
  },
  {
    id: 6,
    name: "Daniel White",
    title: "Business Analyst",
    image:
      "https://media.istockphoto.com/id/997461858/photo/attractive-young-man-in-blue-t-shirt-pointing-up-with-his-finger-isolated-on-gray-background.jpg?s=612x612&w=0&k=20&c=70pkYuhz65EqNOB9qI5JSDXNbQUwGLxKTCgsSWoy4kM=",
  },
];

const decorations = [
  "https://centure.volkovdesign.com/img/dodgers/dots--green.svg",
  "https://centure.volkovdesign.com/img/dodgers/dots--blue.svg",
  "https://centure.volkovdesign.com/img/dodgers/dots--red.svg",
  "https://centure.volkovdesign.com/img/dodgers/dots--yellow.svg",
  "https://centure.volkovdesign.com/img/dodgers/dots--purple.svg",
  "https://centure.volkovdesign.com/img/dodgers/dots--orange.svg",
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
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className="relative backdrop-blur-3xl bg-white/10 border border-white/30 p-6 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            <div className="absolute top-4 left-4 w-20 h-20 opacity-80">
              <Image
                src={decorations[index % decorations.length]}
                alt="Decoration"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>

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
