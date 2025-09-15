import { Component } from "./Component";

export class Tooltip extends Component {
  constructor(closeFn, textContent, hostElementId) {
    super(hostElementId);
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
    tooltipElement.innerHTML = `
        <div>
            <h2>More Info</h2>
            <p>${this.textContent}</p>
        </div>
    `;
    const hostElementPosLeft = this.hostElement.offsetLeft;
    const hostElementPosTop = this.hostElement.offsetTop;
    const hostElementHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    tooltipElement.style.position = "absolute";
    tooltipElement.style.left = `${hostElementPosLeft + 20}px`;
    tooltipElement.style.top = `${hostElementPosTop + hostElementHeight - parentElementScrolling - 10}px`;

    tooltipElement.addEventListener("click", this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}
