import React, {Component} from 'react'
import {Button, Card, CardBody, CardHeader, CardText, Col, Row} from 'reactstrap'
import Talk from "./Talks";
import {SERVER_URL} from './config';

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
        if (this.props.speaker.talks !== undefined) {
            this.props.speaker.talks.forEach(talk => {
                console.log(`Fetching talk ${talk.id}`);

                fetch(`${SERVER_URL}/talk/${talk.id}`)
                    .then(r => r.json())
                    .then(json => this.addTalk(json))
                    .catch(e => console.error(e));
            })
        }
    }

    addNewTalk = () => {
        const {title, duration} = this.state;
        this.setState({title: '', duration: ''});
        fetch(`${SERVER_URL}/talk`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, duration, speaker: {id: this.props.speaker.id}})
        }).then(r => r.json())
            .then(json => this.addTalk(json))
            .catch(e => console.error(e));
    };

    deleteTalk = (id) => {
        fetch(`${SERVER_URL}/talk/${id}`, {
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

        return <Card inverse color="info">
            <CardHeader>{speaker.firstName} {speaker.lastName}</CardHeader>
            <CardBody>
                <CardText>

                    <Row>
                        <ul style={{listStyle: 'none', width: '100%'}}>

                            <li>
                                <Row>
                                    <Col> <label>Title</label>
                                        <input type='text' name='title' value={title}
                                               onChange={this.handleNewTalkChange}/></Col>
                                    <Col><label>Duration</label>
                                        <input type="number" name="duration" value={duration}
                                               onChange={this.handleNewTalkChange}/></Col>
                                    <Col md="1"> <Button color="success" onClick={this.addNewTalk}>Add Talk</Button>
                                    </Col>
                                </Row>

                            </li>
                            <li>
                                <br/><hr/><br/>
                            </li>
                            {this.state.talks.map(t => <Talk key={t.id} talk={t}
                                                             delete={() => this.deleteTalk(t.id)}/>)}
                        </ul>
                    </Row>

                </CardText>

            </CardBody>
        </Card>
    }
}

export default Speaker;