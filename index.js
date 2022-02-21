"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactVirtualDom = _interopRequireDefault(require("react-virtual-dom"));

var _aioButton = _interopRequireDefault(require("aio-button"));

var _react2 = require("@mdi/react");

var _js = require("@mdi/js");

var _jquery = _interopRequireDefault(require("jquery"));

var _rRangeSlider = _interopRequireDefault(require("r-range-slider"));

var _aioTable = _interopRequireDefault(require("aio-table"));

var _gahDatepicker = _interopRequireDefault(require("gah-datepicker"));

var _aioValidation = _interopRequireDefault(require("aio-validation"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AIOFormContext = /*#__PURE__*/(0, _react.createContext)();

var AIOForm = /*#__PURE__*/function (_Component) {
  _inherits(AIOForm, _Component);

  var _super = _createSuper(AIOForm);

  function AIOForm(props) {
    var _this;

    _classCallCheck(this, AIOForm);

    _this = _super.call(this, props);
    _this.dom = /*#__PURE__*/(0, _react.createRef)();
    _this.components = {
      text: FormTextbox,
      number: FormTextbox,
      textarea: FormTextbox,
      select: FormSelect,
      multiselect: FormSelect,
      datepicker: FormDatepicker,
      message: FormMessage,
      rangedatepicker: FormDatepicker,
      slider: FormSlider,
      rangeslider: FormSlider,
      radio: FormCheck,
      checklist: FormCheck,
      checkbox: FormCheck,
      table: FormTable,
      list: FormList,
      color: FormColor,
      file: FormFile
    };
    var data = _this.props.data;
    _this.state = {
      splitterDictionary: {},
      startData: JSON.stringify(data)
    };
    return _this;
  }

  _createClass(AIOForm, [{
    key: "getHeaderStyle",
    value: function getHeaderStyle() {
      var theme = this.props.theme;
      return {
        height: theme.headerHeight,
        padding: theme.headerPadding !== undefined ? "0 ".concat(theme.headerPadding, "px") : undefined,
        background: theme.headerBG,
        color: theme.headerColor
      };
    }
  }, {
    key: "getBodyStyle",
    value: function getBodyStyle() {
      var theme = this.props.theme;
      return {
        padding: theme.bodyPadding,
        color: theme.bodyColor,
        background: theme.bodyBG
      };
    }
  }, {
    key: "getFooterStyle",
    value: function getFooterStyle() {
      var theme = this.props.theme;
      var style = {
        background: theme.footerBG,
        height: theme.footerHeight
      };

      if (theme.footerBorderColor) {
        style.borderTop = "1px solid ".concat(theme.footerBorderColor);
      }

      return style;
    }
  }, {
    key: "getFooterButtonStyle",
    value: function getFooterButtonStyle() {
      var theme = this.props.theme;
      var style = {
        height: theme.footerButtonHeight,
        color: theme.footerBTNColor,
        background: theme.footerBTNBG,
        fontSize: theme.footerButtonFontSize
      };

      if (theme.footerBTNPadding !== undefined) {
        style.padding = "0 ".concat(theme.footerBTNPadding, "px");
      }

      if (theme.footerBTNRound !== undefined) {
        style.borderRadius = theme.footerBTNRound;
      }

      if (theme.footerBTNBorderWidth) {
        style.border = "".concat(theme.footerBTNBorderWidth, "px solid ").concat(theme.footerBTNBorderColor);
      }

      return style;
    }
  }, {
    key: "getSplitterStyle",
    value: function getSplitterStyle() {
      var theme = this.props.theme;
      var style = {
        height: theme.splitterHeight,
        fontSize: theme.splitterFontSize,
        color: theme.splitterColor,
        background: theme.splitterBG
      };

      if (theme.splitterMargin !== undefined) {
        style.margin = "".concat(theme.splitterMargin, "px 0");
      }

      return style;
    }
  }, {
    key: "getHeaderLayout",
    value: function getHeaderLayout() {
      var _this2 = this;

      var _this$props = this.props,
          data = _this$props.data,
          _this$props$header = _this$props.header,
          header = _this$props$header === void 0 ? {} : _this$props$header,
          _this$props$onClose = _this$props.onClose,
          onClose = _this$props$onClose === void 0 ? function () {} : _this$props$onClose;

      if (!header.title && !header.titleField) {
        return {
          html: ''
        };
      }

      var titleField = header.titleField,
          subtitleField = header.subtitleField,
          title = header.title,
          subtitle = header.subtitle;
      var headerTitle, headerSubtitle;

      if (titleField) {
        headerTitle = data[titleField];
      }

      if (!headerTitle) {
        headerTitle = title;
      }

      if (subtitleField) {
        headerSubtitle = data[subtitleField];
      }

      if (!headerSubtitle) {
        headerSubtitle = subtitle;
      }

      if (!headerTitle) {
        return {
          html: ''
        };
      }

      return {
        html: function html() {
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-header",
            style: _this2.getHeaderStyle()
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-header-title",
            key: "title"
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-header-uptitle"
          }, headerTitle), headerSubtitle !== undefined && /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-header-subtitle"
          }, headerSubtitle)), /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-header-icon",
            onClick: onClose
          }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: _js.mdiClose,
            size: 0.8
          })));
        }
      };
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(data) {
      var onSubmit = this.props.onSubmit;

      if ((0, _jquery.default)(this.dom.current).find('.aio-form-error').length) {
        alert('there is errors');
      }

      onSubmit(data);
    }
  }, {
    key: "getOptions",
    value: function getOptions(item) {
      var data = this.props.data;
      var options;

      if (item.optionsField) {
        options = data[item.optionsField];

        if (!options) {
          options = item.options;
        }
      } else {
        options = item.options;
      }

      if (!Array.isArray(options)) {
        options = [];
      }

      return options.map(function (o) {
        if (_typeof(o) !== 'object') {
          return {
            text: o,
            value: o
          };
        }

        if (!item.textField) {
          console.error('aio-form => missing textField');
        }

        if (!item.valueField) {
          console.error('aio-form => missing valueField');
        }

        return {
          text: o[item.textField],
          value: o[item.valueField]
        };
      });
    }
  }, {
    key: "sortByRows",
    value: function sortByRows(items) {
      var res = {};
      var result = [];

      for (var i = 0; i < items.length; i++) {
        if (items[i].type === 'splitter') {
          var a = 'a' + Math.random();
          res[a] = [items[i]];
          result.push(res[a]);
          continue;
        }

        var _items$i$rowId = items[i].rowId,
            rowId = _items$i$rowId === void 0 ? 'a' + Math.random() : _items$i$rowId;

        if (!res[rowId]) {
          res[rowId] = [];
          result.push(res[rowId]);
        }

        res[rowId].push(items[i]);
      }

      return result;
    }
  }, {
    key: "getLabelStyle",
    value: function getLabelStyle() {
      var theme = this.props.theme;
      var style = {
        fontSize: theme.labelFontSize,
        color: theme.labelColor,
        width: theme.inline ? 120 : '100%',
        height: theme.labelHeight
      };

      if (theme.labelPadding !== undefined) {
        style.padding = "0 ".concat(theme.labelPadding, "px");
      }

      return style;
    }
  }, {
    key: "getResultByConditions",
    value: function getResultByConditions(conditions) {
      var data = this.props.data;

      for (var i = 0; i < conditions.length; i++) {
        var _conditions$i = conditions[i],
            operator = _conditions$i.operator,
            value = _conditions$i.value,
            field = _conditions$i.field,
            type = _conditions$i.type;
        var fieldValue = data[field];

        if (fieldValue === undefined || value === undefined) {
          return false;
        }

        if (Array.isArray(fieldValue)) {
          fieldValue = fieldValue.length;
        }

        if (type === 'number') {
          value = parseFloat(value);
        }

        if (type === 'boolean') {
          value = JSON.parse(value);
        }

        if (operator === '=') {
          if (fieldValue !== value) {
            return false;
          }
        }

        if (operator === '!=') {
          if (fieldValue === value) {
            return false;
          }
        }

        if (operator === '<') {
          if (fieldValue >= value) {
            return false;
          }
        }

        if (operator === '<=') {
          if (fieldValue > value) {
            return false;
          }
        }

        if (operator === '>') {
          if (fieldValue <= value) {
            return false;
          }
        }

        if (operator === '>=') {
          if (fieldValue < value) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: "getItem",
    value: function getItem(o) {
      var _this3 = this;

      var splitterDictionary = this.state.splitterDictionary;
      var _this$props2 = this.props,
          theme = _this$props2.theme,
          data = _this$props2.data,
          lang = _this$props2.lang;

      if (o.type === 'splitter') {
        splitterDictionary[o.id] = splitterDictionary[o.id] === undefined ? true : splitterDictionary[o.id];
        return {
          html: /*#__PURE__*/_react.default.createElement("div", {
            style: this.getSplitterStyle(),
            className: "aio-form-splitter",
            onClick: function onClick() {
              splitterDictionary[o.id] = !splitterDictionary[o.id];

              _this3.setState({
                splitterDictionary: splitterDictionary
              });
            }
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-splitter-icon"
          }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: splitterDictionary[o.id] === false ? _js.mdiPlusThick : _js.mdiMinusThick,
            size: 0.6
          })), o.text)
        };
      }

      if (o.splitterId && splitterDictionary[o.splitterId] === false) {
        return null;
      }

      if (o.show === false) {
        return null;
      }

      if (o.type === 'table' && (!o.columns || !o.columns.length)) {
        return null;
      }

      if (!o.conditions) {
        o.conditions = [];
      }

      if (!this.getResultByConditions(o.conditions)) {
        return null;
      }

      var label = o.editLabel || o.label || false;
      var value = data[o.field];
      var FormComponent = this.components[o.type];
      var error = o.errors && o.errors.length ? (0, _aioValidation.default)({
        value: value,
        errors: o.errors,
        label: label,
        lang: lang,
        translate: function translate(text) {
          if (o.type === 'select' || item.type === 'radio') {
            return o.options.filter(function (o) {
              return o.value === text;
            })[0].text;
          }

          return text;
        }
      }) : '';
      return {
        attrs: {
          style: {
            marginBottom: theme.inputMargin
          },
          className: 'aio-form-item'
        },
        column: [_defineProperty({}, !theme.inline ? 'column' : 'row', [{
          show: label !== false,
          html: /*#__PURE__*/_react.default.createElement("div", {
            className: "aio-form-label",
            style: this.getLabelStyle()
          }, label)
        }, {
          flex: theme.inline ? 1 : undefined,
          column: [{
            html: function html() {
              return /*#__PURE__*/_react.default.createElement(FormComponent, {
                item: o
              });
            }
          }, {
            attrs: {
              className: 'aio-form-error'
            },
            show: error !== '',
            html: function html() {
              return error;
            }
          }]
        }])]
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          data = _this$props3.data,
          theme = _this$props3.theme,
          items = _this$props3.items,
          onChange = _this$props3.onChange,
          lang = _this$props3.lang,
          className = _this$props3.className,
          footer = _this$props3.footer,
          onClose = _this$props3.onClose,
          _this$props3$style = _this$props3.style,
          style = _this$props3$style === void 0 ? {} : _this$props3$style;
      var startData = this.state.startData;
      var headerLayout;

      try {
        headerLayout = this.getHeaderLayout();
      } catch {
        headerLayout = this.getHeaderLayout();
      }

      if (theme.bodyFontSize !== undefined) {
        style.fontSize = theme.bodyFontSize;
      }

      return /*#__PURE__*/_react.default.createElement(AIOFormContext.Provider, {
        value: {
          data: data,
          items: items,
          theme: theme,
          lang: lang,
          onChange: onChange,
          getOptions: this.getOptions.bind(this)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactVirtualDom.default, {
        layout: {
          attrs: {
            ref: this.dom,
            className: 'aio-form' + (className ? ' ' + className : ''),
            style: { ...theme,
              direction: lang === 'fa' ? 'rtl' : 'ltr',
              ...style
            }
          },
          column: [headerLayout, {
            flex: 1,
            attrs: {
              className: 'aio-form-body',
              style: this.getBodyStyle()
            },
            column: this.sortByRows(items).map(function (item) {
              return {
                gap: 12,
                row: item.map(function (o) {
                  return { ..._this4.getItem(o),
                    flex: o.rowSize ? undefined : 1,
                    size: o.rowSize
                  };
                })
              };
            })
          }, {
            show: _typeof(footer) === 'object',
            html: function html() {
              return /*#__PURE__*/_react.default.createElement("div", {
                className: "aio-form-footer",
                style: _this4.getFooterStyle()
              }, footer.onClose && /*#__PURE__*/_react.default.createElement("button", {
                style: _this4.getFooterButtonStyle(),
                onClick: function onClick() {
                  return footer.onClose(data);
                }
              }, lang === 'fa' ? 'بستن' : 'close'), footer.reset && /*#__PURE__*/_react.default.createElement("button", {
                style: _this4.getFooterButtonStyle(),
                onClick: function onClick() {
                  return onChange(JSON.parse(startData));
                }
              }, lang === 'fa' ? 'تنظیم مجدد' : 'reset'), footer.onSubmit && /*#__PURE__*/_react.default.createElement("button", {
                style: _this4.getFooterButtonStyle(),
                onClick: function onClick() {
                  if ((0, _jquery.default)(_this4.dom.current).find('.aio-form-error').length) {
                    return;
                  }

                  footer.onSubmit(data);
                }
              }, lang === 'fa' ? 'ارسال' : 'submit'));
            }
          }]
        }
      }));
    }
  }]);

  return AIOForm;
}(_react.Component);

