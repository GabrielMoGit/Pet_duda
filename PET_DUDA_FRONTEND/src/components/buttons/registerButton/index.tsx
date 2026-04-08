import { RegisterButtonStyled } from "./styles"

type Props = {
    children: string
    type?: 'button' | 'submit'
}

export function RegisterButton({ children, type = "button"}: Props){
    return (
        <RegisterButtonStyled type={type}>
            {children}
        </RegisterButtonStyled>
    )
}