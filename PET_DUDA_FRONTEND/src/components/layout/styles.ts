import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SidePanel = styled.div`
  width: 200px;
  background-color: #000000;
  padding: 10px;
  display: flex;
  flex-direction: column;  
  gap: 10px;               

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    gap: 5px;
  }
`;

export const SidePanelHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;    
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 0;
    width: 100%;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-image: url("/LightBackground.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

type PageContentProps = {
  hasContent: boolean
}
 
export const PageContent = styled.div<PageContentProps>`
  width: 93%;
  padding: 20px;
  height: 87%;
  margin-top: 25px;
  margin-left: 25px;
  background-color: ${({ hasContent }) => 
    hasContent  
      ? "rgba(142, 140, 140, 0.0)"
      : "rgba(142, 140, 140, 0.4)"};

  ${({ hasContent }) =>
    !hasContent &&
    `
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    `
  }

  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    padding: 10px;
    height: auto;
  }
`;