exports.default = AIOForm;
AIOForm.defaultProps = {
  theme: {},
  data: {},
  items: [],
  onChange: function onChange() {},
  lang: 'en'
};

var FormMessage = /*#__PURE__*/function (_Component2) {
  _inherits(FormMessage, _Component2);

  var _super2 = _createSuper(FormMessage);

  function FormMessage() {
    _classCallCheck(this, FormMessage);

    return _super2.apply(this, arguments);
  }

  _createClass(FormMessage, [{
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        width: '100%',
        color: theme.messageColor,
        fontSize: theme.messageFontSize || theme.bodyFontSize
      };
      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      var data = this.context.data;
      var message;

      try {
        message = data[item.messageField] || item.message;
      } catch {
        message = item.message;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        style: this.getStyle(),
        className: "aio-form-input aio-form-input-message"
      }, message);
    }
  }]);

  return FormMessage;
}(_react.Component);

_defineProperty(FormMessage, "contextType", AIOFormContext);

var FormSelect = /*#__PURE__*/function (_Component3) {
  _inherits(FormSelect, _Component3);

  var _super3 = _createSuper(FormSelect);

  function FormSelect() {
    _classCallCheck(this, FormSelect);

    return _super3.apply(this, arguments);
  }

  _createClass(FormSelect, [{
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        height: theme.inputHeight,
        minHeight: theme.inputHeight,
        width: '100%'
      };

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      if (theme.inputPadding !== undefined) {
        style.padding = "0 ".concat(theme.inputPadding, "px");
      }

      return style;
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      var _this$context = this.context,
          data = _this$context.data,
          onChange = _this$context.onChange;
      var item = this.props.item;
      data[item.field] = value;
      onChange(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var item = this.props.item;
      var _this$context2 = this.context,
          data = _this$context2.data,
          theme = _this$context2.theme,
          lang = _this$context2.lang,
          getOptions = _this$context2.getOptions;
      var value = data[item.field];
      var props = {};

      if (item.type === 'select') {
        props.value = value;
      }

      if (item.type === 'multiselect') {
        props.tagStyle = {
          color: theme.tagColor,
          background: theme.tagBG,
          fontSize: theme.tagFontSize
        };
        props.values = value || [];
        props.selectAll = true;
      }

      props.options = JSON.parse(JSON.stringify(getOptions(item)));
      props.search = props.options.length > 12;
      return /*#__PURE__*/_react.default.createElement(_aioButton.default, _extends({}, item, props, {
        rtl: lang === 'fa',
        style: this.getStyle(),
        className: "aio-form-input aio-form-input-".concat(item.type),
        onChange: function onChange(val) {
          return _this5.onChange(val);
        },
        popupStyle: {
          maxHeight: 400
        },
        popupWidth: "fit"
      }));
    }
  }]);

  return FormSelect;
}(_react.Component);

