import { Input } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'
//import { useState } from 'react'

export function TutorRegister(){
    
   // const [name, setName] = useState('')
   // const [phone, setPhone] = useState('')

    return (
        <div>
            <h1>Cadastrar Tutor</h1>

            <form>
                <Input placeholder="Nome" />
                <br />
                <br />
                <Input placeholder="telefone" />
                <br />
                <br />
                <RegisterButton 
                    type="submit">Cadastrar
                </RegisterButton>
            </form>
        </div>
    )
}