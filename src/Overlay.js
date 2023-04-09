import { Fragment } from "react";
import "./Overlay.css";
//import { useOutletContext, useParams, Link } from "react-router-dom";


export default function Overlay({ isOpen, onClose, children }) {
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
                <input></input>
                <p><i>Born:</i></p>
                <input type="datetime-local" />
                <p><i>Died:</i></p>
                <input type="datetime-local" />
                <button>Write Obituary</button>
              </div>
            </div>
          )}
        </Fragment>
    );

}
