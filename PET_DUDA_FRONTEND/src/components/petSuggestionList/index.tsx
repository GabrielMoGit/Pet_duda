import { StyledSuggestionList, StyledSuggestionItem } from "./style";

type Pet = {
    pet_Id: string
    pet_name: string
    tutor_name: string
    tutor_phone: string
}

type Props = {
    suggestions: Pet[]
    onSelect: (value: Pet) => void
    selectedIndex: number
}

export function SuggestionPetList({ suggestions, onSelect, selectedIndex} : Props){
    return(
        <StyledSuggestionList>
            {suggestions.map((item, index) => (
                <StyledSuggestionItem
                key={index}
                onClick={() => onSelect(item)}
                isSelected={index === selectedIndex}
                >
                    {item.pet_name}, {item.tutor_name}, {item.tutor_phone}
                </StyledSuggestionItem>
            ))}

        </StyledSuggestionList>
    )
}