import {observable, computed} from 'mobx';
import C from '../config';
import Component from '../mobx-component';
import el from '../elements';
import Capture from '../capture';

export default state => {

  const capture = Capture(state);

  return Component('tabs', state, {
    Events :{
      setMode: (mode) => {
        if (mode === C.MODE.IMAGE) {
          capture.stopRec();
        }
        state.mode = mode;
      }
    },
    View: () => {
      const tmpl = observable({
        imageActiveClass: computed(() => state.mode === C.MODE.IMAGE ? 'active' : ''),
        cameraActiveClass: computed(() => state.mode === C.MODE.CAMERA ? 'active' : ''),
        html: computed(() => `<a href="#" onclick="console.log(window);tabs.setMode('${C.MODE.IMAGE}')" class="${tmpl.imageActiveClass}">IMAGE</a><a href="#${C.MODE.CAMERA}" onclick="tabs.setMode('${C.MODE.CAMERA}')" class="${tmpl.cameraActiveClass}">CAMERA</a>`),
      });
      return () => {
        el.tabs.innerHTML = tmpl.html;
        el.container.classList.add(state.mode + 'Mode');
        el.container.classList.remove((state.mode === C.MODE.IMAGE ? C.MODE.CAMERA : C.MODE.IMAGE) + 'Mode');
      };
    }
  });
}
