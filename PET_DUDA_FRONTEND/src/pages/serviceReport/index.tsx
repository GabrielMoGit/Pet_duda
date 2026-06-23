import { useState, useEffect } from "react";
import { AppointmentCard } from "../../components/serviceBox";
import { api } from "../../services/api";

type Service = {
  id: number;
  pet_name: string;
  service_date: string;
  service_done: number;
  service_package_id: number;
  service_type: string;
  tutor_name: string;
  tutor_phone: string;
};

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
        console.log(services);
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
            date="18 Jun 2026 • 14:30"
            service_type={services.service_type}
            pet={services.pet_name}
            tutor={services.tutor_name}
            phone={services.tutor_phone}
          />
        ))}
      </div>
    </div>
  );
}
