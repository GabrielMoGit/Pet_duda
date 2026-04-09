import { GenericInputStyled } from './styles'

type Props = {
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    hasError: boolean
    hasSuccess: boolean
}

export function GenericStyledInput({placeholder, value, onChange, hasError, hasSuccess}: Props){
    return(
        <GenericInputStyled
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasError={hasError}
        hasSuccess={hasSuccess}
        />
    )
}