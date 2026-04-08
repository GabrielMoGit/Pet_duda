import { InputStyled } from './styles'

type Props = {
    placeholder: string
}

export function Input({placeholder}: Props){
    return(
        <InputStyled placeholder={placeholder} />
    )
}