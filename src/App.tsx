import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HomePage } from './components/homePage';
import { BasicQuestion } from './components/BasicPage';
import { DetailedQuestions } from './components/detailedPage';
import { Report } from './components/ReportPage';
import logo from "./logoandimages/thecareerhelpilogo.png"


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [currPage, setCurrPage] = useState('HomePage');

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  function renderPage() {
    switch(currPage) {
      case "HomePage":
        return <HomePage key={key}></HomePage>
      case "BasicPage":
        return <BasicQuestion key={key} onQuestionSubmit={handleQuestionSumit}></BasicQuestion>
      case "DetailedPage":
        return <DetailedQuestions key={key}></DetailedQuestions>
      case "Report":
        return <Report key={key}></Report>
    }
  }

  function handleQuestionSumit() {
    setCurrPage("ReportPage");
  }


  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="theCareerHelpilogo" /> {/* Updated alt text */}
      <header className="App-header">

        <div className="Page-buttons-div">
          <Button className="Page-button" onClick={() => setCurrPage("HomePage")} disabled={currPage === "HomePage"}>Home Page</Button>
          <Button className="Page-button" onClick={() => setCurrPage("BasicPage")} disabled={currPage === "BasicPage"}>Basic Questions</Button>
          <Button className="Page-button" onClick={() => setCurrPage("DetailedPage")} disabled={currPage === "DetailedPage"}>Detailed Questions</Button>
        </div>
      </header>

      <div className="Pages-div">
        {renderPage()};
      </div>

      <div>
        {currPage === "BasicPage" && (<BasicQuestion key={key} onQuestionSubmit={handleQuestionSumit}></BasicQuestion>)}
      </div>

      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
      <hr></hr>
      <p>
        Created by: Melanie Heider, Patrick Sweet, Jessica Cunningham, Sydney Holland
      </p>
    </div>
  );
}
export default App;