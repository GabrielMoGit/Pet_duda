import { StyledSuggestionList, StyledSuggestionItem } from "./style";

type Props = {
    suggestions: string[]
    onSelect: (value: string) => void
}

export function SuggestionList({ suggestions, onSelect} : Props){
    return(
        <StyledSuggestionList>
            {suggestions.map((item, index) => (
                <StyledSuggestionItem
                key={index}
                onClick={()=> onSelect(item)}
                >
                    {item}
                </StyledSuggestionItem>
            ))}

        </StyledSuggestionList>
    )
}