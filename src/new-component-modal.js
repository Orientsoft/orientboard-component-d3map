import React from 'react'
import autobind from 'autobind-decorator'
import {Modal, Button, Input, ButtonInput} from 'react-bootstrap'

@autobind
class NewD3MapConfigModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.close}>
        <Modal.Header >
          <Modal.Title >D3 Map Config</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form >
            <Input type='text' label='显示宽度' ref='w'/>
            <Input type='text' label='显示高度' ref='h'/>
            <Input type='text' label='地理文件位置' ref='topoJSONURL' />
            <Input type='text' label='地理范围' ref='topoScope' />
          </form>
        </Modal.Body>
        <Modal.Footer >
          <Button onClick={this.close}>取消</Button>
          <Button onClick={this._create}>确认</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  open() {
    console.log('open!')
    this.setState({
      show: true
    })
  }

  close() {
    this.setState({
      show: false
    })
  }

  _create() {
    var info = {
      x: 0
    , y: 0
    , w: parseInt(this.refs.w.getValue())
    , h: parseInt(this.refs.h.getValue())
    , rotate: 0
    , type: 'd3map'
    , data: {
        topoJSONURL: this.refs.topoJSONURL.getValue()
        ,topoScope: this.refs.topoScope.getValue()
      }
    }
    this.props.actions.newComponent(info)
    this.close()
  }
}

NewD3MapConfigModal.propTypes = {

}

NewD3MapConfigModal.defaultProps = {

}

export default NewD3MapConfigModal
