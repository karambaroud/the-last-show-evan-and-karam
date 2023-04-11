import { Fragment, useState, useEffect } from "react";
import { currentDate } from "./utils";
import "./Overlay.css";
//import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import App from "./App.js";
import React from 'react';

export default function Overlay({ isOpen, onClose, obituaries, setCurrentObiturary, setObituaries, setIsOpen}) {
    let {obitID} = useParams();
    obitID -= 1;
    const navigate = useNavigate();
    //obitID -= 1;
    //var [ obituaries ] = useOutletContext();
    //let [obituaries, setObituaries, saveObituary, deleteObituary] = useOutletContext();
    let currentObituary = { Name: "", birth: "", death: "", img: "https://www.google.com/url?sa=i&url=https%3A%2F%2"};
    // if(obitID >= 0 && obituaries.length > obitID) {
    //     currentObituary = obituaries[obitID];
    // }

    const [obitName, setObitName] = useState("");
    const [obitBirth, setObitBirth] = useState("");
    const [obitDeath, setObitDeath] = useState("");
    const [img, setObitImg] = useState("");
    const [id, setId] = useState("");

    // state test...
    
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
        /*
        setObituaries([
          {
            key : id,
            image : img,
            Name : obitName,
            born : obitBirth,
            died : obitDeath,
            biography: "hello",
          },
          ...obituaries,
        */
        
     
      

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
    
        //navigate(`/Obituaries`);
    }

    const dealWith = () => {
      currentObituary.Name = obitName;
      saveObituary(currentObituary, obitID);
    }

    function addObituary() {


      const onSubmitForm = async (e) => { 
        e.preventDefault();
    
        console.log(obitName, obitBirth, img);
    
        const data = new FormData();
        
        data.append("name", obitName);
        data.append("when", obitBirth);
        data.append("file", img);
    
        const res = await fetch("https://xhjoig5ezmuntkokva52y6fgdi0gkigx.lambda-url.ca-central-1.on.aws/", {
            method: "POST",
            body: data,  
        });
    
        console.log(res)
    
        jsonRes = await res.json();
      }
    




      const id = uuidv4(); // use uuid to track each obituary
      setObituaries([
        {
          key : uuidv4(),
          image : img,
          name : obitName,
          born : obitBirth,
          died : obitDeath,
          biography: obitName,
        },
        ...obituaries,
      ]);
      
     
      
      setIsOpen(!isOpen);
      navigate(`Obituaries`);
    }

    const onFileChange = (e) => {
      setObitImg(e.target.files[0]);
    }

    const onFormSubmit = (e) => {
      e.preventDefault();
      addObituary();
    }

    const onFileClicker = React.useRef(null);

    const handleFileClick = (e) => {
      onFileClicker.current.click();
    }

    //const [obituaries, addObituary, deleteObituary] = useOutletContext();
    return (
        <Fragment>
          {isOpen && (
            <div className="overlay">
              <div className="overlay__background" onClick={onClose} />
              <div className="overlay__container">
                <div className="overlay__controls">
                  <button
                    className="overlay__close"
                    type="button"
                    onClick={onClose}
                  />
                </div>
                <h4 className="bottom-flex" >Create a New Obituary</h4>
                <form onSubmit={(e) => onFormSubmit(e)}>
                  <button onClick={handleFileClick} id="magic-button"><b><u>Please choose an image of the deceased</u></b></button>
                  <input id="image-input"
                    type="file" 
                    ref={onFileClicker}
                    required 
                    accept="image/*"
                    onChange={(e) => onFileChange(e)}
                    
                  />
                  <input id="upflexbox" 
                    type="text" 
                    required 
                    placeholder="Name of the deceased" 
                    onChange={(e) => setObitName(e.target.value)}
                  />
                  <div className="date-line">
                    <p className="date-line"><i>Born:  
                    <input 
                      id="datebox1"
                      //className="date-line"
                      type="datetime-local" 
                      onChange={(e) => setObitBirth(e.target.value)}
                    /></i></p>
                    <p className="date-line"><i>Died:
                    <input 
                      id="datebox2"
                      //className="date-line"
                      type="datetime-local" 
                      onChange={(e) => setObitDeath(e.target.value)}
                    /></i></p>
                  </div>
                  <input  className="bottom-flex-2"
                    type="submit" 
                    value="Create Obituary" 
                  />
                </form>
              </div>
            </div>
          )}
        </Fragment>
    );

}
