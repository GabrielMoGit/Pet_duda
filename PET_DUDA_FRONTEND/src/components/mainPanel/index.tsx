import { Outlet, useNavigate } from "react-router-dom";
import { Container, Panel, PanelHeader, Content } from './styles'
import { GenericButton } from "../buttons/genericButton";



export function Layout() {
  const navigate = useNavigate();

  return (
    <Container>
      <Panel>
        <PanelHeader>Pet MK</PanelHeader>
        <GenericButton onClick={() => navigate("/home")}>Página inicial</GenericButton>
        <GenericButton onClick={() => navigate("/register")}>Registrar</GenericButton>
      </Panel>

      <Content>
        <Outlet /> {/* Aqui o conteúdo da rota vai aparecer */}
      </Content>
    </Container>
  );
}