import { StyledInput } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import { GenericButton   } from '../../components/buttons/genericButton'

export function Home(){

    const navigate = useNavigate()

    return(
        <div>
            <h1>Pet MK</h1>
            <GenericButton
            type = 'button'
            onClick={() => navigate('/register')}>
                cadastrar Tutor
            </GenericButton>
            <br />
            <br />
            <GenericButton
            type = 'button'
            onClick = {() => {}}>
                Listar Tutores
            </GenericButton>
        </div>
    )
}

