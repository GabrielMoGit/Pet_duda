import { InputStyled } from './styles'

type Props = {
    placeholder: string
}

function Input({placeholder}: Props){
    return(
        <InputStyled placeholder={placeholder} />
    )
}