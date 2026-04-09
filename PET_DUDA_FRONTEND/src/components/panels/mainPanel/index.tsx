import { Outlet, useNavigate } from "react-router-dom";
import { Container, Panel, PanelHeader, Content, PageContent } from './styles'
import { GenericButton } from "../../buttons/genericButton";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();
  const [hasContent, setHasContent] = useState(true)

  return (
    <Container>
      <Panel>
        <PanelHeader>Pet MK</PanelHeader>
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
      </Panel>

      <Content>
        <PageContent hasContent={hasContent}>
          <Outlet/> 
        </PageContent>
      </Content>
    </Container>
  );
}