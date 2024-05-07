import "./pages.css";
import { Col, Container, Row, Image, Button} from 'react-bootstrap';
import logo from "../logoandimages/cowboy.jpg";
import { OpenAI } from 'openai';

async function generateCareer() {
    const key = localStorage.getItem("MYKEY")?.replace(/['"]+/g, '');
    if (key === null) {
        console.log("No key found");
        localStorage.setItem("resultCareer", "No API Key found");
        localStorage.setItem("resultDescription", "No API Key found");
        return;
    }

    const questions = localStorage.getItem("questions");
    const answers = localStorage.getItem("answers");

    console.log("Questions: ", questions);
    console.log("Answers: ", answers);

    const openai = new OpenAI({ apiKey: key , dangerouslyAllowBrowser: true});
    const completion = await openai.chat.completions.create({
         model: 'gpt-3.5-turbo', // gpt-3.5-turbo, gpt-4
         max_tokens: 750,
         messages: [ 
             { role: 'system', content: `Ai tool to generate a career based on a user's results to questions. 

             Rules:
             - Generate a career title
             - Generate a short description of the career
             - The description of the career must be less than 200 words
             - Respond with only the career and the description
             - There should be no other text other than the chosen career and the description
             
             The input will be similar to: 
             Questions: ["Question 1", "Question 2", "Question 3"] Answers: ["Answer 1", "Answer 2", "Answer 3"]
             
             An example of the output is:
             Computer Science
             A computer science career is about crafting the future through technology. It involves coding, problem-solving, and innovation across various domains like software development, AI, cybersecurity, and data analysis. Computer scientists design algorithms, build systems, and tackle complex challenges using programming languages like Python, Java, and C++. With technology ever-evolving, the field offers endless opportunities for growth and impact, spanning industries from tech to healthcare and finance.`},
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
     let results = content.split("/\r?\n/");
     localStorage.setItem("resultCareer", results[0]);
     localStorage.setItem("resultDescription", results[1]);
}


export function Report(): JSX.Element {

    const results = localStorage.getItem("results");
    // const [reportVisible, setReportVisible] = useState<boolean>(false);
    return <div className="Pages">
        <h1>Your Suggested Career is...</h1>
        <Button className="Result-button" onClick={() => generateCareer()}>Generate Report</Button>
        <Container>
            <Row>
                <Col>
                <div>
                    <Image src={logo} alt="career-picture" thumbnail></Image>
                </div>
                </Col>
                <Col>
                    <div className="results">
                        <p>{results}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>;
}