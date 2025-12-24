import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-[20%] px-16 absolute  bg-gradient-to-r from-black">
      <h1 className="text-6xl text-white font-bold">{title}</h1>
      <p className="py-6 text-white text-lg w-1/3 text-opacity-35">{overview}</p>
      <div className="">
        <button className="bg-white text-black p-4 px-12 text-xl rounded-lg font-bold hover:bg-opacity-60 ">
           Play
        </button>
        <button className="mx-4 bg-black text-white p-4 px-12 text-xl rounded-lg font-bold hover:bg-opacity-60">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
