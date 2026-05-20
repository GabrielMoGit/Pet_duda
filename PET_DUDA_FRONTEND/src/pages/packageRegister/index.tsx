import { useState, useRef, useEffect } from "react"
import { GenericInputStyled } from "../../components/inputs/genericInput/styles"
import { RegisterButton } from "../../components/buttons/registerButton"
import { SuggestionPetList } from "../../components/petSuggestionList"
import { AlterColorButton } from "../../components/buttons/alterColorButton"
import { api } from '../../services/api'   

export function PackageRegister(){

    type Pet = {
    pet_Id: string
    pet_name: string
    tutor_name: string
    tutor_phone: string
}

    const [petName, setPetName] = useState('')  
    const [packageType, setPackageType] = useState('')
    const [serviceDate, setServiceDate] = useState('')
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<Pet[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)  
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)
    const positionRef = useRef<HTMLDivElement>(null)
    const [weeklyButtonColor, setWeeklyButtonColor] = useState('grey')
    const [biWeeklyButtonColor, setBiWeeklyButtonColor] = useState('grey')

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value

        setPetName(text)

        setSelectedIndex(-1)

        const response = await api.get("/listPetsAndRespectiveTutors")
 
        const filteredPets = response.data.petAndTutorData.filter((item: Pet) => item.pet_name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))



        setSuggestions(filteredPets)
        setShowSuggestions(true)
        return

    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
       
        if(!showSuggestions){
            return
        }
        if(e.key === 'ArrowDown'){
            setSelectedIndex(prev => prev <suggestions.length - 1 ? prev + 1 : prev)
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()

            setSelectedIndex(prev => {
                if (prev === -1) return suggestions.length - 1 
                if (prev > 0) return prev - 1 
                return 0 
            })
        }
        if(e.key === 'Enter'){
            e.preventDefault()
            const selected = suggestions[selectedIndex]

            setPetName(selected.pet_name)
            setShowSuggestions(false)
        }
    }
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(positionRef.current && !positionRef.current.contains(e?.target as Node)
                ){
                    setShowSuggestions(false)
                }
            }

            document.addEventListener('mousedown', handleClickOutside)

            return() => {
                document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return(
        <div>
            <h1>Cadastrar Pacote</h1>
            
            <form autoComplete="off">
                <div style={{ display: 'flex', gap: '10px'}}>
                    <div 
                        style={{ position: "relative", flex: 1, width: '62%' }} 
                        onKeyDown={handleKeyDown}
                        ref={positionRef}
                    >
                        <GenericInputStyled
                            name="petName"
                            placeholder="Nome do Pet"
                            value={petName}
                            onChange={handleChange}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />

                        {showSuggestions && suggestions.length > 0 && (
                            <SuggestionPetList
                                suggestions={suggestions}
                                selectedIndex={selectedIndex}
                                onSelect={(pet) => {

                                    setPetName(petName)
                                    setShowSuggestions(false)
                                }}
                            />
                        )}
                        
                    </div>
                </div>
                
                <br/>
                Tipo do Pacote
                <br/>
                <br/>
                <div style={{ display: 'flex', gap: '10px'}}>
                    <AlterColorButton type="button" color={weeklyButtonColor} onClick={() => {setWeeklyButtonColor('blue'), setBiWeeklyButtonColor('grey'), setPackageType('Semanal')}}>
                        Semanal
                    </AlterColorButton>
                    <AlterColorButton type="button" color={biWeeklyButtonColor} onClick={() => {setBiWeeklyButtonColor('blue'), setWeeklyButtonColor('grey'), setPackageType('Quinzenal')}}>
                        Quinzenal
                    </AlterColorButton>
                </div>
                
                <br/>
                <div style={{ display: 'flex', gap: '25px'}}>
                    <div style={{width: '20%'}}>
                        <GenericInputStyled
                            name="serviceDate"
                            placeholder="Data inicial do pacote"
                            value={serviceDate}
                            onChange={(e) => {
                                const onlyNumbers = e.target.value.replace(/\D/g, '')
                                const limitedNumbers = onlyNumbers.slice(0, 8)

                                let formatted = limitedNumbers
                                

                                if(limitedNumbers.length > 2){
                                    limitedNumbers.slice(0,2) + '/' + limitedNumbers.slice(2)

                                }
                                if(limitedNumbers.length > 4){
                                    formatted = limitedNumbers.slice(0,2) + '/' + limitedNumbers.slice(2,4) + '/' + limitedNumbers.slice(4,8)
                                }
                                
                                setServiceDate(formatted)
                                let databaseDateForm = (formatted.slice(6,10)+ '-' + formatted.slice(3,5) + '-' + formatted.slice(0,2))
                            }}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />
                    </div>
                    <div style={{width: '20%'}}>
                        <GenericInputStyled
                            name="value"
                            placeholder="Valor"
                            value={value}
                            onChange={(e) => { 
                                const onlyNumbers = e.target.value.replace(/\D/g, '')
                                const value = Number(onlyNumbers) / 100
                                const formatted = value.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                })

                                setValue(formatted)}}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />
                    </div>
                </div>
                <br/>
                <RegisterButton
                    type='submit'>Cadastrar
                </RegisterButton>
            </form>
        </div>
    )
}