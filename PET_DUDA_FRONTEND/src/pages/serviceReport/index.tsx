import { useState, useEffect } from "react";
import { AppointmentCard } from "../../components/serviceBox";
import { api } from "../../services/api";

type Service = {
  id: number;
  pet_name: string;
  pkg_description?: string;
  service_date: string;
  service_done: number;
  service_package_id: number;
  service_type: string;
  tutor_name: string;
  tutor_phone: string;
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

  const finalFormat = formattedDate + " • " + formattedHour;

  return String(finalFormat);
}

function FormatPhoneForCard(phone: string) {
  const formattedPhone =
    "(" + phone.slice(0, 2) + ")" + phone.slice(2, 7) + "-" + phone.slice(7);

  return formattedPhone;
}

export function ServiceReport() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [serviceDone, setServiceDone] = useState("");

  useEffect(() => {
    async function listOnload() {
      try {
        const { data } = await api.get("/listServices", {
          params: {
            First_date: firstDate,
            last_date: lastDate,
            service_done: serviceDone,
          },
        });
        setServices(data.intervalDate ?? []);
      } catch (err) {
        console.error("Erro ao carregar pacotes", err);
      } finally {
        setLoading(false);
      }
    }

    listOnload();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Relatório de Serviços</h1>
      <div>
        {services.map((services) => (
          <AppointmentCard
            id={services.service_package_id}
            date={FormatDateForCard(services.service_date)}
            service_type={services.service_type}
            pkg_description={services.pkg_description}
            pet={services.pet_name}
            tutor={services.tutor_name}
            phone={FormatPhoneForCard(services.tutor_phone)}
          />
        ))}
      </div>
    </div>
  );
}
