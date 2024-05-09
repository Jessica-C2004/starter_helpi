import "./pages.css";
import { Col, Container, Row, Image, Button} from 'react-bootstrap';
import logo from "../logoandimages/cowboy.jpg";
import { OpenAI } from 'openai';
import { useState } from "react";

async function generateCareer() {
    const key = localStorage.getItem("MYKEY")?.replace(/['"]+/g, '');
    if (key === null) {
        console.log("No key found");
        localStorage.setItem("resultCareer", "No API Key found");
        localStorage.setItem("resultDescription", "No API Key found");
        return;
    } else {
        console.log("Key found: ", key);
    }

    const questions = localStorage.getItem("questions");
    const answers = localStorage.getItem("answers");

    console.log("Questions: ", questions);
    console.log("Answers: ", answers);

    const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true});
    const completion = await openai.chat.completions.create({
         model: 'gpt-4', // gpt-3.5-turbo, gpt-4
         max_tokens: 750,
         messages: [ 
             { role: 'system', content: `Ai tool to generate a career based on a user's results to questions. 

             Rules:
             - Generate 2 careers
             - Generate a short description for each career
             - The description of the career must be less than 200 words
             - Respond with only the career and the description
             - There should be no other text other than the chosen career and the description
             
             The input will be similar to: 
             Questions: ["Question 1", "Question 2", "Question 3"] Answers: ["Answer 1", "Answer 2", "Answer 3"]
             
             An example of the output is:
             Computer Science
             A computer science career is about crafting the future through technology. It involves coding, problem-solving, and innovation across various domains like software development, AI, cybersecurity, and data analysis. Computer scientists design algorithms, build systems, and tackle complex challenges using programming languages like Python, Java, and C++. With technology ever-evolving, the field offers endless opportunities for growth and impact, spanning industries from tech to healthcare and finance.

             Data Analyst
             
A data analyst is a professional who collects, organizes, and analyzes data to extract valuable insights. They use statistical techniques and data visualization tools to identify trends, patterns, and correlations, helping businesses make informed decisions.
            `},
             { role: 'user', content: "Questions: " + questions + " Answers: " + answers}
         ]
     });
     let content = completion.choices[0]?.message?.content?.trim() ?? '';
     console.log('OpenAI Output: \n', content);
     if (content === '') {
        console.log('Response is empty.');
        content = `No career found
        No description found`;
     } else {
        console.log('Response: ', content);
     }
     let results = content.split("\n");
     //first career outputed
     localStorage.setItem("resultCareer1", results[0]);
     localStorage.setItem("resultDescription1", results[2]);

     //second career outputed
     localStorage.setItem("resultCareer2", results[3]);
     localStorage.setItem("resultDescription2", results[4]);
     console.log(localStorage.getItem("resultCareer1") + " career title");
     console.log(localStorage.getItem("resultDescription1") + " career description");
}


export function Report(): JSX.Element {
    const resultCareer1 = localStorage.getItem("resultCareer1");
    const resultDescription1 = localStorage.getItem("resultDescription1");
    const resultCareer2 = localStorage.getItem("resultCareer2");
    const resultDescription2 = localStorage.getItem("resultDescription2");

    const [descrip1, setResult1Visible] = useState<boolean>(false);
    const [descrip2, setResult2Visible] = useState<boolean>(false);

    function flipDescrip1() {
        setResult1Visible(!descrip1);
    }

    function flipDescrip2() {
        setResult2Visible(!descrip2);
    }
    
    return <div className="Pages">
        <h1 className="ReportHeader">Your Suggested Career is...</h1>
        <Button className="Result-button" onClick={() => generateCareer()}>Generate Report</Button>
        <Container>
            <Row>
                <Col>
                <Button onClick={flipDescrip1}>{resultCareer1}</Button>
                {descrip1 && <div className="results">{resultDescription1}</div>}
                </Col>
                <Col>
                    <div className="results">
                        {resultCareer2} <br></br>
                        {resultDescription2}
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
}