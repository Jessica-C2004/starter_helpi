import { ProgressBar } from 'react-bootstrap';
import { Progress } from "../interfaces/Progress";
import "./progressBar.css";

export function QuestionProgressBar(questionInfo: Progress): JSX.Element {
    //calculates how much of the test the user has completed and shows that amount in the progress bar of each quiz
    let progress = Math.floor((questionInfo.completedQuestions / questionInfo.totalQuestions) * 100);
    return <ProgressBar animated className="Bar" now={progress} label={progress} variant="Progress-Bar-Color"/>;
}