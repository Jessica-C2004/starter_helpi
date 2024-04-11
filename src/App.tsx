import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { BasicQuestion, DetailedQuestions, HomePage } from './components/pages';
import logo from './logoandimages/thestarterhelpilogo.png';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [homePageVisible, setHomePageVisible] = useState<boolean>(true); //to show the home page
  const [basicVisible, setBasicVisible] = useState<boolean>(false); //to show the basic questions
  const [detailedVisible, setDetailedVisible] = useState<boolean>(false); //to show the detailed questions
  
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  function showHomePage() {
    setHomePageVisible(true);
    setBasicVisible(false);
    setDetailedVisible(false);
  }

  function showBasic() {
    setHomePageVisible(false);
    setBasicVisible(true);
    setDetailedVisible(false);
  }

  function showDetailed() {
    setHomePageVisible(false);
    setBasicVisible(false);
    setDetailedVisible(true);
  }

  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} alt="Logo" style={{ maxWidth: '200px', height: 'auto' }} />
        <div className="Page-buttons">
          <Button className="Button-color" onClick={showHomePage}>Home</Button>
          <Button className="Button-color" onClick={showDetailed}>Detailed Questions</Button>
        </div>
  
        {homePageVisible && <HomePage key={key} />}
        {basicVisible && <BasicQuestion key={key} />}
        {detailedVisible && <DetailedQuestions key={key} />}
        <p> The detailed questions quiz is targeted towards narrowing down your optimal field of study. If you would like recommendations for specific careers within your field of interest, take this quiz! </p>
      </header>
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