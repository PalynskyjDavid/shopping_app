import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import CartTableList from "./bricks/CartTableList";
import ItemListFind from "./bricks/ItemListFind";
import { useState } from "react";
import Icon from '@mdi/react';
import { mdiCircleDouble } from '@mdi/js';
import { mdiCircleSlice8 } from '@mdi/js';
import { mdiPlusCircleOutline } from '@mdi/js';
import { mdiArrowLeftBoldOutline } from '@mdi/js';
import { mdiCogOutline } from '@mdi/js';
import { mdiMagnify } from '@mdi/js';

const cartList = [
  {
    "Id": "cartsid2",
    "UserId": "usersid2",
    "Name": "Pancakes",
    "TotalPrice": "4",
    "Availability": "1"
  },
  {
    "Id": "cartsid3",
    "UserId": "usersid3",
    "Name": "Dairy",
    "TotalPrice": "3.7",
    "Availability": "1"
  }
];

const info = {
  place: "Praha 9",
  from: "8:40",
  to: "18:30"
}


function App() {

  const [expand, setExpand] = useState(false);
  const [inputText, setInputText] = useState("");

  function inputHandler() {
   /* console.log(document.getElementById("input").value);
    let input = document.getElementById("input").value;
    if (input) {
      var lowerCase = input.toLowerCase();
      setInputText(lowerCase);
    }
    else { setInputText(""); } */
  };

  return (
    <div className="App">

      <div className="header">
        <Icon path={mdiArrowLeftBoldOutline} size={2} />
        <div>
          <Icon path={mdiMagnify} size={2} />
          <input id="input" onInput={inputHandler()}></input>
        </div>
        <Icon path={mdiCogOutline} size={2} />
      </div>


      {expand ?
        <div>
          <Icon path={mdiPlusCircleOutline} size={2} />
          <Icon path={mdiCircleDouble} size={2} onClick={() => setExpand(!expand)} />
          <CartTableList cartList={cartList} />
        </div>
        :
        <div>
          <Icon path={mdiPlusCircleOutline} size={2} />
          <Icon path={mdiCircleSlice8} size={2} onClick={() => setExpand(!expand)} />
        </div>
      }


      <div>
        {inputText}
        <ItemListFind input={inputText} />
      </div>



      <div className="showcase">
        <div>
          a
        </div>
        <div>
          b
        </div>
        <div>
          c
        </div>
      </div>



      <div className="footer">
        {info.from + " - " + info.to + " " + info.place}
      </div>
    </div>
  );
}

export default App;
