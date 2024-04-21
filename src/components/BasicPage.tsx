import React, { useState } from 'react';
import "./pages.css";
import { AIKey } from "../interfaces/AIKeyInterface";
import { Progress } from "../interfaces/Progress";
import {Button, Form} from 'react-bootstrap';
import { QuestionProgressBar } from './progressBar';


export function BasicQuestion(key: AIKey): JSX.Element {
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
    const options = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"];
    const questionsLength = questions.length;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showQuestions, setShowQuestions] = useState(false);

    const handleOptionChange = (questionIndex: number, optionIndex: number): void => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = optionIndex;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsLength - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleStart = () => {
        setShowQuestions(true);
    };

    const handleSubmit = () => {
        alert('Submission complete!');
        };

    const handleRestart = () => {
        setAnswers(Array(questions.length).fill(null));
        setCurrentQuestionIndex(0);
        setShowQuestions(false);
    };

    // Checking if all questions are answered
    const allQuestionsAnswered = answers.every(answer => answer !== null);

    return (
        <div className="Pages">
            {!showQuestions && (
                <div>
                    <h1>Welcome to the Career Questionnaire</h1>
                    <p>Click start to begin answering questions about your career preferences and goals.</p>
                    <Button variant="primary" onClick={handleStart}>Start</Button>
                </div>
            )}
            {showQuestions && (
                <div>
                    <h1>Basic Career Questions</h1>
                    <QuestionProgressBar totalQuestions={questionsLength} completedQuestions={currentQuestionIndex}/>
                    <div>
                        <h2>Question {currentQuestionIndex + 1}</h2>
                        <p>{questions[currentQuestionIndex]}</p>
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
                        <Button variant="secondary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            Previous
                        </Button>
                        {currentQuestionIndex < questionsLength - 1 && (
                            <Button variant="primary" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                        {currentQuestionIndex === questionsLength - 1 && (
                            <Button variant="primary" onClick={handleSubmit} disabled={!allQuestionsAnswered}>
                                Submit
                            </Button>
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