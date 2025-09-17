import { ProjectItem } from "./ProjectItem";
import { DOMHelper } from "../Utility/DOMHelper";

export class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    for (const projectItem of projectItems) {
      const tooltipTextContent = projectItem.dataset.extraInfo;
      this.projects.push(
        new ProjectItem(
          projectItem.id,
          this.removeProject.bind(this),
          this.type,
          tooltipTextContent,
        ),
      );
    }

    this.connectDroppable();
  }

  connectDroppable() {
    const listElement = document.querySelector(`#${this.type}-projects ul`);

    listElement.addEventListener("dragenter", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
        listElement.parentElement.classList.add("droppable");
      }
    });

    listElement.addEventListener("dragover", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
      }
    });

    listElement.addEventListener("dragleave", (e) => {
      if (
        e.relatedTarget.closest(`#${this.type}-projects ul`) !== listElement
      ) {
        listElement.parentElement.classList.remove("droppable");
      }
    });

    listElement.addEventListener("drop", (e) => {
      const projectId = e.dataTransfer.getData("text/plain");
      if (~this.projects.findIndex(({ id }) => projectId === id)) {
        return;
      }
      document
        .getElementById(projectId)
        .querySelector("button:last-of-type")
        .click();
      listElement.parentElement.classList.remove("droppable");
    });
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
