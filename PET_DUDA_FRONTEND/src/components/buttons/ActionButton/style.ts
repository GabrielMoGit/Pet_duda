import styled from "styled-components";

export const ActionButtonStyled = styled.button`
    width: fit-content;
    max-width: 100%;

    padding: 12px 16px;

    border-radius: 8px;
    border: none;

    color: white;

    font-size: 16px;
    font-weight: bold;
    text-align: center;

    cursor: pointer;

    transition: 0.2s;

    /* Permite quebra de linha se necessário */
    white-space: normal;
    word-break: break-word;

    &:hover{
        opacity: 0.9;
    }

    @media (max-width: 768px){
        width: 100%;
        font-size: 14px;
        padding: 10px 14px;
    }
`;