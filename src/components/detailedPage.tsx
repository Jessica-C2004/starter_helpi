import "./pages.css";
import { Button, Form, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { QuestionProgressBar } from './progressBar';
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import detialedVideo from "../videos/detailedvideo.mp4";


export function DetailedQuestions(): JSX.Element {
    //questions for the detailed quiz, each with their own options matching the question context
    const questions = [
        {
            question: "What type of work environment do you thrive in?",
            options: [
                "A fast-paced, ever-changing environment.",
                "A stable, predictable, and structured environment.",
                "An independent, flexible, and remote-friendly workplace.",
                "A collaborative, team-oriented, and social environment.",
                "Other (please specify)"
            ]
        },
        {
            question: "How do you prefer to solve problems?",
            options: [
                "Through systematic research and analysis.",
                "By inventing creative and innovative solutions.",
                "Through collaboration and team brainstorming.",
                "By following established guidelines and procedures.",
                "Other (please specify)"
            ]
        },
        {
            question: "What motivates you to succeed in your work?",
            options: [
                "Financial rewards and job security.",
                "Making a difference in society and helping others.",
                "Personal growth and learning new skills.",
                "Recognition and the potential for career advancement.",
                "Other (please specify)"
            ]
        },
        {question: "Which of these tasks would you enjoy doing the most?",
        options: [
            "Analyzing data to find trends and patterns.",
            "Designing graphics or products.",
            "Writing reports, articles, or other content.",
            "Teaching or training others.",
            "Other (please specify)"
        ]
        },
        {
            question: "What size company do you see yourself working at?",
            options: [
                "A large, multinational corporation.",
                "A small to medium-sized enterprise.",
                "A start-up",
                "Freelancing or running my own business",
                "Other (please specify)"
            ]
        },
        {
            question: "Which of these subjects did you most enjoy studying?",
            options: [
                "Mathematics and statistics",
                "Art and design",
                "History and literature",
                "Biology and chemistry",
                "Other (please specify)"
            ]
        },
        {
            question: "Which aspect of a project do you find most appealing?",
            options: [
                "Starting and planning the project.",
                "The development and active working phase.",
                "The finalization and presentation of results.",
                "Overseeing the project and leading the team.",
                "Other (please specify)"
            ]
        },
        {
            question:"When thinking about your future career, what is most important to you?",
            options: [
                "Work-life balance and flexible hours.",
                "Opportunities for international travel and work.",
                "High earning potential and benefits.",
                "Job stability and a clear career path.",
                "Other (please specify)"
            ]
        },
        {
            question: "If you had to teach something, what would you choose?",
            options: [
                "A technical skill, like coding or engineering principles.",
                "A creative skill, like painting or creative writing.",
                "A practical skill, like cooking or carpentry.",
                "An academic subject, like history or science.",
                "Other (please specify)"
            ]
        },
        {
            question: "What describes your approach to team projects?",
            options: [
                "I am a natrual leader and take charge of the group.",
                "I am a mediator and work to maintain group harmony.",
                "I am an idea generator and contribute creatively.",
                "I am the organizer who plans and keeps track of tasks.",
                "Other (please specify)"
            ]
        }

    ];

    /*
        currentQuestionIndex - tracks which question user is on, initialized at 0 to start at first question
        setCurrentQuestionIndex - used to update which question user is on
        
        answers - tracks answer user chooses for the question asked, initialized null and updated when user clicks options button
        setAnswers - used to update array containing answers to contain which option user chose

        showQuestions - tracks questions visibility, initialized at false and updated when user clicks "start" button
        setShowQuestions - used to toggle question visibility between false (invisible) and true (visible)

        otherText - stores the text put into the other option if the user uses it
        setOtherText - updates otherText to be storing the input of the user

    */
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [otherText, setOtherText] = useState('');
    const [showQuestions, setShowQuestions] = useState(false);

    /*
        checks if the user selected the other option from the choices, and then set otherText to what they input to the textbox to save it
    */
    useEffect(() => {
        const currentAnswer = answers[currentQuestionIndex];
        if (currentAnswer.startsWith("Other (please specify): ")) {
            setOtherText(currentAnswer.substring("Other (please specify): ".length));
        } else {
            setOtherText('');
        }
    }, [currentQuestionIndex, answers]);

    /*
        @description - once start button is hit makes questions visible
    */
    const handleStart = () => setShowQuestions(true);

    /*
        @description - resets the answer array to be empty, sets question back to first one, goes back to start page with video
    */
    const handleRestart = () => {
        setShowQuestions(false);
        setCurrentQuestionIndex(0);
        setAnswers(Array(questions.length).fill(''));
        setOtherText('');
    };

     /*
        @description - updates the answers list if user chooses new option after the first one they chose, if user chooses other option, then it stores their input in otherText
        @param
            event: used to get the actual input of the target - the textbox that appears when the other option is chosen
    */
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            if (value === "Other (please specify)") {
                newAnswers[currentQuestionIndex] = `Other (please specify): ${otherText}`; // Ensures that the "Other" prefix is there when the option is initially selected.
            } else {
                newAnswers[currentQuestionIndex] = value;
            }
            return newAnswers;
        });
    };

    /*
        @description - handles updating the input to the textbox and storing it in the answer array
        @param
            event: used to get the input of the textbox where the users custom answer is inputted
    */
    const handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOtherText = event.target.value;
        setOtherText(newOtherText);
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = `Other (please specify): ${newOtherText}`;
            return newAnswers;
        });
    };

    /*
        @description - when user hits submit, the questions and answers are saved as JSON files that are later used in Report Page to give info to openAI
                       also clears the JSONs that store the career names and descriptions in case there is anything already in there from previous attempts
    */
    const saveAnswers = () => {
        localStorage.setItem("questions", JSON.stringify(questions.map(question => question.question)));
        localStorage.setItem("answers", JSON.stringify(answers));
        localStorage.removeItem("resultsCareer1");
        localStorage.removeItem("resultsDescription1");

        localStorage.removeItem("resultsCareer2");
        localStorage.removeItem("resultsDescription2");
    };

    // Calculating the number of questions answered, makes sure not to count the other choices empty string as an answer
    const numberQuestionsAnswered = answers.filter(answer => answer.trim() !== '').length;

    // Checking if all questions are answered, doesnt count empty string other as answer
    const canSubmit = answers.every(answer => answer.trim() !== '');

    return (
        <div className="Pages">
            {/* start page */}
            {!showQuestions && (
                <div className="Pre-question-page" style={{ paddingTop: '5vh' }}>
                <h1 style={{ marginTop: '0', paddingTop: '0', marginBottom: '20px' }}>Welcome to the Detailed Career Assessment</h1>
                    <video width="860" height="515" controls autoPlay loop>
                   <source src={detialedVideo} type="video/mp4" />
                   Your browser does not support the video tag.
               </video>
                    <p>Please click 'Start' to begin answering detailed questions that will help suggest a career path suitable for you.</p>
                    <Button variant="primary" onClick={handleStart} className="Submit-button">Start</Button>
                </div>
            )}
            { /* questions part of page */ }
            {showQuestions && (
                <div className="Questions-page">
                    <h1 className="Question-title">Detailed Career Questions</h1>
                    <div>
                        <QuestionProgressBar totalQuestions={questions.length} completedQuestions={numberQuestionsAnswered} />
                    </div>
                    <Form>
                        <Container>
                            <div>
                                <h2 className="Question-number">Question {currentQuestionIndex + 1}</h2>
                                <p>{questions[currentQuestionIndex].question}</p>
                                <div className="Answers">
                                    {questions[currentQuestionIndex].options.map((option, index) => (
                                        <div key={`${currentQuestionIndex}-${index}`}
                                            className={`radio-option-detailed ${answers[currentQuestionIndex] === option || (option === "Other (please specify)" && answers[currentQuestionIndex].startsWith("Other (please specify):")) ? 'selected' : ''}`}>
                                            <Form.Check
                                                type="radio"
                                                name={`question${currentQuestionIndex}`}
                                                label={option}
                                                value={option}
                                                id={`option${index}`}
                                                checked={answers[currentQuestionIndex] === option || (option === "Other (please specify)" && answers[currentQuestionIndex].startsWith("Other (please specify):"))}
                                                onChange={handleOptionChange}
                                            />
                                        </div>
                                    ))}
                                    {/*handles the other option and having a textbox to input own response*/}
                                    {answers[currentQuestionIndex].startsWith("Other (please specify):") && (
                                        <Form.Control
                                            type="text"
                                            value={otherText}
                                            onChange={handleOtherTextChange}
                                            placeholder="Please specify..."
                                        />
                                    )}
                                </div>
                            </div>
                        </Container>
                        {/*butttons to switch between questions, restart the quiz, or submit once on the last question and all are answered*/}
                        <div>
                            <Button variant="secondary" className="Previous-button" onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))} disabled={currentQuestionIndex === 0}>
                                Previous
                            </Button>
                            {currentQuestionIndex < questions.length - 1 && (
                                <Button variant="primary" className="Next-button" onClick={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1))}>
                                    Next
                                </Button>
                            )}
                            {currentQuestionIndex === questions.length - 1 && (
                                <NavLink to='/starter_helpi/report'>
                                    <Button type="submit" className="Submit-button" variant="success" onClick={saveAnswers} disabled={!canSubmit}>
                                        Submit
                                    </Button>
                                </NavLink>
                            )}
                            <Button variant="info" className="Restart-button" onClick={handleRestart}>Restart</Button>  {/* Restart Button */}
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
}

const NavLink = styled(Link)``;
