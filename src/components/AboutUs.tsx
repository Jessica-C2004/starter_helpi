import React from 'react';
import "./pages.css";
import { Col, Row} from 'react-bootstrap';
import melaniepicture from "../logoandimages/headshotpicturemelanie.jpg"; 
import SydneyPhoto from "../logoandimages/SydneyPhoto.jpg";
import patrickpicture from "../logoandimages/patrickpicture.jpg";
import jesspicture from "../logoandimages/aboutmepicture-jessica.jpeg";

export function AboutUs(): JSX.Element {
    return (
        <div className="Pages">
                <div className="About-us">
                    <Row>
                    <h1 className="Page-title">Meet the Team!</h1>
                    </Row>
                </div>
                    <Row>
                        <Col> 
                            <div className="person-name">
                                Jessica Cunningham
                            </div>
                            <div className="person-picture">
                                <img src={jesspicture} alt="Jessica Cunningham" className="person-image"></img>
                            </div>
                            <div className="person-email">
                                Email: jacunnin@udel.edu
                            </div>
                            <div className="person-github">
                                Github: Jessica-C2004
                            </div>
                            <div className="person-name">
                                Patrick Sweet
                            </div>
                            <div className="person-picture">
                                <img src={patrickpicture} alt="Patrick Sweet" className="person-image" />
                            </div>
                            <div className="person-email">
                                Email: pgsweet@udel.edu
                            </div>
                            <div className="person-github">
                                Github: pgsweet
                            </div>
                        </Col>
                        <Col>
                        <div className="person-name">
                            Melanie Heider
                        </div>
                        <div className="person-picture">
                            <img src={melaniepicture} alt="Melanie Heider" className="person-image" />
                        </div>
                        <div className="person-email">
                            Email: msheider@udel.edu
                        </div>
                        <div className="person-github">
                            Github: msheider
                        </div>
                            <div className="person-name">
                            Sydney Holland</div>
                            <div className="person-picture">
                                <img src={SydneyPhoto} alt="Sydney Holland" className="person-image" />
                            </div>
                            <div className="person-email">
                                Email: sydneymh@udel.edu
                                </div>
                                <div className="person-github">
                                Github: sydneyh9
                            </div>
                        </Col>
                    </Row>
        </div>
    );
            }