_defineProperty(FormSelect, "contextType", AIOFormContext);

var FormCheck = /*#__PURE__*/function (_Component4) {
  _inherits(FormCheck, _Component4);

  var _super4 = _createSuper(FormCheck);

  function FormCheck() {
    _classCallCheck(this, FormCheck);

    return _super4.apply(this, arguments);
  }

  _createClass(FormCheck, [{
    key: "onChange",
    value: function onChange(value) {
      var _this$context3 = this.context,
          data = _this$context3.data,
          onChange = _this$context3.onChange;
      var item = this.props.item;
      data[item.field] = value;
      onChange(data);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        minHeight: theme.inputHeight,
        padding: 0
      };

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      return style;
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      var theme = this.context.theme;
      return {
        size: [theme.checkboxOuterSize || 12, theme.checkboxInnerSize || 10, theme.checkboxBorderWidth === undefined ? 1 : theme.checkboxBorderWidth],
        color: [theme.checkboxOuterColor || 'dodgerblue', theme.checkboxInnerColor || 'dodgerblue']
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var item = this.props.item;
      var _this$context4 = this.context,
          data = _this$context4.data,
          theme = _this$context4.theme,
          getOptions = _this$context4.getOptions;
      var value = data[item.field];
      var props = { ...item,
        style: this.getStyle(),
        className: "aio-form-input aio-form-input-".concat(item.type),
        optionStyle: {
          height: theme.inputHeight
        },
        icon: this.getIcon()
      };

      if (theme.inputPadding !== undefined) {
        props.optionStyle.padding = "0 ".concat(theme.inputPadding, "px");
      }

      if (item.type === 'radio') {
        props.optionWidth = item.optionWidth || 'fit-content';
        props.type = 'radio';
        props.options = getOptions(item);

        props.onChange = function (val) {
          return _this6.onChange(val);
        };

        props.value = value;
      } else if (item.type === 'checklist') {
        props.optionWidth = item.optionWidth || 'fit-content';
        props.type = 'checklist';

        if (!Array.isArray(value)) {
          props.values = [];
        } else {
          props.values = value;
        }

        props.value = getOptions({ ...item,
          options: value
        });

        props.onChange = function (val, index) {
          value[index][item.valueField] = val;

          _this6.onChange(value);
        };
      } else if (item.type === 'checkbox') {
        props.optionWidth = '100%';
        props.type = 'checklist';
        props.value = [{
          text: item.text,
          value: value
        }];

        props.onChange = function (val) {
          _this6.onChange(val);
        };
      }

      return /*#__PURE__*/_react.default.createElement(_aioButton.default, props);
    }
  }]);

  return FormCheck;
}(_react.Component);

