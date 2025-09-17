import { ProjectList } from "./App/ProjectList";

class App {
  static init() {
    const activeProjectLst = new ProjectList("active");
    const finishedProjectLst = new ProjectList("finished");
    activeProjectLst.setSwitchHandler(
      finishedProjectLst.addProject.bind(finishedProjectLst),
    );
    finishedProjectLst.setSwitchHandler(
      activeProjectLst.addProject.bind(activeProjectLst),
    );
  }
}

App.init();
