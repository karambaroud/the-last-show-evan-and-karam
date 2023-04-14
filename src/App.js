import Obituaries from "./Obituaries";
import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Overlay from "./Overlay";
import Obituary from "./Obituary";
const localStorageKey = "vvs";


function App() {

  
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  
  const [addMode, setAddMode] = useState(false);
  const [currentObituary, setCurrentObiturary] = useState(-1);

  const [obituaries, setObituaries] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [newID, setNewID] = useState(null);

  useEffect(() => {
    getObituaries();
  }, [])

  const getObituaries = async () => {
    setSpinner(true);

    const res = await fetch("https://x3az4jc7wzzjtawd5u6qwtgp7y0syvki.lambda-url.ca-central-1.on.aws/", 
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    })
    if(res.status == 200) {
      const json = await res.json();
      const fetchedObituaries = await json.obituaries;
      console.log(fetchedObituaries)

      if(fetchedObituaries === []) {
        setObituaries([]);
      } else {
        setObituaries(fetchedObituaries);
      } 
    }
    else {
      console.log(res)
      const jsonRes = await res.json();
      console.log(jsonRes);
    }
    setSpinner(false);
  }

  const changer = () => {
    setIsOpen(!isOpen);
    setCurrentObiturary(0);
  }


  return (
    <>
      <div id="header">
        <div className="headerDiv"></div>
        <div className="headerDiv">
          <h1 id="title">The Last Show</h1>
        </div>
        <div className="headerDiv">
          <button id="addButton" onClick={changer}>+ New Obituary</button>
        </div>
      </div>
      {!spinner ? (<>
        <Overlay 
          isOpen={isOpen} 
          onClose={() => setIsOpen(!isOpen)} 
          obituaries={obituaries} setObituaries={setObituaries} 
          setCurrentObiturary={setCurrentObiturary} 
          setIsOpen={setIsOpen}
          setNewID={setNewID}
        ></Overlay>
        <div id="main">
          <Obituaries obituaries={obituaries} newID={newID}/>
          {obituaries.length === 0 ? <h4 id="nothingToDisplay">No obituaries yet.</h4> : <></>}
        </div>
        <div id="overlay">
        
        </div>
      </>) : (
        <div className="loader">
          <div id="spinner"></div>
        </div>
      )}
    </>
  );
}

export default App;
