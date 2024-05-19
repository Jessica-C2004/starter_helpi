import React, { useState } from 'react';
import "./pages.css";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { Col, Row} from 'react-bootstrap';

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
                    <h1 className="About-title">Meet the Team!</h1>
                    </Row>
                </div>
                    <Row>
                        <Col> 
                        <div className="About-person">
                            Jessica Cunningham
                            </div>
                        </Col>
                    </Row>
        </div>
    );
            }

const NavLink = styled(Link)``;