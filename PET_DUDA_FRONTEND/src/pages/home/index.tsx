import { Input } from '../../components/input/index'

export function Home(){
    
    return (
        <div>
            <h1>Cadastrar Tutor</h1>

            <form>
                <Input placeholder="Nome" />
                <br />
                <Input placeholder="telefone" />
                <br />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}