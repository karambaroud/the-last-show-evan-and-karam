import { useState, useEffect } from 'react';


function Obituary({image, name, born, died, biography, audio}) {

    const [bioIsActive, setBioActive] = useState(false);

    const toggleBio = () => {
        setBioActive(!bioIsActive);
    }

    const useAudio = (url) => {
      const [audio] = useState(new Audio(url));
      const [playing, setPlaying] = useState(false);

      const toggle = () => setPlaying(!playing);

      useEffect(() => {
        playing ? audio.play() : audio.pause();
      }, [playing]);

      useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
          audio.removeEventListener('ended', () => setPlaying(false));
        };
      }, []);

      return [playing, toggle];
    }; 
    
    const [playing, toggle] = useAudio(audio);

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
                    <button onClick={toggle}>{playing? <>&#10074;&#10074;</> : <>&#9658;</>}</button>
                </div>
            </div>
        </div>
    )
}

export default Obituary;
// &#10074;