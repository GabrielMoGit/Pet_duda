import { Outlet, useNavigate } from "react-router-dom";
import { Container, SidePanel, SidePanelHeader, Content, PageContent } from '../layout/styles'
import { MenuButton } from "../buttons/menuButton";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const [hasContent, setHasContent] = useState(true)

  return (
    <Container>
      <SidePanel>
        <SidePanelHeader>MK</SidePanelHeader>
        <MenuButton onClick={() => {
          navigate("/home")
          setHasContent(true)
          }}>Página inicial</MenuButton>
        <MenuButton onClick={() => {
          navigate("/register")
          setHasContent(false)
          }}>Cadastrar Tutor</MenuButton>
          <MenuButton onClick={() => {
          navigate("/petRegister")
          setHasContent(false)
          }}>Cadastrar Pet</MenuButton>
      </SidePanel>

      <Content>
        <PageContent hasContent={hasContent}>
          <Outlet/> 
        </PageContent>
      </Content>
    </Container>
  );
}