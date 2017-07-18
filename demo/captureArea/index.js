import {observable, computed} from 'mobx';
import Component from '../mobx-component';
import el from '../elements';
import Capture from '../capture';

export default state => {

  const capture = Capture(state);

  return Component('captureArea', state, {
    Events :{
      toggleRec: capture.toggleRec
    },
    View: () => {
      const tmpl = observable({
        btnLabel: computed(() => state.recording ? 'SHOT!' : 'CAPTURE START'),
        videoVisibleClass: computed(() => state.recording ? '' : 'hidden'),
        imgVisibleClass: computed(() => !state.dataUrl || state.recording ? 'hidden' : ''),
        html: computed(() => {
          const faces = state.cameraFaces.map(face => {
            const $preview = document.querySelector('.captureArea img.img-preview');
            $preview.classList.remove('img-preview');
            const orgWidth = $preview.clientWidth;
            $preview.classList.add('img-preview');
            const rate = $preview.clientWidth / orgWidth;
            const top = face.faceRectangle.top * rate;
            const left = face.faceRectangle.left * rate;
            const width = face.faceRectangle.width * rate;
            const height = face.faceRectangle.height * rate;

            return `<div class="face" style="top:${top}px;left:${left}px;width:${width}px;height:${height}px;"><span>age:${face.age}</span></div>`;
          }).join('');

          return `
            <div class="buttons">
              <button class="captureBtn" onclick="captureArea.toggleRec()">${tmpl.btnLabel}</button>
            </div>
            <div class="img-preview-wrapper">
              <video class="img-preview ${tmpl.videoVisibleClass}"></video>
              <canvas width="320" height="240"></canvas>
              <img src="${state.dataUrl}" class="img-preview ${tmpl.imgVisibleClass}"/>
              ${faces}
            </div>
          `;
        })
      });
      return () => {
        state.recording ? el.captureArea.classList.add('recordingMode') : el.captureArea.classList.remove('recordingMode');
        el.captureArea.innerHTML = tmpl.html;
      };
    }
  });
};
