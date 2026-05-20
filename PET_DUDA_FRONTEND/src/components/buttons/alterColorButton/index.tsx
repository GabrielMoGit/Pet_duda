import { AlterColorButtonStyled } from "./style";

type AlterColorButtonProps = {
    onClick: () => void,
    children: string,
    color: string
    type?: 'button' 
}

export function AlterColorButton({children, onClick, color, type}: AlterColorButtonProps){
    return(
        <AlterColorButtonStyled onClick={onClick} color={color} type='button'>
            {children}
        </AlterColorButtonStyled>
    )

}