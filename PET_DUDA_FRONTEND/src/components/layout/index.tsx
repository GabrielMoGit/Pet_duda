import { Outlet, useNavigate } from "react-router-dom";
import { Container, SidePanel, SidePanelHeader, Content, PageContent } from '../layout/styles'
import { GenericButton } from "../buttons/genericButton";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const [hasContent, setHasContent] = useState(true)

  return (
    <Container>
      <SidePanel>
        <SidePanelHeader>MK</SidePanelHeader>
        <GenericButton onClick={() => {
          navigate("/home")
          setHasContent(true)
          }}>Página inicial</GenericButton>
        <GenericButton onClick={() => {
          navigate("/register")
          setHasContent(false)
          }}>Cadastrar Tutor</GenericButton>
          <GenericButton onClick={() => {
          navigate("/petRegister")
          setHasContent(false)
          }}>Cadastrar Pet</GenericButton>
      </SidePanel>

      <Content>
        <PageContent hasContent={hasContent}>
          <Outlet/> 
        </PageContent>
      </Content>
    </Container>
  );
}