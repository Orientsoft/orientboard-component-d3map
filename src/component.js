import React from 'react'
import classnames from 'classnames'
import autobind from 'autobind-decorator'
import styles from '../css/component.css'
import topojson from 'topojson'
import {Chart} from 'react-d3-map-core'
import {Graticule} from 'react-d3-map-core'
import {Mesh} from 'react-d3-map-core'
import {Polygon} from 'react-d3-map-core'
import {geoPath} from 'react-d3-map-core'


import {projection as projectionFunc} from 'react-d3-map-core'

import d3 from 'd3'

@autobind
class D3MapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentwillMount() {
    // Artificially delay the loading, so the loading state stays visible for a while.
    setTimeout(this.loadData, 20000);
  }
  loadData() {
  // Artificially delay the loading, so the loading state stays visible for a while.
    d3.json("/components/d3map/worldmap.json", this.dataLoaded);
  }


  dataLoaded(err, data) {
    console.log(err,data);

    if (err) return this.setState({error: err});
      this.setState({data: data});
    console.log(data);
  }

  render() {
    if (!this.state.data)
       console.log(this.state.data);

    // if (this.state.error) return React.DOM.div({className: 'message message--error'}, 'Whoops! ' + this.props.url + ' does not exist. Reload the page to try again.');
    // if (!this.state.data) return React.DOM.div({className: 'message'}, 'Loading ' + this.props.url);
    // if (!this.state.citydata) return React.DOM.div({className: 'message'}, 'Loading city' + this.props.url);
    var width = this.props.width,
    height = this.props.height,
    margins = {top: 20, right: 50, bottom: 20, left: 50};

    var title = "test chart lib";

    var topodata = this.state.data;
    console.log(this.state.data);

    //  var dataCountries = topojson.mesh(topodata, topodata.objects.countries, function(a, b) { return a !== b; });
    var dataLand = topojson.feature(topodata, topodata.objects.land);
    var dataCountries = topojson.feature(topodata, topodata.objects.countries);
    var scale = (width + 1) / 2 / Math.PI;
    var translate = [width / 2, height / 2];
    var precision = .1;
    var projection = "mercator";

    // var polygonClass = 'polygon-test';
    //
    var proj = projectionFunc({
       projection: 'mercator',
       scale: scale,
       translate: translate,
       precision: precision
     });
    var geo = geoPath(proj);

    return (
      <div {...this.props}>

        <Chart
           title= {title}
           width= {width}
           height= {height}
           margins= {margins}
         >
           <Graticule
             projection = {projection}
             scale= {scale}
             translate= {translate}
             precision= {precision}
             geoPath= {geoPath}
           />
           <Polygon
             width= {width}
             height= {height}
             data= {dataLand}
             projection = {projection}
             scale= {scale}
             translate= {translate}
             precision= {precision}
             geoPath= {geoPath}
           />
           <Mesh
             width= {width}
             height= {height}
             data= {dataCountries}
             projection = {projection}
             scale= {scale}
             translate= {translate}
             precision= {precision}
             geoPath= {geoPath}
           />
         </Chart>

      </div>
    )

  }


  toJson() {
    // return the data you want to save as an object
    return {

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

export default D3MapComponent
