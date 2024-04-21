import "./pages.css";
import { AIKey } from "../interfaces/AIKeyInterface";
import { Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { QuestionProgressBar } from './progressBar';

export function DetailedQuestions(key: AIKey): JSX.Element {
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [otherText, setOtherText] = useState('');
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const currentAnswer = answers[currentQuestionIndex];
        if (currentAnswer.startsWith("Other (please specify): ")) {
            setOtherText(currentAnswer.substring("Other (please specify): ".length));
        } else {
            setOtherText('');
        }
    }, [currentQuestionIndex, answers]);

    const handleStart = () => setHasStarted(true);
    const handleRestart = () => {
        setHasStarted(false);
        setCurrentQuestionIndex(0);
        setAnswers(Array(questions.length).fill(''));
        setOtherText('');
    };

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

    const handleOtherTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOtherText = event.target.value;
        setOtherText(newOtherText);
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuestionIndex] = `Other (please specify): ${newOtherText}`;
            return newAnswers;
        });
    };

    const handleSubmit = () => {
        alert('Submission complete!'); // Placeholder for submission logic
    };


    const canSubmit = answers.every(answer => answer.trim() !== '');

    if (!hasStarted) {
        return (
            <div className="Pages">
                <h1>Welcome to the Detailed Career Assessment</h1>
                <p>Please click 'Start' to begin answering detailed questions that will help suggest a career path suitable for you.</p>
                <Button variant="primary" onClick={handleStart}>Start</Button>
            </div>
        );
    }

    return (
        <div className="Pages">
            <h1>Detailed Career Questions</h1>
            <QuestionProgressBar totalQuestions={questions.length} completedQuestions={currentQuestionIndex + 1} />
            <Form onSubmit={handleSubmit}>
                <div>
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <p>{questions[currentQuestionIndex].question}</p>
                    {questions[currentQuestionIndex].options.map((option, index) => (
                        <div key={`${currentQuestionIndex}-${index}`}
                             className={`radio-option ${answers[currentQuestionIndex] === option || (option === "Other (please specify)" && answers[currentQuestionIndex].startsWith("Other (please specify):")) ? 'selected' : ''}`}>
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
                    {answers[currentQuestionIndex].startsWith("Other (please specify):") && (
                        <Form.Control
                            type="text"
                            value={otherText}
                            onChange={handleOtherTextChange}
                            placeholder="Please specify..."
                        />
                    )}
                </div>
                <div className="navigation-buttons">
                    <Button variant="secondary" onClick={() => setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))} disabled={currentQuestionIndex === 0}>
                        Previous
                    </Button>
                    <Button variant="primary" onClick={() => setCurrentQuestionIndex(Math.min(currentQuestionIndex + 1, questions.length - 1))} disabled={currentQuestionIndex === questions.length - 1}>
                        Next
                    </Button>
                    {currentQuestionIndex === questions.length - 1 && (
                        <Button type="submit" variant="success" disabled={!canSubmit}>
                            Submit
                        </Button>
                    )}
                    <Button variant="info" onClick={handleRestart}>Restart</Button>  {/* Restart Button */}
                </div>
            </Form>
        </div>
    );
}