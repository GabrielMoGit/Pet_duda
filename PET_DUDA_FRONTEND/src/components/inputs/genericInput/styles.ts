import styled from "styled-components";

export const GenericInputStyled = styled.input<{hasError: boolean, hasSuccess: boolean}>`
    display: block;
    width: 96%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.hasError ? 'red' : props.hasSuccess ? '#22c55e' : '#ccc'};
    font-size: 16px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }

`