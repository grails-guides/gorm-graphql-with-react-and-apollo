import React, {Component} from 'react'
import Speaker from "./Speaker";
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import 'whatwg-fetch';

class SpeakerList extends Component {

  render() {
    const speakers = this.props.data.speakerList;
    return speakers ? [speakers.map(s => <Speaker key={s.id} speaker={s}/>)] : <p>Loading...</p>
  }
}

export const SPEAKER_QUERY = gql`query {	speakerList(max: 10) {
	  id, firstName, lastName,
    talks { id title, duration}
	} 
}`;

const SpeakerListWithData = graphql(SPEAKER_QUERY, {options: {pollInterval: 1000}})(SpeakerList);
export default SpeakerListWithData;