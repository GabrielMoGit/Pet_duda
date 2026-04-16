import { GenericStyledInput } from '../../components/inputs/genericInput'
import { RegisterButton } from '../../components/buttons/registerButton'
import { SuggestionList } from '../../components/suggestionList'
import { useState, useRef, useEffect } from 'react'
import { api } from '../../services/api'

export function TutorRegister(){

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)

    //variables for interactive input to search streets
    const [streetTyped, setStreetTyped] = useState("")
    const [streetSuggestions, setStreetSuggestions] = useState([])
    const [showStreetSuggestions, setStreetShowSuggestions] = useState(false)

    //variables for interactive input to search neighborhoods
    const [neighborhoodTyped, setNeighborhoodTyped] = useState("")
    const [neighborhoodSuggestions, setNeighborhoodSuggestions] = useState([])
    const [showNeighborhoodSuggestions, setShowNeighborhoodSuggestions] = useState(false)

    //Position reference to know where de click happens
    const positionRef = useRef<HTMLDivElement>(null)

    //Initial state to know wich item is been selected, "-1" = none selected
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
       
        let selectedList: string[] = []
        let selection = ""
        
        if((e.currentTarget as HTMLDivElement).dataset.type === "neighborhood"){
            selectedList = neighborhoodSuggestions
            selection = "neighborhood"
            
        }
        if((e.currentTarget as HTMLDivElement).dataset.type === "street"){
            selectedList = streetSuggestions
            selection = "street"
        }

        if(!showStreetSuggestions && !showNeighborhoodSuggestions) {
            return
        }
        if(e.key === 'ArrowDown'){
            setSelectedIndex(prev => prev <selectedList.length - 1 ? prev + 1 : prev)
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()

            setSelectedIndex(prev => {
                if (prev === -1) return selectedList.length - 1 
                if (prev > 0) return prev - 1 
                return 0 
            })
        }
        if(e.key === 'Enter'){
            e.preventDefault()
                
            if(selectedIndex >= 0){
                const selected = selectedList[selectedIndex]
                if(selection === "street"){
                    setStreetTyped(selected)
                    setStreetShowSuggestions(false)
                }
                else if(selection === "neighborhood"){
                    setNeighborhoodTyped(selected)
                    setShowNeighborhoodSuggestions(false)
                }             
            }
        }
    }

    //function do identify where the click mouse happens
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(positionRef.current && !positionRef.current.contains(event?.target as Node)
            ){
                setStreetShowSuggestions(false)
                setShowNeighborhoodSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return() => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const text = e.target.value

        let route = ''

        if(e.target.name === "street"){
            setStreetTyped(text)
            route = 'listStreets'
        }
        if(e.target.name === "neighborhood"){
            setNeighborhoodTyped(text)
            route = 'listNeighborhood'
        }

        setSelectedIndex(-1)

        try{
            const response = await api.get(route,{
                params: {name: text}
            })

            const dataBaseResponse = response.data.filter((content: string) => content.toLowerCase().includes(text.toLowerCase()))

            if(e.target.name === "street"){
            setStreetSuggestions(dataBaseResponse)
            setStreetShowSuggestions(true)
                if(text.trim() === "") {
                    setStreetSuggestions([])
                    setStreetShowSuggestions(false)
                    return
                }
            }
            if(e.target.name === "neighborhood"){
                setNeighborhoodSuggestions(dataBaseResponse)
                setShowNeighborhoodSuggestions(true)
                if(text.trim() === ""){
                    setNeighborhoodSuggestions([])
                    setShowNeighborhoodSuggestions(false)
                    return
                }
            }
            
                
        }catch{ } 
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        const cleanPhone = phone.replace(/\D/g, '')

        try{

            const streetResponse = await api.post('/street', {
                name: streetTyped
            })

            const tutorResponse = await api.post('/tutor',{
                name,
                phone: cleanPhone
            })

            setHasSuccess(true)
            setMessage(tutorResponse.data.message)
            setTimeout(() => setHasSuccess(false), 500)
            setName('')
            setPhone('')
        }
        catch(error: any){
            if(error.response){
                if(error.response.status === 400){
                    setMessage(error.response.data.error)
                    setTimeout(() => {setMessage("")}, 2000)
                    setHasError(true)
                    setTimeout(() => setHasError(false), 500)
                }else{
                    setMessage('Erro ao cadastrar tutor')
                    setTimeout(() => {setMessage("")}, 4000)
                }
            }   
            else{
                setMessage("Erro de conexão com o servidor")
                setTimeout(() => {setMessage("")}, 4000)
            }
        }
    }

    return (
        <div>
            <h1>Cadastrar Tutor</h1>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '10px'}}>
                <GenericStyledInput 
                name="name"
                placeholder="Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                hasError={hasError}
                hasSuccess={hasSuccess}
                />
                <GenericStyledInput 
                name="phone"
                placeholder="telefone" 
                value = {phone}
                onChange={(e) =>{
                    const onlyNumbers = e.target.value.replace(/\D/g, '')
                    const limitedNumbers = onlyNumbers.slice(0, 11)

                    let formatted = limitedNumbers

                    if(limitedNumbers.length > 0){
                        formatted = '(' + limitedNumbers
                    }

                    if(limitedNumbers.length > 2){
                        formatted = '(' + limitedNumbers.slice(0,2) + ')' + limitedNumbers.slice(2)
                    }

                    if(limitedNumbers.length > 7){
                        formatted = '(' + limitedNumbers.slice(0,2) + ')' + limitedNumbers.slice(2,7) + '-' + limitedNumbers.slice(7)
                    }
                    setPhone(formatted)
                }}
                
                hasError={hasError}
                hasSuccess={hasSuccess}
                />
                </div>
                <br />
                <div style={{ display: 'flex', gap: '10px'}}>
                    <div 
                        data-type="street"
                        style={{ position: "relative", flex: 1, width: '100%' }} 
                        onKeyDown={handleKeyDown}
                        ref={positionRef}
                    >
                        <GenericStyledInput 
                            name="street"
                            placeholder="Rua" 
                            value={streetTyped}
                            onChange={handleChange}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />

                        {showStreetSuggestions && streetSuggestions.length > 0 && (
                            <SuggestionList  
                                suggestions={streetSuggestions}
                                selectedIndex={selectedIndex}
                                onSelect={(street) => {
                                    setStreetTyped(street)
                                    setStreetShowSuggestions(false)
                                }}
                            />
                        )}
                    </div>

                    <div
                        data-type="neighborhood"
                        style={{ position: "relative", flex: 1, width: '100%' }} 
                        onKeyDown={handleKeyDown}
                        ref={positionRef}
                    >
                        <div style={{ flex: 1, width: '100%' }}>
                        <GenericStyledInput 
                            name="neighborhood"
                            placeholder="Bairro" 
                            value={neighborhoodTyped}
                            onChange={handleChange}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />

                            {showNeighborhoodSuggestions && neighborhoodSuggestions.length > 0 && (
                                <SuggestionList  
                                    suggestions={neighborhoodSuggestions}
                                    selectedIndex={selectedIndex}
                                    onSelect={(neighborhood) => {
                                        setNeighborhoodTyped(neighborhood)
                                        setShowNeighborhoodSuggestions(false)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    

                </div>

                <p style={{ color: 'red' }}>{message}</p>
                <div style={{display: 'flex', gap: '10px'}}>
                    <RegisterButton 
                    type="submit">Cadastrar
                    </RegisterButton>
                </div>
            </form>
        </div>
    )
}