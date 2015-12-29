'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _component = require('../css/component.css');

var _component2 = _interopRequireDefault(_component);

var _datamaps = require('datamaps');

var _datamaps2 = _interopRequireDefault(_datamaps);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var D3MapComponent = (0, _autobindDecorator2.default)(_class = (function (_React$Component) {
  _inherits(D3MapComponent, _React$Component);

  function D3MapComponent(props) {
    _classCallCheck(this, D3MapComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(D3MapComponent).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(D3MapComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawMap();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.clear();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.drawMap();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clear();
    }
  }, {
    key: 'clear',
    value: function clear() {
      var container = this.refs.container;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(container.childNodes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;

          container.removeChild(child);
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
    key: 'drawMap',
    value: function drawMap() {
      var map = new _datamaps2.default(Object.assign({}, _extends({}, this.props), {
        element: this.refs.container,
        geographyConfig: {
          dataUrl: '/components/d3map/liangshan.json',
          highlightBorderColor: '#B7B7B7'
        },
        scope: 'liangshan', //important
        height: this.props.h,
        width: this.props.w,

        fills: {
          defaultFill: '#f0af0a',
          lt50: 'rgba(0,244,244,0.9)',
          gt50: 'red'
        },
        data: {
          '071': { fillKey: 'lt50' },
          '513424': { fillKey: 'gt50' }
        },
        setProjection: function setProjection(element) {
          var projection = _d2.default.geo.mercator().center([102, 27.7])
          //.rotate([4.4, 0])
          .scale(6000).translate([element.offsetWidth / 2, element.offsetHeight / 2]);

          console.log(element.offsetWidth, element.offsetHeight);
          var path = _d2.default.geo.path().projection(projection);

          return { path: path, projection: projection };
        }

      }));

      if (this.props.arc) {
        map.arc(this.props.arc, this.props.arcOptions);
      }

      if (this.props.bubbles) {
        map.bubbles(this.props.bubbles, this.props.bubblesOptions);
      }

      if (this.props.graticule) {
        map.graticule();
      }

      if (this.props.labels) {
        map.labels();
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        this.props,
        _react2.default.createElement('div', { ref: 'container', style: _component2.default })
      );
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      // return the data you want to save as an object
      return {};
    }
  }]);

  return D3MapComponent;
})(_react2.default.Component)) || _class;

// ExampleComponent.propTypes = {
//   master: React.PropTypes.object
// , edit: React.PropTypes.bool
// }
//
// ExampleComponent.defaultProps = {
//   master: {}
// , edit: false
// }

exports.default = D3MapComponent;