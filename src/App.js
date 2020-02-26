import React, { Component } from 'react';
import ReactDom from 'react-dom';
import t1 from './t1.jpg';
import t2 from './t2.jpg';
import t3 from './t3.jpg';
import t4 from './t4.jpg';
import t5 from './t5.jpg';
import t6 from './t6.jpg';
import t7 from './t7.jpg';
import t8 from './t8.jpg';
import t9 from './t9.jpg';
import './App.css';

class App extends Component {

  images = [t1, t2, t3, t4, t5, t6, t7, t8, t9];
  randnums = [];

  drag = (ev) => {
    ev.target.id = "snippet";
  };

  allowDrop = (ev) => {
    ev.preventDefault();
  }

  drop = (ev) => {
    ev.preventDefault();
    var src = ReactDom.findDOMNode(document.getElementById("snippet"));
    src.id = "";
    if (ev.currentTarget.childElementCount > 0) {
      ev.currentTarget.innerHTML = "";
    }
    var tempsrc = src.cloneNode(true);
    tempsrc.draggable = false;
    ev.currentTarget.appendChild(tempsrc);
    ev.preventDefault();
  };

  randomElems = () => {
    while (this.randnums.length < 9) {
      var r = Math.floor(Math.random() * 9);
      if (this.randnums.indexOf(r) === -1) this.randnums.push(r);
    }
    return this.randnums.map(index => (
      <img key={this.images[index] + index + "img"} src={this.images[index]} alt={"image" + index} draggable="true" onDragStart={this.drag}></img>
    ));

  };
  randomDivs = () => {
    return this.randnums.map(index => (
      <div key={this.images[index] + index} onDragOver={this.allowDrop} onDrop={this.drop}>
      </div>
    ));
  };

  checkPuzzle = () => {
    var childdivs = ReactDom.findDOMNode(document.getElementById("puzzle")).getElementsByTagName("div");
    var finpuzzle = true;
    var puzzlecorrect = true;

    for (var i = 0; i < childdivs.length; i++) {
      if (childdivs[i].firstChild === null) {
        finpuzzle = false;
      } else {
        if (childdivs[i].firstChild.alt !== ("image" + i)) {
          puzzlecorrect = false;
        }
      }
    }

    if (finpuzzle === true && puzzlecorrect === true) {
      for (var i = 0; i < childdivs.length; i++) {
        childdivs[i].style.outline = "none";
        setTimeout(() => {
          ReactDom.findDOMNode(document.getElementById("done")).style.display = "block";
        },1000);
      }
    } else {
      ReactDom.findDOMNode(document.getElementById("tryagain")).style.display = "block";
      setTimeout(() => {
        ReactDom.findDOMNode(document.getElementById("tryagain")).style.display = "none";
      }, 2000);
    }

  };

  render() {
    return (
      <div className="App">
        <h2 id="done" className="done">Well Done!</h2>
        <h2 id="tryagain" className="tryagain">Try Again</h2>
        <div className="imagegrid">
          {this.randomElems()}
        </div>
        <div className="puzzlegrid" id="puzzle">
          {this.randomDivs()}
        </div>
        <button className="check" onClick={this.checkPuzzle}>Check</button>
      </div>
    );
  }
}

export default App;