_defineProperty(FormCheck, "contextType", AIOFormContext);

var FormTextbox = /*#__PURE__*/function (_Component5) {
  _inherits(FormTextbox, _Component5);

  var _super5 = _createSuper(FormTextbox);

  function FormTextbox(props) {
    var _this7;

    _classCallCheck(this, FormTextbox);

    _this7 = _super5.call(this, props);
    _this7.state = {
      textPreview: '',
      prev: ''
    };
    return _this7;
  }

  _createClass(FormTextbox, [{
    key: "onChange",
    value: function onChange(value) {
      var _this8 = this;

      this.setState({
        textPreview: value
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        var _this8$context = _this8.context,
            data = _this8$context.data,
            onChange = _this8$context.onChange;
        var item = _this8.props.item;

        if (item.type === 'number') {
          value = parseFloat(value);

          if (isNaN(value)) {
            value = '';
          }
        }

        data[item.field] = value;
        onChange(data);
      }, 500);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var item = this.props.item;
      var style = {};

      if (item.type !== 'textarea') {
        style = {
          height: theme.inputHeight,
          minHeight: theme.inputHeight,
          padding: theme.inputPadding !== undefined ? "0 ".concat(theme.inputPadding, "px") : undefined
        };
      } else {
        style = {
          padding: theme.inputPadding !== undefined ? theme.inputPadding : undefined
        };
      }

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var item = this.props.item;
      var data = this.context.data;
      var _this$state = this.state,
          textPreview = _this$state.textPreview,
          prev = _this$state.prev;
      var value = data[item.field];

      if (prev !== value) {
        setTimeout(function () {
          return _this9.setState({
            prev: value,
            textPreview: value
          });
        }, 0);
      }

      var props = { ...item,
        style: this.getStyle(),
        className: "aio-form-input aio-form-input-".concat(item.type),
        value: textPreview,
        onChange: function onChange(e) {
          return _this9.onChange(e.target.value);
        }
      };

      if (item.type === 'textarea') {
        return /*#__PURE__*/_react.default.createElement("textarea", props);
      }

      return /*#__PURE__*/_react.default.createElement("input", props);
    }
  }]);

  return FormTextbox;
}(_react.Component);

_defineProperty(FormTextbox, "contextType", AIOFormContext);

var FormList = /*#__PURE__*/function (_Component6) {
  _inherits(FormList, _Component6);

  var _super6 = _createSuper(FormList);

  function FormList(props) {
    var _this10;

    _classCallCheck(this, FormList);

    _this10 = _super6.call(this, props);
    _this10.state = {
      preview: [],
      prev: '[]'
    };
    return _this10;
  }

  _createClass(FormList, [{
    key: "change",
    value: function change(preview) {
      var _this$context5 = this.context,
          data = _this$context5.data,
          onChange = _this$context5.onChange;
      var item = this.props.item;
      data[item.field] = preview;
      onChange(data);
    }
  }, {
    key: "onChange",
    value: function onChange(preview, realTime) {
      var _this11 = this;

      this.setState({
        preview: preview
      });

      if (realTime) {
        this.change(preview);
      } else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          return _this11.change(preview);
        }, 500);
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        minHeight: theme.inputHeight
      };

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this12 = this;

      var _this$context6 = this.context,
          data = _this$context6.data,
          theme = _this$context6.theme;
      var item = this.props.item;
      var _this$state2 = this.state,
          preview = _this$state2.preview,
          prev = _this$state2.prev;
      var value = data[item.field] || [];

      if (JSON.stringify(value) !== prev) {
        this.setState({
          preview: value,
          prev: JSON.stringify(value)
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-form-input aio-form-input-list",
        style: this.getStyle()
      }, preview.map(function (o, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          style: {
            height: theme.inputHeight
          },
          className: "aio-form-input-list-item"
        }, /*#__PURE__*/_react.default.createElement("input", {
          disabled: item.disabled,
          type: "text",
          value: o,
          onChange: function onChange(e) {
            preview[i] = e.target.value;

            _this12.onChange(preview);
          }
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-form-input-list-remove",
          onClick: function onClick() {
            preview.pop();

            _this12.onChange(preview, true);
          }
        }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
          path: _js.mdiClose,
          size: 0.7
        })));
      }), /*#__PURE__*/_react.default.createElement("div", {
        key: "add",
        style: {
          height: theme.tableRowHeight
        },
        className: "aio-form-input-list-add",
        onClick: function onClick() {
          preview.push('');

          _this12.onChange(preview, true);
        }
      }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
        path: _js.mdiPlusThick,
        size: 0.8
      })));
    }
  }]);

  return FormList;
}(_react.Component);

