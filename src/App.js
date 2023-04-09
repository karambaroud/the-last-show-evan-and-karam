import Obituaries from "./Obituaries";
import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function App() {
  const navigate = useNavigate();
  //const [obituaries, setObituaries] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [currentObituary, setCurrentObiturary] = useState(-1);

  const [obituaries, setObituaries] = useState([
    {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg/640px-Dwayne_Johnson_2014_%28cropped%29.jpg", name: "Dwayne Johnson", born: "1999", died: "2021", biography: "Dwayne was a great person. He was a great friend and a great person to be around."},
    {image: "https://www.google.com/url?sa=i&url=https%3A%2F%2", name: "Jacqueline", born: "1999", died: "2021", biography: "Jacqueline was a great person. She was a great friend and a great person to be around."},
    {image: "https://www.google.com/url?sa=i&url=https%3A%2F%2", name: "Frank", born: "1999", died: "2303", biography: "Frank was a great person. He was a great friend and a great person to be around."},
    {image: "https://i.natgeofe.com/k/ca3583f8-c836-4826-9d14-b5e2e5d9a769/Ada_Lovelace_Portrait_KIDS_Women-Heroes_02-21_2x3.jpg", name: "Lady", born: "1099", died: "2021", biography: "Lady was a great person. She was a great friend and a great person to be around."},
    {image: "https://images.computerhistory.org/babbage/5-7-1.jpg", name: "Ada Lovelace", born: "1985", died: "2021", biography: "Ada was a great person. She was a great friend and a great person to be around."},
    {image: "https://www.google.com/url?sa=i&url=https%3A%2F%2", name: "Frank", born: "1999", died: "2303", biography: "Frank was a great person. He was a great friend and a great person to be around."},
    {image: "https://www.google.com/url?sa=i&url=https%3A%2F%2", name: "Frank", born: "1999", died: "2303", biography: "Frank was a great person. He was a great friend and a great person to be around."},
    {image: "https://www.google.com/url?sa=i&url=https%3A%2F%2", name: "Frank", born: "1999", died: "2303", biography: "Frank was a great person. He was a great friend and a great person to be around."},
    {image: "https://www.google.com/url?sa=i&url=https%3A%2F%2", name: "Frank", born: "1999", died: "2303", biography: "Frank was a great person. He was a great friend and a great person to be around."},
  ]);

  useEffect(() => {
    if (currentObituary < 0) {
      return;
    }
    if (!addMode) {
      navigate(`/App`);
      return;
    }
    navigate(`/Customize/${currentObituary+1}`);
  }, [obituaries]);
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

    setAddMode(true);
    setCurrentObiturary(0);
    
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


  return (
    <>
      <div id="header">
        <div className="headerDiv"></div>
        <div className="headerDiv">
          <h1 id="title">The Last Show</h1>
        </div>
        <div className="headerDiv">
          <button id="addButton" onClick={addObituary}>+ New Obituary</button>
        </div>
      </div>
      <div id="main">
        <Obituaries />
      </div>
      <div id="customize">
        <Outlet context={[obituaries, addObituary, deleteObituary]} />
      </div>
    </>
  )
}

export default App;
