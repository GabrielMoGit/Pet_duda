import { GenericButtonStyled } from "./style";

type GenericButtonProps = {
    children: string
    type?: 'button'
}

export function GenericButton({children, type = 'button'}: GenericButtonProps){
    return(
        <GenericButtonStyled 
            type={type}>
            {children}
        </GenericButtonStyled>
    )
}