import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  width: 45%;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
  font-size: 30px;

  box-sizing: border-box;
  overflow-y: auto;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  p {
    margin: 0;
    word-break: break-word;
  }
`;