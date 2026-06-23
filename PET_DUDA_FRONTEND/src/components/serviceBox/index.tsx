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
} from "./style";

interface AppointmentCardProps {
  id: number;
  date: string;
  service_type: string;
  pet: string;
  tutor: string;
  phone: string;
}

export function AppointmentCard({
  id,
  date,
  service_type,
  pet,
  tutor,
  phone,
}: AppointmentCardProps) {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Card>
        <Header>
          <Info>{"pacote: " + id}</Info>
          <Info>{date}</Info>
        </Header>

        <Badge>{service_type}</Badge>

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
      </Card>
    </div>
  );
}
