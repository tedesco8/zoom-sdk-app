import React, { useEffect } from "react";

const MediaComponent = () => {
  const videoWidth = 320;
  const videoHeight = 240;

  let canvasTag = document.getElementById("theCanvas");
  let videoTag = document.getElementById("theVideo");

  useEffect(() => {
      debugger
    window.navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: videoWidth,
          height: videoHeight,
        },
      })
      .then((stream) => {
        videoTag.srcObject = stream;
      })
      .catch((e) => {
        document.getElementById("errorTxt").innerHTML =
          "ERROR: " + e.toString();
      });
  }, []);

  const handleBtnDownloadImage = () => {
    let link = document.createElement("a");
    link.download = "capturedImage.png";
    link.href = canvasTag.toDataURL();
    link.click();
  };

  const handleBtnCapture = () => {
    let canvasContext = canvasTag.getContext("2d");
    canvasContext.drawImage(videoTag, 0, 0, videoWidth, videoHeight);
  };

  return (
    <div>
      <div>
        <video
          id="theVideo"
          style={{ width: videoWidth, height: videoHeight }}
          controls
          autoPlay
        ></video>
        <canvas
          id="theCanvas"
          style={{ width: videoWidth, height: videoHeight }}
        ></canvas>
      </div>
      <button onClick={handleBtnCapture}>Capture</button>
      <button onClick={handleBtnDownloadImage}>Download captured image</button>
      <p id="errorTxt"></p>
    </div>
  );
};

export default MediaComponent;
