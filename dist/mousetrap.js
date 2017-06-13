'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseTrap = function () {
  function MouseTrap(element, debugEnabled) {
    _classCallCheck(this, MouseTrap);

    if (!element || !element.tagName) {
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
    if (this.debugEnabled) this.initDebugPanel();
    this.initEvents();
  }

  _createClass(MouseTrap, [{
    key: 'initEvents',
    value: function initEvents() {
      var events = ['mouseenter', 'mousemove', 'mouseover', 'mouseleave', 'mouseout', 'click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup'],
          self = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var e = _step.value;

          this.element.addEventListener(e, this.handler.bind(this));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'handler',
    value: function handler(e) {
      this.position.last.x = this.position.current.x;
      this.position.last.y = this.position.current.y;
      this.position.current.x = e.clientX;
      this.position.current.y = e.clientY;

      switch (e.type) {
        case 'mouseenter':
          this.states.hover = true;
          break;
        case 'mousemove':
          this.states.hover = true;
          break;
        case 'mouseover':
          this.states.hover = true;
          break;
        case 'mouseleave':
          this.states.hover = false;
          break;
        case 'mouseout':
          this.states.hover = false;
          break;
        case 'click':
          this.states.click = true;
          break;
        case 'dblclick':
          this.states.dblClick = true;
          break;
        case 'contextmenu':
          this.states.contextmenu = true;
          break;
        case 'mousedown':
          this.states.mousedown = this.states.hover = true;
          break;
        case 'mouseup':
          this.states.click = this.states.dblClick = this.states.contextmenu = this.states.mousedown = false;
          break;
        default:
          break;
      }
      if (this.debugEnabled) this.updateDebugPanel();
    }
  }, {
    key: 'initDebugPanel',
    value: function initDebugPanel() {
      this.debugPanel = document.createElement('div');
      this.debugPanel.style = '\n      position: fixed;\n      z-index: 2;\n      right: 20px;\n      top: 20px;\n      padding: 10px;\n      background: rgba(80,80,80,0.4);\n      color: white;\n      font-family: sans-serif;\n    ';
      document.body.appendChild(this.debugPanel);
    }
  }, {
    key: 'updateDebugPanel',
    value: function updateDebugPanel() {
      console.log(this.states);
      this.debugPanel.innerHTML = '\n      <div style="padding: 10px" id="current-position-output">\n        <span>Current Position</span><br/>\n        <span style="padding: 5px">x: ' + this.position.current.x + '</span></br>\n        <span style="padding: 5px">y: ' + this.position.current.y + '</span></br>\n      </div>\n      <div style="padding: 10px" id="last-position-output">\n        <span>Last Position</span><br/>\n        <span style="padding: 5px">x: ' + this.position.last.x + '</span></br>\n        <span style="padding: 5px">y: ' + this.position.last.y + '</span></br>\n      </div>\n      <div style="padding: 10px">Mouse Over: ' + this.states.hover + '</div>\n      <div style="padding: 10px">Mouse Down: ' + this.states.mousedown + '</div>\n      <div style="padding: 10px">Double Click: ' + this.states.dblClick + '</div>\n    ';
    }
  }]);

  return MouseTrap;
}();