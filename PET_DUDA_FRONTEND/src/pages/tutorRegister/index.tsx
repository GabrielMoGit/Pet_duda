import { StyledInput } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'

export function TutorRegister(){
    
   const [name, setName] = useState('')
   const [phone, setPhone] = useState('')

    return (
        <div>
            <h1>Cadastrar Tutor</h1>

            <form>
                <StyledInput 
                placeholder="Nome" 
                value={name}
                onChange={(e) => (e.target.value)}
                />
                <br />
                <br />
                <StyledInput 
                placeholder="telefone" 
                value = {phone}
                onChange={(e) => (e.target.value)}
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