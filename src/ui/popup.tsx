import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

import "tailwindcss/tailwind.css";

class Hello extends React.Component {
  render() {
    const PopupPadded = styled.div`
      width: 30vw;
      height: 40vh;

      h1:first-child {
        color: blueviolet;
      }
    `;
    return (
      <PopupPadded className="popup-padded">
        <h1>Hello, World!</h1>
        <h1 className="text-blue-500">Tailwind Enabled if text is blue.</h1>
      </PopupPadded>
    );
  }
}

// --------------

ReactDOM.render(<Hello />, document.getElementById("is-in-library"));

console.log("good");
