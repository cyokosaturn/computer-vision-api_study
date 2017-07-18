import C from '../config';
import {observable, computed} from 'mobx';
import Component from '../mobx-component';
import el from '../elements';

export default state => {
  return Component('imageArea', state, {
    Events: {
      imgInputFieldSelect: () => {
        document.querySelector('.img-url').select();
      },
      selectImage: () => {
        const url = document.querySelector('.img-url').value;
        window.imagesArea.selectImage(url);
      }
    },
    View: () => {
      const tmpl = observable({
        html: computed(() => {
          const faces = state.imageFaces.map(face => {
            const $preview = document.querySelector('.imageArea .img-preview');
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
            <input class="img-url" value="${state.selectedImgUrl}" placeHolder="IMAGE URL" onfocus="imageArea.imgInputFieldSelect()"/><button class="go-btn" onclick="imageArea.selectImage()">GO</button>
            <input type="file" onchange="imagesArea.selectImageFile(this)"/>
            <div class="img-preview-wrapper">
              <img class="img-preview" src="${state.selectedImgUrl}"/>
              ${faces}
            </div>
          `;
        })
      });
      return () => {
        el.imageArea.innerHTML = tmpl.html;
      };
    }
  });
};
