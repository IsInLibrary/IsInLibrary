import styled from "styled-components";

export const PopupPadded = styled.div`
  min-width: 300px;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  > div {
    flex: 1 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: calc(400px / 3);
  }
  > div > h1 {
    flex-shrink: 1;
    margin-top: auto;
    margin-bottom: auto;
    font-size: 22px;
    overflow-wrap: break-word;
  }

  > div:first-child > h1 {
    color: #94b3fd;
  }

  .MuiSelect-select.MuiSelect-outlined.MuiSelect-multiple.MuiOutlinedInput-input.MuiInputBase-input {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .select-box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;
