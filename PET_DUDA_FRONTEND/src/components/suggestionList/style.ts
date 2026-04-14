import styled from "styled-components";


export const StyledSuggestionList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    listStyle: none;
    padding: 0;
    margin: 0;
    zIndex: 10;
`

export const StyledSuggestionItem = styled.li`
    padding: 8px;
    cursor: pointer;

    &:hover {
        background: #eee;
    }
`