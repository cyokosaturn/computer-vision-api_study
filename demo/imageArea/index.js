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
        html: computed(() => `
          <input class="img-url" value="${state.selectedImgUrl}" placeHolder="IMAGE URL" onfocus="imageArea.imgInputFieldSelect()"/><button class="go-btn" onclick="imageArea.selectImage()">GO</button>
          <input type="file" onchange="imagesArea.selectImageFile(this)"/>
          <img class="img-preview" src="${state.selectedImgUrl}"/>
        `)
      });
      return () => {
        el.imageArea.innerHTML = tmpl.html;
      };
    }
  });
};
