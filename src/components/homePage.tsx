import "./pages.css"
import {Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import logo from "../logoandimages/thecareerhelpilogo.png";



export function HomePage(): JSX.Element {

    return <div className="Pages">
        <h3 className="Page-title">Welcome to The Career Helpi!</h3>
            <Container className="Default-box">
                <Row>
                    <Col>
                    <NavMenu>
                        <NavLink to='starter_helpi/basic-Questions'>
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
                        <NavLink to='starter_helpi/basic-Questions'>
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
    width: 350px;
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