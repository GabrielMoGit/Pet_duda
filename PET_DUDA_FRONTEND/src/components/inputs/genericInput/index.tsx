import { GenericInputStyled } from './styles'

type Props = {
    name: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    hasError: boolean
    hasSuccess: boolean
}

export function GenericStyledInput({name, placeholder, value, onChange, hasError, hasSuccess}: Props){
    return(
        <GenericInputStyled
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        hasError={hasError}
        hasSuccess={hasSuccess}
        />
    )
}