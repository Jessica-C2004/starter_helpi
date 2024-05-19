import React from 'react';
import "./pages.css";
import { Col, Row} from 'react-bootstrap';
import melaniepicture from "../logoandimages/headshotpicturemelanie.jpg"; 

/*export function AboutUs(): JSX.Element {
    return (
        <div className="Pages">
        <h3 className="About-title"> Meet the Team! </h3>
        <Container>
            <Row>
            <Col className="About-section">
                Jessica Cunningham
            </Col>
            </Row>
            <Row>

            </Row>
        </Container>
    </div>
    );
}
const NavLink = styled(Link)``;*/

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
                            <div className="person-email">
                                Email: jacunnin@udel.edu
                                </div>
                                <div className="person-github">
                                Github: Jessica-C2004
                            </div>
                            <div className="person-name">
                            Patrick Sweet
                            </div>
                            <div className="person-email">
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
