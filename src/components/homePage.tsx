import "./pages.css"
import {Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import logo from "../logoandimages/thecareerhelpilogo.png";



export function HomePage(): JSX.Element {

    return <div className="Pages">
        <h3 className="Page-title">Welcome to The Career Helpi!</h3>
            <Container>
                <Row>
                    <Col className="Description-box">
                    <NavMenu>
                        <NavLink to='/starter_helpi/basic-Questions'>
                            Basic Questions
                        </NavLink>
                    </NavMenu>
                    <div className="Description">
                        The basic questions will ask you more simple, easier questions that will give you a quick idea about your potential ideal career path. For a brief recommendation for careers, take this quiz!
                    </div>
                    </Col>
                    <Col className="Description-box">
                        <img src={logo} className="App-logo" alt="thestarterHelpilogo" />
                    </Col>
                    <Col className="Description-box">
                    <NavMenu>
                        <NavLink to='/starter_helpi/detailed-Questions'>
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

//handles the styling of the NavLinks to Basic Page and Description Page
const NavLink = styled(Link)`
    background-color: #AFBEA2;
    color: #000000;
    width: inherit;
    height: 35px;
    text-align: center;
    outline: 1px solid black;
    border-radius: 10px;
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 1.6rem;
`;
 
const NavMenu = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;