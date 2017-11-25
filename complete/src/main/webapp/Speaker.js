import React, {Component} from 'react'
import {Well} from 'react-bootstrap'
import Talk from "./Talks";

class Speaker extends Component {

  constructor() {
    super();

    this.state = {
      talks: [],
      title: '',
      duration: ''
    }
  }

  componentDidMount() {
    this.props.speaker.talks.map(talk => {
      console.log(`Fetching talk ${talk.id}`);

      fetch(`/talk/${talk.id}`)
        .then(r => r.json())
        .then(json => this.addTalk(json))
        .catch(e => console.error(e));
    })
  }

  addNewTalk = () => {
    const {title, duration} = this.state;
    this.setState({title: '', duration: ''});
    fetch(`/talk`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title, duration, speaker: {id: this.props.speaker.id}})
    }).then(r => r.json())
      .then(json => this.addTalk(json))
      .catch(e => console.error(e));
  };

  deleteTalk = (id) => {
    fetch(`/talk/${id}`, {
      method: 'DELETE'
    }).then(() => {
      const talks = this.state.talks.filter(t => t.id !== id);
      this.setState({talks});
    })
      .catch(e => console.error(e));
  };

  addTalk = (talk) => {
    let talks = this.state.talks;
    talks.push(talk);
    this.setState({talks})
  };

  handleNewTalkChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {speaker} = this.props;
    const {title, duration} = this.state;

    return <Well>
      <h3>{speaker.firstName} {speaker.lastName}</h3>
      <hr/>

      <ul>
        {this.state.talks.map(t => <Talk key={t.id} talk={t} delete={() => this.deleteTalk(t.id)}/>)}
        <li>
          <label>Title</label>
          <input type='text' name='title' value={title}
                 onChange={this.handleNewTalkChange}/>

          <label>Duration</label>
          <input type="number" name="duration" value={duration}
                 onChange={this.handleNewTalkChange}/>
          <button onClick={this.addNewTalk}>Add Talk</button>
        </li>
      </ul>

    </Well>
  }
}

export default Speaker;