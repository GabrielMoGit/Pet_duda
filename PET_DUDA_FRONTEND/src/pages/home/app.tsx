import { Tittle } from './styles'
import { MyButton } from '../../components/buttons/styles'
import { useState} from 'react'

export function App(){
    return <div>
        <Tittle>Home</Tittle>
        <MyButton>
            Olá
        </MyButton>
    </div>
}