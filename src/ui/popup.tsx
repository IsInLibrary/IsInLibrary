import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

class Hello extends React.Component {
  render() {
    const PopupPadded = styled.div`
      min-width: 20vw;
      min-height: 40vh;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 10px;
      padding-right: 10px;

      h1 {
        color: blueviolet;
      }
    `;
    return (
      <PopupPadded className="popup-padded">
        <h1>Hello, World!</h1>
      </PopupPadded>
    );
  }
}

// --------------

ReactDOM.render(<Hello />, document.getElementById("is-in-library"));
