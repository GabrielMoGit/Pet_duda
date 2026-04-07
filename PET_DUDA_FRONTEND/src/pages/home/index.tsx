import { Tittle } from './styles'
import { MyButton } from '../../components/buttons/styles'
import { useState} from 'react'

function Home(){

    const [count, setCount] = useState(0)

    return <div>
        <Tittle>Home</Tittle>
        <MyButton onClick={() => setCount(count + 1)}>
            Clicou {count} vezes
        </MyButton>
    </div>
}

export default Home