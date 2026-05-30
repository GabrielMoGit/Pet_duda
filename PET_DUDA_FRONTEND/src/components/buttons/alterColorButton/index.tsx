import { AlterColorButtonStyled } from "./style";
import { forwardRef } from 'react'

type AlterColorButtonProps = {
    onClick: () => void,
    children: string,
    color: string
    type?: 'button' 
}

export const AlterColorButton = forwardRef<HTMLButtonElement, AlterColorButtonProps>(
    ({children, onClick, color, type}, ref) => {
        return(
            <AlterColorButtonStyled ref={ref} onClick={onClick} color={color} type='button'>
                {children}
            </AlterColorButtonStyled>
        )
    }
)