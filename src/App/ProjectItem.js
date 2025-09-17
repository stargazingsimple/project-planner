import { DOMHelper } from "../Utility/DOMHelper";

export class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFn, type, tooltipTextContent) {
    this.id = id;
    this.type = type;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.tooltipTextContent = tooltipTextContent;
    this.connectDrag();
    this.connectSwitchBtn(this.type);
    this.connectMoreInfoBtn();
  }

  connectDrag() {
    document.getElementById(this.id).addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", this.id);
      e.dataTransfer.effectAllowed = "move";
    });
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
    import("./Tooltip.js").then((module) => {
      const tooltip = new module.Tooltip(
        () => {
          this.hasActiveTooltip = false;
        },
        this.tooltipTextContent,
        this.id,
      );
      tooltip.show();
      this.hasActiveTooltip = true;
    });
  }

  update(switchHandler, type) {
    this.updateProjectListsHandler = switchHandler;
    this.connectSwitchBtn(type);
  }
}
