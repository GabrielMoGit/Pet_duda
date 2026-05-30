import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
`;

export const SidePanel = styled.div<{ isOpen: boolean }>`
  width: 200px;
  background-color: #000000;
  padding: 10px;
  display: flex;
  flex-direction: column;  
  gap: 10px;               

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
    height: 100vh;
    z-index: 100;
    transition: left 0.3s ease;
    width: 220px;
  }
`;

export const SidePanelHeader = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;    
  color: #fff;
  text-align: center;
`;

export const MobileTopBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    background-color: #000;
    padding: 5px 10px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
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
    width: 95%;
    margin: 0;
    padding: 10px;
    height: auto;
  }
`;