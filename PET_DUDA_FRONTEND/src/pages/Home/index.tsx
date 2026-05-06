import { useState, useEffect } from "react"
import { api } from "../../services/api"
import { StyledBox } from "../../components/packageBox"

type Service = {
            service_id: number,
            service_date: Date,
            service_done: number
        }

    type ServicePackage = {
        package_id: number,
        package_type: string,
        tutor_name: string,
        tutor_phone: string,
        tutor_id: string,
        pet_name: string,
        pet_id: string,
        street: string,
        neighborhood: string,
        house_number: string,
        package_done: number,
        package_paid: number,
        services: Service[],
        value: string
    }

export function Home(){

    

    const [servicePackages, setServicePackages] = useState<ServicePackage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        
        async function listOnload(){

            try{
                const {data} = await api.get('/ListPackages', {
                  params:{
                    kindOfPackage: ''
                  }
                })
                setServicePackages(data.finalPackages)
            }catch(err){
                console.error("Erro ao carregar pacotes", err)
            }finally{
                setLoading(false)
            }
        }

        listOnload()

    }, [])

    if(loading){
        return <p>Carregando...</p>
    }
return (
    
    <div>
        <h1>Pacotes de Serviço</h1>

        {servicePackages.length === 0 && <p>Nenhum pacote encontrado</p>}

        <div style={{ display: "flex",flexWrap: "wrap", gap: "20px"}}>
            {servicePackages.map(pkg => (
            <StyledBox
            package_id={pkg.package_id}
            package_type={pkg.package_type}
            tutor_name={pkg.tutor_name} 
            tutor_phone={pkg.tutor_phone}
            pet_name={pkg.pet_name}
            street={pkg.street}
            neighborhood={pkg.neighborhood}
            house_number={pkg.house_number}
            package_done={pkg.package_done}
            package_paid={pkg.package_paid}
            services={pkg.services}
            value={pkg.value}
            />
            ))}
        </div>
        
        
    </div>
    
  )
        
}

/*
<div>
      <h1>Pacotes de Serviço</h1>

      {servicePackages.length === 0 && <p>Nenhum pacote encontrado</p>}

      {servicePackages.map(pkg => (
        <div
          key={pkg.package_id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h2>Pacote #{pkg.package_id}</h2>

          <p><strong>Tipo:</strong> {pkg.package_type}</p>
          <p><strong>Pet:</strong> {pkg.pet_name}</p>
          <p><strong>Tutor:</strong> {pkg.tutor_name} ({pkg.tutor_phone})</p>

          <p>
            <strong>Endereço:</strong> {pkg.street}, {pkg.house_number} - {pkg.neighborhood}
          </p>

          <p>
            <strong>Pago:</strong> {pkg.package_paid ? "Sim" : "Não"}
          </p>

          <p>
            <strong>Concluído:</strong> {pkg.package_done ? "Sim" : "Não"}
          </p>

          <h3>Serviços</h3>

          {pkg.services.length === 0 ? (
            <p>Nenhum serviço</p>
          ) : (
            <ul>
              {pkg.services.map(service => (
                <li key={service.service_id}>
                  Data: {new Date(service.service_date).toLocaleDateString()}
                  {" | "}
                  Status: {service.service_done ? "Concluído" : "Pendente"}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
    */