import "./pages.css";
import { Col, Row, Image, Button, Spinner} from 'react-bootstrap';
import logo from "../logoandimages/Career Image.jpeg";
import { OpenAI } from 'openai';
import { useState } from "react";

async function generateCareer() {
    const key = localStorage.getItem("MYKEY")?.replace(/['"]+/g, '');
    if (key === null) {
        console.log("No key found");
        localStorage.setItem("resultCareer1", "No API Key found");
        localStorage.setItem("resultDescription1", "No API Key found");
        localStorage.setItem("resultCareer2", "No API Key found");
        localStorage.setItem("resultDescription2", "No API Key found");
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

     //clearing results
     localStorage.removeItem("resultsCareer1");
     localStorage.removeItem("resultsDescription1");

     localStorage.removeItem("resultsCareer2");
     localStorage.removeItem("resultsDescription2");

     let results = content.split("\n");
     
     //first career outputed
     localStorage.setItem("resultCareer1", results[0]);
     localStorage.setItem("resultDescription1", results[1]);

     //second career outputed
     localStorage.setItem("resultCareer2", results[3]);
     localStorage.setItem("resultDescription2", results[4]);

     //window.location.reload();

     /*leaving rn for future debugging
     console.log(localStorage.getItem("resultCareer1") + " career1 title");
     console.log(localStorage.getItem("resultDescription1") + " career1 description");
     console.log(localStorage.getItem("resultCareer2") + " career2 title");
     console.log(localStorage.getItem("resultDescription2") + " career2 descrip");
     */
}


export function Report(): JSX.Element {
    const resultCareer1 = localStorage.getItem("resultCareer1");
    const resultDescription1 = localStorage.getItem("resultDescription1");
    const resultCareer2 = localStorage.getItem("resultCareer2");
    const resultDescription2 = localStorage.getItem("resultDescription2");

    const [descrip1, setResult1Visible] = useState<boolean>(false);
    const [descrip2, setResult2Visible] = useState<boolean>(false);
    const [careerGenerated, setCareerGenerated] = useState<boolean>(false);
    const [displaySpinner, setdisplaySpinner] = useState<boolean>(false);
    
    function flipDescrip1() {
        setResult1Visible(!descrip1);
    }

    function flipDescrip2() {
        setResult2Visible(!descrip2);
    }
    
    function makeCareer() {
        generateCareer();
        localStorage.removeItem("resultCareer2");
        localStorage.removeItem("resultDescription2");
        setdisplaySpinner(true);
        waitforcareer();
        setCareerGenerated(!careerGenerated);
    }

    const waitforcareer = () => {
        setTimeout(() => {
            setCareerGenerated(true);
            setdisplaySpinner(false);
        }, 15000);
    };

    return <div className="Pages">
        <Row>
            <Col></Col>
            <Col>
            <h3 className="Report-title">Your Suggested Career is...</h3>
            <Button className="Result-button" onClick={() => makeCareer()} disabled={careerGenerated}>Generate Report</Button>
            {displaySpinner && <Spinner animation="border" role="status" className="Spinner"/>}
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col md={5}>
                {careerGenerated &&  resultCareer1 !== null && 
                <div>
                    <Button className="career-button" onClick={flipDescrip1}>{resultCareer1}</Button>
                </div>}
            </Col>
            <Col md={{span: 3, offset: 3}}>
                {careerGenerated &&  resultCareer2 !== null && 
                <div>
                    <Button className="career-button" onClick={flipDescrip2}>{resultCareer2}</Button>
                </div>}
            </Col>
        </Row>
        <Row>
            <Col className="Results-Col-Left">
                {careerGenerated &&  resultCareer1 !== null && 
                <div>
                    {descrip1 && <div className="results">{resultDescription1}</div>}
                </div>}
            </Col>
            <Col xs={3}>
                <Image src={logo} className="Career-Logo" alt="career-picture" thumbnail fluid={true}></Image>
            </Col>
            <Col className="Results-Col-Right">
                {careerGenerated &&  resultCareer2 !== null && 
                <div>
                    {descrip2 && <div className="results">{resultDescription2}</div>}
                </div>}
            </Col>
        </Row>
    </div>;
}