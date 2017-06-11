'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseTrap = function () {
  function MouseTrap(element, debugEnabled) {
    _classCallCheck(this, MouseTrap);

    if (!element || !(element instanceof HTMLElement)) this.element = window;else this.element = element;
    this.position = {
      current: { x: 0, y: 0 },
      last: { x: 0, y: 0 }
    };
    this.hover = false;
    this.mousedown = false;
    this.debugEnabled = Boolean(debugEnabled);
    if (this.debugEnabled) this.initDebugConsole();
    this.initEvents();
  }

  _createClass(MouseTrap, [{
    key: 'initEvents',
    value: function initEvents() {
      var prefix = 'mouse';
      var events = ['enter', 'move', 'over', 'leave', 'out', 'down', 'up'],
          self = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var e = _step.value;

          this.element.addEventListener('' + (prefix + e), this.handler.bind(this));
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
      this.hover = e.type === 'mouseenter' || e.type === 'mouseover' || e.type === 'mousemove';
      console.log(this.hover);
      this.position.last.x = this.position.current.x;
      this.position.last.y = this.position.current.y;
      this.position.current.x = e.clientX;
      this.position.current.y = e.clientY;
      if (this.debugEnabled) this.updateDebugConsole();
    }
  }, {
    key: 'initDebugConsole',
    value: function initDebugConsole() {
      this.debugConsole = document.createElement('div');
      this.debugConsole.style = '\n      position: fixed;\n      z-index: 2;\n      right: 20px;\n      top: 20px;\n      background: rgba(80,80,80,0.4);\n      color: white;\n      font-family: sans-serif;\n    ';
      document.body.appendChild(this.debugConsole);
    }
  }, {
    key: 'updateDebugConsole',
    value: function updateDebugConsole() {
      this.debugConsole.innerHTML = '\n      <div style="padding: 10px" id="position-output">\n        <span>Current Position</span><br/>\n        <span>x: ' + this.position.current.x + '</span></br>\n        <span>y: ' + this.position.current.y + '</span></br>\n      </div>\n      <div style="padding: 10px">Mouse Over: ' + this.hover + '</div>\n    ';
    }
  }]);

  return MouseTrap;
}();