import { CancelButtonStyled } from "./style";

type CancelButtonProps = {
    children: string
    type?: 'button' | 'submit'
}

export function CancelButton({children, type = "button"}: CancelButtonProps){

    return(
        <CancelButtonStyled type={type}>
            {children}
        </CancelButtonStyled>
    )
}