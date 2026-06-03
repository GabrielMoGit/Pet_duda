import { HiddenInputStyled } from "./style";

type Props = {
    name: string
    value: string
    readOnly?: boolean
    isVisible: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

export function HiddenStyledInput({name, value, readOnly, isVisible, onChange, onClick}: Props){

    return(
        <HiddenInputStyled
            name={name}
            value={value}   
            readOnly={readOnly}
            onChange={onChange}
            style={{display: isVisible ? 'block' : 'none'}}
            onClick={onClick}
        />
    )
}

