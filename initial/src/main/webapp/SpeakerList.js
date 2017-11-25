import React, {Component} from 'react'
import Speaker from "./Speaker";
import 'whatwg-fetch';

class SpeakerList extends Component {


  constructor() {
    super();

    this.state = {
      speakers: [
        ]
    }
  }

  componentDidMount() {
    console.log('Fetching speakers...');
    fetch('/speaker')
      .then(r => r.json())
      .then(json => this.setState({speakers: json}))
      .catch(e => console.error(e));
  }

  render() {

    return  [this.state.speakers.map(s => <Speaker key={s.id} speaker={s} />)]

  }

}



export default SpeakerList;