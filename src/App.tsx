import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { HomePage } from './components/homePage';
import { BasicQuestion } from './components/BasicPage';
import { DetailedQuestions } from './components/detailedPage';
import { Report } from './components/ReportPage';
import {Navbar} from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//import * as openai from 'openai';


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

export function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">
      <header className="Pages-div">
        <Router>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="starter_helpi/" element={<HomePage/>} />
                  <Route path="starter_helpi/home" element={<HomePage/>} />
                  <Route path="starter_helpi/basic-Questions" element={<BasicQuestion/>} />
                  <Route path="starter_helpi/detailed-Questions" element={<DetailedQuestions/>} />
                  <Route path="starter_helpi/report" element={<Report/>} />
                  <Route path="starter_helpi/home/starter_helpi/basic-Questions" element={<BasicQuestion/>} />
                  <Route path="starter_helpi/home/starter_helpi/detailed-Questions" element={<DetailedQuestions/>} />
              </Routes>
          </Router>
          <hr className="Gap"/>
      </header>
      <div className="Footer">
        <br></br>
        <Form className="Api-Box">
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
        <hr></hr>
        <p style={{margin:0}}>
          Created by: Melanie Heider, Patrick Sweet, Jessica Cunningham, Sydney Holland
        </p>
      </div>
    </div>
  );
}

export default App;