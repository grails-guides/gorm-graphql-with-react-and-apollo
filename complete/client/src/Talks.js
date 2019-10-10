import React, {Component} from 'react'
import {Button, Col, Row} from "reactstrap";

class Talk extends Component {

    render() {
        const {talk} = this.props;
        return <li style={{padding: 5}}>
            <Row>
                <Col><strong>{talk.title}</strong> </Col>
                <Col><i>Length: {talk.duration}</i></Col>
                <Col md="1"><Button color="danger" onClick={this.props.delete}>X</Button></Col>
            </Row>
        </li>
    }
}

export default Talk;