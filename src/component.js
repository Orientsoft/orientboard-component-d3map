
import React from 'react'
import classnames from 'classnames'
import autobind from 'autobind-decorator'
import styles from '../css/component.css'
import Datamap from 'datamaps'
import d3 from 'd3'

@autobind
class D3MapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
		this.drawMap();
	}

	componentWillReceiveProps() {
		this.clear();
	}

	componentDidUpdate() {
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
		const map = new Datamap(Object.assign({}, { ...this.props }, {
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
        '071': {fillKey: 'lt50' },
        '513424': {fillKey: 'gt50' }
      },
      setProjection: function(element) {
         var projection = d3.geo.mercator()
           .center([102, 27.7])
           //.rotate([4.4, 0])
           .scale(6000)
           .translate([element.offsetWidth / 2, element.offsetHeight / 2])

         console.log(element.offsetWidth,element.offsetHeight)
         var path = d3.geo.path()
           .projection(projection);

         return {path: path, projection: projection};
       }

		}))

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
