import { Input } from '../../components/input/index'
import { RegisterButton } from '../../components/buttons/registerButton'

export function Home(){
    
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