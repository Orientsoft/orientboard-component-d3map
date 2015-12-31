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

var _reactBootstrap = require('react-bootstrap');

var _newComponentModal = require('./new-component-modal');

var _newComponentModal2 = _interopRequireDefault(_newComponentModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var D3MapComponent = (0, _autobindDecorator2.default)(_class = (function (_React$Component) {
  _inherits(D3MapComponent, _React$Component);

  function D3MapComponent(props) {
    _classCallCheck(this, D3MapComponent);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(D3MapComponent).call(this, props));

    _this.state = {
      topoJSONURL: _this.props.data.topoJSONURL || "http://localhost:3000/components/d3map/liangshan.json",
      topoScope: _this.props.data.topoScope || "liangshan"
    };
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
      console.log(this.state);

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

      //var mapdata = require("../assets/liangshan.geo.json")

      var mapdata = require("../assets/mapdata/china.json");
      //var mapdata = require("../assets/mapdata/geometryProvince/12.json")

      var height = this.props.h;
      var width = this.props.w;

      // create a first guess for the projection
      var center = _d2.default.geo.centroid(mapdata);
      var scale = 150;
      var offset = [width / 2, height / 2];

      var projection = _d2.default.geo.mercator().scale(scale).center(center).translate(offset);

      // create the path
      var path = _d2.default.geo.path().projection(projection);

      // using the path determine the bounds of the current map and use
      // these to determine better values for the scale and translation
      var bounds = path.bounds(mapdata);
      var hscale = scale * (width - 20) / (bounds[1][0] - bounds[0][0]);
      var vscale = scale * (height - 20) / (bounds[1][1] - bounds[0][1]);
      var scale = hscale < vscale ? hscale : vscale;
      console.log(hscale, vscale, scale);
      var offset = [width - (bounds[0][0] + bounds[1][0]) / 2, height - (bounds[0][1] + bounds[1][1]) / 2];

      // new projection
      projection = _d2.default.geo.mercator().center(center).scale(scale).translate(offset);
      path = path.projection(projection);

      var svg = _d2.default.select(this.refs.container).append("svg").attr("width", width).attr("height", height);

      svg.append("rect").attr('width', width).attr('height', height).style('stroke', 'black').style('fill', 'none');

      //draw map path
      svg.selectAll("path").data(mapdata.features).enter().append("path").attr("d", path).style("fill", 'grey').style("stroke-width", "1").style("stroke", '#aaa');

      //draw subunit-label from properties.name

      svg.selectAll(".subunit-label").data(mapdata.features).enter().append("text").attr("class", function (d) {
        return "subunit-label " + d.properties.id;
      }).attr("transform", function (d) {
        return "translate(" + (path.centroid(d)[0] - d.properties.name.length * 5) + ',' + path.centroid(d)[1] + ")";
      }).attr("dy", ".1em").text(function (d) {
        return d.properties.name;
      }).attr('fill', 'blue')
      //.attr('fill','#ccc')
      .attr('font-size', '10px');
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
      return {
        topoJSONURL: this.state.topoJSONURL,
        topoScope: this.state.topoScope
      };
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

D3MapComponent.NewComponentConfig = _newComponentModal2.default;

exports.default = D3MapComponent;