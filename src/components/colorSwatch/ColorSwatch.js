import React from 'react';

function ColorSwatch(props) {

	function buildBackgroundColorStyle(colorObj) {
	  return {
	    "backgroundColor": "rgb(" + colorObj.r + "," + colorObj.g + "," + colorObj.b + ")"
	  }
	}

  return (
    <article className="color-swatch" 
			       style={buildBackgroundColorStyle(props.color)}>
    </article>
  );
}

export default ColorSwatch;