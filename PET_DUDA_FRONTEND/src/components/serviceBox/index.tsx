import { useState } from "react";
import { api } from "../../services/api";
import {
  Card,
  Header,
  Info,
  Badge,
  Footer,
  PetInfo,
  PetName,
  Tutor,
  Phone,
  Icon,
  Description,
  ServiceButton,
} from "./style";

interface AppointmentCardProps {
  package_id: number;
  id: number;
  date: string;
  service_type: string;
  pet: string;
  tutor: string;
  phone: string;
  pkg_description?: string;
}

async function alterServiceDoneStatus(service_id: number) {
  try {
    await api.patch("/alterServiceDoneStatus", {
      service_id: service_id,
    });
  } catch (err) {
    console.error("Erro ao alterar status do serviço", err);
  }
}

export function AppointmentCard({
  package_id,
  id,
  date,
  service_type,
  pet,
  tutor,
  phone,
  pkg_description,
}: AppointmentCardProps) {
  const [serviceDone, setServiceDone] = useState(false);
  return (
    <div style={{ marginBottom: "5px" }}>
      <Card $status={serviceDone ? "success" : "warning"}>
        <Header>
          <Info>{"pacote: " + package_id}</Info>
          <Info>{date}</Info>
        </Header>

        <Badge>{service_type}</Badge>

        <div style={{ display: pkg_description !== "" ? "block" : "none" }}>
          <Description>{pkg_description}</Description>
        </div>

        <Footer>
          <PetInfo>
            <PetName>{pet}</PetName>
            <Tutor>Tutor(a): {tutor}</Tutor>
          </PetInfo>

          <Phone>
            <Icon></Icon>
            {phone}
          </Phone>
        </Footer>
        <br />
        <ServiceButton
          $status={serviceDone === true ? "success" : "warning"}
          onClick={() => {
            setServiceDone(serviceDone === true ? false : true);
            alterServiceDoneStatus(id);
            console.log(id);
          }}
        >
          {serviceDone === true ? "Finalizado ✓" : "Marcar como concluído"}
        </ServiceButton>
      </Card>
    </div>
  );
}
