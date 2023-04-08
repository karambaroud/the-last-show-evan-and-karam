import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import Obituary from './Obituary';


function Obituaries() {
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