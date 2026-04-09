import { GenericButtonStyled } from "./style";

type GenericButtonProps = {
    children: string
    type?: 'button' | 'submit'
    onClick?: () => void
}

export function GenericButton({children, type = 'button', onClick}: GenericButtonProps){
    return(
        <GenericButtonStyled 
            type={type}
            onClick={onClick}>
            {children}
        </GenericButtonStyled>
    )
}