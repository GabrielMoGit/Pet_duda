import { InputStyled } from './styles'

type Props = {
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StyledInput({placeholder}: Props){
    return(
        <InputStyled placeholder={placeholder} />
    )
}