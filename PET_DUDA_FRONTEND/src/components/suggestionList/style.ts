import styled from "styled-components";

type Props = {
    isSelected: boolean
}

export const StyledSuggestionList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;

    width: 100%

    background: #fff;
    border: 1px solid #ccc;

    list-style: none;
    padding: 0;
    margin: 0;

    z-index: 10;
`

export const StyledSuggestionItem = styled.li<Props>`

    padding: 8px;
    list-style: none;
    cursor: pointer;

    background-color: ${({ isSelected }) =>
        isSelected ? '#a2a2a2' : '#fff'};

    &:hover {
        background: #a2a2a2;
    }
`