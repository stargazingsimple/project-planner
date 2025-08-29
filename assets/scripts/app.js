class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.appendChild(element);
  }
}

class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectListsFn, type) {
    this.id = id;
    this.type = type;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchBtn(this.type);
    this.connectMoreInfoBtn();
  }

  connectSwitchBtn(type) {
    const itemElement = document.querySelector(`#${this.id}`);
    let switchBtn = itemElement.lastElementChild;
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === "active" ? "Finish" : "Activate";
    switchBtn.addEventListener(
      "click",
      this.updateProjectListsHandler.bind(null, this.id),
    );
  }

  connectMoreInfoBtn() {}

  update(switchHandler, type) {
    this.updateProjectListsHandler = switchHandler;
    this.connectSwitchBtn(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const { id } of projectItems) {
      this.projects.push(
        new ProjectItem(id, this.removeProject.bind(this), this.type),
      );
    }
  }

  setSwitchHandler(switchHandler) {
    this.switchHandler = switchHandler;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.removeProject.bind(this), this.type);
  }

  removeProject(projectId) {
    this.switchHandler(this.projects.find(({ id }) => id === projectId));
    this.projects = this.projects.filter(({ id }) => id !== projectId);
  }
}

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
