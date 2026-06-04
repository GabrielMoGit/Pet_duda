import { ActionButtonStyled } from "./style";
import { forwardRef } from "react";

type Props = {
    children: string
    style?: React.CSSProperties
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    name: string
}

export const ActionButton = forwardRef<HTMLButtonElement, Props>(
    ({children, style, onClick, name}, ref) => {

        return(
            <ActionButtonStyled 
                ref={ref}
                name={name}
                onClick={onClick}
                type={'button'}
                style={style}
            >
                
                {children}
            </ActionButtonStyled>
        )
    }
)