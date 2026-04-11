import { GenericStyledInput } from '../../components/inputs/genericInput'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'
import { api } from '../../services/api'

export function TutorRegister(){

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [message, setMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()
        const cleanPhone = phone.replace(/\D/g, '')
        try{
            const response = await api.post('/tutor',{
                name,
                phone: cleanPhone
            })

            setHasSuccess(true)
            setMessage(response.data.message)
            setTimeout(() => {setMessage("")}, 4000)
            setTimeout(() => setHasSuccess(false), 500)
            setName('')
            setPhone('')
        }
        catch(error: any){
            if(error.response){
                if(error.response.status === 400){
                    setMessage(error.response.data.error)
                    setTimeout(() => {setMessage("")}, 2000)
                    setHasError(true)
                    setTimeout(() => setHasError(false), 500)
                }else{
                    setMessage('Erro ao cadastrar tutor')
                    setTimeout(() => {setMessage("")}, 4000)
                }
            }   
            else{
                setMessage("Erro de conexão com o servidor")
                setTimeout(() => {setMessage("")}, 4000)
            }
        }
    }

    return (
        <div>
            <h1>Cadastrar Tutor</h1>
            
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '10px'}}>
                    <GenericStyledInput 
                        placeholder="Nome" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                    <GenericStyledInput 
                        placeholder="telefone" 
                        value = {phone}
                        onChange={(e) =>{
                            const onlyNumbers = e.target.value.replace(/\D/g, '')
                            const limitedNumbers = onlyNumbers.slice(0, 11)

                            let formatted = limitedNumbers

                            if(limitedNumbers.length > 0){
                                formatted = '(' + limitedNumbers
                            }

                            if(limitedNumbers.length > 2){
                                formatted = '(' + limitedNumbers.slice(0,2) + ')' + limitedNumbers.slice(2)
                            }

                            if(limitedNumbers.length > 7){
                                formatted = '(' + limitedNumbers.slice(0,2) + ')' + limitedNumbers.slice(2,7) + '-' + limitedNumbers.slice(7)
                            }
                            setPhone(formatted)
                        }}
                        
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                </div>
                <br />
                <div style={{ display: 'flex', gap: '10px'}}>
                    <GenericStyledInput 
                        placeholder="Rua" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                    <GenericStyledInput 
                        placeholder="Bairro" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                </div>
                
                <p style={{ color: 'red' }}>{message}</p>
                <div style={{display: 'flex', gap: '10px'}}>
                    <RegisterButton 
                    type="submit">Cadastrar
                    </RegisterButton>
                </div>
                
            </form>
        </div>
    )
}