'use strict';

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

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _topojson = require('topojson');

var _topojson2 = _interopRequireDefault(_topojson);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import D3 from 'react-d3-map'

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
      // Artificially delay the loading, so the loading state stays visible for a while.
      setTimeout(this.loadData, 2000);
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      //d3.json("/components/d3map/upload/liangshan.json", this.dataLoaded);
      _d2.default.json("/components/d3map/liangshan.json", this.dataLoaded);
    }
  }, {
    key: 'dataLoaded',
    value: function dataLoaded(err, data) {
      if (err) return this.setState({ error: err });
      this.setState({ data: data });
    }
  }, {
    key: 'render',
    value: function render() {

      if (this.state.error) return _react2.default.DOM.div({ className: 'message message--error' }, 'Whoops! ' + this.props.url + ' does not exist. Reload the page to try again.');
      if (!this.state.data) return _react2.default.DOM.div({ className: 'message' }, 'Loading ' + this.props.url);

      // I prefer aliasing DOM elements over jsx

      var svg = _react2.default.DOM.svg;
      var g = _react2.default.DOM.g;
      var path = _react2.default.DOM.path;

      // create the path generator
      var pathGenerator = _d2.default.geo.path().projection(null);

      return _react2.default.createElement(
        'div',
        this.props,
        (svg({
          className: "choropleth",
          width: this.props.width,
          height: this.props.height
        }), g({
          className: "counties"
        }, _.map(this.state.counties, function (country) {
          return path({
            className: cmp.quantize(cmp.rateById.get(country.id)),
            d: pathGenerator(country)
          });
        })), path({
          className: "states",
          d: this.path(this.state.states)
        }))
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