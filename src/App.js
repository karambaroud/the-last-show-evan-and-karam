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

  
  useEffect(() => {
    const existing = localStorage.getItem(localStorageKey);
    if(existing) {
      try {
        setObituaries(JSON.parse(existing));
      } catch {
        setObituaries([]);
      }
    }
    
  }, [])
  

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(obituaries));
  }, [obituaries]);

  useEffect(() => {
    if (currentObituary < 0) {
      return;
    }
    if(!isOpen) {
      navigate(`/Obituaries`);
      return;
    }
    navigate(`/Overlay/${currentObituary+1}/edit`);
    //setFlicker(true);
  }, [isOpen]);
  // 


  function convertToDataURLviaCanvas(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
  }

  const deleteObituary = (index) => {
    setObituaries([...obituaries.slice(0, index), ...obituaries.slice(index+1)]);
    setCurrentObiturary(0);
    setAddMode(false);
  }
  
  const saveObituary = (obituary, index) => {
    setObituaries([
      ...obituaries.slice(0, index),
      { ...obituary },
      ...obituaries.slice(index + 1),
    ]);
    setCurrentObiturary(index);
    setIsOpen(!isOpen);
  };

  function addObituary() {
    const id = uuidv4(); // use uuid to track each obituary
    setObituaries([
      {
        key : uuidv4(),
        image : "",
        Name : "",
        born : "",
        died : "",
        biography: "",
      },
      ...obituaries,
    ]);
    /*
    setAddMode(true);
    setCurrentObiturary(0);
    */
    
    //const newObituary = { id: id, image : "" , Name : "Name of the deceased", date_born: "", date_died: "" }
    /*
    const res = await fetch("https://t6tmufd7d6v5jdva4s2pa7rsfe0mznte.lambda-url.ca-central-1.on.aws/", 
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "email": `${profile.email}`,
        "authorization": `Bearer ${user.access_token}`
      },
      body: JSON.stringify({...newNote, email: profile.email})
    }
    */

  
  }

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
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}></Overlay>
      <div id="main">
        <Obituaries obituaries={obituaries}/>
      </div>
      <div id="overlay">
        <Outlet context={[obituaries, setObituaries, saveObituary, deleteObituary]} />
      </div>
    </>
  );
}

export default App;
