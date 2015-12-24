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

var _topojson = require('topojson');

var _topojson2 = _interopRequireDefault(_topojson);

var _reactD3MapCore = require('react-d3-map-core');

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
      // Artificially delay the loading, so the loading state stays visible for a while.
      // setTimeout(this.loadData, 20000);
      _d2.default.json("/components/d3map/worldmap.json", this.dataLoaded);
    }
  }, {
    key: 'dataLoaded',
    value: function dataLoaded(err, data) {
      console.log(err, data);

      if (err) return this.setState({ error: err });
      this.setState({ data: data });
      console.log(data);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.data) console.log(this.state.data);

      // if (this.state.error) return React.DOM.div({className: 'message message--error'}, 'Whoops! ' + this.props.url + ' does not exist. Reload the page to try again.');
      // if (!this.state.data) return React.DOM.div({className: 'message'}, 'Loading ' + this.props.url);
      // if (!this.state.citydata) return React.DOM.div({className: 'message'}, 'Loading city' + this.props.url);
      var width = this.props.width,
          height = this.props.height,
          margins = { top: 20, right: 50, bottom: 20, left: 50 };

      var title = "test chart lib";

      var topodata = this.state.data;
      console.log(this.state.data);

      //  var dataCountries = topojson.mesh(topodata, topodata.objects.countries, function(a, b) { return a !== b; });
      // var dataLand = topojson.feature(topodata, topodata.objects.land);
      // var dataCountries = topojson.feature(topodata, topodata.objects.countries);
      var scale = (width + 1) / 2 / Math.PI;
      var translate = [width / 2, height / 2];
      var precision = .1;
      var projection = "mercator";

      // var polygonClass = 'polygon-test';
      //
      var proj = (0, _reactD3MapCore.projection)({
        projection: 'mercator',
        scale: scale,
        translate: translate,
        precision: precision
      });
      var geo = (0, _reactD3MapCore.geoPath)(proj);

      return _react2.default.createElement(
        'div',
        this.props,
        this.state.data ? _react2.default.createElement(
          _reactD3MapCore.Chart,
          {
            title: title,
            width: width,
            height: height,
            margins: margins
          },
          _react2.default.createElement(_reactD3MapCore.Graticule, {
            projection: projection,
            scale: scale,
            translate: translate,
            precision: precision,
            geoPath: geo
          }),
          _react2.default.createElement(_reactD3MapCore.Polygon, {
            width: width,
            height: height,
            data: _topojson2.default.feature(topodata, topodata.objects.land),
            projection: projection,
            scale: scale,
            translate: translate,
            precision: precision,
            geoPath: geo
          }),
          _react2.default.createElement(_reactD3MapCore.Mesh, {
            width: width,
            height: height,
            data: _topojson2.default.feature(topodata, topodata.objects.countries),
            projection: projection,
            scale: scale,
            translate: translate,
            precision: precision,
            geoPath: geo
          })
        ) : _react2.default.createElement(
          'div',
          null,
          'no'
        )
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
//# sourceMappingURL=/Users/eddie/orient/orientboard-component-d3map/component.js.map