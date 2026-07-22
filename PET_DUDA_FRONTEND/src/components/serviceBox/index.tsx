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
  service_done: number;
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
  service_done,
  date,
  service_type,
  pet,
  tutor,
  phone,
  pkg_description,
}: AppointmentCardProps) {
  const [serviceDone, setServiceDone] = useState(service_done);
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
          $status={serviceDone === 1 ? "success" : "warning"}
          onClick={() => {
            const newStatus = serviceDone === 1 ? 0 : 1;
            setServiceDone(newStatus);
            alterServiceDoneStatus(id);
          }}
        >
          {serviceDone === 1 ? "Finalizado ✓" : "Marcar como concluído"}
        </ServiceButton>
      </Card>
    </div>
  );
}
