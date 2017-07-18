import {observable, computed} from 'mobx';
import Component from '../mobx-component';
import el from '../elements';

export default state => {
  return Component('resultArea', state, {
    Events: {
      showLoading: () => {
        state.resultText = 'now loading...';
        state.resultJson = '';
      }
    },
    View: () => {
      const tmpl = observable({
        html: computed(() => `
          <div class="result">${state.resultText}</div>
          <pre><code class="json">${state.resultJson}</code></pre>
        `)
      });
      return () => {
        el.resultArea.innerHTML = tmpl.html;
      };
    }
  });
};
