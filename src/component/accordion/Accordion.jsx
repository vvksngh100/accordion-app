import React, { useState } from "react";
import data from "./data.js";
import "./style.css";

export default function Accordion() {
  const [singleSelect, setSingleSelect] = useState(null);
  const [enableMultiSelection, setEnableMultiSelecton] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);
  const [spanValue, setSpanValue] = useState([]);

  // selection method
  function handleSingleSelection(currentId) {
    let toggle = document.querySelector(".toggle1");
    let span = document.querySelector(`.span${currentId}`);
    if (enableMultiSelection) {
      let copyMultiSelect = [...multiSelect];
      let copySpanValue = [...spanValue];
      if (copyMultiSelect.indexOf(currentId) === -1) {
        copyMultiSelect.push(currentId);
        copySpanValue.push(span);
        span.innerHTML = '-';
      } else {
        let currentIndex = copyMultiSelect.indexOf(currentId);
        copyMultiSelect.splice(currentIndex, 1);
        span.innerHTML = '+';
        let crntSpanIndex = copySpanValue.indexOf(span);
        console.log(crntSpanIndex);
        copySpanValue.splice(crntSpanIndex,1);
      }
      setMultiSelect(copyMultiSelect);
      setSpanValue(copySpanValue);
    } else {
      setSingleSelect(currentId === singleSelect ? null : currentId);
      if(spanValue.length == 0){
        span.innerHTML = '-';
        setSpanValue([span]);
      }
      else{
        if(currentId === singleSelect){
          span.innerHTML = '+';
        }
        else{
        spanValue[0].innerHTML = '+';
        span.innerHTML = '-';
        setSpanValue([span]);
        }
      }
    }
  }
  // Handle Toggle Button

  function handleToggleButton() {
    let toggle = document.querySelector(".toggle1");
    let toggleText = document.querySelector(".toggle-text");
    toggle.classList.toggle("active");
    if (toggle.classList.contains("active")) {
      toggleText.innerHTML = `Disable Multi-Selection`;
      setEnableMultiSelecton(true);
      setSingleSelect(null);
    } else {
      toggleText.innerHTML = `Enable Multi-Selection`;
      setEnableMultiSelecton(false);
      setMultiSelect([]);
    }
    if(spanValue.length > 0){
      spanValue.map(e => {
        e.innerHTML = '+';
      });
      setSpanValue([]);
    }
  }

  return (
    <div className="container">
      <div className="toggle">
        <div className="toggle-text">Enable Multi-Selection</div>
        <div className="toggle1">
          <div
            className="toggle-button"
            onClick={() => handleToggleButton()}
          ></div>
        </div>
      </div>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div className="item">
              <div
                onClick={() => handleSingleSelection(item.id)}
                className="title"
              >
                <h3>{item.question}</h3>
                <span className={"span" + item.id}>+</span>
              </div>
              {enableMultiSelection ? (
                multiSelect.indexOf(item.id) !== -1 && (
                  <div className="content">{item.answer}</div>
                )
              ) : singleSelect === item.id ? (
                <div className="content">{item.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div> No Data Found ! </div>
        )}
      </div>
    </div>
  );
}
