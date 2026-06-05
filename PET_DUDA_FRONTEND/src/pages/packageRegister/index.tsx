import { useState, useRef, useEffect } from "react"
import { GenericInputStyled } from "../../components/inputs/genericInput/styles"
import { RegisterButton } from "../../components/buttons/registerButton"
import { SuggestionPetList } from "../../components/petSuggestionList"
import { AlterColorButton } from "../../components/buttons/alterColorButton"
import { api } from '../../services/api'   
import { HiddenStyledInput } from "../../components/inputs/hiddenInput"
import { ActionButton } from "../../components/buttons/ActionButton"

export function PackageRegister(){

    type Pet = {
    pet_id: string
    pet_name: string
    tutor_name: string
    tutor_phone: string
}

    const [petName, setPetName] = useState('')  
    const [petId, setPetId] = useState('')
    const [packageType, setPackageType] = useState('')
    const [serviceDate, setServiceDate] = useState('')
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState<Pet[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)  
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [hour, setHour] = useState('')
    const [submitType, setSubmiteType] = useState('register')
    const [submitButtonName, setSubmiteButtonName] = useState('Cadastrar')
    const [showElementsALreadyHaveRegister, setShowElementsALreadyHaveRegister] = useState(false)
    const [inputIsEditable, setInputIsEditable] = useState(true)
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')
    const [thirdDate, setThirdDate] = useState('')
    const [fourthDate, setFourthDate] = useState('')
    const [showTwoMoreDatesIfRegistersIsWeekly, setShowTwoMoreDatesIfRegistersIsWeekly] = useState(false)
    const [showButtonToChangeDataOfRegister, setShowButtonToChangeDataOfRegister] = useState(false)

    const positionRef = useRef<HTMLDivElement>(null)

    const [weeklyButtonColor, setWeeklyButtonColor] = useState('grey')
    const [biWeeklyButtonColor, setBiWeeklyButtonColor] = useState('grey')


    const [firstServiceButtonsVisibility, setFirstServiceButtonsVisibility] = useState('hidden')
    const [secondServiceButtonsVisibility, setSecondServiceButtonsVisibility] = useState('hidden')
    const [thirdServiceButtonsVisibility, setThirdServiceButtonsVisibility] = useState('hidden')
    const [fourthServiceButtonsVisibility, setFourthServiceButtonsVisibility] = useState('hidden')
 

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        const hourToOnlyHour = Number(hour.slice(0,2))
        const hourToOnlyMinute = Number(hour.slice(3,5))

        if(hourToOnlyHour > 23 || hourToOnlyHour < 0 || hourToOnlyMinute < 0 || hourToOnlyMinute > 59){
            setMessage("Horário inválido")
            setTimeout(() => {setMessage("")}, 2000)
            return
        }
        

        let databaseDateForm = (serviceDate.slice(6,10) + '-' + serviceDate.slice(3,5) + '-' + serviceDate.slice(0,2) + ' ' + hourToOnlyHour + ":" + hourToOnlyMinute)
        const onlyValue = value.replace("R$", "").trim()

        if(petName === "" || packageType === "" || serviceDate === "" || value === ""){
            setMessage("Todos os campos precisam ser preenchidos")
            setTimeout(() => {setMessage("")}, 2000)
            return
        }

        try{
            if(submitType === "register"){
                 const packageResponse = await api.post('/servicePackage', {
                pet_id: petId,
                package_type: packageType,
                service_date: databaseDateForm,
                value: onlyValue
            })

            setHasError(false)
            setHasSuccess(true)
            setMessage(packageResponse.data.message)
            setTimeout(() => {setHasSuccess(false)}, 500  )
            setPetName("")
            setPackageType("")
            setWeeklyButtonColor('grey')
            setBiWeeklyButtonColor('grey')
            setServiceDate('')
            setValue("")
            setHour("")
            }
            if(submitType === "update"){

            }

        }catch(error: any){
            if(error.response){
                if(error.response.status === 400){
                    setMessage(error.response.data.error)
                    setTimeout(() => {setMessage("")}, 2000)
                    setHasSuccess(false)
                    setHasError(true)
                }
                if(error.response.status === 404){
                    setMessage(error.response.data.error)
                    setTimeout(() => {setMessage("")}, 2000)
                    setHasSuccess(false)
                    setHasError(true)
                }
                if(error.response.status === 409){
                    setMessage(error.response.data.error)
                    setTimeout(() => {setMessage("")}, 2000)
                    setHasSuccess(false)
                    setHasError(true)
                }
            }
        }
    
    }

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

            setPetId(selected.pet_id)
            setPetName(selected.pet_name)
            setShowSuggestions(false)
        }
    }
    
    useEffect(() => {
        const handleClickOutside = (e: TouchEvent) => {

            if(positionRef.current && !positionRef.current.contains(e?.target as Node)){
                setShowSuggestions(false)
            }
        }

        document.addEventListener('touchend', handleClickOutside)

        return() => {
            document.removeEventListener('touchend', handleClickOutside)
        }
    })

    const handleResetPageInfo = () => {
        setHasError(false)
        setHasSuccess(false)
        setMessage("")
        setPetName("")
        setPackageType("")
        setWeeklyButtonColor('grey')
        setBiWeeklyButtonColor('grey')
        setServiceDate('')
        setValue("")
        setHour("")
        setShowElementsALreadyHaveRegister(false)
        setSubmiteButtonName("Cadastrar")
        setShowTwoMoreDatesIfRegistersIsWeekly(false)
        setFirstServiceButtonsVisibility('hidden')
        setThirdServiceButtonsVisibility('hidden')
        setFourthServiceButtonsVisibility('hidden')
        setSecondServiceButtonsVisibility('hidden')
        setFirstDate("")
        setSecondDate("")
        setThirdDate("")
        setFourthDate("")
    }

    const controlUpdateDataButtonVisibility = async (e: React.MouseEvent<HTMLInputElement>) =>{
        const clickedInput = e.target as HTMLInputElement

        if(clickedInput.name === 'firstDate'){
            setSecondServiceButtonsVisibility('hidden')
            setThirdServiceButtonsVisibility('hidden')
            setFourthServiceButtonsVisibility('hidden')
            setFirstServiceButtonsVisibility('visible')
        }
        if(clickedInput.name === 'secondDate'){
            setFirstServiceButtonsVisibility('hidden')
            setThirdServiceButtonsVisibility('hidden')
            setFourthServiceButtonsVisibility('hidden')
            setSecondServiceButtonsVisibility('visible')
        }
        if(clickedInput.name === 'thirdDate'){
            setFirstServiceButtonsVisibility('hidden')
            setSecondServiceButtonsVisibility('hidden')
            setFourthServiceButtonsVisibility('hidden')
            setThirdServiceButtonsVisibility('visible')
        }
        if(clickedInput.name === 'fourthDate'){
            setFirstServiceButtonsVisibility('hidden')
            setSecondServiceButtonsVisibility('hidden')
            setThirdServiceButtonsVisibility('hidden')
            setFourthServiceButtonsVisibility('visible')
        }

        const button = e.target as HTMLButtonElement

        if(button.name === 'jumpFirstService'){
            

        }
    }

    return(
        <div>
            <h1>Cadastrar Pacote</h1>
            
            <form autoComplete="off" onSubmit={handleSubmit}>
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

                                    setPetName(pet.pet_name)
                                    setPetId(pet.pet_id)
                                    setShowSuggestions(false)

                                    const fetchData = async () => {
                                        try{
                                            const response = await api.get('/returnPackage', {
                                                params:{
                                                    pet_id: pet.pet_id
                                                }
                                            })
                                            if(response){
                                                console.log(response)
                                                setValue(`R$ ${response.data.packageFound.value}`)
                                                if(response.data.packageFound.package_type === 'Quinzenal'){
                                                    setShowTwoMoreDatesIfRegistersIsWeekly(false)
                                                    setShowElementsALreadyHaveRegister(true)
                                                    setWeeklyButtonColor('grey')
                                                    setBiWeeklyButtonColor('green')
                                                    setPackageType('Quinzenal')
                                                    setFirstDate(new Date(response.data.services[0].service_date).toLocaleDateString())
                                                    setSecondDate(new Date(response.data.services[1].service_date).toLocaleDateString())
                                                }
                                                if(response.data.packageFound.package_type === 'Semanal'){

                                                    setWeeklyButtonColor('green') 
                                                    setBiWeeklyButtonColor('grey')
                                                    setPackageType('Semanal')
                                                    setShowTwoMoreDatesIfRegistersIsWeekly(true)
                                                    setShowElementsALreadyHaveRegister(true)
                                                    setFirstDate(new Date(response.data.services[0].service_date).toLocaleDateString())
                                                    setSecondDate(new Date(response.data.services[1].service_date).toLocaleDateString())
                                                    setThirdDate(new Date(response.data.services[2].service_date).toLocaleDateString())
                                                    setFourthDate(new Date(response.data.services[3].service_date).toLocaleDateString())
                                                }
                                                let formattedDate = new Date(response.data.services[0].service_date)
                                                setServiceDate(formattedDate.toLocaleDateString())
                                                setHour(formattedDate.toLocaleTimeString('pt-BR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }))
                                                setSubmiteButtonName("Alterar dados do pacote")
                                                setShowElementsALreadyHaveRegister(true)
                                            }
                                        }catch{
                                            setPackageType("")
                                            setWeeklyButtonColor('grey')
                                            setBiWeeklyButtonColor('grey')
                                            setServiceDate('')
                                            setValue("")
                                            setHour("")
                                            setShowElementsALreadyHaveRegister(false)
                                            setSubmiteButtonName("Cadastrar")
                                        }
                                        
                                    }
                                    fetchData()
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
                    <AlterColorButton color={weeklyButtonColor} onClick={() => {setWeeklyButtonColor('green'), setBiWeeklyButtonColor('grey'), setPackageType('Semanal'), setShowTwoMoreDatesIfRegistersIsWeekly(true), setShowElementsALreadyHaveRegister(true)}}>
                        Semanal
                    </AlterColorButton>
                    <AlterColorButton color={biWeeklyButtonColor} onClick={() => {setBiWeeklyButtonColor('green'), setWeeklyButtonColor('grey'), setPackageType('Quinzenal'), setShowTwoMoreDatesIfRegistersIsWeekly(false), setShowElementsALreadyHaveRegister(true)}}>
                        Quinzenal
                    </AlterColorButton>
                </div>
                
                <br/>
                <div style={{width: '30%'}}>
                    <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>Valor</div>
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
                    <br/>
                <div style={{ display: 'flex', gap: '25px'}}>

                    <div style={{width: '40%'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>Data inicial</div>
                        <GenericInputStyled
                            name="serviceDate"
                            placeholder="Data de início"
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
                            }}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />
                    </div>
                    
                    <div style={{width: '30%'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>Horário</div>
                        <GenericInputStyled
                        name="hour"
                        placeholder="Hora"
                        value={hour}
                        onChange={(e) => {
                            const onlyNumbers = e.target.value.replace(/\D/g, '')
                            const limitedNumbers = onlyNumbers.slice(0, 4)


                            let formatted = limitedNumbers

                            if(limitedNumbers.length > 2){
                                formatted = limitedNumbers.slice(0,2) + ':' + limitedNumbers.slice(2,4)
                            }

                            setHour(formatted)
                        }}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                        />
                    </div>
                </div>
                <br/>
                <div >
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>1ª data</div>
                        
                        <div style={{display: 'flex', gap: '10px'}}>
                            <HiddenStyledInput
                                onClick={controlUpdateDataButtonVisibility}
                                name={"firstDate"}
                                value={firstDate}
                                readOnly={inputIsEditable}
                                isVisible={showElementsALreadyHaveRegister}
                                onChange={(e) => setFirstDate(e.target.value)}
                            />
                            <div style={{display: 'flex', gap: '5px'}}>
                                <ActionButton
                                    name={'jumpFirstService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: firstServiceButtonsVisibility as 'hidden' | 'visible', display: showElementsALreadyHaveRegister ? 'block' : 'none', backgroundColor: '#007bff', fontSize: '15px'}}
                                > Pular serviço
                                </ActionButton>
                                <ActionButton
                                    name={'rescheduleFirstService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: firstServiceButtonsVisibility as 'hidden' | 'visible', display: showElementsALreadyHaveRegister ? 'block' : 'none', backgroundColor: '#007bff', fontSize: '15px'}}
                                > Remarcar
                                </ActionButton>
                            </div>
                            
                        </div>
                    </div>
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>2ª data</div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <HiddenStyledInput
                                onClick={controlUpdateDataButtonVisibility}
                                name={"secondDate"}
                                value={secondDate}
                                readOnly={inputIsEditable}
                                isVisible={showElementsALreadyHaveRegister}
                                onChange={(e) => setSecondDate(e.target.value)}
                            />
                            <div style={{display: 'flex', gap: '5px'}}>
                                <ActionButton
                                    name={'jumpSecondService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: secondServiceButtonsVisibility as 'hidden' | 'visible', display: showElementsALreadyHaveRegister ? 'block' : 'none', backgroundColor: '#007bff', fontSize: '15px'}}
                                > Pular serviço
                                </ActionButton>
                                <ActionButton
                                    name={'rescheduleSecondService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: secondServiceButtonsVisibility as 'hidden' | 'visible', display: showElementsALreadyHaveRegister ? 'block' : 'none',backgroundColor: '#007bff', fontSize: '15px'}}
                                > Remarcar
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none'}}>3ª data</div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <HiddenStyledInput
                                onClick={controlUpdateDataButtonVisibility}
                                name={"thirdDate"}
                                value={thirdDate}
                                readOnly={inputIsEditable}
                                isVisible={showTwoMoreDatesIfRegistersIsWeekly}
                                onChange={(e) => setThirdDate(e.target.value)}
                            />
                            <div style={{display: 'flex', gap: '5px'}}>
                                <ActionButton
                                    name={'jumpThirdService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: thirdServiceButtonsVisibility as 'hidden' | 'visible', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none',backgroundColor: '#007bff', fontSize: '15px'}}
                                > Pular serviço
                                </ActionButton>
                                <ActionButton
                                    name={'rescheduleThirdService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: thirdServiceButtonsVisibility as 'hidden' | 'visible', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none', backgroundColor: '#007bff', fontSize: '15px'}}
                                > Remarcar
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none'}}>4ª data</div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <HiddenStyledInput
                                onClick={controlUpdateDataButtonVisibility}
                                name={"fourthDate"}
                                value={fourthDate}
                                readOnly={inputIsEditable}
                                isVisible={showTwoMoreDatesIfRegistersIsWeekly}
                                onChange={(e) => setFourthDate(e.target.value)}
                            />
                            <div style={{display: 'flex', gap: '5px'}}>
                                <ActionButton
                                    name={'jumpFourthService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: fourthServiceButtonsVisibility as 'hidden' | 'visible', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none', backgroundColor: '#007bff', fontSize: '15px'}}
                                > Pular serviço
                                </ActionButton>
                                <ActionButton
                                    name={'rescheduleFourthService'}
                                    onClick={(e) => {
                                    }}
                                    style={{visibility: fourthServiceButtonsVisibility as 'hidden' | 'visible', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none', backgroundColor: '#007bff', fontSize: '15px'}}
                                > Remarcar
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <br/>
                <div style={{display: 'flex', gap: '25px'}}>
                    <RegisterButton
                        type='submit' 
                    >
                        {submitButtonName}
                    </RegisterButton>
                    
                    <ActionButton
                        name={'CancelButton'}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleResetPageInfo()
                        }}
                        style={{display: showElementsALreadyHaveRegister  ? 'block' : 'none', backgroundColor: 'red'}}
                    >
                        Cancelar
                    </ActionButton>
                </div>
                <p style={{ color: 'red' }}>{message}</p>
            </form>
        </div>
    )
}