_defineProperty(FormList, "contextType", AIOFormContext);

var FormDatepicker = /*#__PURE__*/function (_Component7) {
  _inherits(FormDatepicker, _Component7);

  var _super7 = _createSuper(FormDatepicker);

  function FormDatepicker() {
    _classCallCheck(this, FormDatepicker);

    return _super7.apply(this, arguments);
  }

  _createClass(FormDatepicker, [{
    key: "onChange",
    value: function onChange(value) {
      var _this$context7 = this.context,
          data = _this$context7.data,
          onChange = _this$context7.onChange;
      var item = this.props.item;
      data[item.field] = value;
      onChange(data);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        height: theme.inputHeight,
        minHeight: theme.inputHeight,
        width: '100%'
      };

      if (theme.inputPadding !== undefined) {
        style.padding = "0 ".concat(theme.inputPadding, "px");
      }

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this13 = this;

      var item = this.props.item;
      var data = this.context.data;
      var value = data[item.field] || [];
      var props = { ...item,
        style: this.getStyle(),
        className: 'aio-form-input aio-form-input-datepicker',
        icon: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
          path: _js.mdiCalendarBlankOutline,
          size: 0.7
        }), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            width: 6
          }
        }))
      };

      if (item.type === 'rangedatepicker') {
        props.type = 'range';
        props.start = {
          value: value[0],
          onChange: function onChange(_ref2) {
            var dateString = _ref2.dateString;
            return _this13.onChange([dateString, value[1]]);
          }
        };
        props.end = {
          value: value[1],
          onChange: function onChange(_ref3) {
            var dateString = _ref3.dateString;
            return _this13.onChange([value[0], dateString]);
          }
        };
      } else if (item.type === 'datepicker') {
        props.value = value;

        props.onChange = function (_ref4) {
          var dateString = _ref4.dateString;
          return _this13.onChange(dateString);
        };
      }

      return /*#__PURE__*/_react.default.createElement(_gahDatepicker.default, props);
    }
  }]);

  return FormDatepicker;
}(_react.Component);

_defineProperty(FormDatepicker, "contextType", AIOFormContext);

var FormSlider = /*#__PURE__*/function (_Component8) {
  _inherits(FormSlider, _Component8);

  var _super8 = _createSuper(FormSlider);

  function FormSlider() {
    _classCallCheck(this, FormSlider);

    return _super8.apply(this, arguments);
  }

  _createClass(FormSlider, [{
    key: "onChange",
    value: function onChange(value) {
      var _this$context8 = this.context,
          data = _this$context8.data,
          onChange = _this$context8.onChange;
      var item = this.props.item;
      data[item.field] = value;
      onChange(data);
    }
  }, {
    key: "getSliderStyle",
    value: function getSliderStyle(value) {
      var theme = this.context.theme;
      return {
        lineStyle: function lineStyle() {
          return {
            height: theme.sliderThickness,
            background: theme.sliderEmptyColor
          };
        },
        pointStyle: function pointStyle() {
          return {
            background: theme.sliderBTNBG,
            width: theme.sliderButtonSize,
            height: theme.sliderButtonSize
          };
        },
        fillStyle: function fillStyle(index) {
          if (value.length === 1 && index === 0) {
            return {
              background: theme.sliderFillColor || 'dodgerblue',
              height: theme.sliderThickness
            };
          }

          if (value.length === 2 && index === 1) {
            return {
              background: theme.sliderFillColor || 'dodgerblue',
              height: theme.sliderThickness
            };
          }
        }
      };
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        height: theme.inputHeight,
        minHeight: theme.inputHeight
      };

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      if (theme.sliderPadding !== undefined) {
        style.padding = "0 ".concat(theme.sliderPadding, "px");
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this14 = this;

      var item = this.props.item;
      var _this$context9 = this.context,
          data = _this$context9.data,
          lang = _this$context9.lang;
      var _item$start = item.start,
          start = _item$start === void 0 ? 0 : _item$start,
          _item$end = item.end,
          end = _item$end === void 0 ? 100 : _item$end,
          _item$step = item.step,
          step = _item$step === void 0 ? 1 : _item$step,
          disabled = item.disabled,
          _item$suffix = item.suffix,
          suffix = _item$suffix === void 0 ? '' : _item$suffix;
      var value = data[item.field] || [];

      if (!Array.isArray(value)) {
        value = [value];
      }

      if (item.type === 'rangeslider') {
        if (value.length !== 2) {
          value = [0, 0];
        }
      }

      if (item.type === 'slider') {
        if (value.length === 0) {
          value = [0];
        }
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-form-input aio-form-input-slider",
        style: this.getStyle()
      }, value.length > 1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-form-slider-value"
      }, value[0] + ' ' + suffix), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: 6
        }
      })), /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, _extends({}, this.getSliderStyle(value), {
        disabled: disabled,
        start: start,
        end: end,
        step: step,
        points: value,
        showValue: false,
        direction: lang === 'fa' ? 'left' : 'right',
        onChange: function onChange(points) {
          if (points.length === 1) {
            _this14.onChange(points[0]);
          } else {
            _this14.onChange(points);
          }
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: 6
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-form-slider-value"
      }, value[1] === undefined ? value[0] + ' ' + suffix : value[1] + ' ' + suffix));
    }
  }]);

  return FormSlider;
}(_react.Component);

