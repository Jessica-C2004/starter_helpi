import React, { useState } from 'react';
import "./pages.css";
import { AIKey } from '../interfaces/AIKeyInterface';
import { Col, Container, Row, Image} from 'react-bootstrap';
import logo from "../logoandimages/cowboy.jpg";

export function Report(key: AIKey): JSX.Element {
    return <div className="Pages" id="Basic Questions Report Page">
        <h1>Your Suggested Career is...</h1>
        <Container>
            <Row>
                <Col>
                <div>
                    <Image src={logo} alt="career-picture" thumbnail></Image>
                </div>
                </Col>
                <Col>
                <div> Report text here: <br></br>
                    This will include a simple description of the career and some info on why that was the chosen one. Will be updated when integrating openAI
                </div>
                </Col>
            </Row>
        </Container>
    </div>;
    
}