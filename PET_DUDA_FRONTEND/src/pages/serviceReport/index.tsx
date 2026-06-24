import { useState, useEffect } from "react";
import { AppointmentCard } from "../../components/serviceBox";
import { GenericStyledInput } from "../../components/inputs/genericInput";
import { ActionButton } from "../../components/buttons/ActionButton";
import { AlterColorButton } from "../../components/buttons/alterColorButton";
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

function formatDateForCard(date: string) {
  const dateObject = new Date(date);

  const formattedDate = dateObject.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedHour = dateObject.toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} • ${formattedHour}`;
}

function formatPhoneForCard(phone: string) {
  return `(${phone.slice(0, 2)})${phone.slice(2, 7)}-${phone.slice(7)}`;
}

function formatDateInput(value: string) {
  const limitedNumbers = value.slice(0, 8);

  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  }

  if (limitedNumbers.length <= 4) {
    return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`;
  }

  return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(
    2,
    4,
  )}/${limitedNumbers.slice(4, 8)}`;
}

function initialDatabaseDateForm(date: string) {
  if (!date || date.length !== 10) {
    return "";
  }

  return (
    `${date.slice(6, 10)}-` +
    `${date.slice(3, 5)}-` +
    `${date.slice(0, 2)}T00:00:00.000Z`
  );
}

function finalDatabaseDateForm(date: string) {
  if (!date || date.length !== 10) {
    return "";
  }

  return (
    `${date.slice(6, 10)}-` +
    `${date.slice(3, 5)}-` +
    `${date.slice(0, 2)}T23:59:00.000Z`
  );
}

export function ServiceReport() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);

  const [firstDateTyped, setFirstDateTyped] = useState(
    String(new Date().toLocaleDateString()),
  );
  const [lastDateTyped, setLastDateTyped] = useState(
    String(new Date().toLocaleDateString()),
  );

  const [serviceDone, setServiceDone] = useState("0");

  const [doneButtonColor, setDoneButtonColor] = useState("grey");
  const [undoneButtonColor, setUndoneButtonColor] = useState("green");
  const [allServicesButtonColor, setAllServicesButtonColor] = useState("grey");

  async function listOnload(
    firstDate = initialDatabaseDateForm(firstDateTyped),
    lastDate = finalDatabaseDateForm(lastDateTyped),
    serviceDoneFilter = serviceDone,
  ) {
    try {
      setLoading(true);

      const { data } = await api.get("/listServices", {
        params: {
          first_date: firstDate,
          last_date: lastDate,
          service_done: serviceDoneFilter,
        },
      });

      setServices(data.intervalDate ?? []);
    } catch (err) {
      console.error("Erro ao carregar serviços", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void listOnload();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Relatório de Serviços</h1>

      <div
        style={{
          display: "flex",
          gap: "5px",
          marginBottom: "10px",
        }}
      >
        <GenericStyledInput
          name="firstDate"
          placeholder="Data inicial"
          value={firstDateTyped}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setFirstDateTyped(formatDateInput(onlyNumbers));
          }}
          hasError={false}
          hasSuccess={false}
        />

        <GenericStyledInput
          name="lastDate"
          placeholder="Data limite"
          value={lastDateTyped}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            setLastDateTyped(formatDateInput(onlyNumbers));
          }}
          hasError={false}
          hasSuccess={false}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <AlterColorButton
          color={undoneButtonColor}
          onClick={() => {
            setUndoneButtonColor("green");
            setDoneButtonColor("grey");
            setAllServicesButtonColor("grey");
            setServiceDone("0");
          }}
        >
          Pendentes
        </AlterColorButton>

        <AlterColorButton
          color={doneButtonColor}
          onClick={() => {
            setDoneButtonColor("green");
            setUndoneButtonColor("grey");
            setAllServicesButtonColor("grey");
            setServiceDone("1");
          }}
        >
          Finalizados
        </AlterColorButton>

        <AlterColorButton
          color={allServicesButtonColor}
          onClick={() => {
            setAllServicesButtonColor("green");
            setDoneButtonColor("grey");
            setUndoneButtonColor("grey");
            setServiceDone("");
          }}
        >
          Todos
        </AlterColorButton>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <ActionButton
          name="applyButton"
          onClick={() => {
            listOnload(
              initialDatabaseDateForm(firstDateTyped),
              finalDatabaseDateForm(lastDateTyped),
              serviceDone,
            );
          }}
          style={{
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          Aplicar
        </ActionButton>
      </div>

      <div>
        {services.map((service) => (
          <AppointmentCard
            key={service.id}
            id={service.service_package_id}
            date={formatDateForCard(service.service_date)}
            service_type={service.service_type}
            pkg_description={service.pkg_description}
            pet={service.pet_name}
            tutor={service.tutor_name}
            phone={formatPhoneForCard(service.tutor_phone)}
          />
        ))}
      </div>
    </div>
  );
}
