import styled from "styled-components";

export const PopupPadded = styled.div`
  min-width: 350px;
  min-height: 600px;
  background-color: #2c272e;
  display: flex;
  flex-direction: column;

  border: 0.15em solid #fff3e4;

  div {
    flex: 1 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
    min-width: calc(600px / 3);
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
`;
