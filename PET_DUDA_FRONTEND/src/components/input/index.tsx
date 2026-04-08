import { InputStyled } from './styles'

type Props = {
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    hasError: boolean
    hasSuccess: boolean
}

export function StyledInput({placeholder, value, onChange, hasError, hasSuccess}: Props){
    return(
        <InputStyled
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasError={hasError}
        hasSuccess={hasSuccess}
        />
    )
}