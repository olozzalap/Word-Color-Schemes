import React, { Component } from 'react';

import ColorSwatch from '../colorSwatch/ColorSwatch'
import colorWordsDict from '../../colorWordsDict.js';

class App extends Component {
  constructor(props) {
    console.log(colorWordsDict);
    super(props);
    this.state = {
      numColorFactors: 3,
      colorFactorMaxValue: 256,
      colors: [
        // {
        //   r: 233,
        //   g: 21,
        //   b: 188
        //   id: "#1-233,21,188"
        // }
      ],
      seedText: "",
      seedTextHash: "",
      numColors: 1,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  generateRand8BitInt() {
    return Math.floor(Math.random() * this.state.colorFactorMaxValue);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit() {
    let newColors = [];
    let randSeeds = this.createRandSeeds();
    console.log(randSeeds);
    let dictMacthingRules = this.findDictMatches();
    // shuffles the matching rules into a random order so "aqua cherry" won't always return a blueish color followed by a red one
    dictMacthingRules.sort(function() { return 0.5 - Math.random() });
    console.log(dictMacthingRules);
    for (let i = 0; i < this.state.numColors; i++) {
      let color = {};
      let randSeedIndex = i * this.state.numColorFactors;
      if (dictMacthingRules[i]) {
        color.r = (randSeeds[randSeedIndex] % (dictMacthingRules[i].rMax - dictMacthingRules[i].rMin)) + dictMacthingRules[i].rMin;
        color.g = (randSeeds[randSeedIndex + 1] % (dictMacthingRules[i].gMax - dictMacthingRules[i].gMin)) + dictMacthingRules[i].gMin;
        color.b = (randSeeds[randSeedIndex + 2] % (dictMacthingRules[i].bMax - dictMacthingRules[i].bMin)) + dictMacthingRules[i].bMin;
      }
      else {
        color.r = randSeeds[randSeedIndex] % this.state.colorFactorMaxValue;
        color.g = randSeeds[randSeedIndex + 1] % this.state.colorFactorMaxValue;
        color.b = randSeeds[randSeedIndex + 2] % this.state.colorFactorMaxValue;
      }
      color.id = "#" + (i + 1) + "-" + color.r + "," + color.g + "," + color.b;
      newColors.push(color);
    }
    this.setState({colors: newColors});
  }
  createRandSeeds() {
    let returnSeeds = [];
    for (let i = 0; i < this.state.numColors * this.state.numColorFactors; i++) {
      let seed = 1;
      for (let j = 0; j < this.state.seedText.length * this.state.numColorFactors; j++) {
        // console.log(this.state.seedText[Math.floor(Math.random() * this.state.seedText.length)]);
        seed += Math.floor((Math.random() * 27) + 1) * this.state.seedText.charCodeAt(Math.floor(Math.random() * this.state.seedText.length));
        // console.log(seed);
      }
      returnSeeds.push(seed);
    }
    return returnSeeds;
  }
  findDictMatches() {
    let matchingRules = [];
    let matchingEntries = colorWordsDict.filter((entry, i) => {
      for (let i = 0; i < entry.matches.length; i++) {
        if (this.state.seedText.indexOf(entry.matches[i]) >= 0) {
          matchingRules = matchingRules.concat(entry.rules);
          return true;
        }
      }
    })
    // console.log(matchingEntries, matchingRules);
    return matchingRules;
  }

  render() {
    return (
      <main>
        <section className="color-swatches">
          {this.state.colors.map((color, i) => {
            return <ColorSwatch color={color} key={color.id}></ColorSwatch>
          })}
        </section>
        <section className="color-input">
          <label>Describe your color palette: 
            <textarea value={this.state.seedText} onChange={this.handleChange} name="seedText"/>
          </label>
          <br />
          <label>How many colors: 
            <input type="number" value={this.state.numColors} onChange={this.handleChange} name="numColors" min="1" max="6"/>
          </label>
          <label>Generate
            <input type="submit" onClick={this.handleSubmit}/>
          </label>
        </section>
      </main>
    );
  }
}

export default App;
