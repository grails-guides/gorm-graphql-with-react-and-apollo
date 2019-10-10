import React, {Component} from 'react'
import Speaker from "./Speaker";
import {SERVER_URL} from './config';

class SpeakerList extends Component {

    constructor() {
        super();

        this.state = {
            speakers: []
        }
    }

    componentDidMount() {
        console.log('Fetching speakers...');
        fetch(`${SERVER_URL}/speaker`)
            .then(r => r.json())
            .then(json => this.setState({speakers: json}))
            .catch(e => console.error(e));
    }

    render() {
        return [this.state.speakers.map(s => <Speaker key={s.id} speaker={s}/>)]
    }
}

export default SpeakerList;