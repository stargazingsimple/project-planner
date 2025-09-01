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

class Component {
  element;

  constructor(hostElementId, insertBefore = false) {
    this.hostElement = hostElementId
      ? document.getElementById(hostElementId)
      : document.body;

    this.insertBefore = insertBefore;
  }

  hidden() {
    if (this.hidden) {
      this.element.remove();
    }
  }

  show() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "afterbegin" : "beforeend",
      this.element,
    );
  }
}

class Tooltip extends Component {
  constructor(closeFn, textContent) {
    super();
    this.textContent = textContent;
    this.closeFn = closeFn;
    this.render();
  }

  closeTooltip() {
    this.hidden();
    this.closeFn();
  }

  render() {
    const tooltipElement = document.createElement("div");
    tooltipElement.className = "card";
    tooltipElement.textContent = this.textContent;
    tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFn, type, tooltipTextContent) {
    this.id = id;
    this.type = type;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.tooltipTextContent = tooltipTextContent;
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

  connectMoreInfoBtn() {
    const itemElement = document.querySelector(`#${this.id}`);
    const moreInfoBtn = itemElement.querySelector(".alt");
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    }, this.tooltipTextContent);
    tooltip.show();
    this.hasActiveTooltip = true;
  }

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
    for (const projectItem of projectItems) {
      const tooltipTextContent = projectItem.querySelector("p").textContent;
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.removeProject.bind(this),
          this.type,
          tooltipTextContent,
        ),
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
