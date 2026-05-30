import { CancelButtonStyled } from "./style";

type CancelButtonProps = {
    children: string
    type?: 'button' | 'submit'
    style?: React.CSSProperties
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function CancelButton({children, type = "button", style, onClick}: CancelButtonProps){

    return(
        <CancelButtonStyled 
            onClick={onClick}
            type={type}
            style={style}
        >
            
            {children}
        </CancelButtonStyled>
    )
}