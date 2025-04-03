"use client";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import Title from "../title/Title";

const videoData = [
  {
    id: 1,
    url: "https://youtu.be/tOwjEOt1zYU",
    thumbnail:
      "https://cdn.create.vista.com/downloads/f06acb57-1015-4adc-a778-0a7facefcbb2_1024.jpeg",
  },
  {
    id: 2,
    url: "https://youtu.be/DBY6DQ5YvHk",
    thumbnail:
      "https://cdn.create.vista.com/downloads/d383db99-b761-4641-91c3-06b82af6ce45_640.jpeg",
  },
  {
    id: 3,
    url: "https://youtu.be/WxE9_ixukpM",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72rqgnQhtg0aCPWTy5dRHNsK1l70iUhauEg&s",
  },
  {
    id: 4,
    url: "https://youtu.be/Krhu8XjVF9I",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_feck95KHX9PU8-t8xAYWhuuDMPYwmJ4y58k8MsELK0gtUE2TzDixL2RS821m65nrA2U&usqp=CAU",
  },
];

const ClientReviews = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoData[0].url);

  return (
    <div className="w-full py-10 ">
      <Title subTitle="what our client say" title="testimonials" />

      <div className="relative mx-auto max-w-7xl">
        <ReactPlayer
          url={selectedVideo}
          controls
          playing
          width="100%"
          height="400px"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {videoData.slice(0, 4).map((video) => (
          <div
            key={video.id}
            className="cursor-pointer border-2 border-transparent hover:border-purple-500 rounded-lg transition"
            onClick={() => setSelectedVideo(video.url)}
          >
            <Image
              src={video.thumbnail}
              alt={`Thumbnail ${video.id}`}
              className="w-32 h-20 object-cover rounded-md"
              width={128}
              height={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
