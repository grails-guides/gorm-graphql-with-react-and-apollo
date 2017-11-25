import React, {Component} from 'react'

class Talk extends Component {

  render() {

    const {talk} = this.props;
    return <li>
      <strong>{talk.title}</strong> | <i>Length: {talk.duration}</i> | <button onClick={this.props.delete}>X</button>
    </li>
  }

}

export default Talk;