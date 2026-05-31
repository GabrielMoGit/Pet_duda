import { HiddenInputStyled } from "./style";

type Props = {
    name: string
    value: string
    style?: React.CSSProperties
    readOnly?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    pointerEvents: boolean
    opacity: boolean
}

export function HiddenStyledInput({name, value, readOnly, onChange, pointerEvents, opacity}: Props){

    return(
        <HiddenInputStyled
            name={name}
            style={{pointerEvents: pointerEvents ? 'none' : 'auto', opacity: opacity ? 'none' : 'auto'}}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            
        />
            
        
    )
}

