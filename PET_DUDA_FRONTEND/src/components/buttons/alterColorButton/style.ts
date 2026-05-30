import styled from "styled-components";

type Props= {
    color: string
}

export const AlterColorButtonStyled = styled.button<Props>`
    width: fit-content;
    whiteSpace: nowrap;
    padding: 12px;
    border-radius: 8px;
    border: none;

    background-color: ${({ color }) => color};

    color: white;

    font-size: 16px;
    font-weight: bold;

    cursor: pointer;

    transition: 0.2s;

    
`