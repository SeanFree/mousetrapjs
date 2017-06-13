class MouseTrap {
  constructor(element, debugEnabled) {
    if (!element || !(element.tagName)) {
      this.element = window;
    } else {
      this.element = element;
    }
    this.position = {
      current: { x: 0, y: 0 },
      last: { x: 0, y: 0 }
    };
    this.states = {
      hover: false,
      mousedown: false,
      click: false,
      dblClick: false,
      rightClick: false
    };
    this.debugEnabled = Boolean(debugEnabled);
    if (this.debugEnabled)
      this.initDebugPanel();
    this.initEvents();
  }
  initEvents() {
    let events = [
        'mouseenter', 
        'mousemove', 
        'mouseover', 
        'mouseleave', 
        'mouseout', 
        'click', 
        'dblclick', 
        'contextmenu', 
        'mousedown', 
        'mouseup'
      ],
			self = this;
    for (let e of events) {
      this.element.addEventListener(e, this.handler.bind(this));
    }
  }
  handler(e) {
    this.position.last.x = this.position.current.x;
    this.position.last.y = this.position.current.y;
    this.position.current.x = e.clientX;
    this.position.current.y = e.clientY;

    switch (e.type) {
      case 'mouseenter' :
        this.states.hover = true;
        break;
      case 'mousemove' :
        this.states.hover = true;
        break;
      case 'mouseover' :
        this.states.hover = true;
        break;
      case 'mouseleave' :
        this.states.hover = false;
        break;
      case 'mouseout' :
        this.states.hover = false;
        break;
      case 'click' :
        this.states.click = true;
        break;
      case 'dblclick' :
        this.states.dblClick = true;
        break;
      case 'contextmenu' :
        this.states.contextmenu = true;
        break;
      case 'mousedown' :
        this.states.mousedown = this.states.hover = true;
        break;
      case 'mouseup' :
        this.states.click = this.states.dblClick = this.states.contextmenu = this.states.mousedown = false;
        break;
      default :
        break;
    }
    if (this.debugEnabled)
      this.updateDebugPanel();
  }
  initDebugPanel() {
    this.debugPanel = document.createElement('div');
    this.debugPanel.style = `
      position: fixed;
      z-index: 2;
      right: 20px;
      top: 20px;
      padding: 10px;
      background: rgba(80,80,80,0.4);
      color: white;
      font-family: sans-serif;
    `;
    document.body.appendChild(this.debugPanel);
  }
  updateDebugPanel() {
    console.log(this.states);
    this.debugPanel.innerHTML = `
      <div style="padding: 10px" id="current-position-output">
        <span>Current Position</span><br/>
        <span style="padding: 5px">x: ${this.position.current.x}</span></br>
        <span style="padding: 5px">y: ${this.position.current.y}</span></br>
      </div>
      <div style="padding: 10px" id="last-position-output">
        <span>Last Position</span><br/>
        <span style="padding: 5px">x: ${this.position.last.x}</span></br>
        <span style="padding: 5px">y: ${this.position.last.y}</span></br>
      </div>
      <div style="padding: 10px">Mouse Over: ${this.states.hover}</div>
      <div style="padding: 10px">Mouse Down: ${this.states.mousedown}</div>
      <div style="padding: 10px">Double Click: ${this.states.dblClick}</div>
    `;
  }
}
