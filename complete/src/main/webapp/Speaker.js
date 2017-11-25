import React, {Component} from 'react'
import {Well} from 'react-bootstrap'
import Talk from "./Talks";
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

class Speaker extends Component {

  constructor() {
    super();

    this.state = {
      title: '',
      duration: ''
    }
  }

//tag::calling[]
  addNewTalk = () => {
    const {title, duration} = this.state;
    const {speaker} = this.props;

    this.setState({title: '', duration: ''});

    this.props.talkCreate({talk: {title, duration, speaker: {id: speaker.id}}})
      .then(({data}) => console.log('create response:', data))
      .catch((error) => console.log('there was an error sending the query', error));
  };

  deleteTalk = (id) => {
    this.props.talkDelete({id: id})
      .then(({data}) => console.log('delete response: ', data))
      .catch((error) => console.log('there was an error sending the query', error));
  };
//end::calling[]


  handleNewTalkChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    const {speaker} = this.props;
    const {title, duration} = this.state;

    return <Well>
      <h3>{speaker.firstName} {speaker.lastName}</h3>
      <hr/>

      <ul>
        {speaker.talks.map(t => <Talk key={t.id} talk={t} delete={() => this.deleteTalk(t.id)}/>)}
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

//tag::mutations[]
const talkCreate = gql`
  mutation talkCreate($talk: TalkCreate!) { 
    talkCreate(talk: $talk) {
      id
      title
      duration
    }
  }
`;

const talkDelete = gql`
  mutation talkDelete($id: Long!) {
    talkDelete(id: $id) {
    error
  }
}
`;
//end::mutations[]

//tag::compose[]
const SpeakerWithMutations = compose(
  graphql(talkCreate, {
    props: ({mutate}) => ({
      talkCreate: ({talk}) =>
        mutate({
          variables: {talk},
        })
    })
  }),
  graphql(talkDelete, {
    props: ({mutate}) => ({
      talkDelete: ({id}) =>
        mutate({
          variables: {id},
        })
    })
  })
)(Speaker)

export default SpeakerWithMutations;
//end::compose[]