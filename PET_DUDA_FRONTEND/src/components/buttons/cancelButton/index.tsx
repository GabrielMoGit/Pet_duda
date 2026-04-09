import { CancelButtonStyled } from "./style";

type CancelButtonProps = {
    children: string
    type?: 'button'
    onClick?: () => void
}

export function CancelButton({children, type = "button", onClick}: CancelButtonProps){

    return(
        <CancelButtonStyled 
            type={type}
            onClick={onClick}
            >
            {children}
        </CancelButtonStyled>
    )
}