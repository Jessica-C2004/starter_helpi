import "./pages.css";
import { Col, Container, Row, Image, Button} from 'react-bootstrap';
import logo from "../logoandimages/cowboy.jpg";
import { OpenAI } from 'openai';
// import { useState } from "react";

async function generateCareer() {
    const key = localStorage.getItem("MYKEY")?.replace(/['"]+/g, '');
    if (key === null) {
        console.log("No key found");
        return;
    }

    const questions = localStorage.getItem("questions");
    const answers = localStorage.getItem("answers");

    console.log("Questions: ", questions);
    console.log("Answers: ", answers);

    const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true});
    const completion = await openai.chat.completions.create({
         model: 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-4
         max_tokens: 1000,
         messages: [
             { role: 'system', content: "" },
             { role: 'user', content: "questions: " + questions + " corresponding answers: " + answers }
         ]
     });
     let content = completion.choices[0]?.message?.content?.trim() ?? '';
     console.log('OpenAI Output: \n', content);
}


export function Report(): JSX.Element {

    console.log(localStorage.getItem("MYKEY"));
    // const [reportVisible, setReportVisible] = useState<boolean>(false);
    return <div className="Pages">
        <h1>Your Suggested Career is...</h1>
        <Button onClick={() => generateCareer()}>Generate Report</Button>
        <Container>
            <Row>
                <Col>
                <div>
                    <Image src={logo} alt="career-picture" thumbnail></Image>
                </div>
                </Col>
                <Col>
                    <div> Report text here: <br></br></div>
                </Col>
            </Row>
        </Container>
    </div>;
}