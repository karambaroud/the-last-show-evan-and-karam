import { useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormattedDate from "./FormattedDate";
import { currentDate } from "./utils";
import Empty from "./Empty";


export default function Customize({ edit }) {
    let { obituaryID } = useParams();
    obituaryID -= 1;
    const [obituaries, addObituary, deleteObituary] = useOutletContext();
    let currentObituary = { Name: "", birth: "", death: "", img: ""};
    if(obituaryID >=0 && obituaries.length > obituaryID) {
        currentObituary = obituaries[obituaryID];
    }
    const [obitName, setObitName] = useState("");
    const [obitBirth, setObitBirth] = useState("");
    const [obitDeath, setObitDeath] = useState("");
    const [img, setObitImg] = useState("");
    const [id, setId] = useState("");

    // useEffect hook changes all state variables when the currentObit changes.
    useEffect(() => {
        setObitName(currentObituary.Name);
        if (currentObituary.birth) {
            setObitBirth(currentObituary.birth);
        } else {
            setObitBirth(currentDate());
        }
        if(currentObituary.death) {
            setObitDeath(currentObituary.death);
        } else {
            setObitDeath(currentDate());
        }
        setObitImg(currentObituary.img);
        setId(currentObituary.id);
    }, [currentObituary]);

    return (

        <>
          
                <div>

                    hello
                </div>



        
        </>
       
    )
    

}