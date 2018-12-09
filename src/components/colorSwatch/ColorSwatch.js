import React from 'react';

function ColorSwatch(props) {

	function buildBackgroundColorStyle(colorObj) {
	  return {
	    "backgroundColor": "rgb(" + colorObj.r + "," + colorObj.g + "," + colorObj.b + ")"
	  }
	}
  function fullColorHex(r,g,b) {   
    let red = rgbToHex(r);
    let green = rgbToHex(g);
    let blue = rgbToHex(b);
    return red+green+blue;
  };
  function rgbToHex(rgbVal) { 
    let hex = Number(rgbVal).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };
  // Used to determine whether to black or white for .color-swatch-inner text
  function getContrastColorStyle(r,g,b) {
    let luminanceRatio = calculateLuminance(r,g,b);
    if (luminanceRatio >= 128) {
      return {color: "black"}
    } else {
      return {color: "white"}
    }
  }
  function calculateLuminance(r,g,b) {
    // R:30% G:59% B:11% ratios for luminance per https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors#answer-9733420
    let redRatio = .30;
    let greenRatio = .59;
    let blueRatio = .11;
    console.log((r * redRatio) + (g * greenRatio) + (b * blueRatio));
    return (r * redRatio) + (g * greenRatio) + (b * blueRatio);
  }

  return (
    <article className="color-swatch" 
			       style={buildBackgroundColorStyle(props.color)}>
      <aside className="color-swatch-inner" style={getContrastColorStyle(props.color.r, props.color.g, props.color.b)}>
        <p>{props.color.r + "," + props.color.g + "," + props.color.b}</p>
        <p>{"#" + fullColorHex(props.color.r, props.color.g, props.color.b)}</p>
      </aside>
    </article>
  );
}

export default ColorSwatch;

// R:30% G:59% B:11%