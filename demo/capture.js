import visionAPI from './visionAPI';
import {displayVisionApiResult} from './visionAPI';

export default (state) => {

  const toggleRec = () => {
    if (state.recording) {
      if(state.stream){
        shot();
      }
      stopRec();
    }
    else {
      startRec();
    }
  };

  const startRec = () => {
    state.recording = true;
    state.dataUrl = 'black.png';
    const config = {
      video: true,
      audio: false
    };
    navigator.mediaDevices.getUserMedia(config).then(s => {
      const $video = document.querySelector('video');
      state.stream = s;
      $video.src = URL.createObjectURL(state.stream);
      $video.play();
    });
  }

  const stopRec = () => {
    state.recording = false;
    if(state.stream){
      state.stream.getVideoTracks()[0].stop();
      state.stream = null;
    }
  }

  const shot = () => {
    const $video = document.querySelector('video');
    const $canvas = document.querySelector('canvas');
    const contentType = 'image/jpeg';
    state.dataUrl = videoToDataUrl($video, $canvas, contentType);
    const imageBlob = dataUrlToBlob(state.dataUrl, contentType);
    resultArea.showLoading();
    return visionAPI(imageBlob, 'application/octet-stream').then(displayVisionApiResult(state)).catch(console.error);
  };

  return {
    toggleRec,
    startRec,
    stopRec,
    shot,
  };

};

export function videoToDataUrl($video, $canvas, contentType){
  let ctx = $canvas.getContext("2d");
  ctx.drawImage($video, 0, 0, 320, 240);
  return $canvas.toDataURL(contentType);
}

export function dataUrlToBlob(dataUrl, contentType){
  const bin = atob(dataUrl.split(',')[1]);
  const imageBuffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    imageBuffer[i] = bin.charCodeAt(i);
  }
  const dataBlob = new Blob([imageBuffer.buffer], {type: contentType});
  return dataBlob;
}
