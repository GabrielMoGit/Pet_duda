import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { PackageCard } from "../../components/packageCard";

type Service = {
  service_id: number;
  service_date: Date;
  service_done: number;
};

type ServicePackage = {
  package_id: number;
  package_type: string;
  package_description: string;
  tutor_name: string;
  tutor_phone: string;
  tutor_id: string;
  pet_name: string;
  pet_id: string;
  street: string;
  neighborhood: string;
  house_number: string;
  package_done: number;
  package_paid: number;
  services: Service[];
  value: string;
};

function FormatPhoneForCard(phone: string) {
  const formattedPhone =
    "(" + phone.slice(0, 2) + ")" + phone.slice(2, 7) + "-" + phone.slice(7);

  return formattedPhone;
}

export function Home() {
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function listOnload() {
      try {
        const { data } = await api.get("/ListPackages", {
          params: {
            kindOfPackage: "",
          },
        });
        setServicePackages(data.finalPackages ?? []);
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

  function renderPackages() {
    if (servicePackages.length === 0) {
      return <p>Nenhum pacote encontrado</p>;
    }
    return (
      <div style={{ width: "100%" }}>
        {servicePackages.map((pkg) => (
          <PackageCard
            key={pkg.package_id}
            id={pkg.package_id}
            type={pkg.package_type}
            description={pkg.package_description}
            tutor={pkg.tutor_name}
            phone={FormatPhoneForCard(pkg.tutor_phone)}
            pet={pkg.pet_name}
            address={
              pkg.street + ", " + pkg.house_number + " - " + pkg.neighborhood
            }
            done={pkg.package_done}
            paid={pkg.package_paid}
            services={pkg.services}
            value={pkg.value}
          />
        ))}
      </div>
    );
  }
  return (
    <div>
      <h1>Pacotes de Serviço</h1>

      {renderPackages()}
    </div>
  );
}
