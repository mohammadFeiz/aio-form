"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@mdi/react");
var _js = require("@mdi/js");
var _rRangeSlider = _interopRequireDefault(require("r-range-slider"));
var _aioButton = _interopRequireDefault(require("aio-button"));
var _gahDatepicker = _interopRequireDefault(require("gah-datepicker"));
var _aioValidation = _interopRequireDefault(require("aio-validation"));
var _aioTable = _interopRequireDefault(require("aio-table"));
var _reactVirtualDom = _interopRequireDefault(require("react-virtual-dom"));
var _aioSwip = _interopRequireDefault(require("aio-swip"));
var _jquery = _interopRequireDefault(require("jquery"));
require("./index.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
class AIOForm extends _react.Component {
  constructor(props) {
    super(props);
    let {
      theme = {}
    } = this.props;
    this.state = {
      initialModel: JSON.stringify(props.model),
      theme,
      groupDic: {}
    };
  }
  getModel() {
    return this.props.model;
  }
  getValue({
    field,
    def,
    props = this.props,
    input
  }) {
    let model = this.getModel(),
      {
        data = {}
      } = this.props,
      a;
    if (typeof field === 'string') {
      if (field.indexOf('.') !== -1 && (field.indexOf('model.') !== -1 || field.indexOf('props.') !== -1 || field.indexOf('input.') !== -1)) {
        try {
          a = eval(field);
        } catch {
          a = def;
        }
      } else {
        a = field;
      }
    } else if (typeof field === 'function') {
      return field();
    } else {
      a = field;
    }
    return a === undefined && def !== undefined ? def : a;
  }
  setValueByField(obj, field, value) {
    field = field.replaceAll('[', '.');
    field = field.replaceAll(']', '');
    var fields = field.split('.');
    var node = obj;
    for (let i = 0; i < fields.length - 1; i++) {
      if (node[fields[i]] === undefined) {
        if (isNaN(parseFloat(fields[i + 1]))) {
          node[fields[i]] = {};
        } else {
          node[fields[i]] = [];
        }
        node = node[fields[i]];
      } else {
        node = node[fields[i]];
      }
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  setValue(field, value, model) {
    return this.setValueByField(model, field, value);
  }
  async onChange(input, value) {
    let {
      onChange
    } = this.props;
    if (input.onChange) {
      return await input.onChange(value);
    } else if (onChange) {
      onChange(this.setValue(input.field, value, {
        model: this.getModel()
      }).model);
    }
  }
  getInput_text({
    className,
    value,
    onChange,
    options,
    disabled,
    style,
    placeholder,
    min,
    max
  }, input) {
    let props = {
      min,
      max,
      ...input.attrs,
      autoHeight: input.autoHeight,
      type: input.type,
      value,
      className,
      onChange,
      options,
      disabled,
      style,
      placeholder,
      options,
      optionText: input.optionText,
      optionValue: input.optionValue
    };
    let {
      defaults = {}
    } = this.props;
    let def = defaults[input.type];
    def = def === undefined ? {} : def;
    this.setByDefaults(defaults, props);
    return /*#__PURE__*/_react.default.createElement(Input, props);
  }
  getInput_number(obj, input) {
    return this.getInput_text(obj, input);
  }
  getInput_password(obj, input) {
    return this.getInput_text(obj, input);
  }
  getInput_textarea(obj, input) {
    return this.getInput_text(obj, input);
  }
  getInput_color(obj, input) {
    return this.getInput_text(obj, input);
  }
  getInput_checkbox({
    className,
    onChange,
    value,
    disabled,
    style,
    text,
    subtext,
    theme
  }, input) {
    let props = {
      disabled,
      style,
      value,
      subtext: input.subText,
      text,
      subtext,
      onChange: value => onChange(!value),
      className,
      iconSize: theme.checkIconSize,
      iconColor: theme.checkIconColor
    };
    let {
      defaults = {}
    } = this.props;
    let checkbox = defaults.checkbox || {};
    this.setByDefaults(checkbox, props);
    return /*#__PURE__*/_react.default.createElement(_aioButton.default, _extends({}, props, {
      type: "checkbox"
    }));
  }
  getInput_checklist({
    className,
    options: Options,
    disabled,
    style,
    theme
  }, input) {
    let inputStyle = {
      ...this.props.inputStyle,
      ...input.inputStyle
    };
    let options = Options.map(o => {
      let value = this.getValue({
          field: o.field
        }),
        text = o.text;
      return {
        text,
        value,
        onChange: val => {
          this.onChange({
            field: o.field,
            onChange: o.onChange
          }, !val);
        },
        ...o
      };
    });
    let props = {
      options,
      disabled,
      style: {
        ...style,
        width: '100%',
        height: undefined
      },
      optionSubtext: input.optionSubtext,
      className,
      options,
      optionClassName: '"aio-form-input"',
      optionStyle: () => {
        return {
          ...inputStyle,
          background: 'none',
          border: 'none'
        };
      },
      optionIconSize: theme.checkIconSize,
      optionIconColor: theme.checkIconColor
    };
    let {
      defaults = {}
    } = this.props;
    let checklist = defaults.checklist || {};
    this.setByDefaults(checklist, props);
    return /*#__PURE__*/_react.default.createElement(_aioButton.default, _extends({}, props, {
      type: "checklist"
    }));
  }
  getInput_radio({
    value,
    onChange,
    options,
    disabled,
    style,
    className,
    theme
  }, input) {
    let inputStyle = {
      ...this.props.inputStyle,
      ...input.inputStyle
    };
    let props = {
      options,
      value,
      onChange,
      disabled,
      style,
      optionSubtext: input.optionSubtext,
      optionText: input.optionText,
      optionValue: input.optionValue,
      className,
      optionClassName: '"aio-form-input"',
      optionStyle: () => {
        return {
          height: inputStyle.height,
          padding: inputStyle.padding,
          background: 'none',
          ...input.optionStyle
        };
      },
      optionIconSize: theme.checkIconSize,
      optionIconColor: theme.checkIconColor
    };
    let {
      defaults = {}
    } = this.props;
    let radio = defaults.radio || {};
    this.setByDefaults(radio, props);
    return /*#__PURE__*/_react.default.createElement(_aioButton.default, _extends({}, props, {
      type: "radio"
    }));
  }
  getInput_datepicker({
    value,
    onChange,
    disabled,
    style,
    className,
    placeholder
  }, input) {
    let props = {
      value,
      onChange: ({
        dateString
      }) => onChange(dateString),
      disabled,
      style,
      placeHolder: placeholder,
      theme: input.colors,
      className,
      calendarType: input.calendarType,
      unit: input.unit,
      onClear: input.onClear ? () => onChange(false) : undefined
    };
    let {
      defaults = {}
    } = this.props;
    let datepicker = defaults.datepicker || {};
    this.setByDefaults(datepicker, props);
    return /*#__PURE__*/_react.default.createElement(_gahDatepicker.default, props);
  }
  setByDefaults(defaults = {}, obj = {}) {
    for (let prop in obj) {
      if (obj[prop] === undefined) {
        obj[prop] = defaults[prop];
      }
    }
  }
  getInput_slider({
    className,
    value = 0,
    onChange,
    disabled,
    style,
    start,
    end,
    step,
    min,
    max
  }, input) {
    let editValue;
    if (typeof input.editValue === 'string') {
      let str = input.editValue;
      if (str.indexOf('calc ') === 0) {
        str = str.slice(5, str.length);
      }
      editValue = value => {
        let res;
        try {
          eval(`res = ${str}`);
        } catch {
          res = value;
        }
        return res;
      };
    } else {
      editValue = input.editValue;
    }
    let {
      fillColor,
      emptyColor,
      thickness,
      buttonStyle
    } = input;
    let props = {
      fillColor,
      emptyColor,
      thickness,
      buttonStyle,
      className,
      value,
      onChange,
      start,
      end,
      step,
      min,
      max,
      disabled,
      style,
      editValue,
      padding: input.padding
    };
    let {
      defaults = {}
    } = this.props;
    let slider = defaults.slider || {};
    this.setByDefaults(slider, props);
    return /*#__PURE__*/_react.default.createElement(Slider, props);
  }
  getInput_select({
    className,
    value,
    onChange,
    options,
    disabled,
    style,
    text
  }, input) {
    let props = {
      options,
      value,
      onChange,
      className,
      search: input.search,
      disabled,
      style,
      optionText: input.optionText,
      optionValue: input.optionValue,
      optionBefore: input.optionBefore,
      optionAfter: input.optionAfter,
      optionStyle: input.optionStyle,
      text,
      before: input.before,
      optionSubtext: input.optionSubtext
    };
    let {
      defaults = {}
    } = this.props;
    let select = defaults.select || {};
    this.setByDefaults(select, props);
    return /*#__PURE__*/_react.default.createElement(_aioButton.default, _extends({}, props, {
      type: "select",
      popupWidth: "fit",
      popupAttrs: {
        style: {
          maxHeight: 400
        }
      }
    }));
  }
  getInput_multiselect({
    className,
    value,
    onChange,
    options,
    disabled,
    style,
    text,
    subtext,
    theme
  }, input) {
    let props = {
      className,
      value,
      onChange,
      options,
      text,
      subtext,
      disabled,
      search: input.search,
      style,
      popupWidth: 'fit',
      optionText: input.optionText,
      optionValue: input.optionValue,
      optionBefore: input.optionBefore,
      optionAfter: input.optionAfter,
      text,
      before: input.before,
      optionSubtext: input.optionSubtext,
      optionStyle: input.optionStyle,
      optionIconSize: theme.checkIconSize,
      optionIconColor: theme.checkIconColor,
      optionTagAttrs: {
        style: {
          ...theme.tag
        }
      }
    };
    let {
      defaults = {}
    } = this.props;
    let multiselect = defaults.multiselect || {};
    this.setByDefaults(multiselect, props);
    return /*#__PURE__*/_react.default.createElement(_aioButton.default, _extends({}, props, {
      type: "multiselect",
      popupAttrs: {
        style: {
          maxHeight: 400
        }
      }
    }));
  }
  getInput_table({
    className,
    value,
    onChange,
    disabled,
    style,
    columns,
    theme
  }, input) {
    let props = {
      attrs: input.attrs,
      className,
      value,
      onChange,
      columns,
      addable: input.addable,
      rowNumber: input.rowNumber,
      disabled,
      style,
      theme
    };
    let {
      defaults = {}
    } = this.props;
    let table = defaults.table || {};
    this.setByDefaults(table, props);
    return /*#__PURE__*/_react.default.createElement(Table, _extends({}, props, {
      getValue: this.getValue.bind(this)
    }));
  }
  getInput_file({
    className,
    value,
    onChange,
    disabled,
    style,
    text
  }, input) {
    let props = {
      className,
      value,
      onChange,
      disabled,
      style,
      text
    };
    let {
      defaults = {}
    } = this.props;
    let file = defaults.file || {};
    this.setByDefaults(file, props);
    return /*#__PURE__*/_react.default.createElement(File, _extends({}, props, {
      getValue: this.getValue.bind(this)
    }));
  }
  getInput_group(obj, input) {
    let {
      attrs = {}
    } = input;
    let {
      groupDic
    } = this.state;
    let {
      theme = {}
    } = obj;
    let {
      group = {}
    } = theme;
    groupDic[input.id] = groupDic[input.id] === undefined ? true : groupDic[input.id];
    let open = groupDic[input.id];
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, attrs, {
      style: {
        ...group,
        ...attrs.style
      },
      className: 'aio-form-group' + (attrs.className ? ' ' + attrs.className : ''),
      onClick: () => {
        groupDic[input.id] = !groupDic[input.id];
        this.setState({
          groupDic
        });
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "aio-form-group-icon"
    }, /*#__PURE__*/_react.default.createElement("svg", {
      viewBox: "0 0 24 24",
      role: "presentation",
      style: {
        transform: `rotate(${open ? '180' : '0'}deg)`
      }
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
      style: {
        fill: 'currentcolor'
      }
    }))), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: 6
      }
    }), /*#__PURE__*/_react.default.createElement("div", null, input.text), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        flex: 1
      }
    }), input.html && input.html());
  }
  getInput_message(obj, input) {
    let {
      attrs = {}
    } = input;
    let message = this.getValue({
      field: input.message
    });
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, attrs, {
      className: 'aio-form-input-message' + (attrs.className ? ' ' + attrs.className : '')
    }), message || obj.value);
  }
  getInput_html(obj, input) {
    return input.html(this.getModel());
  }
  getFix(input, rtl, type) {
    let fix_props = this.props[type + 'Attrs'] || {};
    let fix_input = input[type + 'Attrs'] || {};
    let attrs = {
      ...fix_props,
      ...fix_input
    };
    let {
      onClick = () => {}
    } = attrs;
    let value = this.getValue({
      field: input[type]
    });
    if (value === undefined) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement("div", _extends({}, attrs, {
      onClick: () => onClick(input),
      className: `aio-form-${type}` + (rtl ? ' rtl' : '') + (attrs.className ? ' ' + attrs.className : '')
    }), value);
  }
  getInputTheme(input) {
    let {
      theme: stateTheme = {}
    } = this.state;
    let {
      theme: inputTheme = {}
    } = input;
    return {
      ...stateTheme,
      ...inputTheme,
      label: {
        ...stateTheme.label,
        ...inputTheme.label
      },
      input: {
        ...stateTheme.input,
        ...inputTheme.input
      }
    };
  }
  getLabelLayout(label, theme, input) {
    let {
      inputs
    } = this.props;
    let {
      inlineLabel = this.props.inlineLabel,
      labelStyle = this.props.labelStyle || {}
    } = input;
    let props = {
      align: 'v',
      show: label !== undefined,
      style: {
        ...labelStyle,
        width: 'fit-content',
        height: 'fit-content'
      },
      className: 'aio-form-label'
    };
    props.size = inlineLabel ? labelStyle.width : labelStyle.height || 24;
    let {
      onChangeInputs
    } = this.props;
    if (onChangeInputs) {
      props.html = /*#__PURE__*/_react.default.createElement(_aioButton.default, {
        style: {
          padding: 0,
          fontSize: 'inherit'
        },
        text: label,
        type: "button",
        popOver: () => {
          return /*#__PURE__*/_react.default.createElement(FormGenerator, {
            input: input,
            onChange: () => {
              onChangeInputs(inputs);
            }
          });
        }
      });
    } else {
      props.html = label;
    }
    return props;
  }
  getInput(input) {
    let {
      rtl,
      rowStyle
    } = this.props;
    let {
      label,
      affix,
      prefix,
      inlineLabel = this.props.inlineLabel
    } = input;
    let theme = this.getInputTheme(input);
    let value = this.getValue({
      field: input.field
    });
    let options = this.getValue({
      field: input.options,
      def: []
    });
    let disabled = this.getValue({
      field: input.disabled,
      def: false
    });
    let text = this.getValue({
      field: input.text
    });
    let start = this.getValue({
      field: input.start,
      def: 0
    });
    let step = this.getValue({
      field: input.step,
      def: 1
    });
    let end = this.getValue({
      field: input.end,
      def: 100
    });
    let min = this.getValue({
      field: input.min
    });
    let max = this.getValue({
      field: input.max
    });
    let subtext = this.getValue({
      field: input.subtext
    });
    let columns = this.getValue({
      field: input.columns,
      def: []
    });
    let placeholder = this.getValue({
      field: input.placeholder,
      def: false
    });
    let onChange = value => this.onChange(input, value);
    let style = {
      ...this.props.inputStyle,
      ...input.inputStyle
    };
    let className = `aio-form-input aio-form-input-${input.type}` + (disabled === true ? ' disabled' : '') + (input.className ? ' ' + input.className : '') + (affix ? ' has-affix' : '') + (prefix ? ' has-prefix' : '') + (rtl ? ' rtl' : ' ltr');
    let error = this.getError(input, value, options);
    let props = {
      value,
      options,
      step,
      disabled: disabled === true,
      onChange,
      className,
      style,
      placeholder,
      text,
      subtext,
      start,
      end,
      theme,
      columns,
      min,
      max
    };
    let {
      label: themeLabel = {},
      error: themeError = {}
    } = theme;
    if (inlineLabel) {
      return {
        className: 'aio-form-item',
        style: {
          overflow: 'visible'
        },
        row: [this.getLabelLayout(label, theme, input), {
          size: 6,
          show: label !== undefined
        }, {
          flex: 1,
          style: {
            overflow: 'visible'
          },
          column: [{
            row: [{
              show: !!input.prefix,
              html: () => this.getFix(input, rtl, 'prefix')
            }, {
              flex: 1,
              style: {
                overflow: 'visible'
              },
              html: () => this['getInput_' + input.type](props, input)
            }, {
              show: !!input.affix,
              html: () => this.getFix(input, rtl, 'affix')
            }]
          }, {
            align: 'v',
            show: error !== '',
            html: error,
            className: 'aio-form-error',
            style: themeError
          }]
        }]
      };
    } else {
      return {
        className: 'aio-form-item',
        style: {
          overflow: 'visible'
        },
        column: [this.getLabelLayout(label, theme, input), {
          row: [{
            show: !!input.prefix,
            html: () => this.getFix(input, rtl, 'prefix')
          }, {
            style: {
              overflow: 'visible'
            },
            flex: 1,
            html: () => this['getInput_' + input.type](props, input)
          }, {
            show: !!input.affix,
            html: () => this.getFix(input, rtl, 'affix')
          }]
        }, {
          size: themeError.height,
          show: error !== '',
          html: error,
          className: 'aio-form-error',
          style: themeError
        }]
      };
    }
  }
  sortByRows(inputs) {
    let res = {};
    let result = [];
    for (let i = 0; i < inputs.length; i++) {
      let {
        type,
        show
      } = inputs[i];
      if (!type) {
        continue;
      }
      if (this.getValue({
        field: show,
        def: true,
        input: inputs[i]
      }) === false) {
        continue;
      }
      inputs[i]._index = i;
      if (type === 'group') {
        let a = 'a' + Math.random();
        res[a] = [inputs[i]];
        result.push(res[a]);
        continue;
      }
      let {
        rowKey
      } = inputs[i];
      if (!rowKey) {
        rowKey = 'a' + Math.random();
      }
      if (!res[rowKey]) {
        res[rowKey] = [];
        result.push(res[rowKey]);
      }
      res[rowKey].push(inputs[i]);
    }
    return result;
  }
  handleGroups(inputs) {
    this.res = [];
    this.handleGroupsReq(inputs, []);
    return this.res;
  }
  handleGroupsReq(inputs = []) {
    let {
      groupDic
    } = this.state;
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      if (input.type === 'group') {
        if (input.text !== undefined) {
          this.res.push({
            ...input,
            type: 'group'
          });
        }
        if (input.id === undefined || groupDic[input.id] !== false) {
          this.handleGroupsReq(input.inputs, input.id);
        }
      } else {
        this.res.push(input);
      }
    }
  }
  getColumnGap(input) {
    let {
      theme = {}
    } = this.state;
    let {
      columnGap: themeColumnGap = 12
    } = theme;
    let {
      columnGap = themeColumnGap
    } = input;
    return columnGap;
  }
  getInputs(inputs) {
    if (!inputs.length) {
      return [];
    }
    let {
      onSwap,
      rowStyle
    } = this.props;
    let rows = this.sortByRows(this.handleGroups(inputs));
    return rows.map((row, i) => {
      let style = {
        ...rowStyle,
        overflow: 'visible'
      };
      if (i === rows.length - 1) {
        style.marginBottom = 0;
      }
      return {
        swapId: onSwap ? row._index.toString() : undefined,
        style,
        className: 'aio-form-row',
        swapHandleClassName: 'aio-form-label',
        row: row.map(o => {
          return {
            ...this.getInput(o),
            flex: o.rowWidth ? undefined : 1,
            size: o.rowWidth,
            align: 'v'
          };
        })
      };
    });
  }
  getError(o, value, options) {
    let {
      lang = 'en'
    } = this.props;
    let {
      validations = []
    } = o;
    if (!validations.length) {
      return '';
    }
    let a = {
      value,
      title: o.label,
      lang,
      validations: validations.map(a => {
        return [a[0], typeof a[1] === 'function' ? a[1] : this.getValue({
          field: a[1],
          def: ''
        }), a[2]];
      })
    };
    let error = (0, _aioValidation.default)(a);
    if (!this.isThereError && error) {
      this.isThereError = true;
    }
    return error;
  }
  async reset() {
    let {
      onChange
    } = this.props;
    let {
      initialModel
    } = this.state;
    if (onChange) {
      onChange(JSON.parse(initialModel));
    }
  }
  header_layout() {
    let {
      header,
      rtl
    } = this.props;
    if (!header) {
      return false;
    }
    return {
      html: /*#__PURE__*/_react.default.createElement(AIOFormHeader, _extends({}, header, {
        rtl: rtl,
        getValue: this.getValue.bind(this)
      }))
    };
  }
  body_layout(show = true) {
    if (!show) {
      return false;
    }
    let {
      inputs = [],
      bodyStyle,
      layout
    } = this.props;
    return {
      className: 'aio-form-body',
      style: bodyStyle,
      scroll: 'v',
      flex: 1,
      column: () => this.getInputs(inputs)
    };
  }
  body_and_tabs_layout() {
    let {
      tabs = [],
      tabSize = 36,
      bodyStyle
    } = this.props;
    if (!tabs.length) {
      return false;
    }
    return {
      style: bodyStyle,
      flex: 1,
      show: tabs.length !== 0,
      row: [{
        className: 'aio-form-tabs',
        size: tabSize,
        column: tabs.map(o => {
          return {
            className: 'aio-form-tab active',
            size: tabSize,
            html: o.html,
            align: 'vh',
            style: {}
          };
        })
      }, this.body_layout(true)]
    };
  }
  footer_layout() {
    let {
      onSubmit,
      submitText = 'Submit',
      closeText = 'Close',
      resetText = 'Reset',
      onClose,
      footerAttrs,
      reset
    } = this.props;
    if (!onSubmit && !reset && !onClose) {
      return false;
    }
    return {
      html: () => /*#__PURE__*/_react.default.createElement(AIOFormFooter, {
        isThereError: this.isThereError,
        isModelChanged: this.state.initialModel === JSON.stringify(this.props.model),
        onClose: onClose,
        onSubmit: onSubmit ? () => onSubmit(this.getModel()) : undefined,
        closeText: closeText,
        submitText: submitText,
        resetText: resetText,
        footerAttrs: footerAttrs,
        onReset: reset ? () => this.reset() : undefined
      })
    };
  }
  render() {
    let {
      tabs = [],
      style,
      className
    } = this.props;
    this.isThereError = false;
    return /*#__PURE__*/_react.default.createElement(_reactVirtualDom.default, {
      layout: {
        className: 'aio-form' + (className ? ' ' + className : ''),
        style,
        column: [this.header_layout(), this.body_layout(tabs.length === 0), this.body_and_tabs_layout(), this.footer_layout()]
      }
    });
  }
}
exports.default = AIOForm;
class AIOFormHeader extends _react.Component {
  render() {
    let {
      title,
      onClose,
      print,
      onBack,
      justify,
      onForward,
      rtl,
      style,
      className,
      getValue
    } = this.props;
    let subtitle = getValue({
      field: this.props.subtitle
    });
    return /*#__PURE__*/_react.default.createElement(_reactVirtualDom.default, {
      layout: {
        className: 'aio-form-header' + (className ? ' ' + className : ''),
        style: {
          ...style
        },
        align: 'v',
        row: [{
          show: onBack !== undefined,
          html: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: rtl ? _js.mdiChevronRight : _js.mdiChevronLeft,
            size: 0.9
          }),
          align: 'vh',
          size: 36,
          attrs: {
            onClick: onBack
          }
        }, {
          show: justify === true,
          flex: 1
        }, {
          align: 'v',
          column: [{
            html: title,
            className: 'aio-form-title',
            align: 'v'
          }, {
            show: subtitle !== undefined,
            html: subtitle,
            className: 'aio-form-subtitle',
            align: 'v'
          }]
        }, {
          flex: 1
        }, {
          show: onForward !== undefined,
          html: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: rtl ? _js.mdiChevronLeft : _js.mdiChevronRight,
            size: 0.9
          }),
          align: 'vh',
          size: 36,
          attrs: {
            onClick: onForward
          }
        }, {
          show: print !== undefined,
          html: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: _js.mdiPrinter,
            size: 0.9
          }),
          align: 'vh',
          size: 36
        }, {
          show: onClose !== undefined,
          html: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: _js.mdiClose,
            size: 0.8
          }),
          align: 'vh',
          size: 36,
          attrs: {
            onClick: onClose
          }
        }]
      }
    });
  }
}
class AIOFormFooter extends _react.Component {
  render() {
    let {
      onClose,
      onSubmit,
      closeText,
      submitText,
      footerAttrs = {},
      onReset,
      resetText,
      isThereError,
      isModelChanged
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_reactVirtualDom.default, {
      layout: {
        align: 'v',
        className: 'aio-form-footer' + (footerAttrs.className ? ' ' + footerAttrs.className : ''),
        style: footerAttrs.style,
        row: [{
          show: onClose !== undefined,
          html: () => /*#__PURE__*/_react.default.createElement("button", {
            className: "aio-form-footer-button aio-form-close-button",
            onClick: () => onClose()
          }, closeText)
        }, {
          size: 12,
          show: onSubmit !== undefined
        }, {
          show: onSubmit !== undefined,
          html: () => /*#__PURE__*/_react.default.createElement("button", {
            className: "aio-form-footer-button aio-form-submit-button",
            disabled: isThereError || isModelChanged,
            onClick: () => onSubmit()
          }, submitText)
        }, {
          size: 12,
          show: onSubmit !== undefined
        }, {
          show: onReset !== undefined,
          html: () => /*#__PURE__*/_react.default.createElement("button", {
            className: "aio-form-footer-button aio-form-reset-button",
            onClick: () => onReset()
          }, resetText)
        }]
      }
    });
  }
}
class Input extends _react.Component {
  constructor(props) {
    super(props);
    this.dom = /*#__PURE__*/(0, _react.createRef)();
    this.state = {
      value: props.value,
      prevValue: props.value,
      error: false
    };
  }
  onChange(value) {
    let {
      type,
      onChange
    } = this.props;
    if (type === 'number') {
      if (value) {
        value = +value;
      }
    }
    this.setState({
      value
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      onChange(value);
    }, 800);
  }
  getOptions(uid) {
    let {
      optionText,
      options
    } = this.props;
    let Options = options.map((option, index) => {
      let text;
      if (typeof option === 'object' && option.text !== undefined) {
        text = option.text;
      } else if (typeof optionText === 'function') {
        text = optionText(option, index);
      } else if (typeof optionText === 'string') {
        try {
          eval(`text = ${optionText}`);
        } catch {
          text = '';
        }
      } else {
        text = '';
      }
      return /*#__PURE__*/_react.default.createElement("option", {
        key: index,
        value: text
      });
    });
    return /*#__PURE__*/_react.default.createElement("datalist", {
      id: uid
    }, Options);
  }
  componentDidMount() {
    let {
      type,
      min,
      max
    } = this.props;
    if (type === 'number') {
      (0, _aioSwip.default)({
        speedY: 0.2,
        dom: (0, _jquery.default)(this.dom.current),
        start: (x, y) => {
          this.so = this.state.value;
        },
        move: (dx, dy, dist) => {
          let newValue = -dy + this.so;
          if (min !== undefined && newValue < min) {
            return;
          }
          if (max !== undefined && newValue > max) {
            return;
          }
          this.onChange(newValue);
        }
      });
    }
  }
  componentDidUpdate() {
    let {
      type,
      autoHeight
    } = this.props;
    if (type === 'textarea' && autoHeight) {
      let dom = this.dom.current;
      let scrollHeight = dom.scrollHeight + 'px';
      dom.style.height = scrollHeight;
      dom.style.overflow = 'hidden';
      dom.style.resize = 'none';
    }
  }
  render() {
    let {
      options,
      type
    } = this.props;
    let {
      error,
      prevValue,
      value
    } = this.state;
    if (this.props.value !== prevValue) {
      setTimeout(() => {
        if (value === undefined) {
          this.state.value = undefined;
          this.state.prevValue = undefined;
          this.setState({
            value: undefined,
            prevValue: undefined
          });
        } else {
          this.setState({
            value: this.props.value,
            prevValue: this.props.value
          });
        }
      }, 0);
    }
    if (error !== false) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-form-inline-error aio-form-input",
        onClick: () => this.setState({
          error: false
        })
      }, error);
    }
    let props = {
      ...this.props,
      value,
      onChange: e => this.onChange(e.target.value),
      ref: this.dom
    };
    let uid = 'a' + Math.random();
    return type === 'textarea' ? /*#__PURE__*/_react.default.createElement("textarea", props) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("input", _extends({}, props, {
      list: uid
    })), Array.isArray(options) && options.length !== 0 && this.getOptions(uid));
  }
}
class Slider extends _react.Component {
  render() {
    let {
      className,
      start,
      end,
      step,
      min,
      max,
      value,
      onChange,
      disabled,
      style = {},
      editValue,
      padding = style.padding,
      thickness = 2,
      fillColor = 'dodgerblue',
      emptyColor = '#ddd',
      buttonStyle = {
        background: 'dodgerblue',
        color: '#fff'
      }
    } = this.props;
    if (!Array.isArray(value)) {
      value = [value];
    }
    let props = {
      attrs: {
        className,
        style: {
          ...style,
          padding
        }
      },
      start,
      end,
      step,
      min,
      max,
      points: value,
      onChange: disabled ? undefined : points => points.length === 1 ? onChange(points[0]) : onChange([points[0], points[1]]),
      showValue: true,
      editValue,
      fillStyle: index => {
        let style = {
          height: thickness,
          background: fillColor
        };
        if (value.length === 1) {
          if (index === 1) {
            style.background = 'none';
          }
        } else {
          if (index === 0 || index === value.length) {
            style.background = 'none';
          }
        }
        return style;
      },
      valueStyle: () => {
        return {
          height: 24,
          display: 'flex',
          minWidth: 12,
          padding: '0 6px',
          justifyContent: 'center',
          borderRadius: 3,
          alignItems: 'center',
          top: 'unset',
          ...buttonStyle
        };
      },
      lineStyle: () => {
        return {
          background: emptyColor,
          height: thickness
        };
      },
      pointStyle: () => {
        return {
          display: 'none'
        };
      }
    };
    return /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, props);
  }
}
class Table extends _react.Component {
  setValueByField(obj, field, value) {
    field = field.replaceAll('[', '.');
    field = field.replaceAll(']', '');
    var fields = field.split('.');
    var node = obj;
    for (let i = 0; i < fields.length - 1; i++) {
      if (node[fields[i]] === undefined) {
        if (isNaN(parseFloat(fields[i + 1]))) {
          node[fields[i]] = {};
        } else {
          node[fields[i]] = [];
        }
        node = node[fields[i]];
      } else {
        node = node[fields[i]];
      }
    }
    node[fields[fields.length - 1]] = value;
    return obj;
  }
  add() {
    let {
      columns = [],
      onChange,
      value = []
    } = this.props;
    if (!columns.length) {
      return;
    }
    let obj = {};
    for (let i = 0; i < columns.length; i++) {
      let {
        field,
        type
      } = columns[i];
      if (!field) {
        continue;
      }
      if (typeof field === 'string' && field.indexOf('calc ') === 0) {
        continue;
      }
      let val;
      if (type === 'text') {
        val = '';
      } else if (type === 'number') {
        val = 0;
      } else if (type === 'select') {
        let options = this.getColumnOptions(columns[i]);
        try {
          val = options[0].value;
        } catch {
          val = '';
        }
      } else if (type === 'checkbox') {
        val = false;
      }
      this.setValueByField(obj, field, val);
    }
    value.push(obj);
    onChange(value);
  }
  getToolbarItems() {
    let {
      item,
      addable = true,
      disabled
    } = this.props;
    if (disabled) {
      return;
    }
    let toolbarItems = [];
    if (addable) {
      toolbarItems.push({
        text: '+',
        type: 'button',
        onClick: () => this.add(),
        className: 'aio-form-input aio-form-input-table-add',
        style: {
          background: 'none',
          color: 'inherit',
          padding: 0,
          width: '100%'
        }
      });
    }
    return toolbarItems;
  }
  getColumnOptions(column) {
    let {
      getValue
    } = this.props;
    let options = getValue({
      field: column.options,
      def: []
    });
    let {
      optionText,
      optionValue
    } = column;
    options = options.map(option => {
      let text, value;
      if (optionText) {
        try {
          eval(`text = ${optionText}`);
        } catch {
          text = '';
        }
      } else {
        text = option.text;
      }
      if (optionValue) {
        try {
          eval(`value = ${optionText}`);
        } catch {
          value = undefined;
        }
      } else {
        value = option.value;
      }
      return {
        text,
        value
      };
    });
    return options.filter(o => {
      return getValue({
        field: o.show,
        def: true
      });
    });
  }
  getColumns() {
    let {
      onChange,
      addable = true,
      disabled,
      columns,
      value,
      rowNumber,
      theme = {}
    } = this.props;
    let {
      input = {}
    } = theme;
    let cellAttrs = {
      className: 'aio-form-input',
      style: {
        height: input.height,
        borderColor: input.borderColor,
        background: 'none',
        boxShadow: 'none'
      }
    };
    let titleAttrs = {
      className: 'aio-form-input',
      style: {
        height: input.height,
        borderColor: input.borderColor,
        background: 'none',
        boxShadow: 'none'
      }
    };
    let result = columns.map(column => {
      let a = {
        ...column,
        cellAttrs,
        titleAttrs,
        getValue: column.field
      };
      if (column.type === 'select') {
        let options = this.getColumnOptions(column);
        a.template = (row, column, value) => {
          let option = options.filter(o => o.value === value)[0];
          return option ? option.text : '';
        };
      }
      if (column.type === 'checkbox') {
        let options = this.getColumnOptions(column) || [{
          text: 'True',
          value: true
        }, {
          text: 'False',
          value: false
        }];
        a.template = (row, column, value) => {
          let option = options.filter(o => o.value === value)[0];
          return option ? option.text : '';
        };
      }
      if (typeof column.type === 'function') {
        a.inlineEdit = row => {
          let type = column.type(row);
          return {
            type,
            onChange: (row, val) => {
              if (!value[row._index]) {
                value[row._index] = {};
              }
              this.setValueByField(value[row._index], column.field, val);
              onChange(value);
            },
            disabled: () => {
              if (column.disabled) {
                return true;
              }
              return false;
            },
            options: type === 'select' ? this.getColumnOptions(column) : undefined
          };
        };
      } else if (['text', 'number', 'select', 'checkbox'].indexOf(column.type) !== -1 && !disabled) {
        a.inlineEdit = {
          type: column.type,
          disabled: column.disabled,
          onChange: (row, val) => {
            if (!value[row._index]) {
              value[row._index] = {};
            }
            this.setValueByField(value[row._index], column.field, val);
            onChange(value);
          },
          disabled: () => disabled
        };
        if (column.type === 'select') {
          a.inlineEdit.options = this.getColumnOptions(column);
        }
        a.inlineEdit.disabled = row => {
          if (column.disabled) {
            return true;
          }
          return false;
        };
      }
      return a;
    });
    if (rowNumber) {
      result.splice(0, 0, {
        title: '#',
        width: 48,
        getValue: ({
          _index
        }) => _index + 1,
        cellAttrs,
        titleAttrs
      });
    }
    if (addable && !disabled) {
      result.push({
        title: '',
        width: 36,
        cellAttrs,
        titleAttrs,
        template: row => {
          return /*#__PURE__*/_react.default.createElement("div", {
            onClick: () => {
              let {
                value
              } = this.props;
              value.splice(row._index, 1);
              onChange(value);
            }
          }, "X");
        }
      });
    }
    return result;
  }
  render() {
    let {
      value = [],
      disabled,
      className,
      style,
      attrs,
      theme = {}
    } = this.props;
    let model;
    let {
      input = {}
    } = theme;
    try {
      model = JSON.parse(JSON.stringify(value));
    } catch {
      model = [];
    }
    if (!model.length) {
      if (disabled) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "aio-form-table-add aio-form-input",
        onClick: () => this.add(),
        style: {
          fontSize: input.fontSize,
          background: input.background,
          borderWidth: input.borderWidth,
          borderColor: input.borderColor,
          height: input.height
        }
      }, "+");
    }
    let columns = this.getColumns();
    let props = {
      getCellStyle: () => {
        return style;
      },
      titleStyle: style,
      disabled,
      className,
      columns,
      toolbarItems: this.getToolbarItems(),
      columns,
      model: value,
      style: attrs ? attrs.style : undefined
    };
    return /*#__PURE__*/_react.default.createElement(_aioTable.default, {
      columns: props.columns,
      model: props.model,
      rowGap: 0,
      toolbarItems: props.toolbarItems,
      toolbarAttrs: {
        className: 'aio-form-input',
        style: {
          ...theme.input,
          border: 'none',
          display: disabled ? 'none' : undefined,
          borderRadius: 0
        }
      },
      style: {
        borderColor: input.borderColor,
        borderWidth: input.borderWidth,
        borderRadius: input.borderRadius,
        fontSize: input.fontSize,
        color: input.color,
        background: input.background
      }
    });
  }
}
class File extends _react.Component {
  render() {
    let {
      text,
      value,
      onChange,
      disabled,
      className,
      style
    } = this.props;
    let files = value;
    let props = {
      files,
      disabled,
      className,
      style,
      text,
      onAdd: list => {
        files = [...files, ...list];
        onChange(files);
      },
      onRemove: index => {
        files.splice(index, 1);
        onChange(files);
      }
    };
    return /*#__PURE__*/_react.default.createElement(FileManager, props);
  }
}
class FileManager extends _react.Component {
  render() {
    let {
      files = [],
      onAdd,
      onRemove,
      className,
      text,
      color,
      style
    } = this.props;
    let Previews = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
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
    }, onAdd && /*#__PURE__*/_react.default.createElement(AddFile, {
      onAdd: list => onAdd(list),
      text: text,
      color: color
    }), Previews);
  }
}
class FilePreview extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: false
    };
  }
  getFile(file) {
    try {
      let minName, sizeString;
      let lastDotIndex = file.name.lastIndexOf('.');
      let name = file.name.slice(0, lastDotIndex);
      let format = file.name.slice(lastDotIndex + 1, file.name.length);
      if (name.length > 10 + 5) {
        minName = name.slice(0, 10) + '...' + name.slice(10, 10 + 5) + '.' + format;
      } else {
        minName = file.name;
      }
      let size = file.size;
      let gb = size / (1024 * 1024 * 1024),
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
        minName,
        sizeString
      };
    } catch {
      return {
        minName: 'untitle',
        sizeString: '0'
      };
    }
  }
  getIcon(file, size) {
    return /*#__PURE__*/_react.default.createElement(_react2.Icon, {
      style: {
        width: size,
        height: size
      },
      path: _js.mdiAttachment,
      size: 1,
      onClick: () => this.setState({
        preview: file
      })
    });
  }
  render() {
    let {
      file,
      onRemove,
      index,
      color,
      size = 36
    } = this.props;
    let {
      preview
    } = this.state;
    let {
      sizeString,
      minName
    } = this.getFile(file);
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
          size,
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
          size,
          html: /*#__PURE__*/_react.default.createElement(_react2.Icon, {
            path: _js.mdiClose,
            size: 0.7
          }),
          align: 'vh',
          attrs: {
            onClick: () => onRemove(index)
          }
        }, {
          show: onRemove === undefined,
          size: 12
        }]
      }
    }), preview && /*#__PURE__*/_react.default.createElement("div", {
      className: "file-preview-preview",
      onClick: () => this.setState({
        preview: false
      })
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
}
class AddFile extends _react.Component {
  async toBase64(file) {
    let a = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    return a;
  }
  change(e) {
    let {
      onAdd
    } = this.props;
    onAdd(e.target.files);
  }
  render() {
    let {
      text = 'Add File',
      color
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("label", {
      className: "add-file",
      style: {
        color
      }
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "file",
      onChange: e => this.change(e),
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
}
class FormGenerator extends _react.Component {
  render() {
    let {
      input,
      onChange
    } = this.props;
    let validations = input.validations || [];
    let validations_obj = validations.map(([operator, target]) => {
      return {
        operator,
        target: JSON.stringify(target)
      };
    });
    input.validations_obj = validations_obj;
    return /*#__PURE__*/_react.default.createElement(AIOForm, {
      model: input,
      data: {
        validationOperators: ['required', '=', '!=', '<', '<=', '>', '>=', 'length=', 'length!=', 'length<', 'length>', 'date<', 'date<=', 'date>', 'date>=', 'contain', '!contain']
      },
      onChange: () => onChange(),
      theme: {
        label: {
          width: 80
        },
        input: {
          height: 24
        }
      },
      inlineLabel: true,
      inputs: [{
        type: 'text',
        field: 'model.rowKey',
        label: 'rowKey'
      }, {
        type: 'number',
        field: 'model.rowWidth',
        label: 'rowWidth'
      }, {
        type: 'text',
        field: 'model.field',
        label: 'field'
      }, {
        type: 'text',
        field: 'model.label',
        label: 'label'
      }, {
        type: 'text',
        field: 'model.show',
        label: 'show'
      }, {
        type: 'text',
        field: 'model.disabled',
        label: 'disabled'
      }, {
        type: 'text',
        field: 'model.prefix',
        label: 'prefix'
      }, {
        type: 'text',
        field: 'model.affix',
        label: 'affix'
      }, {
        type: 'text',
        field: 'model.placeholder',
        label: 'placeholder',
        show: '["text","number","textarea","datepicker"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.options',
        label: 'options',
        show: '["text","number","select","multiselect","radio"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.text',
        label: 'text',
        show: '["select","multiselect","checkbox"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.optionWidth',
        label: 'optionWidth',
        show: '["radio","checklist"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.optionValue',
        label: 'optionValue',
        show: '["select","multiselect","radio"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.optionText',
        label: 'optionValue',
        show: '["text","number","select","multiselect","radio"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.optionSubtext',
        label: 'optionSubtext',
        show: '["select","multiselect","radio"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.optionStyle',
        label: 'optionStyle',
        show: '["select","multiselect","radio"].indexOf(model.type) !== -1'
      }, {
        type: 'text',
        field: 'model.autoHeight',
        label: 'autoHeight',
        show: 'model.type === "textarea"'
      }, {
        type: 'number',
        field: 'model.start',
        label: 'start',
        show: 'model.type === "slider"'
      }, {
        type: 'number',
        field: 'model.end',
        label: 'end',
        show: 'model.type === "slider"'
      }, {
        type: 'number',
        field: 'model.step',
        label: 'step',
        show: 'model.type === "slider"'
      }, {
        type: 'table',
        field: 'model.validations_obj',
        label: 'Validations',
        inlineLabel: false,
        onChange: value => {
          input.validations = value.map(({
            operator,
            target = ''
          }) => {
            let Target;
            try {
              Target = JSON.parse(target);
            } catch {
              Target = undefined;
            }
            return [operator, Target];
          });
          onChange();
        },
        columns: [{
          title: 'Operator',
          type: 'select',
          options: 'props.data.validationOperators',
          optionText: 'option',
          optionValue: 'option',
          field: 'operator'
        }, {
          title: 'Target',
          type: 'text',
          field: 'target'
        }]
      }]
    });
  }
}