import {
  Card,
  Header,
  PackageId,
  Badge,
  InfoSection,
  Label,
  Value,
  ServicesContainer,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  Footer,
  Price,
  CopyMessageButton,
} from "./styles";

interface Service {
  service_id: number;
  service_date: Date;
  service_done: number;
}

interface PackageCardProps {
  id: number;
  tutor: string;
  pet: string;
  phone: string;
  type: string;
  description: string;
  address: string;
  services: Service[];
  done: number;
  value: string;
  paid: number;
  reference_date: Date;
}

const serviceStatus = "";

function FormatDateForCard(date: string) {
  const transformeToDateType = new Date(date);

  const formattedDate = transformeToDateType.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedHour = transformeToDateType.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const finalFormat = formattedDate + " - " + formattedHour;

  return finalFormat;
}

function textToSend(
  pet_name: string,
  services: Service[],
  next_package_date: string | Date,
  value: string,
) {
  const date = new Date(next_package_date);
  const hourAndWeekDay = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
  const message = `
    Vindas ${pet_name} (${hourAndWeekDay})
  `;

  return message;
}

export function PackageCard({
  id,
  tutor,
  pet,
  phone,
  type,
  description,
  address,
  services,
  done,
  value,
  paid,
  reference_date,
}: PackageCardProps) {
  return (
    <div>
      <Card>
        <div></div>
        <Header>
          <PackageId>Pacote #{id}</PackageId>

          <div style={{ display: "flex", gap: "5px" }}>
            <CopyMessageButton
              $visible={done === 1}
              onClick={() =>
                navigator.clipboard.writeText(
                  textToSend("kiara", services, reference_date, "150,00"),
                )
              }
            >
              Mensagem
            </CopyMessageButton>
            <Badge $status={done ? "success" : "warning"}>
              {done ? "finalizado" : "Em andamento"}
            </Badge>
          </div>
        </Header>

        <InfoSection>
          <Label>
            Tutor: <Value>{tutor}</Value>
          </Label>

          <Label>
            Pet: <Value>{pet}</Value>
          </Label>

          <Label>
            Contato: <Value>{phone}</Value>
          </Label>

          <Label>
            Endereço: <Value>{address}</Value>
          </Label>

          <Label>
            Atendimento: <Value>{type}</Value>
          </Label>

          <Label>
            desc: <Value>{description}</Value>
          </Label>

          <Label>
            Pagamento: <Value>{paid ? "paid ✅" : "Pendente ❌"}</Value>
          </Label>
        </InfoSection>

        <ServicesContainer>
          <ServicesTitle>Serviços</ServicesTitle>
          {services.map((service, index) => (
            <ServiceItem key={index}>
              <ServiceInfo>
                <span>{FormatDateForCard(String(service.service_date))}</span>
              </ServiceInfo>

              <Badge
                $status={service.service_done === 1 ? "success" : "warning"}
              >
                {service.service_done === 1 ? "Finalizado" : "Pendente"}
                {serviceStatus}
              </Badge>
            </ServiceItem>
          ))}
        </ServicesContainer>

        <Footer>
          <Badge $status={paid ? "success" : "warning"}>
            {paid ? "Pago" : "Não Pago"}
          </Badge>

          <Price>{value}</Price>
        </Footer>
      </Card>
      <br />
    </div>
  );
}
