import {Controller} from "./controller.ts";
import {View} from "./view.ts";
import {Model} from "./model.ts";

function initApp() {
  document.addEventListener('DOMContentLoaded', () => {
    new Controller(new View(), new Model());
  });
}

initApp();