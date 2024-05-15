import "./pages.css";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import logo from "../logoandimages/thecareerhelpilogo.png";
import Homevideo from "../videos/homevideoanifinished.mp4";
import { useState } from 'react';

export function HomePage(): JSX.Element {
    /*
        videoEnded - boolean, tracks if the guide video is completed
        setVideoEnded - used to update videoEnded on whether or not the video has ended
    */
    const [videoEnded, setVideoEnded] = useState(false);

    /*
        @description - if video fails to load or play, sends error message to console
    */
    const handleVideoError = () => {
        console.error("Error loading video. Please check the video file path and format.");
    };

    return (
        <div className="Pages">
            <h3 className="Page-title">Welcome to The Career Helpi!</h3>
            <Container>
                <Row>
                    {/*Basic Questions Quiz description and Button to the quiz*/}
                    <Col className="Description-box">
                        <NavMenu>
                            <NavLink to='/starter_helpi/basic-Questions'>Basic Questions</NavLink>
                        </NavMenu>
                        <div className="Description">
                            The basic questions will ask you more simple, easier questions that will give you a quick idea about your potential ideal career path. For a brief recommendation for careers, take this quiz!
                        </div>
                    </Col>
                    {/*column containing the guide video, and deals with changing it to the logo once the video is completed*/}
                    <Col md={6} className="d-flex justify-content-center align-items-center">
                        {!videoEnded ? (
                            <div className="video-container">
                                <video width="600" height="415" controls autoPlay onEnded={() => setVideoEnded(true)} onError={handleVideoError}>
                                    <source src={Homevideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <div className="logo-container">
                                <img src={logo} className="App-logo small-logo" alt="The Career Helpi logo" />
                            </div>
                        )}
                    </Col>
                    {/*Detailed Questions Quiz description and Button to the quiz*/}
                    <Col className="Description-box">
                        <NavMenu>
                            <NavLink to='/starter_helpi/detailed-Questions'>Detailed Questions</NavLink>
                        </NavMenu>
                        <div className="Description">
                            The detailed questions quiz is targeted towards narrowing down your optimal field of study. If you would like recommendations for specific careers within your field of interest, take this quiz!
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

// Handles the styling of the NavLinks to Basic Page and Description Page (seen at as the names of the quizzes that can be clicked to go to quiz)
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
