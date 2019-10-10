import React, {Component} from 'react';

import {Container} from 'reactstrap';
import SpeakerList from "./SpeakerList";

class App extends Component {
    render() {
        return (
            <Container>
                <h1>Speaker List</h1>
                <SpeakerList/>
            </Container>
        );
    }
}

export default App;
