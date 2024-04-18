import React, { useState } from 'react';
import "./pages.css";
import { AIKey } from '../interfaces/AIKeyInterface';
import { Col, Container, Row, Image} from 'react-bootstrap';
import logo from "../logoandimages/thecareerhelpilogo.png";

export function BasicReport(key: AIKey): JSX.Element {
    return <div className="Pages" id="Basic Questions Report Page">
        <h1>Your Suggested Career is...</h1>
        <Container>
            <Row>
                <Col>
                <div>
                    <Image src={logo} thumbnail></Image>
                </div>
                </Col>
                <Col>
                <div> Report text here</div>
                </Col>
            </Row>
        </Container>
    </div>;
    
}