import "./pages.css"
import {Col, Container, Row } from "react-bootstrap";
import { AIKey } from "../interfaces/AIKeyInterface";
import logo from "../logoandimages/thecareerhelpilogo.png";
import { useState } from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export function HomePage(key: AIKey): JSX.Element {

    const [homePageVisible, setHomePageVisible] = useState<boolean>(true); //to show the home page

    return <div className="Pages">
        <h3 className="Page-title">Welcome to The Career Helpi!</h3>
            <Container className="Default-box">
                <Row>
                    <Col>
                    <NavMenu>
                        <NavLink to='/basic-Questions' className="Description-header">
                            Basic Questions
                        </NavLink>
                    </NavMenu>
                    <div className="Description">
                        The basic questions will ask you more simple, easier
                        questions that will give you a quick idea about your
                        potential ideal career path. For a brief recommendation for 
                        careers, take this quiz!
                    </div>
                    </Col>
                    <Col>
                     <div> <img src={logo} className="App-logo" alt="thestarterHelpilogo" /></div>
                    </Col>
                    <Col>
                    <NavMenu>
                        <NavLink to='/detailed-Questions' className="Description-header">
                            Detailed Questions
                        </NavLink>
                    </NavMenu>
                    <div className="Description">
                    The detailed questions quiz is targeted towards narrowing down your optimal field of study. If you would like recommendations for specific careers within your field of interest, take this quiz!  
                    </div>
                    </Col>
                </Row>
            </Container>
    </div>;
}

const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;
 
const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;