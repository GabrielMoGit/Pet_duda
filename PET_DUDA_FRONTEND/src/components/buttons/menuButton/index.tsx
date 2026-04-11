import { MenuButtonStyled } from "./style";

type MenuButtonProps = {
    children: string
    type?: 'button' | 'submit'
    onClick?: () => void
}

export function MenuButton({children, type = 'button', onClick}: MenuButtonProps){
    return(
        <MenuButtonStyled 
            type={type}
            onClick={onClick}>
            {children}
        </MenuButtonStyled>
    )
}