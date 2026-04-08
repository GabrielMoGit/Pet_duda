import { StyledInput } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function Home(){

    const navigate = useNavigate()

    return(
        <div>
            <h1>Home</h1>
            <button onClick={() => navigate('/register')}>
                Ir para cadastro
            </button>
        </div>
    )
}

