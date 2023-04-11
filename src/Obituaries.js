import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import Obituary from './Obituary';


function Obituaries({ obituaries }) {
    return (
        <div className="obituaries">
            {obituaries.map((obituary) => (
                <Obituary 
                  key = {uuidv4()}
                  image = {obituary.image}
                  name = {obituary.name}
                  born = {obituary.born}
                  died = {obituary.died}
                  biography = {obituary.biography}
                />
            ))}
        </div>
    );
}

export default Obituaries;