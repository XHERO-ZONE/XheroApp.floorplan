import React from "react";
import ReactDOM from "react-dom";
import ContainerDimensions from "react-container-dimensions";
import Immutable, { Map } from "immutable";
import immutableDevtools from "immutable-devtools";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MyCatalog from "./catalog/mycatalog";

import ToolbarScreenshotButton from "./ui/toolbar-screenshot-button";

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from "react-planner"; //react-planner
import { DeviceProvider } from "../../src/components/responsive";
import Users from "../../src/components/users";

//define state
let AppState = Map({
  "react-planner": new PlannerModels.State(),
});
function updateArrFloor() {
  const storedArrFloor = localStorage.getItem("arrFloor");
  if (storedArrFloor) {
    try {
      const arrFloor = JSON.parse(storedArrFloor);
      // Cập nhật AppState với arrFloor
      AppState = AppState.setIn(["react-planner", "arrFloor"], arrFloor);

      // Dispatch một action để Redux biết rằng state đã thay đổi
      // store.dispatch({ type: "UPDATE_ARR_FLOOR", payload: arrFloor });
    } catch (error) {
      console.error("Lỗi khi parse arrFloor từ localStorage:", error);
    }
  } else {
    console.warn("Không tìm thấy arrFloor trong localStorage.");
  }
}
//define reducer
let reducer = (state, action) => {
  state = state || AppState;
  switch (action.type) {
    case "UPDATE_ARR_FLOOR":
      return state.setIn(["react-planner", "arrFloor"], action.payload);
    default:
      return state.update("react-planner", (plannerState) =>
        PlannerReducer(plannerState, action)
      );
  }
};
updateArrFloor();

let blackList =
  isProduction === true
    ? []
    : ["UPDATE_MOUSE_COORDS", "UPDATE_ZOOM_SCALE", "UPDATE_2D_CAMERA"];

if (!isProduction) {
  console.info(
    "Environment is in development and these actions will be blacklisted",
    blackList
  );
  console.info("Enable Chrome custom formatter for Immutable pretty print");
  immutableDevtools(Immutable);
}

//init store
let store = createStore(
  reducer,
  null,
  !isProduction && window.devToolsExtension
    ? window.devToolsExtension({
        features: {
          pause: true, // start/pause recording of dispatched actions
          lock: true, // lock/unlock dispatching actions and side effects
          persist: true, // persist states on page reloading
          export: true, // export history of actions in a file
          import: "custom", // import history of actions from a file
          jump: true, // jump back and forth (time travelling)
          skip: true, // skip (cancel) actions
          reorder: true, // drag and drop actions in the history list
          dispatch: true, // dispatch custom actions or action creators
          test: true, // generate tests for the selected actions
        },
        actionsBlacklist: blackList,
        maxAge: 999999,
      })
    : (f) => f
);

let plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave("react-planner_v0"),
  PlannerPlugins.ConsoleDebugger(),
];

let toolbarButtons = [ToolbarScreenshotButton];
//render
ReactDOM.render(
  <DeviceProvider>
    <Provider store={store}>
      <ContainerDimensions>
        {({ width, height }) => (
          <ReactPlanner
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={(state) => state.get("react-planner")}
          />
        )}
      </ContainerDimensions>
    </Provider>
  </DeviceProvider>,
  document.getElementById("app")
);
