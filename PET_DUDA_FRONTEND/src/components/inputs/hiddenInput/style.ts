import styled from "styled-components";

export const HiddenInputStyled = styled.input`
    display: block;
    width: 80%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #cccc;
    font-size: 16px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

`