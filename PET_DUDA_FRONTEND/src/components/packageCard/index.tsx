import { useState } from "react";
import { api } from "../../services/api";
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
  PaymentButton,
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

async function alterPaymentStatus(packageId: number) {
  try {
    const databaseResponse = await api.patch("/alterPackagePaymentStatus", {
      package_id: packageId,
    });
  } catch (err) {
    console.error("Erro ao alterar status de pagamento", err);
  }
}

const serviceStatus = "";

const openWhatsApp = (phone: string, message: string) => {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/55${cleanPhone}?text=${encodedMessage}`, "_blank");
};

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
  const serviceLines = [
    `📌 Primeira vinda - (${FormatDateForCard(String(services[0].service_date)).slice(0, 18)})`,
  ];

  if (services.length > 1) {
    serviceLines.push(
      `📌 Segunda vinda - (${FormatDateForCard(String(services[1].service_date)).slice(0, 18)})`,
    );
  }

  if (services.length > 2) {
    serviceLines.push(
      `📌 Terceira vinda - (${FormatDateForCard(String(services[2].service_date)).slice(0, 18)})`,
      `📌 Quarta vinda - (${FormatDateForCard(String(services[3].service_date)).slice(0, 18)})`,
    );
  }

  const finalQuantityServices = serviceLines.join("\n");
  const message = `Vindas ${pet_name} (${hourAndWeekDay}h)

Início do plano - R$${value}

Pix: 51.409.503/0001-56
Nome: Maria Eduarda de Andrade Araújo

${finalQuantityServices}

📌 Renovação - (${FormatDateForCard(String(next_package_date)).slice(0, 18)}) - R$${value}

❗ Evite atrasos, nossa tolerância é de até 5 minutos.

❗ Caso precise realizar alguma mudança nas
datas agendadas, é só avisar com no mínimo 24
horas de antecedência que remarcamos
sem perder nenhum atendimento. O atendimento
será perdido apenas em caso de falta sem aviso
ou aviso com menos de 24 horas de antecedência.

❗ O plano deve ser utilizado dentro do
prazo de 30 dias.
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
  const [isPaid, setIsPaid] = useState(paid);
  return (
    <div>
      <Card>
        <div></div>
        <Header>
          <PackageId>Pacote #{id}</PackageId>

          <div style={{ display: "flex", gap: "5px" }}>
            <CopyMessageButton
              $visible={done === 1}
              onClick={() => {
                const message = textToSend(
                  pet,
                  services,
                  reference_date,
                  value,
                );

                navigator.clipboard.writeText(message);

                openWhatsApp(phone, message);
              }}
            >
              WhatsApp
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
          <PaymentButton
            $status={isPaid === 1 ? "success" : "warning"}
            onClick={() => {
              setIsPaid(isPaid === 1 ? 0 : 1);
              alterPaymentStatus(id);
            }}
          >
            {isPaid === 1 ? "Pago" : "Não Pago"}
          </PaymentButton>

          <Price>{value}</Price>
        </Footer>
      </Card>
      <br />
    </div>
  );
}
