
import React from 'react'
import classnames from 'classnames'
import autobind from 'autobind-decorator'
import styles from '../css/component.css'

import d3 from 'd3'
import {Modal, Button} from 'react-bootstrap'
import NewD3MapConfigModal from './new-component-modal'

@autobind
class D3MapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topoJSONURL: this.props.data.topoJSONURL || "http://localhost:3000/components/d3map/china.json"
      ,topoScope : this.props.data.topoScope || ""
    }
  }
  componentDidMount() {
		this.drawMap();
	}

	componentWillReceiveProps() {
		this.clear();
	}

	componentDidUpdate() {
    console.log(this.state)

		this.drawMap();
	}

	componentWillUnmount() {
		this.clear();
	}

	clear() {
		const container = this.refs.container;

		for (const child of Array.from(container.childNodes)) {
			container.removeChild(child);
		}
	}


  drawMap() {


    //var mapdata = require("../assets/liangshan.geo.json")
    var mapdata = require("../assets/mapdata/china.json")
    //var mapdata = require("../assets/mapdata/geometryProvince/12.json")

    var height = this.props.h
    var width = this.props.w

    // create a first guess for the projection
    var center = d3.geo.centroid(mapdata)
    var scale  = 150
    var offset = [width/2, height/2]

    var projection = d3.geo.mercator().scale(scale).center(center)
         .translate(offset)

    // create the path
    var path = d3.geo.path().projection(projection)

    // using the path determine the bounds of the current map and use
    // these to determine better values for the scale and translation
    var bounds  = path.bounds(mapdata)
    var hscale  = scale*(width - 20)  / (bounds[1][0] - bounds[0][0])
    var vscale  = scale*(height - 20) / (bounds[1][1] - bounds[0][1])
    var scale   = (hscale < vscale) ? hscale : vscale
    console.log(hscale, vscale, scale)
    var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                   height - (bounds[0][1] + bounds[1][1])/2]

    // new projection
    projection = d3.geo.mercator().center(center)
       .scale(scale).translate(offset);
    path = path.projection(projection)

    var svg = d3.select(this.refs.container).append("svg")
      .attr("width", width)
          .attr("height", height)

    svg.append("rect").attr('width', width).attr('height', height)
          .style('stroke', 'black').style('fill', 'none');

    //draw map path
    svg.selectAll("path").data(mapdata.features).enter().append("path")
          .attr("d", path)
          .style("fill", 'grey')
          .style("stroke-width", "1")
          .style("stroke", '#aaa')

     //draw subunit-label from properties.name

      svg.selectAll(".subunit-label")
          .data(mapdata.features)
          .enter().append("text")
              .attr("class", function(d) { return "subunit-label " + d.properties.id; })
              .attr("transform", function(d) {
                  return "translate(" + (path.centroid(d)[0] - d.properties.name.length * 5  ) + ',' + path.centroid(d)[1] + ")";
                })
                .attr("dy", ".1em")
                .text(function(d) { return d.properties.name; })
                .attr('fill','blue')
                //.attr('fill','#ccc')
                .attr('font-size','10px')

  }

  render() {

    return (
      <div {...this.props}>
        <div ref="container" style={styles}></div>
      </div>
    )

  }


  toJson() {
    // return the data you want to save as an object
    return {
      topoJSONURL: this.state.topoJSONURL
      ,topoScope : this.state.topoScope
    }
  }
}

// ExampleComponent.propTypes = {
//   master: React.PropTypes.object
// , edit: React.PropTypes.bool
// }
//
// ExampleComponent.defaultProps = {
//   master: {}
// , edit: false
// }
D3MapComponent.NewComponentConfig = NewD3MapConfigModal

export default D3MapComponent
