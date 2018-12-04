import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
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
    console.log(e.target.value, e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit() {
    let randSeeds = [];
    for (let i = 0; i < this.state.numColors * this.state.numColorFactors; i++) {
      let seed = 1;
      for (let j = 0; j < this.state.seedText.length * this.state.numColorFactors; j++) {
        // console.log(this.state.seedText[Math.floor(Math.random() * this.state.seedText.length)]);
        seed += Math.floor((Math.random() * 27) + 1) * this.state.seedText.charCodeAt(Math.floor(Math.random() * this.state.seedText.length));
        // console.log(seed);
      }
      randSeeds.push(seed);
    }
    console.log(randSeeds);

    let newColors = [];
    for (let i = 0; i < this.state.numColors; i++) {
      let color = {};
      let randSeedIndex = i * this.state.numColorFactors;
      color.r = randSeeds[randSeedIndex] % this.state.colorFactorMaxValue;
      color.g = randSeeds[randSeedIndex + 1] % this.state.colorFactorMaxValue;
      color.b = randSeeds[randSeedIndex + 2] % this.state.colorFactorMaxValue;
      color.id = "#" + (i + 1) + "-" + color.r + "," + color.g + "," + color.b;
      newColors.push(color);
    }
    this.setState({colors: newColors});
  }
  buildBackgroundColorStyle(colorObj) {
    return {
      "backgroundColor": "rgb(" + colorObj.r + "," + colorObj.g + "," + colorObj.b + ")"
    }
  }

  render() {
    return (
      <main>
        <div className="color-swatches">
          {this.state.colors.map((color, i) => {
            return <article className="color-swatch" 
                            style={this.buildBackgroundColorStyle(color)}
                            key={color.id}>
                   </article>
          })}
        </div>
        <input type="textarea" value={this.state.seedText} onChange={this.handleChange} name="seedText"/>
        <input type="number" value={this.state.numColors} onChange={this.handleChange} name="numColors" min="1" max="6"/>
        <input type="submit" onClick={this.handleSubmit}/>
      </main>
    );
  }
}

export default App;
