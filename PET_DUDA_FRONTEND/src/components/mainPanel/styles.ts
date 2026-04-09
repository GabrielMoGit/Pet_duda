import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Panel = styled.div`
  width: 200px;
  background-color: #cf7814;
  padding: 20px;
  display: flex;
  flex-direction: column;  /* coluna: topo -> baixo */
  gap: 10px;               /* espaço entre itens */
`;

export const PanelHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;    /* espaço entre o texto e os botões */
  color: #fff;
  text-align: center;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;