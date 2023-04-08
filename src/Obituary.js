import { useState } from 'react';


function Obituary({image, name, born, died, biography}) {
    // const [image, setImage] = useState(null);
    // const [name, setName] = useState("");
    // const [born, setBorn] = useState("");
    // const [died, setDied] = useState("");

    // function toggleBio() {
    //     const bio = document.getElementsByClassName("bio");
    // }
    const [bioIsActive, setBioActive] = useState(false);

    const toggleBio = () => {
        setBioActive(!bioIsActive);
    }

    return (
        <div className="obituary">
            <img className="image" src={image} alt="obituary" onClick={toggleBio}/>
            <div className="nameAndDates" onClick={toggleBio}>
                <h3>{name}</h3>
                <h5>{born} - {died}</h5>
            </div>
            <div className={bioIsActive ? "bioAndPlay" : "hidden"}>
                <p className="bio">{biography}</p>

                <div className="playButton">
                    <button>&#9658;</button>
                </div>
            </div>
        </div>
    )
}

export default Obituary;