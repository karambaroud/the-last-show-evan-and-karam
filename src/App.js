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

  // Obituary structure
  // {
  //   key : uuidv4(),
  //   image : img,
  //   name : obitName,
  //   born : obitBirth,
  //   died : obitDeath,
  //   biography: obitName,
  // },

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

  
  // useEffect(() => {
  //   const existing = localStorage.getItem(localStorageKey);
  //   if(existing) {
  //     try {
  //       setObituaries(JSON.parse(existing));
  //     } catch {
  //       setObituaries([]);
  //     }
  //   }
    
  // }, [])
  

  // useEffect(() => {
  //   localStorage.setItem(localStorageKey, JSON.stringify(obituaries));
  // }, [obituaries]);

  // useEffect(() => {
  //   if (currentObituary < 0) {
  //     return;
  //   }
  //   if(!isOpen) {
  //     navigate(`/Obituaries`);
  //     return;
  //   }
  //   navigate(`/Overlay/${currentObituary+1}/edit`);
  //   //setFlicker(true);
  // }, [isOpen]);
  // 


  // function convertToDataURLviaCanvas(url, callback, outputFormat){
  //   var img = new Image();
  //   img.crossOrigin = 'Anonymous';
  //   img.onload = function(){
  //       var canvas = document.createElement('CANVAS');
  //       var ctx = canvas.getContext('2d');
  //       var dataURL;
  //       canvas.height = this.height;
  //       canvas.width = this.width;
  //       ctx.drawImage(this, 0, 0);
  //       dataURL = canvas.toDataURL(outputFormat);
  //       callback(dataURL);
  //       canvas = null; 
  //   };
  //   img.src = url;
  // }

  // const deleteObituary = (index) => {
  //   setObituaries([...obituaries.slice(0, index), ...obituaries.slice(index+1)]);
  //   setCurrentObiturary(0);
  //   setAddMode(false);
  // }

  const changer = () => {
    setIsOpen(!isOpen);
    setCurrentObiturary(0);
    //setAddMode(true);
    //addObituary();
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
        <Overlay isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} obituaries={obituaries} setObituaries={setObituaries} setCurrentObiturary={setCurrentObiturary} setIsOpen={setIsOpen}></Overlay>
        <div id="main">
          <Obituaries obituaries={obituaries}/>
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
