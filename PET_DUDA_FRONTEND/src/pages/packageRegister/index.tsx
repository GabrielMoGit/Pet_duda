import { useState, useRef, useEffect } from "react"
import { GenericInputStyled } from "../../components/inputs/genericInput/styles"
import { RegisterButton } from "../../components/buttons/registerButton"
import { SuggestionPetList } from "../../components/petSuggestionList"
import { AlterColorButton } from "../../components/buttons/alterColorButton"
import { api } from '../../services/api'   
import { CancelButton } from "../../components/buttons/cancelButton"

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
    const [submitButtonName, setSubmiteButtonName] = useState('cadastrar')

    const positionRef = useRef<HTMLDivElement>(null)

    const [weeklyButtonColor, setWeeklyButtonColor] = useState('grey')
    const [biWeeklyButtonColor, setBiWeeklyButtonColor] = useState('grey')


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
                                        const response = await api.get('/returnPackage', {
                                            params:{
                                                pet_id: pet.pet_id
                                            }
                                        })
                                        if(response){
                                            setValue(`R$ ${response.data.packageFound.value}`)
                                            if(response.data.packageFound.package_type === 'Quinzenal'){
                                                setWeeklyButtonColor('grey')
                                                setBiWeeklyButtonColor('green')
                                                setPackageType('Quinzenal')
                                            }
                                            
                                            let formattedDate = new Date(response.data.firstService.service_date)
                                            setServiceDate(formattedDate.toLocaleDateString())
                                            setHour(formattedDate.toLocaleTimeString('pt-BR', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            }))
                                            setSubmiteButtonName("Alterar dados do pacote")
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
                    <AlterColorButton type="button" color={weeklyButtonColor} onClick={() => {setWeeklyButtonColor('green'), setBiWeeklyButtonColor('grey'), setPackageType('Semanal')}}>
                        Semanal
                    </AlterColorButton>
                    <AlterColorButton type="button" color={biWeeklyButtonColor} onClick={() => {setBiWeeklyButtonColor('green'), setWeeklyButtonColor('grey'), setPackageType('Quinzenal')}}>
                        Quinzenal
                    </AlterColorButton>
                </div>
                
                <br/>
                <div style={{width: '60%'}}>
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
                            }}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />
                    </div>
                    <br/>
                <div style={{ display: 'flex', gap: '25px'}}>
                    
                    <div style={{width: '30%'}}>
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
                    <div style={{width: '30%'}}>
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
                <div style={{display: 'flex', gap: '25px'}}>
                    <RegisterButton
                        type='submit' 
                    >
                        {submitButtonName}
                    </RegisterButton>
                    <CancelButton
                        type="button"    
                    >
                        Cancelar
                    </CancelButton>
                </div>
                
                <p style={{ color: 'red' }}>{message}</p>
            </form>
        </div>
    )
}