_defineProperty(FormSlider, "contextType", AIOFormContext);

var FormTable = /*#__PURE__*/function (_Component9) {
  _inherits(FormTable, _Component9);

  var _super9 = _createSuper(FormTable);

  function FormTable() {
    _classCallCheck(this, FormTable);

    return _super9.apply(this, arguments);
  }

  _createClass(FormTable, [{
    key: "onChange",
    value: function onChange(model) {
      var _this$context10 = this.context,
          data = _this$context10.data,
          onChange = _this$context10.onChange;
      var item = this.props.item;
      data[item.field] = model;
      onChange(data);
    }
  }, {
    key: "getAddButton",
    value: function getAddButton() {
      var _this15 = this;

      var item = this.props.item;
      return {
        text: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
          path: _js.mdiPlusThick,
          size: 0.6
        }),
        onClick: function onClick() {
          return _this15.add();
        },
        style: {
          background: 'none',
          color: 'inherit',
          padding: 0
        },
        disabled: item.disabled
      };
    }
  }, {
    key: "add",
    value: function add() {
      var item = this.props.item;
      var data = this.context.data;
      var model = data[item.field] || [];
      var obj = {};

      for (var i = 0; i < item.columns.length; i++) {
        var _item$columns$i = item.columns[i],
            field = _item$columns$i.field,
            type = _item$columns$i.type,
            options = _item$columns$i.options;

        if (field) {
          if (field.indexOf('*') !== -1) {
            continue;
          }

          if (field.indexOf('/') !== -1) {
            continue;
          }

          if (field.indexOf('+') !== -1) {
            continue;
          }

          if (field.indexOf('-') !== -1) {
            continue;
          }
        }

        var value = void 0;

        if (type === 'text') {
          value = '';
        } else if (type === 'number') {
          value = 0;
        } else if (type === 'select') {
          value = options[0].value;
        }

        obj[field] = value;
      }

      model.push(obj);
      this.onChange(model);
    }
  }, {
    key: "getToolbarItems",
    value: function getToolbarItems() {
      var item = this.props.item;
      var toolbarItems = [];

      if (item.addable !== false) {
        toolbarItems.push(this.getAddButton());
      }

      return toolbarItems;
    }
  }, {
    key: "getColumnValue",
    value: function getColumnValue(row, _ref5) {
      var field = _ref5.field;

      if (field.indexOf('*') !== -1) {
        field = field.replaceAll(' ', '');
        var fields = field.split('*');
        var res = 1;

        for (var i = 0; i < fields.length; i++) {
          var a = row[fields[i]];

          if (isNaN(a)) {
            a = 1;
          }

          res *= a;
        }

        return res;
      }

      return row[field];
    }
  }, {
    key: "getColumns",
    value: function getColumns(model) {
      var _this16 = this;

      var item = this.props.item;
      var lang = this.context.lang;
      this.sum = {
        isSum: true
      };
      this.isThereSum = false;
      var result = item.columns.map(function (column) {
        if (column.sum) {
          _this16.isThereSum = true;
        }

        var a = { ...column,
          getValue: function getValue(row) {
            if (row.isSum) {
              return _this16.sum[column.field];
            }

            var a = _this16.getColumnValue(row, column);

            if (column.sum) {
              if (row._index === 0) {
                _this16.sum[column.field] = 0;
              }

              _this16.sum[column.field] += isNaN(a) ? 0 : a;
            }

            return a;
          }
        };

        a.before = function (row) {
          return row.isSum && column.sum ? (lang === 'fa' ? 'مجموع' : 'Total') + ' : ' : undefined;
        };

        if (['text', 'number', 'select'].indexOf(column.type) !== -1) {
          a.inlineEdit = {
            type: column.type,
            options: column.options,
            disabled: column.disabled,
            onChange: function onChange(row, val) {
              if (!model[row._index]) {
                model[row._index] = {};
              }

              model[row._index][column.field] = val;

              _this16.onChange(model);
            }
          };

          a.inlineEdit.disabled = function (row) {
            if (column.disabled) {
              return true;
            }

            if (row.isSum) {
              return true;
            }

            if (column.field.indexOf('*') !== -1) {
              return true;
            }

            if (column.field.indexOf('/') !== -1) {
              return true;
            }

            if (column.field.indexOf('+') !== -1) {
              return true;
            }

            if (column.field.indexOf('-') !== -1) {
              return true;
            }

            return false;
          };
        }

        return a;
      });
      result.push({
        title: '',
        width: 36,
        template: function template(row) {
          if (row.isSum) {
            return '';
          }

          return /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: _js.mdiClose,
            size: 0.6,
            onClick: function onClick() {
              model.splice(row._index, 1);

              _this16.onChange(model);
            }
          });
        }
      });
      return result;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {};

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
        style.background = theme.inputBorderColor;
      }

      if (theme.bodyColor) {
        style.color = theme.bodyColor;
      }

      if (theme.inputPadding !== undefined) {
        style.padding = "0 ".concat(theme.inputPadding, "px");
      }

      if (theme.tableMaxHeight !== undefined) {
        style.maxHeight = theme.tableMaxHeight;
      }

      style.height = 'unset';
      return style;
    }
  }, {
    key: "getTitleStyle",
    value: function getTitleStyle() {
      var item = this.props.item;
      var theme = this.context.theme;
      var _item$titleStyle = item.titleStyle,
          titleStyle = _item$titleStyle === void 0 ? {} : _item$titleStyle;
      var style = {
        boxShadow: 'none'
      };
      style.borderColor = theme.inputBorderColor;
      style.background = theme.tableTitleBackground || theme.inputBG;
      style.color = theme.tableTitleColor;
      return { ...style,
        ...titleStyle
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var item = this.props.item;
      var _this$context11 = this.context,
          theme = _this$context11.theme,
          data = _this$context11.data,
          lang = _this$context11.lang;
      var model;

      try {
        model = JSON.parse(JSON.stringify(data[item.field]));
      } catch {
        model = [];
      }

      if (!model.length) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "aio-form-table-add",
          onClick: function onClick() {
            return _this17.add();
          },
          style: {
            height: theme.inputHeight,
            border: theme.inputBorderColor ? "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor) : undefined
          }
        }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
          path: _js.mdiPlusThick,
          size: 0.6
        }));
      }

      var striped;

      var getCellStyle = function getCellStyle() {
        var style = {
          background: theme.inputBG,
          color: theme.bodyColor
        };
        return style;
      };

      var toolbarStyle = {
        height: theme.inputHeight,
        background: theme.inputBG
      };

      if (theme.inputBorderColor) {
        toolbarStyle.borderBottom = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      var columns = this.getColumns(model);
      return /*#__PURE__*/_react.default.createElement(_aioTable.default, {
        rowGap: 1,
        padding: 0,
        striped: striped,
        style: this.getStyle(),
        rtl: lang === 'fa',
        getCellStyle: getCellStyle,
        rowHeight: theme.inputHeight || 36,
        headerHeight: theme.inputHeight || 36,
        titleStyle: this.getTitleStyle(),
        className: "aio-form-input aio-form-input-table",
        toolbarStyle: toolbarStyle,
        toolbarItems: this.getToolbarItems(),
        columns: columns,
        model: JSON.parse(JSON.stringify(this.isThereSum ? model.concat(this.sum) : model))
      });
    }
  }]);

  return FormTable;
}(_react.Component);

