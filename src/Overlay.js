import { Fragment, useState, useEffect } from "react";
import { currentDate } from "./utils";
import "./Overlay.css";
//import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import App from "./App.js";
import React from 'react';

const options = {
  year: "numeric",
  month: "long",
  day: "numeric"
};

export default function Overlay({ isOpen, onClose, obituaries, setCurrentObiturary, setObituaries, setIsOpen, setNewID }) {
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
    const [fileName, setFileName] = useState("");
    const [id, setId] = useState("");
    const [disabled, setDisabled] = useState(false);

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

    const dealWith = () => {
      currentObituary.Name = obitName;
      saveObituary(currentObituary, obitID);
    }

    function addObituary(id, json) {
      setObituaries([
        {
          id : id,
          image : json.image,
          name : obitName,
          born : obitBirth,
          died : obitDeath,
          biography: json.biography,
          audio: json.audio
        },
        ...obituaries,
      ]);
      
      setNewID(id);
      setIsOpen(!isOpen);
      setFileName("");
      navigate(`Obituaries`);
    }

    const onFileChange = (e) => {
      setObitImg(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }

    const onFormSubmit = async (e) => {
      e.preventDefault();
      setDisabled(true);
    
      console.log(obitName, obitBirth, obitDeath, img);
  
      const id = uuidv4();
      const data = new FormData();
      
      data.append("id", id);
      data.append("name", obitName);
      data.append("born", obitBirth);
      data.append("died", obitDeath);
      data.append("file", img);
  
      const res = await fetch("https://doqngru7cfa4uos7h3i3xo6y4e0ncwxy.lambda-url.ca-central-1.on.aws/", {
          method: "POST",
          body: data,  
      });
  
      console.log(res)

      if(res.status == 200) {
        const jsonRes = await res.json();
        console.log(jsonRes);
        addObituary(id, jsonRes);
      }
      else {
        console.log(res);
        const jsonRes = await res.json();
        console.log(jsonRes);
      }
      setDisabled(false);
    }

    const onFileClicker = React.useRef(null);

    const handleFileClick = (e) => {
      onFileClicker.current.click();
    }

    function handleObitBirth(date) {
      const born = new Date(date);
      setObitBirth(born.toLocaleDateString(undefined, options))
    }

    function handleObitDeath(date) {
      const died = new Date(date);
      setObitDeath(died.toLocaleDateString(undefined, options))
    }

    function handleCloseMenu() {
      onClose();
      setFileName("");
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
                    onClick={handleCloseMenu}
                  />
                </div>
                <h4 className="bottom-flex" >Create a New Obituary</h4>
                <form onSubmit={(e) => onFormSubmit(e)}>
                  <div id="wrapper">
                    <button onClick={handleFileClick} id="magic-button"><b><u>Please choose an image of the deceased{fileName !== "" ? ` (${fileName})` : ""}</u></b></button>
                    <input id="image-input"
                      type="file" 
                      ref={onFileClicker}
                      required 
                      accept="image/*"
                      onChange={(e) => onFileChange(e)}
                    />
                  </div>
                  <div id="maintextbox">
                    <input id="upflexbox" 
                      type="text" 
                      required 
                      placeholder="Name of the deceased" 
                      onChange={(e) => setObitName(e.target.value)}
                    />
                  </div>
                  <div className="date-line">
                    <p className="date-line"><i>Born:  
                    <input 
                      id="datebox1"
                      //className="date-line"
                      required
                      type="date" 
                      onChange={(e) => handleObitBirth(e.target.value)}
                    /></i></p>
                    <p className="date-line"><i>Died:
                    <input 
                      id="datebox2"
                      //className="date-line"
                      required
                      type="date" 
                      onChange={(e) => handleObitDeath(e.target.value)}
                    /></i></p>
                  </div>
                  <div id="bottomwrapper">
                    <input  className={`bottom-flex-2 ${disabled? "disabled" : ""}`}
                      disabled={disabled}
                      type="submit" 
                      value={`${disabled? "Please wait..." : "Create Obituary"}`}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </Fragment>
    );

}
