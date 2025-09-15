export class Component {
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