_defineProperty(FormTable, "contextType", AIOFormContext);

var FormFile = /*#__PURE__*/function (_Component10) {
  _inherits(FormFile, _Component10);

  var _super10 = _createSuper(FormFile);

  function FormFile() {
    _classCallCheck(this, FormFile);

    return _super10.apply(this, arguments);
  }

  _createClass(FormFile, [{
    key: "onChange",
    value: function onChange(files) {
      var _this$context12 = this.context,
          data = _this$context12.data,
          onChange = _this$context12.onChange;
      var item = this.props.item;
      data[item.field] = files;
      onChange(data);
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var theme = this.context.theme;
      var style = {
        minHeight: theme.inputHeight
      };

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      if (theme.inputBorderRadius !== undefined) {
        style.borderRadius = theme.inputBorderRadius;
      }

      if (theme.inputBG) {
        style.background = theme.inputBG;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this18 = this;

      var item = this.props.item;
      var data = this.context.data;
      var files = data[item.field];
      return /*#__PURE__*/_react.default.createElement(FileManager, {
        files: files,
        style: this.getStyle(),
        className: "aio-form-input aio-form-input-file",
        text: item.text,
        onAdd: function onAdd(list) {
          files = [].concat(_toConsumableArray(files), _toConsumableArray(list));

          _this18.onChange(files);
        },
        onRemove: function onRemove(index) {
          files.splice(index, 1);

          _this18.onChange(files);
        }
      });
    }
  }]);

  return FormFile;
}(_react.Component);

_defineProperty(FormFile, "contextType", AIOFormContext);

var FormColor = /*#__PURE__*/function (_Component11) {
  _inherits(FormColor, _Component11);

  var _super11 = _createSuper(FormColor);

  function FormColor() {
    _classCallCheck(this, FormColor);

    return _super11.apply(this, arguments);
  }

  _createClass(FormColor, [{
    key: "onChange",
    value: function onChange(files) {
      var _this$context13 = this.context,
          data = _this$context13.data,
          onChange = _this$context13.onChange;
      var item = this.props.item;
      data[item.field] = files;
      onChange(data);
    }
  }, {
    key: "getStyle",
    value: function getStyle(value) {
      var theme = this.context.theme;
      var style = {
        height: theme.inputHeight,
        minHeight: theme.inputHeight
      };

      if (theme.inputPadding !== undefined) {
        style.padding = "0 ".concat(theme.inputPadding, "px");
      }

      if (theme.inputBorderColor) {
        style.border = "1px ".concat(theme.inputBorderType || 'solid', " ").concat(theme.inputBorderColor);
      }

      style.background = value;
      style.color = '#fff';
      style.borderRadius = theme.inputBorderRadius;
      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this19 = this;

      var data = this.context.data;
      var item = this.props.item;
      var value = data[item.field];
      return /*#__PURE__*/_react.default.createElement("label", {
        className: "aio-form-input aio-form-input-color",
        style: this.getStyle(value)
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "color",
        value: value,
        onChange: function onChange(e) {
          return _this19.onChange(e.target.value);
        }
      }), value);
    }
  }]);

  return FormColor;
}(_react.Component);

_defineProperty(FormColor, "contextType", AIOFormContext);

