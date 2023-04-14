import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import Obituary from './Obituary';


function Obituaries({ obituaries, newID }) {
    return (
        <div className="obituaries">
            {obituaries.map((obituary) => (
              <div>
                <Obituary 
                  key = {obituary.id}
                  id = {obituary.id}
                  image = {obituary.image}
                  name = {obituary.name}
                  born = {obituary.born}
                  died = {obituary.died}
                  biography = {obituary.biography}
                  audio = {obituary.audio}
                  newID = {newID}
                />
              </div>
            ))}
        </div>
    );
}

export default Obituaries;