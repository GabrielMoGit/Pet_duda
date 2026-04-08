import styled from "styled-components";

export const InputStyled = styled.input<{hasError: boolean, hasSuccess: boolean}>`
    width: 30%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.hasError ? 'red' : props.hasSuccess ? '#22c55e' : '#ccc'};
    font-size: 16px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

`