var FileManager = /*#__PURE__*/function (_Component12) {
  _inherits(FileManager, _Component12);

  var _super12 = _createSuper(FileManager);

  function FileManager() {
    _classCallCheck(this, FileManager);

    return _super12.apply(this, arguments);
  }

  _createClass(FileManager, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          _this$props4$files = _this$props4.files,
          files = _this$props4$files === void 0 ? [] : _this$props4$files,
          _onAdd = _this$props4.onAdd,
          onRemove = _this$props4.onRemove,
          className = _this$props4.className,
          text = _this$props4.text,
          color = _this$props4.color,
          style = _this$props4.style;
      var Previews = [];

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        Previews.push( /*#__PURE__*/_react.default.createElement(FilePreview, {
          key: i,
          index: i,
          file: file,
          onRemove: onRemove,
          color: color
        }));
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: 'file-manager' + (className ? ' ' + className : ''),
        style: style
      }, _onAdd && /*#__PURE__*/_react.default.createElement(AddFile, {
        onAdd: function onAdd(list) {
          return _onAdd(list);
        },
        text: text,
        color: color
      }), Previews);
    }
  }]);

  return FileManager;
}(_react.Component);

var FilePreview = /*#__PURE__*/function (_Component13) {
  _inherits(FilePreview, _Component13);

  var _super13 = _createSuper(FilePreview);

  function FilePreview(props) {
    var _this20;

    _classCallCheck(this, FilePreview);

    _this20 = _super13.call(this, props);
    _this20.state = {
      preview: false
    };
    return _this20;
  }

  _createClass(FilePreview, [{
    key: "getFile",
    value: function getFile(file) {
      var minName, sizeString;
      var lastDotIndex = file.name.lastIndexOf('.');
      var name = file.name.slice(0, lastDotIndex);
      var format = file.name.slice(lastDotIndex + 1, file.name.length);

      if (name.length > 10 + 5) {
        minName = name.slice(0, 10) + '...' + name.slice(10, 10 + 5) + '.' + format;
      } else {
        minName = file.name;
      }

      var size = file.size;
      var gb = size / (1024 * 1024 * 1024),
          mb = size / (1024 * 1024),
          kb = size / 1024;

      if (gb >= 1) {
        sizeString = gb.toFixed(2) + ' GB';
      } else if (mb >= 1) {
        sizeString = mb.toFixed(2) + ' MB';
      } else if (kb >= 1) {
        sizeString = kb.toFixed(2) + ' KB';
      } else {
        sizeString = size + ' byte';
      }

      return {
        minName: minName,
        sizeString: sizeString
      };
    }
  }, {
    key: "getIcon",
    value: function getIcon(file, size) {
      var _this21 = this;

      return /*#__PURE__*/_react.default.createElement(_react2.Icon, {
        style: {
          width: size,
          height: size
        },
        path: _js.mdiAttachment,
        size: 1,
        onClick: function onClick() {
          return _this21.setState({
            preview: file
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this22 = this;

      var _this$props5 = this.props,
          file = _this$props5.file,
          onRemove = _this$props5.onRemove,
          index = _this$props5.index,
          color = _this$props5.color,
          _this$props5$size = _this$props5.size,
          size = _this$props5$size === void 0 ? 36 : _this$props5$size;
      var preview = this.state.preview;

      var _this$getFile = this.getFile(file),
          sizeString = _this$getFile.sizeString,
          minName = _this$getFile.minName;

      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactVirtualDom.default, {
        layout: {
          attrs: {
            className: 'file-preview',
            style: {
              background: color,
              height: size
            }
          },
          flex: 'none',
          row: [{
            size: size,
            html: this.getIcon(file, size),
            align: 'vh',
            attrs: {
              style: {
                overflow: 'hidden'
              }
            }
          }, {
            column: [{
              align: 'v',
              flex: 1,
              html: minName,
              attrs: {
                className: 'file-preview-name'
              }
            }, {
              aling: 'v',
              flex: 0.8,
              html: sizeString,
              attrs: {
                className: 'file-preview-size'
              }
            }]
          }, {
            show: onRemove !== undefined,
            size: size,
            html: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
              path: _js.mdiClose,
              size: 0.7
            }),
            align: 'vh',
            attrs: {
              onClick: function onClick() {
                return onRemove(index);
              }
            }
          }, {
            show: onRemove === undefined,
            size: 12
          }]
        }
      }), preview && /*#__PURE__*/_react.default.createElement("div", {
        className: "file-preview-preview",
        onClick: function onClick() {
          return _this22.setState({
            preview: false
          });
        }
      }, /*#__PURE__*/_react.default.createElement("embed", {
        type: preview.type,
        src: URL.createObjectURL(preview),
        width: "90%",
        height: '90%',
        style: {
          pointerEvent: 'none'
        }
      })));
    }
  }]);

  return FilePreview;
}(_react.Component);

var AddFile = /*#__PURE__*/function (_Component14) {
  _inherits(AddFile, _Component14);

  var _super14 = _createSuper(AddFile);

  function AddFile() {
    _classCallCheck(this, AddFile);

    return _super14.apply(this, arguments);
  }

  _createClass(AddFile, [{
    key: "toBase64",
    value: async function toBase64(file) {
      var a = await new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          return resolve(reader.result);
        };

        reader.onerror = function (error) {
          return reject(error);
        };
      });
      return a;
    }
  }, {
    key: "change",
    value: function change(e) {
      var onAdd = this.props.onAdd;
      onAdd(e.target.files);
    }
  }, {
    key: "render",
    value: function render() {
      var _this23 = this;

      var _this$props6 = this.props,
          _this$props6$text = _this$props6.text,
          text = _this$props6$text === void 0 ? 'Add File' : _this$props6$text,
          color = _this$props6.color;
      return /*#__PURE__*/_react.default.createElement("label", {
        className: "add-file",
        style: {
          color: color
        }
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "file",
        onChange: function onChange(e) {
          return _this23.change(e);
        },
        multiple: true
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "add-file-icon"
      }, /*#__PURE__*/_react.default.createElement(_react2.Icon, {
        path: _js.mdiPlusThick,
        size: 0.8
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "add-file-text"
      }, text));
    }
  }]);

  return AddFile;
}(_react.Component);