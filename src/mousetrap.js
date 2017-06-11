class MouseTrap {
  constructor(element, debugEnabled) {
    if (!element || !(element instanceof HTMLElement))
      this.element = window;
    else
      this.element = element;
    this.position = {
      current: { x: 0, y: 0 },
      last: { x: 0, y: 0 }
    };
    this.hover = false;
    this.mousedown = false;
    this.debugEnabled = Boolean(debugEnabled);
    if (this.debugEnabled)
      this.initDebugConsole();
    this.initEvents();
  }
  initEvents() {
    const prefix = 'mouse';
    let events = ['enter', 'move', 'over', 'leave', 'out', 'down', 'up'],
			self = this;
    for (let e of events) {
      this.element.addEventListener(`${prefix + e}`, this.handler.bind(this));
    }
  }
  handler(e) {
    this.hover = (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mouseenter' || e.type === 'mouseover' || e.type === 'mousemove');
    this.mousedown = (
      e.type === 'mousedown' ? true :
      e.type === 'mouseup' || e.type === 'mouseleave' || e.type === 'mouseout' ? false :
      this.mousedown
    );
    this.position.last.x = this.position.current.x;
    this.position.last.y = this.position.current.y;
    this.position.current.x = e.clientX;
    this.position.current.y = e.clientY;
    if (this.debugEnabled)
      this.updateDebugConsole();
  }
  initDebugConsole() {
    this.debugConsole = document.createElement('div');
    this.debugConsole.style = `
      position: fixed;
      z-index: 2;
      right: 20px;
      top: 20px;
      padding: 10px;
      background: rgba(80,80,80,0.4);
      color: white;
      font-family: sans-serif;
    `;
    document.body.appendChild(this.debugConsole);
  }
  updateDebugConsole() {
    this.debugConsole.innerHTML = `
      <div style="padding: 10px" id="position-output">
        <span>Current Position</span><br/>
        <span style="padding: 5px">x: ${this.position.current.x}</span></br>
        <span style="padding: 5px">y: ${this.position.current.y}</span></br>
      </div>
      <div style="padding: 10px">Mouse Over: ${this.hover}</div>
      <div style="padding: 10px">Mouse Down: ${this.mousedown}</div>
    `;
  }
}
