"use client";
import React, { MutableRefObject, useEffect, useState } from "react";
import { UserVideo } from "./user-video";
import { VideoCallController } from "./video-call-controller";
import { useRecoilState, useSetRecoilState } from "recoil";
import { participantLengthState } from "@/store/toggle/participant";

type VideoCallPageProps = {};

export const VideoCallPage = ({}: VideoCallPageProps) => {
  const [videoRef, setVideoRef] = useState<MutableRefObject<HTMLVideoElement>>(
    null!
  );
  const [participants, setParticipants] = useRecoilState(
    participantLengthState
  );

  let gridLayout;

  if (participants === 1) {
    gridLayout = "grid grid-cols-1 grid-rows-1 w-full h-full";
  } else if (participants === 2) {
    gridLayout = "grid grid-cols-2 grid-rows-1 gap-2 w-full h-full";
  } else if (participants === 3 || participants === 4) {
    gridLayout = "grid grid-cols-2 grid-rows-2 p-2 gap-2 w-full h-full";
  } else if (participants === 5 || participants === 6) {
    gridLayout = "grid grid-cols-3 grid-rows-2 p-2 gap-2 w-full h-full";
  } else {
    gridLayout = "grid grid-cols-3 grid-rows-3 p-2 gap-2 w-full h-full";
  }

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col gap-4 relative">
        <div className="w-full h-full ">
          <div className={gridLayout}>
            <div className="w-full h-full">
              <UserVideo setVideoRef={setVideoRef} />
            </div>
          </div>
        </div>

        {/* my video */}
        {/* <div className="flex-1  min-w-[40%] aspect-video">
          <UserVideo setVideoRef={setVideoRef} />
        </div> */}

        <div className="w-[80%] absolute bottom-4 left-[50%] -translate-x-[50%] ">
          {videoRef && <VideoCallController videoRef={videoRef} />}
        </div>
      </div>
    </>
  );
};
