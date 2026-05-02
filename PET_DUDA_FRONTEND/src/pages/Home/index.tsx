import { useState, useEffect } from "react"
import { api } from "../../services/api"

export function Home(){

    type ServicePackage = {
        id: number;
        pet_id: number;
        package_type: string;
        package_done: number;
        package_paid: number
    }

    const [servicePackage, setServicePackage] = useState<ServicePackage[]>([])

    useEffect(() => {
        
        async function listOnload(){

            const {data: servicePackages } = await api.get('/ListPackages')

            setServicePackage(servicePackages)
        }

        listOnload()

    }, [])

    return (
        <>
            {servicePackage.map(servicePackage => (
            <div key={servicePackage.id}>
                <p>ID: {servicePackage.id}</p>
                <p>Pet: {servicePackage.pet_id}</p>
                <p>Tipo: {servicePackage.package_type}</p>
            </div>
            ))}
        </>
        )
}

