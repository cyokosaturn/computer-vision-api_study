import {observable, autorun} from "mobx";

export default Component;



export function Component(id, state, params){
  const events = {};
  events[id] = params.Events;
  Events(events);
  const views = {};
  views[id] = params.View;

  Views(views);
  return params.Events;
}

export function Views(renderers){
  for(let name in renderers){
    const renderer = renderers[name]();
    renderer();
    autorun(renderer);
  }
}

export function Events(events){
  Object.assign(window, events);
}

export function Elements(elements){
  const result = {};
  for(let name in elements){
    result[name] = document.querySelector(elements[name]);
  }
  return result;
}

export function Store(data){
  return observable(data);
}
