import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

import "tailwindcss/tailwind.css";

class Hello extends React.Component {
  render() {
    const PopupPadded = styled.div`
      min-width: 350px;
      min-height: 500px;
      background-color: #2c272e;
      display: flex;
      flex-direction: column;

      border: 0.15em solid #fff3e4;

      div {
        flex-grow: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      div > h1 {
        flex-shrink: 1;
        margin-top: auto;
        margin-bottom: auto;
        font-size: 22px;
        overflow-wrap: break-word;
      }

      div:first-child > h1 {
        color: #94b3fd;
      }

      div:nth-child(3) > h1 {
        color: #eeebdd;
      }
    `;
    return (
      <PopupPadded className="popup-padded">
        <div>
          <h1>Hello, World!</h1>
        </div>
        <div>
          <h1 className="text-blue-400">Tailwind Enabled if text is blue.</h1>
        </div>
        <div>
          <h1>Happy Reading!</h1>
        </div>
      </PopupPadded>
    );
  }
}

// --------------

ReactDOM.render(<Hello />, document.getElementById("is-in-library"));

console.log("good");
