import React, { useState } from 'react';
import "./pages.css";
import {Button, Form} from 'react-bootstrap';
import { QuestionProgressBar } from './progressBar';
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export function BasicQuestion(): JSX.Element {
    //questions asked in the basic quiz
    const questions = [
        "I enjoy solving complex problems.",
        "Working with technology is exciting to me.",
        "I find satisfaction in helping others directly.",
        "Creative expression is important in my daily activities.",
        "I prefer working in a team rather than alone.",
        "I thrive in structured and organized environments.",
        "I prefer a job that allows for a flexible schedule.",
        "Working under pressure energizes me.",
        "I am effective in communicating with different types of people.",
        "I can easily adapt to new technologies and tools.",
        "I am skilled at planning and organizing large projects.",
        "I have a talent for negotiating and persuading others.",
        "Achieving a high salary is a top priority for my career.",
        "My job needs to contribute positively to society.",
        "I seek leadership roles and responsibilities.",
        "Continual learning and development are essential in my ideal job.",
        "I value having ample personal time outside of work.",
        "I am willing to work long hours to advance my career.",
        "Job stability is more important to me than job flexibility.",
        "Traveling frequently for work is appealing to me."
    ];
    /*options for every question to set up Likert Scale*/
    const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
    const questionsLength = questions.length;

    /*
        currentQuestionIndex - tracks which question user is on, initialized at 0 to start at first question
        setCurrentQuestionIndex - used to update which question user is on
        
        answers - tracks answer user chooses for the question asked, initialized null and updated when user clicks options button
        setAnswers - used to update array containing answers to contain which option user chose

        showQuestions - tracks questions visibility, initialized at false and updated when user clicks "start" button
        setShowQuestions - used to toggle question visibility between false (invisible) and true (visible)
    */
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showQuestions, setShowQuestions] = useState(false);

    /*
        @description - updates the answers list if user chooses new option after the first one they chose
        @param
            questionIndex: number question user is changing their answer of
            optionIndex: the new option chosen by the user
    */
    const handleOptionChange = (questionIndex: number, optionIndex: number): void => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = optionIndex;
        setAnswers(updatedAnswers);
    };
    /*
        @description - switches to the next question in the array if it is not the last question
    */
    const handleNext = () => {
        if (currentQuestionIndex < questionsLength - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    /*
        @description - switches to previous question in array if it s not the first question
    */
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    /*
        @description - when used it begins the quiz and allows user to see questions 
    */
    const handleStart = () => {
        setShowQuestions(true);
    };
    
    const handleRestart = () => {
        setAnswers(Array(questions.length).fill(null));
        setCurrentQuestionIndex(0);
        setShowQuestions(false);
    };

    const saveAnswers = () => {
        localStorage.setItem("questions", JSON.stringify(questions));
        localStorage.setItem("answers", JSON.stringify(answers));
    }

    // Calculating the number of questions answered
    const numberQuestionsAnswered = answers.filter(answer => answer !== null).length;

    // Checking if all questions are answered
    const allQuestionsAnswered = answers.every(answer => answer !== null);

    return (
        <div className="Pages">
            {/* start page */}
            {!showQuestions && (
                <div>
                    <h1>Welcome to the Career Questionnaire</h1>
                    <p>Click start to begin answering questions about your career preferences and goals.</p>
                    <Button variant="primary" onClick={handleStart}>Start</Button>
                </div>
            )}
            { /* questions part of page */ }
            {showQuestions && (
                <div>
                    <h1>Basic Career Questions</h1>
                    <QuestionProgressBar totalQuestions={questionsLength} completedQuestions={numberQuestionsAnswered}/>
                    <div>
                        <h2>Question {currentQuestionIndex + 1}</h2>
                        <p>{questions[currentQuestionIndex]}</p>
                        { /* sets up the answer option buttons for each questions */ }
                        {options.map((option, optionIndex) => (
                            <div 
                                className={`radio-option ${answers[currentQuestionIndex] === optionIndex ? "selected" : ""}`} 
                                key={`${currentQuestionIndex}-${optionIndex}`}
                            >
                                <Form.Check
                                    type="radio"
                                    id={`question${currentQuestionIndex}-option${optionIndex}`}
                                    name={`question${currentQuestionIndex}`}
                                    label={option}
                                    checked={answers[currentQuestionIndex] === optionIndex}
                                    onChange={() => handleOptionChange(currentQuestionIndex, optionIndex)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="navigation-buttons">
                        { /* buttons to handle going to previous question, next question, restart, and to submit (only if at last question and every one is answered) */}
                        <Button variant="secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            Previous
                        </Button>
                        {currentQuestionIndex < questionsLength - 1 && (
                            <Button variant="primary" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                        {currentQuestionIndex === questionsLength - 1 && (
                            <NavLink to='/report'>
                                <Button variant="primary" disabled={!allQuestionsAnswered} onClick={saveAnswers}>
                                    Submit
                                </Button>
                            </NavLink>
                        )}
                        <Button variant="info" onClick={handleRestart}>
                            Restart
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}


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