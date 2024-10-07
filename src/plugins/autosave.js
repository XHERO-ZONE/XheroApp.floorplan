const localStorage = window.hasOwnProperty("localStorage")
  ? window.localStorage
  : false;
import { loadProject } from "../actions/project-actions";

const TIMEOUT_DELAY = 500;

let timeout = null;

export default function autosave(autosaveKey, delay) {
  return (store, stateExtractor) => {
    delay = delay || TIMEOUT_DELAY;
    let currentFloor = 0;
    if (!autosaveKey) return;
    if (!localStorage) return;
    if (localStorage.getItem("currentFloor") !== null) {
      currentFloor = localStorage.getItem("currentFloor");
    }
    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      let data = localStorage.getItem(autosaveKey);

      let json = JSON.parse(data);
      store.dispatch(loadProject(json[currentFloor]));
    }

    //update
    store.subscribe(() => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        let state = stateExtractor(store.getState());

        if (localStorage.getItem(autosaveKey) !== null) {
          let data = JSON.parse(localStorage.getItem(autosaveKey));
          data[currentFloor] = state.scene.toJS();
          localStorage.setItem(autosaveKey, JSON.stringify(data));
        } else {
          let arr = [state.scene.toJS()];
          localStorage.setItem(autosaveKey, JSON.stringify(arr));
        }
        /*let scene = state.sceneHistory.last;
        if (scene) {
          let json = JSON.stringify(scene.toJS());
          localStorage.setItem(autosaveKey, json);
        }*/
      }, delay);
    });
  };
}
