import { ActionButtonStyled } from "./style";
import { forwardRef } from "react";

type Props = {
    children: string
    style?: React.CSSProperties
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    name: string
    type?: 'button' | 'submit'
}

export const ActionButton = forwardRef<HTMLButtonElement, Props>(
    ({children, style, onClick, name, type}, ref) => {

        return(
            <ActionButtonStyled 
                ref={ref}
                name={name}
                onClick={onClick}
                type={type}
                style={style}
            >
                
                {children}
            </ActionButtonStyled>
        )
    }
)