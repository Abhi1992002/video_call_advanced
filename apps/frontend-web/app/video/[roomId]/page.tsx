import { VideoCallPage } from "@/components/video-call-page";
import React from "react";

type VideoPageProps = {
  params: {
    roomId: string;
  };
};

const VideoPage = ({ params }: VideoPageProps) => {
  const roomId = params.roomId;
  return (
    <div className="flex items-center justify-center h-screen">
      <VideoCallPage />
    </div>
  );
};

export default VideoPage;
