"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Usage:
 * ```js
 * <LoadingBar URL={videoAsset}
 *      options={{
 *          hint: 'Video is loading',
 *          showHint: true
 * }} />
 * ```
 */
function ProgressBar(props) {
  // set options from props or use defaults
  var options = {
    displayPercent: (props === null || props === void 0 ? void 0 : props.displayPercent) !== undefined ? props === null || props === void 0 ? void 0 : props.displayPercent : true,
    hint: (props === null || props === void 0 ? void 0 : props.hint) || "Downloading",
    showHint: (props === null || props === void 0 ? void 0 : props.showHint) || false,
    doneMessage: (props === null || props === void 0 ? void 0 : props.doneMessage) || "Done!",
    smoothing: parseSmoothing(props === null || props === void 0 ? void 0 : props.smoothing),
    theme: (props === null || props === void 0 ? void 0 : props.theme) || "basic",
    colorPrimary: (props === null || props === void 0 ? void 0 : props.colorPrimary) || "white",
    colorSecondary: (props === null || props === void 0 ? void 0 : props.colorSecondary) || "white",
    colorText: (props === null || props === void 0 ? void 0 : props.colorText) || "white",
    delay: (props === null || props === void 0 ? void 0 : props.delay) || "1.2",
    height: (props === null || props === void 0 ? void 0 : props.height) || "30px",
    containerStyle: (props === null || props === void 0 ? void 0 : props.containerStyle) || {},
    textStyle: (props === null || props === void 0 ? void 0 : props.textStyle) || {},
    percent: props === null || props === void 0 ? void 0 : props.percent,
    dumb: (props === null || props === void 0 ? void 0 : props.dumb) || false,
    width: getWidth(props === null || props === void 0 ? void 0 : props.width) || 300,
    completeMessage: (props === null || props === void 0 ? void 0 : props.completeMessage) || "Done!"
  }; // get URI for resource to load/download

  var URL = props.URL; // this will need to throw error if not present

  if (!URL && !options.dumb) {
    console.log(URL); // catch missing prop error

    throw new Error("URL for file to download is required. (URL prop in LoadingBar component.)");
  } // SMART STATE
  // setup state for readable stream progress


  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      size = _useState4[0],
      setSize = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      received = _useState6[0],
      setReceived = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      complete = _useState8[0],
      setComplete = _useState8[1]; // start fetch and create readable stream


  (0, _react.useEffect)(function () {
    // only start fetch if component is smart
    if (!options.dumb) {
      get();
    }
  }, []); // call upon component mount
  // second order functions passed in via props

  var onComplete = props.onComplete || null;

  function get() {
    fetch(URL, {}).then(function (res) {
      var size = res.headers.get("Content-Length");
      console.log("Total Size: " + size);
      setSize(size);
      return res.body;
    }).then(function (body) {
      var reader = body.getReader();
      return new ReadableStream({
        start: function start(controller) {
          return pump();

          function pump() {
            return reader.read().then(function (_ref) {
              var done = _ref.done,
                  value = _ref.value;

              if (done) {
                controller.close();
                setComplete(true);
                return;
              }

              controller.enqueue(value);
              var size = value.length;
              setReceived(function (old) {
                return old + size;
              });
              console.log(size);
              return pump();
            });
          }
        }
      });
    });
  } // onComplete callback if provided by dev


  (0, _react.useEffect)(function () {
    // if stream is complete and onComplete callback is provided, run callback
    if (complete && onComplete && typeof onComplete === "function") {
      // use delay parameter to time complete handler with animations
      setTimeout(function () {
        onComplete(); // call oncomplete after animation delay and duration complete
      }, parseInt(options.delay) * 1000 + 1000);
    }

    return;
  }, [complete]); // chunk read callback

  (0, _react.useEffect)(function () {
    console.log(received);
  }, [received]); // DUMB STATE

  var _useState9 = (0, _react.useState)(0.01),
      _useState10 = _slicedToArray(_useState9, 2),
      percent = _useState10[0],
      setPercent = _useState10[1]; // dumb component percentage update


  (0, _react.useEffect)(function () {
    if (options.dumb) {
      setPercent(props.percent);
    }
  }, [props.percent]); // dumb component completion update

  (0, _react.useEffect)(function () {
    if (props.triggerComplete === true && props.dumb) {
      setComplete(true);
    }
  }, [props.triggerComplete]); // optional element components

  var percentageElement =
  /*#__PURE__*/
  //percentage tracker
  _react.default.createElement("div", {
    style: _objectSpread({
      marginTop: "10px",
      fontSize: "12px",
      opacity: !complete ? 1 : 0,
      transition: "opacity .4s ease-in",
      transitionDelay: "".concat(options.delay, "s")
    }, options.textStyle)
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontWeight: "light"
    }
  }, isNaN((received / size * 100).toFixed(0)) ? 0 : (received / size * 100).toFixed(0), /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontWeight: "bold",
      position: "relative"
    }
  }, "%")));

  var hintElement =
  /*#__PURE__*/
  // hint element
  _react.default.createElement("div", {
    style: _objectSpread({
      marginTop: "10px",
      marginRight: "".concat(options.showHint && options.displayPercent ? '8px' : '0'),
      fontSize: "12px",
      opacity: !complete ? 1 : 0,
      transition: "opacity .4s ease-in",
      transitionDelay: "".concat(options.delay, "s")
    }, options.textStyle)
  }, !complete ? options.hint : options.completeMessage); // styles


  var themes = {
    basic: {
      background: "rgba(255,255,255,.1)",
      border: "0px solid ".concat(options.colorPrimary),
      height: '2px'
    },
    outline: {
      background: "transparent",
      border: "2px solid ".concat(options.colorPrimary),
      height: '10px'
    },
    minimal: {
      background: "transparent",
      border: "1px solid ".concat(options.colorPrimary),
      height: '2px'
    },
    modern: {
      background: "transparent",
      border: 'none',
      borderRadius: '14px',
      height: '20px'
    }
  }; //  SMART COMPONENT MARKUP

  if (!options.dumb) {
    return (
      /*#__PURE__*/
      // container element
      _react.default.createElement("div", {
        style: _objectSpread(_objectSpread({}, options.containerStyle), {}, {
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          padding: "10px 0 10px 0",
          letterSpacing: "2px"
        })
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          color: "".concat(options.colorText),
          width: "".concat(!complete ? "".concat(options.width, "px") : "0px"),
          transition: "width .4s cubic-bezier(0.36, 0, 0.66, -0.56)",
          transitionDelay: "".concat(options.delay, "s")
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "react-loading-bar-outer",
        style: {
          border: "".concat(themes[options.theme].border),
          borderRadius: "14px",
          background: "".concat(themes[options.theme].background)
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "react-loading-bar-inner",
        style: {
          width: "".concat((received / size * 100).toFixed(0), "%"),
          height: "".concat(themes[options.theme].height),
          background: "".concat(options.colorPrimary),
          transition: "width ".concat(options.smoothing, " cubic-bezier(0.87, 0, 0.13, 1)"),
          borderRadius: "14px"
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "row",
          justifyContent: 'center'
        }
      }, options.showHint && hintElement, options.displayPercent && percentageElement)))
    );
  } // DUMB COMPONENT RENDER
  else {
      return (
        /*#__PURE__*/
        // container element
        _react.default.createElement("div", {
          style: _objectSpread(_objectSpread({}, options.containerStyle), {}, {
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            padding: "10px 0 10px 0",
            letterSpacing: "2px"
          })
        }, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            color: "".concat(options.colorText),
            width: "".concat(!complete ? "".concat(options.width, "px") : "0px"),
            transition: "width .4s cubic-bezier(0.36, 0, 0.66, -0.56)",
            transitionDelay: "".concat(options.delay, "s")
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "react-loading-bar-outer",
          style: {
            width: "100%",
            border: "".concat(themes[options.theme].border),
            borderRadius: "14px",
            background: "".concat(themes[options.theme].background)
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "react-loading-bar-inner",
          style: {
            width: "".concat(props.percent.toFixed(0) || 0, "%"),
            height: "".concat(themes[options.theme].height),
            background: "".concat(options.colorPrimary),
            transition: "width ".concat(options.smoothing, " cubic-bezier(0.87, 0, 0.13, 1)"),
            borderRadius: "14px"
          }
        })), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: 'center'
          }
        }, options.showHint && hintElement, options.displayPercent && percentageElement)))
      );
    }
} // propTypes


