import { StyledInput } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'

export function TutorRegister(){
    
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')

   function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
    e.preventDefault()
    console.log(name, phone)
   }

    return (
        <div>
            <h1>Cadastrar Tutor</h1>

            <form onSubmit={handleSubmit}>
                <StyledInput 
                placeholder="Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <br />
                <br />
                <StyledInput 
                placeholder="telefone" 
                value = {phone}
                onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <br />
                <RegisterButton 
                    type="submit">Cadastrar
                </RegisterButton>
            </form>
        </div>
    )
}