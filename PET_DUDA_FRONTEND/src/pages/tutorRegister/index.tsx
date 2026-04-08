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
    
    try{
        await api.post('/tutor',{
            name,
            phone
        })

        setHasSuccess(true)
        setMessage("Tutor cadastrado com sucesso!")
        setTimeout(() => setHasSuccess(false), 1000)
        setName('')
        setPhone('')
    }
    catch(error: any){
        if(error.response){
            if(error.response.status === 400){
                setMessage("telefone já cadastrado!")
                setHasError(true)
                setTimeout(() => setHasError(false), 1000)
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
                onChange={(e) => setPhone(e.target.value)}
                hasError={hasError}
                hasSuccess={hasSuccess}
                />
                <br />
                <br />
                <RegisterButton 
                    type="submit">Cadastrar
                </RegisterButton>
                <p style={{ color: 'red' }}>{message}</p>
            </form>
        </div>
    )
}