var localStorage = window.hasOwnProperty("localStorage") ? window.localStorage : false;
import { loadProject } from "../actions/project-actions";

var TIMEOUT_DELAY = 500;

var timeout = null;

export default function autosave(autosaveKey, delay) {
  return function (store, stateExtractor) {
    delay = delay || TIMEOUT_DELAY;
    var currentFloor = 0;
    if (!autosaveKey) return;
    if (!localStorage) return;
    if (localStorage.getItem("currentFloor") !== null) {
      currentFloor = localStorage.getItem("currentFloor");
    }
    //revert
    if (localStorage.getItem(autosaveKey) !== null) {
      var data = localStorage.getItem(autosaveKey);

      var json = JSON.parse(data);
      store.dispatch(loadProject(json[currentFloor]));
    }

    //update
    store.subscribe(function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function () {
        var state = stateExtractor(store.getState());

        if (localStorage.getItem(autosaveKey) !== null) {
          var _data = JSON.parse(localStorage.getItem(autosaveKey));
          _data[currentFloor] = state.scene.toJS();
          localStorage.setItem(autosaveKey, JSON.stringify(_data));
        } else {
          var arr = [state.scene.toJS()];
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