"use client";

import React, { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { openMediaDevices } from "@/lib/stream/open-media-devices";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mediaStreamState } from "@/store/videoStream";
import { audioToggleState } from "@/store/toggle/audio-toggle";
import { Mic, MicOff } from "lucide-react";

type UserVideoProps = {
  setVideoRef: React.Dispatch<
    React.SetStateAction<React.MutableRefObject<HTMLVideoElement>>
  >;
};

export const UserVideo = ({ setVideoRef }: UserVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [mediaStream, setMediaStream] = useRecoilState(mediaStreamState);
  const [audio, setAudio] = useRecoilState(audioToggleState);
  useEffect(() => {
    setVideoRef(videoRef);
    openMediaDevices().then((stream) => {
      setMediaStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;
    });

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
          const mySettings = track.getSettings();
        });
      }
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      {mediaStream ? (
        <div className="relative flex items-center justify-center h-full w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            controls={false}
            className="w-full"
            muted
          ></video>
          <div className="absolute bg-orange-500 text-white top-2 left-[50%] translate-x-[-50%] p-2 rounded-full z-10">
            {audio ? <Mic /> : <MicOff />}
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-full rounded-xl" />
      )}
    </div>
  );
};
