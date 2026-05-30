import { Outlet, useNavigate } from "react-router-dom";
import { Container, SidePanel, SidePanelHeader, Content, PageContent, HamburgerButton, Overlay, MobileTopBar } from '../layout/styles'
import { MenuButton } from "../buttons/menuButton";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const [hasContent, setHasContent] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (path: string, content: boolean) => {
    navigate(path)
    setHasContent(content)
    setMenuOpen(false)
  }

   return (
    <Container>
      <MobileTopBar>
        <HamburgerButton onClick={() => setMenuOpen(true)}>☰</HamburgerButton>
        MK
      </MobileTopBar>

      <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />

      <SidePanel isOpen={menuOpen}>
        <SidePanelHeader>MK</SidePanelHeader>
        <MenuButton onClick={() => handleNavigate("/home", true)}>Página inicial</MenuButton>
        <MenuButton onClick={() => handleNavigate("/register", false)}>Cadastrar Tutor</MenuButton>
        <MenuButton onClick={() => handleNavigate("/petRegister", false)}>Cadastrar Pet</MenuButton>
        <MenuButton onClick={() => handleNavigate("/packageRegister", false)}>Cadastrar Pacote</MenuButton>
      </SidePanel>

      <Content>
        <PageContent hasContent={hasContent}>
          <Outlet/> 
        </PageContent>
      </Content>
    </Container>
  );
}