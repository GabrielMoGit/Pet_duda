import { useState } from "react";
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
  id: number;
  date: string;
  service_type: string;
  pet: string;
  tutor: string;
  phone: string;
  pkg_description?: string;
}

export function AppointmentCard({
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
          <Info>{"pacote: " + id}</Info>
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
          onClick={() => setServiceDone(serviceDone === true ? false : true)}
        >
          {serviceDone === true ? "Finalizado ✓" : "Marcar como concluído"}
        </ServiceButton>
      </Card>
    </div>
  );
}
