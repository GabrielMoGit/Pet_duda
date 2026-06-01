import { ActionButtonStyled } from "./style";

type Props = {
    children: string
    style?: React.CSSProperties
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    name: string
}

export function ActionButton({children, style, onClick, name}: Props){

    return(
        <ActionButtonStyled 
            name={name}
            onClick={onClick}
            type={'button'}
            style={style}
        >
            
            {children}
        </ActionButtonStyled>
    )
}