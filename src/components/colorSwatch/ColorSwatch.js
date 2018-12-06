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

  return (
    <article className="color-swatch" 
			       style={buildBackgroundColorStyle(props.color)}>
      <aside className="color-swatch-inner">
        <p>{props.color.r + "," + props.color.g + "," + props.color.b}</p>
        <p>{"#" + fullColorHex(props.color.r, props.color.g, props.color.b)}</p>
      </aside>
    </article>
  );
}

export default ColorSwatch;