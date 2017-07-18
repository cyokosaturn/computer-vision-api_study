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
        html: computed(() => `
          <div class="buttons">
            <button class="captureBtn" onclick="captureArea.toggleRec()">${tmpl.btnLabel}</button>
          </div>
          <video class="img-preview ${tmpl.videoVisibleClass}"></video>
          <canvas width="320" height="240"></canvas>
          <img src="${state.dataUrl}" class="img-preview ${tmpl.imgVisibleClass}"/>
        `)
      });
      return () => {
        state.recording ? el.captureArea.classList.add('recordingMode') : el.captureArea.classList.remove('recordingMode');
        el.captureArea.innerHTML = tmpl.html;
      };
    }
  });
};
