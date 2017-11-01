/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var L,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

L = __webpack_require__(2);

L.Control.ControlPanel = (function(superClass) {
  extend(ControlPanel, superClass);

  ControlPanel.prototype.options = {
    position: 'bottomleft',
    className: 'leaflet-control-controlPanel',
    propertiesClassName: 'leaflet-control-controlPanel-properties',
    actionsClassName: 'leaflet-control-controlPanel-actions',
    expanded: true
  };

  function ControlPanel(_toolbar, options) {
    this._toolbar = _toolbar;
    if (options == null) {
      options = {};
    }
    L.Util.setOptions(this, options);
    this._toolbar.on('enable', this.addPanel, this);
    this._toolbar.on('disable', this.removePanel, this);
    this._actionButtons = [];
  }

  ControlPanel.prototype.addPanel = function() {
    L.DomUtil.remove(this._toolbar._actionsContainer);
    return this._toolbar._map.addControl(this);
  };

  ControlPanel.prototype.removePanel = function() {
    return this._toolbar._map.removeControl(this);
  };

  ControlPanel.prototype.onAdd = function(map) {
    this._container = L.DomUtil.create('div', this.options.className);
    if (this.options.expanded) {
      L.DomUtil.addClass(this._container, 'large');
    }
    this._propertiesContainer = L.DomUtil.create('div', this.options.propertiesClassName, this._container);
    this._actionsContainer = L.DomUtil.create('div', this.options.actionsClassName, this._container);
    L.DomEvent.disableScrollPropagation(this._container);
    this._showActionsToolbar();
    return this._container;
  };

  ControlPanel.prototype.onRemove = function() {};

  ControlPanel.prototype._createActions = function(handler) {
    var button, buttons, container, di, div, dl, i, l, results;
    container = this._actionsContainer;
    buttons = this._toolbar.getActions(handler);
    l = buttons.length;
    di = 0;
    dl = this._actionButtons.length;
    while (di < dl) {
      this._toolbar._disposeButton(this._actionButtons[di].button, this._actionButtons[di].callback);
      di++;
    }
    this._actionButtons = [];
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    i = 0;
    results = [];
    while (i < l) {
      if ('enabled' in buttons[i] && !buttons[i].enabled) {
        i++;
        continue;
      }
      div = L.DomUtil.create('div', 'button', container);
      button = this._toolbar._createButton({
        title: buttons[i].title,
        text: buttons[i].text,
        container: div,
        callback: buttons[i].callback,
        context: buttons[i].context
      });
      this._actionButtons.push({
        button: button,
        callback: buttons[i].callback
      });
      results.push(i++);
    }
    return results;
  };

  ControlPanel.prototype._showActionsToolbar = function() {
    var buttonIndex, lastButtonIndex, toolbarPosition;
    buttonIndex = this._toolbar._activeMode.buttonIndex;
    lastButtonIndex = this._toolbar._lastButtonIndex;
    toolbarPosition = this._toolbar._activeMode.button.offsetTop - 1;
    this._createActions(this._toolbar._activeMode.handler);
    this._actionsContainer.style.top = toolbarPosition + 'px';
    if (buttonIndex === 0) {
      L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-top');
    }
    if (buttonIndex === lastButtonIndex) {
      L.DomUtil.addClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
    }
    this._actionsContainer.style.display = 'block';
  };

  ControlPanel.prototype._hideActionsToolbar = function() {
    this._actionsContainer.style.display = 'none';
    L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-top');
    L.DomUtil.removeClass(this._actionsContainer, 'leaflet-draw-actions-bottom');
  };

  return ControlPanel;

})(L.Control);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = L;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);