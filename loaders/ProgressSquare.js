"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ProgressSquare;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Usage:
 * ```js
 * <LoadingSquare URL={videoAsset}
 *      size={200}
 *      theme={outline}
 * }} />
 * ```
 */
function ProgressSquare(props) {
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
    size: (props === null || props === void 0 ? void 0 : props.size) || "300px",
    containerStyle: (props === null || props === void 0 ? void 0 : props.containerStyle) || {},
    textStyle: (props === null || props === void 0 ? void 0 : props.textStyle) || {},
    percent: props === null || props === void 0 ? void 0 : props.percent,
    dumb: (props === null || props === void 0 ? void 0 : props.dumb) || false,
    completeMessage: (props === null || props === void 0 ? void 0 : props.completeMessage) || "Done!"
  }; // progress control
  // SMART STATE
  // setup state for readable stream progress

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      received = _useState4[0],
      setReceived = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      complete = _useState6[0],
      setComplete = _useState6[1]; // start fetch and create readable stream


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

  var _useState7 = (0, _react.useState)(0.01),
      _useState8 = _slicedToArray(_useState7, 2),
      percent = _useState8[0],
      setPercent = _useState8[1]; // dumb component percentage update


  (0, _react.useEffect)(function () {
    if (options.dumb) {
      setPercent(props.percent);
    }
  }, [props.percent]); // dumb component completion update

  (0, _react.useEffect)(function () {
    if (props.triggerComplete === true && props.dumb) {
      setComplete(true);
    }
  }, [props.triggerComplete]);
  var themes = {}; // SMART COMPONENT

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: options.size,
      height: options.size
    }
  });
}

ProgressSquare.propsTypes = {
  /** {number} size in pixels of square */
  size: _propTypes.default.number
};