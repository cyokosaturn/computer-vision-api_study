import C from './config';
import {Store} from './mobx-component';
import Tabs from './tabs';
import CaptureArea from './captureArea';
import ImageArea from './imageArea';
import ImagesArea from './imagesArea';
import ResultArea from './resultArea';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

// const SUBSCRIPTION_KEY = localStorage.getItem('SUBSCRIPTION_KEY') || window.prompt('INPUT SUBSCRIPTION KEY');
const SUBSCRIPTION_KEY = '260f006a16c04453a6941651245fa3fc';
if (SUBSCRIPTION_KEY) {
  localStorage.setItem('SUBSCRIPTION_KEY', SUBSCRIPTION_KEY);

  const state = Store({
    mode: C.MODE.CAMERA,
    recording: false,
    dataUrl: 'black.png',
    resultText: '',
    resultJson: '',
    selectedImgUrl: 'black.png',
    imageFaces: [],
    cameraFaces: [],
  });

  Object.assign(state, {
    stream: ''
  });

  Tabs(state);
  CaptureArea(state);
  ImageArea(state);
  ImagesArea(state);
  ResultArea(state);
}

