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
  min-height: 0;
  background-image: url("/background.webp");
  background-size: cover;    
  background-position: center; 
  background-repeat: no-repeat; 
`;

export const PageContent = styled.div`
  width: 98%;
  padding: 20px;
  height: 95%;
  background-color: rgba(142, 140, 140, 0.4);
  border-radius: 10px
`