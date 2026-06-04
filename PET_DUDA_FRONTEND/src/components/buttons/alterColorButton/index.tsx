import { AlterColorButtonStyled } from "./style";

type AlterColorButtonProps = {
    onClick: () => void,
    children: string,
    color: string
}

export function AlterColorButton({children, onClick, color}: AlterColorButtonProps){
    return(
        <AlterColorButtonStyled onClick={onClick} color={color} type='button'>
            {children}
        </AlterColorButtonStyled>
    )

}