import { Box } from "./style";
import React from "react";

type Service = {
    service_id: number,
    service_date: Date,
    service_done: number
}

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
    services: Service[],
    value: string
}
    // código da cor dos icones #0045FF

export function StyledBox(props: Props){

    let formattedPhoneNumber = '(' + props.tutor_phone.slice(0, 2) + ') ' +  props.tutor_phone.slice(2, 7) + '-' + props.tutor_phone.slice(7, 11)

    
    return(
        <Box>
            <div style={{fontSize: '20px'}}>
                <p><img src='id.png' width={20} style={{ marginRight: "8px" }} />
                    ID do pacote: <span style={{ color: '#0045FF', fontWeight: "bold", fontSize: '23px  '  }} >{props.package_id}</span></p>

                    <p><img src='user.png' width={20} style={{ marginRight: "8px" }} />
                        Tutor: <span style={{fontWeight: 'bold', fontSize: '23px'}}>{props.tutor_name}</span></p>

                    <p><img src='pet.png' width={20} style={{ marginRight: "8px" }} />
                        Pet: <span style={{fontWeight: 'bold', fontSize: '23px'}}>{props.pet_name}</span><span/></p>

                <div style={{marginBottom: '10px'}}>
                    <p><img src='phone.png' width={20} style={{ marginRight: "8px" }} />
                        Contato: <span style={{fontWeight: 'bold', fontSize: '23px'}}>{formattedPhoneNumber}</span></p>

                    <p><img src='calendar.png' width={20} style={{ marginRight: "8px" }} />
                        Pacote: 

                        <span
                            style={{backgroundColor: '#e0e6f6', color: '#0045FF', padding: '1px 10px', borderRadius: '10px',
                            marginLeft: '10px', fontSize: '23px', fontWeight: 'bold'}}>{props.package_type}
                        </span>
                    </p>

                    <p><img src='address.png' width={20} style={{ marginRight: "8px" }} />
                        endereço: 
                        <span style={{fontWeight: 'bold', fontSize: '23px'}}>
                            {props.street}, {props.house_number} - {props.neighborhood}
                        </span>
                    </p>
                </div>

                <div style={{backgroundColor: '#fff5e2', borderRadius: '15px', padding: '10px', marginTop: '0px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'}}>

                    <p><img src='board.png' width={30} style={{ marginRight: "10px", marginLeft: '23px', marginTop: '5px'}}/>

                    <span style={{color: '#ff7b00', fontWeight: 'bold', fontSize: '25px'}}>Serviços:</span></p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '1px', alignItems: 'center', marginLeft: '5px'}}>
                        {props.services.map(service => (
                            <React.Fragment key={service.service_id}>
                                <div>
                                    <img src='orangeCalendar.png' width={25} style={{ marginRight: "8px", marginLeft: '22px' }}/> 
                                    <span style={{ fontSize: '20px' }}>{new Date(service.service_date).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: 'px' }}>Status: </span>
                                    <span style={{ fontSize: '22px', backgroundColor: service.service_done === 1 ? '#00b60310' :  '#feead7', color: service.service_done === 1 ? '#00b603' : '#ff7b00', padding: '1px 10px', borderRadius: '10px',
                                        marginLeft: '10px', fontWeight: 'bold' }}>{service.service_done ? "Concluído" : "Pendente"}
                                    </span>
                                </div>                               
                            </React.Fragment>   
                        ))}
                    </div>
                </div>
                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{backgroundColor: '#eff3ff', padding: '1px 10px', borderRadius: '10px', fontSize: '20px', display: 'flex'}}>
                        <div style={{padding: '5px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <div style={{ backgroundColor: '#abc1ff9a', borderRadius: '10px', padding: '5px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'}}>
                                <img src='flag.png' width={40}/>   
                            </div>
                        </div>
                        <div style={{marginTop: '5px'}}>
                        <p style={{fontSize: '17px'}}>Status do pacote </p>
                        <p style={{fontSize: '22', fontWeight: 'bold', color: '#0045FF'}}>{props.package_done ? "Finalizado" : "Não finalizado"}</p>
                        </div>
                    </div>
                    <div style={{backgroundColor: '#deffe0', padding: '1px 10px', borderRadius: '10px', fontSize: '20px', display: 'flex'}}>
                        <div style={{padding: '5px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <div style={{ backgroundColor: '#a1faa7af', borderRadius: '10px', padding: '5px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'}}>
                                <img src='coin.png' width={40}/>   
                            </div>
                        </div>        
                        <div style={{marginTop: '5px'}}>
                            <p style={{fontSize: '17px'}}>Pacote pago: </p>
                            <p style={{fontSize: '22', fontWeight: 'bold', color: '#00c22d'}}>{props.package_paid ? "Sim" : "Não"}</p>
                        </div>
                    </div>
                    <p>valor: {props.value}</p>
                </div>
            </div>
        </Box>
    )
}



// 