ProgressBar.propTypes = {
  /** {string} of path to asset location. */
  URL: _propTypes.default.string,

  /** {object} containing user defined styles in react inline-styles format. */
  containerStyle: _propTypes.default.object,

  /** {object} styles for hint and completion text */
  textStyle: _propTypes.default.object,

  /** {string} for use in list via array.map function */
  key: _propTypes.default.string,

  /** {function}: callback to fire (in parent component) on completion of download */
  onComplete: _propTypes.default.func,

  /** {string} message to display after download is complete */
  completeMessage: _propTypes.default.string,

  /** {boolean} modal determines if this behaves like a normally styled component, or if the loader will behave like a modal, taking up the whole pages focus */
  modal: _propTypes.default.bool,

  /** {boolean} display percentage complete in addition to progress bar */
  displayPercent: _propTypes.default.bool,

  /** {string} message to display while in progress */
  hint: _propTypes.default.string,

  /** {boolean} to show/hide hint message */
  showHint: _propTypes.default.bool,

  /** {string: low, medium, high} determines how smooth the animation of the progress bar is*/
  smoothing: _propTypes.default.string,

  /** {string: hex, rgb, rgba} primary color */
  colorPrimary: _propTypes.default.string,

  /** {string: hex, rgb, rgba} secondary color */
  colorSecondary: _propTypes.default.string,

  /** {string} text color */
  colorText: _propTypes.default.string,

  /** {string} preset style themes */
  theme: _propTypes.default.string,

  /** {string || number} width in px of bar */
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /** {string || number} height of bar in px */
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /** {number} manually control progress of bar without providing an asset path/URL */
  percent: _propTypes.default.number,

  /** {boolean} if dumb, percent is controlled manually by percent parameter and not by component itself */
  dumb: _propTypes.default.bool,

  /** {boolean} manually trigger completion animation */
  triggerComplete: _propTypes.default.bool
};
var animations = {}; // get smoothing rate

function parseSmoothing(string) {
  if (string) {
    switch (string) {
      case "low":
        return ".1s";
        break;

      case "medium":
        return ".8s";
        break;

      case "high":
        return "1.4s";
        break;

      default:
        return ".8s";
    }
  }
} // get width (apply min and max standards)


function getWidth(desiredWidth) {
  if (desiredWidth < 50) {
    return 80;
  }

  if (desiredWidth > 600) {
    return 600;
  } else return desiredWidth;
}

var _default = ProgressBar;
exports.default = _default;
