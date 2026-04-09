import { RegisterButtonStyled } from "./styles"

type RegisterButtonProps = {
    children: string
    type?: 'button' | 'submit'
}

export function RegisterButton({ children, type = "button"}: RegisterButtonProps){
    return (
        <RegisterButtonStyled type={type}>
            {children}
        </RegisterButtonStyled>
    )
}