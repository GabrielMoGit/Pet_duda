import { StyledInput } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'
import { api } from '../../services/api'

export function TutorRegister(){

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()
        const cleanPhone = phone.replace(/\D/g, '')
    try{
        await api.post('/tutor',{
            name,
            phone: cleanPhone
        })

        setHasSuccess(true)
        setMessage("Tutor cadastrado com sucesso!")
        setTimeout(() => setHasSuccess(false), 500)
        setName('')
        setPhone('')
    }
    catch(error: any){
        if(error.response){
            if(error.response.status === 400){
                setMessage("telefone já cadastrado!")
                setHasError(true)
                setTimeout(() => setHasError(false), 500)
            }else{
                setMessage('Erro ao cadastrar tutor')
            }
        }   
        else{
            setMessage("Erro de conexão com o servidor")
        }
    }

   }

    return (
        <div>
            <h1>Cadastrar Tutor</h1>

            <form onSubmit={handleSubmit}>
                <StyledInput 
                placeholder="Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                hasError={hasError}
                hasSuccess={hasSuccess}
                />
                <br />
                <br />
                <StyledInput 
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
                <br />
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