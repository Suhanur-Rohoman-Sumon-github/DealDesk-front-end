"use client";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import Title from "../title/Title";
import { videoData } from "@/data/data";

const ClientReviews = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoData[0].url);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleVideoClick = (url: string) => {
    setSelectedVideo(url);
    setHasInteracted(true);
  };

  return (
    <div className="w-full py-10">
      <Title subTitle="what our client say" title="testimonials" />

      <div className="relative mx-auto max-w-7xl">
        <ReactPlayer
          url={selectedVideo}
          controls
          playing={hasInteracted}
          width="100%"
          height="400px"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {videoData.map((video) => (
          <div
            key={video.id}
            className={`cursor-pointer border-2 ${
              selectedVideo === video.url
                ? "border-purple-500"
                : "border-transparent"
            } hover:border-purple-500 rounded-lg transition`}
            onClick={() => handleVideoClick(video.url)}
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
