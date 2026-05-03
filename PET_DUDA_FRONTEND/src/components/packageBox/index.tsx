import { Box } from "./style";

type Service = {
    service_id: number,
    service_date: Date,
    service_done: number
}

let services: Service[] = []


type Props = {
    package_id: number,
    package_type: string,
    tutor_name: string,
    tutor_phone: string,
    pet_name: string,
    street: string,
    neighborhood: string,
    house_number: string,
    package_done: number,
    package_paid: number,
    services: Service[]
}
    // código da cor dos icones #0045FF

export function StyledBox(props: Props){

    let formattedPhoneNumber = '(' + props.tutor_phone.slice(0, 2) + ') ' +  props.tutor_phone.slice(2, 7) + '-' + props.tutor_phone.slice(7, 11)

    
    return(
        <Box>
            <div style={{fontSize: '25px'}}>
                <p><img src='id.png' width={20} style={{ marginRight: "8px" }} />
                    ID do pacote: <span style={{ color: '#0045FF', fontWeight: "bold"  }} >{props.package_id}</span></p>
                    <p><img src='user.png' width={20} style={{ marginRight: "8px" }} />
                        Tutor: {props.tutor_name}</p>
                    <p><img src='pet.png' width={20} style={{ marginRight: "8px" }} />
                        Pet: {props.pet_name}</p>
                <div style={{marginBottom: '10px'}}>
                    <p><img src='phone.png' width={20} style={{ marginRight: "8px" }} />
                        Contato: {formattedPhoneNumber}</p>
                    <p><img src='servicePackage.png' width={20} style={{ marginRight: "8px" }} />
                        Pacote: {props.package_type}</p>
                    <p><img src='address.png' width={20} style={{ marginRight: "8px" }} />
                        endereço: {props.street}, {props.house_number} - {props.neighborhood}</p>
                </div>
                <div style={{backgroundColor: '#ffcca5', borderRadius: '5px', padding: '2px'}}>
                    <p>Serviços:</p>
                    <div style = {{fontSize: "20px", display: "flex", flexWrap: "wrap", gap: '2px', marginTop: '10px', marginBottom: '10px'}}>
                        {props.services.map(service =>(
                        <p key ={service.service_id}>
                            Data: {new Date(service.service_date).toLocaleDateString()} | Status:{service.service_done ? "Concluído" : "Pendente"}
                        </p>
                    ))}
                    </div>
                </div>
                <div style={{marginTop: '10px'}}>
                    <p>Status do pacote: {props.package_done ? "Finalizado" : "Não finalizado"}</p>
                    <p>Pacote pago: {props.package_paid ? "Sim" : "Não"}</p>
                </div>
            </div>
        </Box>
    )
}