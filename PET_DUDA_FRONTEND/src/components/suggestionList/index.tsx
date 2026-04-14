import { StyledSuggestionList, StyledSuggestionItem } from "./style";

type Props = {
    suggestions: string[]
    onSelect: (value: string) => void
    selectedIndex: number
}

export function SuggestionList({ suggestions, onSelect, selectedIndex} : Props){
    return(
        <StyledSuggestionList>
            {suggestions.map((item, index) => (
                <StyledSuggestionItem
                key={index}
                onClick={()=> onSelect(item)}
                isSelected={index === selectedIndex}
                >
                    {item}
                </StyledSuggestionItem>
            ))}

        </StyledSuggestionList>
    )
}