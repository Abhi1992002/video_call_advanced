export const openMediaDevices = async () => {
  const constraints = {
    video: true,
    audio: true,
  };

  const mediaStreamObject =
    await navigator.mediaDevices.getUserMedia(constraints);

  return mediaStreamObject;
};
