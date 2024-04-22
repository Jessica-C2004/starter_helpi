import "./pages.css"
import {Col, Container, Row } from "react-bootstrap";
import { AIKey } from "../interfaces/AIKeyInterface";

export function HomePage(key: AIKey): JSX.Element {
    return <div className="Pages">
        <h3 className="Page-title">Welcome to The Career Helpi!</h3>
            <Container className="Default-box">
                <Row>
                    <Col>
                    <h4 className="Description-header">Basic Questions</h4>
                    <div className="Description">
                        The basic questions will ask you more simple, easier
                        questions that will give you a quick idea about your
                        potential ideal career path. For a brief recommendation for 
                        careers, take this quiz!
                    </div>
                    </Col>
                    <Col>
                    <h4 className="Description-header">Detailed Questions</h4>
                        <div className="Description">
                        The detailed questions quiz is targeted towards narrowing down your optimal field of study. If you would like recommendations for specific careers within your field of interest, take this quiz!  
                        </div>
                        </Col>
                </Row>
            </Container>
    </div>;
}