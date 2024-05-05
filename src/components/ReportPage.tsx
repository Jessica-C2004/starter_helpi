import "./pages.css";
import { Col, Container, Row, Image, Button} from 'react-bootstrap';
import logo from "../logoandimages/cowboy.jpg";
import { OpenAI } from 'openai';
// import { useState } from "react";

export function Report(): JSX.Element {

    // const [reportVisible, setReportVisible] = useState<boolean>(false);

    return <div className="Pages" id="Basic Questions Report Page">
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
                <div> Report text here: <br></br>
                    This will include a simple description of the career and some info on why that was the chosen one. Will be updated when integrating openAI
                </div>
                </Col>
            </Row>
        </Container>
    </div>;    
}

async function generateCareer() {
    const key = localStorage.getItem("MYKEY")?.replace(/['"]+/g, '');
    if (key === null) {
        console.log("No key found");
        return;
    }
    console.log('API Key: ', key)
    console.log('API Key: ', key)
    const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true});
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-4
        max_tokens: 128,
        messages: [
            { role: 'system', content: "" },
            { role: 'user', content: "Please respond with all the letters in the alphabet" }
        ]
    });
    let content = completion.choices[0]?.message?.content?.trim() ?? '';
    console.log('OpenAI Output: \n', content);

}
