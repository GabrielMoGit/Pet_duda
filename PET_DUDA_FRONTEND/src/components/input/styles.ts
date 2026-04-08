import styled from "styled-components";

export const InputStyled = styled.input`
    width: 30%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`