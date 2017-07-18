import C from '../config';
import Component from '../mobx-component';
import el from '../elements';
import visionAPI from '../visionAPI';
import {displayVisionApiResult} from '../visionAPI';

export default state => {
  return Component('imagesArea', state, {
    Events :{
      selectImage: url => {
        state.selectedImgUrl = url;
        window.tabs.setMode(C.MODE.IMAGE);
        window.resultArea.showLoading();
        visionAPI(JSON.stringify({url:url})).then(displayVisionApiResult(state));
      },
      selectImageFile: fileInput => {
        if (!fileInput.files.length) {
          return;
        }

        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = (function(file) {
          return function(e) {
            state.selectedImgUrl = e.target.result;
            resultArea.showLoading();
            visionAPI(file, 'application/octet-stream').then(displayVisionApiResult(state));
          };
        })(file);
        reader.readAsDataURL(file);
      }
    },
    View: () => {
      const tmpl = {
        html: C.SAMPLE_IMAGES.map(url => `<img src="${url}" onclick="imagesArea.selectImage('${url}')"/>`).join('')
      };
      return () => {
        el.imagesArea.innerHTML = tmpl.html;
      };
    }
  });
};
