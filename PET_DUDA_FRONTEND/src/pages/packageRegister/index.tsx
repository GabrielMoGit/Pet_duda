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


    const [packageStatus, setPackageStatus] = useState(1)
    const [petName, setPetName] = useState('')  
    const [petId, setPetId] = useState('')
    const [packageId, setPackageId] = useState()
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
    const [description, setDescription] = useState('')
    const [submitType, setSubmiteType] = useState('register')
    const [submitButtonName, setSubmiteButtonName] = useState('Cadastrar')
    
    
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')
    const [thirdDate, setThirdDate] = useState('')
    const [fourthDate, setFourthDate] = useState('')
    const [showTwoMoreDatesIfRegistersIsWeekly, setShowTwoMoreDatesIfRegistersIsWeekly] = useState(false)

    const [showElementsALreadyHaveRegister, setShowElementsALreadyHaveRegister] = useState(false)
    const [showElementsAlreadyHaveUnicService, setShowElementsAlreadyHaveUnicService] = useState(false)

    const positionRef = useRef<HTMLDivElement>(null)

    const [weeklyButtonColor, setWeeklyButtonColor] = useState('grey')
    const [biWeeklyButtonColor, setBiWeeklyButtonColor] = useState('grey')  
    const [packageDataButtonColor, setPackageDataButtonColor] = useState('grey')
    const [unicDataButtonColor, setUnicDataButtonColor] = useState('grey')

    const [initialOrReferenceDate, setInitialOrReferenceDate] = useState('Data de início')

    const [dataType, setDataType] = useState('')

    const[referenceDate, setReferenceDate] = useState<Date>()

    const [petAlreadyhavePackage, setPetAlreadyhavePackage] = useState(false)

 

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        const hourToOnlyHour = Number(hour.slice(0,2))
        const hourToOnlyMinute = Number(hour.slice(3,5))
        const onlyValue = value.replace("R$", "").trim()

        if(packageStatus === 1){
            if(hourToOnlyHour > 23 || hourToOnlyHour < 0 || hourToOnlyMinute < 0 || hourToOnlyMinute > 59 || hour.length < 5){
                setMessage("Horário inválido")
                setTimeout(() => {setMessage("")}, 2000)
                return
            }
            
            if(serviceDate.length < 10){
                setMessage("Data inválida")
                setTimeout(() => {setMessage("")}, 2000)
                return
            }
            if(dataType === "package"){
                if(petName === "" || packageType === "" || serviceDate === "" || value === ""){
                    setMessage("Todos os campos precisam ser preenchidos")
                    setTimeout(() => {setMessage("")}, 2000)
                    return
                }
            }
            if(dataType === "unic"){
                if(petName === "" || serviceDate === "" || value === ""){
                    setMessage("Todos os campos precisam ser preenchidos")
                    setTimeout(() => {setMessage("")}, 2000)
                    return
                }
            }
        }

        
        try{
            if(submitType === "register"){

                const databaseDateForm = (serviceDate.slice(6,10) + '-' + serviceDate.slice(3,5) + '-' + serviceDate.slice(0,2) + ' ' + hourToOnlyHour + ":" + hourToOnlyMinute)

                const packageResponse = await api.post('/servicePackage', {
                pet_id: petId,
                service_description: description,
                package_type: packageType,
                service_date: databaseDateForm,
                value: onlyValue
                })

                setHasError(false)
                setHasSuccess(true)
                setMessage(packageResponse.data.message)
                setTimeout(() => {setHasSuccess(false)}, 500)
                setPackageType("")
                setWeeklyButtonColor('grey')
                setBiWeeklyButtonColor('grey')
                setServiceDate('')
                setValue("")
                setHour("")
                setDescription('')

                loadPackageData(petId, dataType)
                
            }
            if(submitType === "update"){

                let servicesDates: String [] = []
                let arrayDatabaseDataForm: String [] = []
                if(packageType === "Semanal"){
                    servicesDates.push(firstDate)
                    servicesDates.push(secondDate)
                    servicesDates.push(thirdDate)
                    servicesDates.push(fourthDate)
                }
                if(packageType === "Quinzenal"){
                    servicesDates.push(firstDate)
                    servicesDates.push(secondDate)
                }

                for(const item of servicesDates){
                    let databaseDateForm = (item.slice(6,10) + '-' + item.slice(3,5) + '-' + item.slice(0,2) + ' ' + item.slice(13,18))
                    arrayDatabaseDataForm.push(databaseDateForm)
                }

                for(const item of arrayDatabaseDataForm){
                    if(item.length < 16){
                        setMessage("As datas precisam estar corretas")
                        setTimeout(() => {setMessage("")}, 2000)
                        return
                    }
                }

                let databaseDateForm: any 

                if(packageType === "Único"){
                    databaseDateForm = (serviceDate.slice(6,10) + '-' + serviceDate.slice(3,5) + '-' + serviceDate.slice(0,2) + ' ' + hourToOnlyHour + ":" + hourToOnlyMinute)
                }
                else{
                    const lastPackagesService = arrayDatabaseDataForm.at(-1)

                    databaseDateForm = (serviceDate.slice(6,10) + '-' + serviceDate.slice(3,5) + '-' + serviceDate.slice(0,2) + ' ' + lastPackagesService?.slice(11,18))
                }
                
                const packageResponse = await api.patch('/updatePackage', {
                id: packageId,
                package_type: packageType,
                value: onlyValue,
                active_package: packageStatus,
                reference_date: databaseDateForm, 
                service_description: description,
                dates: arrayDatabaseDataForm,
                })
                
                setHasError(false)
                setHasSuccess(true)
                setMessage(packageResponse.data.message)
                setTimeout(() => {setHasSuccess(false)}, 500)
            }
            if(submitType === "cancelService"){

                const canceledService = await api.delete('/deleteService',{
                    data: {
                        package_id: packageId
                    }
                })

                setMessage(canceledService.data.message)
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
        setShowElementsAlreadyHaveUnicService(false)
        setSubmiteButtonName("Cadastrar")
        setShowTwoMoreDatesIfRegistersIsWeekly(false)
        setFirstDate("")
        setSecondDate("")
        setThirdDate("")
        setFourthDate("")
        setSubmiteType("register")
        setReferenceDate(undefined)
        setPetAlreadyhavePackage(false)
        setPackageStatus(1)
        setDescription('')
    }


    const changeServiceRangeToWeekly = () => {

        if(packageType === "Quinzenal" && referenceDate !== undefined){
            setShowTwoMoreDatesIfRegistersIsWeekly(true)

            let thirddHour = ''
            let fourthHour = ''

            if(thirdDate === ""){
                thirddHour = secondDate.slice(10, 18)
                fourthHour = thirddHour
            }
            else{
                thirddHour = thirdDate.slice(10, 18)
                fourthHour = fourthDate.slice(10, 18)
            }

            const secondHour = secondDate.slice(10, 18)
            const newSecondDate = new Date(referenceDate!)
            newSecondDate.setDate(newSecondDate.getDate() + 7)
            setSecondDate((newSecondDate.toLocaleDateString() + secondHour))

            const newThirdDate = new Date(newSecondDate)
            newThirdDate.setDate(newThirdDate.getDate() + 7)
            setThirdDate(newThirdDate.toLocaleDateString() + thirddHour)

            const newFourthDate = new Date(newThirdDate)
            newFourthDate.setDate(newFourthDate.getDate() + 7)
            setFourthDate(newFourthDate.toLocaleDateString() + fourthHour)
        }   
    }

    const changeServiceRangeToBiWeekly = () => {

        if(packageType === "Semanal" && referenceDate !== undefined){
            setShowTwoMoreDatesIfRegistersIsWeekly(false)

            const secondHour = secondDate.slice(10, 18)
            const newSecondDate = new Date(referenceDate!)
            newSecondDate.setDate(newSecondDate.getDate() + 14)
            setSecondDate((newSecondDate.toLocaleDateString() + secondHour))
        }
    }

    async function loadPackageData(pet_id: string, data_type: string) {

    try {

        const response = await api.get('/returnPackage', {
            params: {
                pet_id,
                data_type
            }
        })

        if(response.data.packageFound.package_type === 'Único'){
            setPetAlreadyhavePackage(false)
            setShowElementsALreadyHaveRegister(false)
            setInitialOrReferenceDate('Data do serviço')
            setDescription(response.data.packageFound.service_description)
            setShowElementsAlreadyHaveUnicService(true)
        }
        else{
            setPetAlreadyhavePackage(true)
            setInitialOrReferenceDate('Início do próximo pacote')
        }

        setValue(`R$ ${response.data.packageFound.value}`)
        setSubmiteType('update')
        setPackageId(response.data.packageFound.id)
        setPackageStatus(response.data.packageFound.active_package)
        setReferenceDate(response.data.services[0].service_date)
        setPetName(response.data.packageFound.pet_name)

        if(response.data.packageFound.package_type === 'Quinzenal'){
            setShowTwoMoreDatesIfRegistersIsWeekly(false)
            setShowElementsALreadyHaveRegister(true)
            setWeeklyButtonColor('grey')
            setBiWeeklyButtonColor('green')
            setPackageType('Quinzenal')
            setFirstDate(
                new Date(response.data.services[0].service_date).toLocaleDateString('pt-BR')
                + ' - '
                + new Date(response.data.services[0].service_date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            )

            setSecondDate(new Date(response.data.services[1].service_date).toLocaleDateString('pt-BR')
                + ' - '
                + new Date(response.data.services[1].service_date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            )
                                         
            setThirdDate('')
            setFourthDate('')
        }

        if(response.data.packageFound.package_type === 'Semanal'){
            setWeeklyButtonColor('green') 
            setBiWeeklyButtonColor('grey')
            setPackageType('Semanal')
            setShowTwoMoreDatesIfRegistersIsWeekly(true)
            setShowElementsALreadyHaveRegister(true)

            setFirstDate(
                new Date(response.data.services[0].service_date).toLocaleDateString('pt-BR')
                + ' - '
                + new Date(response.data.services[0].service_date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            )

            setSecondDate(new Date(response.data.services[1].service_date).toLocaleDateString('pt-BR')
                + ' - '
                + new Date(response.data.services[1].service_date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            )
            setThirdDate(new Date(response.data.services[2].service_date).toLocaleDateString('pt-BR')
                + ' - '
                + new Date(response.data.services[2].service_date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            )
            setFourthDate(new Date(response.data.services[3].service_date).toLocaleDateString('pt-BR')
                + ' - '
                + new Date(response.data.services[3].service_date).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            )
        }

        let formattedDate = new Date(response.data.packageFound.reference_date)

        setServiceDate(formattedDate.toLocaleDateString())
        setHour(
            formattedDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            })
        )

        setSubmiteButtonName("Alterar")
        

    } catch {
        if(packageType !== "Único"){
            setPackageType("")
        }
        setWeeklyButtonColor('grey')
        setBiWeeklyButtonColor('grey')
        setServiceDate('')
        setValue("")
        setHour("")
        setShowElementsALreadyHaveRegister(false)
        setSubmiteButtonName("Cadastrar")
        setFirstDate('')
        setSecondDate('')
        setThirdDate('')
        setFourthDate('')
        setShowElementsALreadyHaveRegister(false)
        setShowTwoMoreDatesIfRegistersIsWeekly(false)
        setPetAlreadyhavePackage(false)
        setDescription('')
        setShowElementsAlreadyHaveUnicService(false)
        setSubmiteType('register')
    }
}



function inputFormattedToDateTime(date: string){


    const onlyNumbers = date.replace(/\D/g, '')
    const limitedNumbers = onlyNumbers.slice(0, 12)

    let formatted = limitedNumbers
    

    if(limitedNumbers.length > 2){
        formatted = limitedNumbers.slice(0,2) + '/' + limitedNumbers.slice(2)

    }
    if(limitedNumbers.length > 4){
        formatted = limitedNumbers.slice(0,2) + '/' + limitedNumbers.slice(2,4) + '/' + limitedNumbers.slice(4,8)
    }
    if(limitedNumbers.length > 8){
        formatted = limitedNumbers.slice(0,2) + '/' + limitedNumbers.slice(2,4) + '/' + limitedNumbers.slice(4,8) + ' - ' + limitedNumbers.slice(8, 10)
    }
    if(limitedNumbers.length > 10){
        formatted = limitedNumbers.slice(0,2) + '/' + limitedNumbers.slice(2,4) + '/' + limitedNumbers.slice(4,8) + ' - ' + limitedNumbers.slice(8, 10) + ':' + limitedNumbers.slice(10, 12)
    }

    return formatted

}

    return(
        <div>
            <h1>Gerenciar atendimentos</h1>
            <div style={{ display: 'flex', gap: '10px'}}>
                <AlterColorButton color={packageDataButtonColor} 
                    onClick={() => {
                        setUnicDataButtonColor('grey')
                        setPackageDataButtonColor('green')
                        handleResetPageInfo()
                        setInitialOrReferenceDate('Data de início')
                        setDataType('package')
                    }}>
                        Pacotes
                </AlterColorButton>
                <AlterColorButton color={unicDataButtonColor} 
                    onClick={() => {
                        setPackageDataButtonColor('grey')
                        setUnicDataButtonColor('green')
                        handleResetPageInfo()
                        setDataType('unic')
                        setPackageType('Único')
                        setInitialOrReferenceDate('Data do serviço')
                    }}>
                        Atendimentos únicos
                </AlterColorButton>
            </div>
            <br/>
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

                                    loadPackageData(pet.pet_id, dataType)
                                }}
                            />
                        )}
                        
                    </div>  
                </div>
                <br/>
                <div style={{display: dataType === 'package' ? 'block' : 'none'}}>
                    Tipo do Atendimento
                    <br/>
                    <br/>
                    <div style={{ display: 'flex', gap: '10px'}}>
                        <AlterColorButton color={weeklyButtonColor} 
                            onClick={() => {

                                if(petAlreadyhavePackage){
                                    setShowTwoMoreDatesIfRegistersIsWeekly(true)
                                    setShowElementsALreadyHaveRegister(true)
                                }
                                setWeeklyButtonColor('green')
                                setBiWeeklyButtonColor('grey')
                                setPackageType('Semanal')
                                
                                changeServiceRangeToWeekly()
                            }}>
                                Semanal
                        </AlterColorButton>
                        <AlterColorButton color={biWeeklyButtonColor} 
                            onClick={() => {
                                
                                if(petAlreadyhavePackage){
                                    setShowElementsALreadyHaveRegister(true)
                                }

                                setBiWeeklyButtonColor('green')
                                setWeeklyButtonColor('grey')
                                setPackageType('Quinzenal')
                                setShowTwoMoreDatesIfRegistersIsWeekly(false)
                                changeServiceRangeToBiWeekly()
                            }}>
                            Quinzenal
                        </AlterColorButton>
                    </div>
                </div>
                
                
                <br/>
                    <div style={{width: '30%'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister || showElementsAlreadyHaveUnicService ? 'block' : 'none'}}>Valor</div>
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
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister || showElementsAlreadyHaveUnicService ? 'block' : 'none'}}>{initialOrReferenceDate}</div>
                        <GenericInputStyled
                            name="serviceDate"
                            placeholder= {initialOrReferenceDate}
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
                    
                    <div style={{width: '30%', display: petAlreadyhavePackage ? 'none' : 'block'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister || showElementsAlreadyHaveUnicService ? 'block' : 'none'}}>Horário</div>
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
                <div style={{display: dataType === "unic" ? 'block' : 'none'}}>
                    <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsAlreadyHaveUnicService ? 'block' : 'none'}}>Descrição</div>
                    <GenericInputStyled
                        name="description"
                        placeholder="Descrição do Serviço"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                </div>
                
                <br/>
                <div >
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>1ª data</div>
                        <HiddenStyledInput
                            name={"firstDate"}
                            value={firstDate}
                            readOnly={false}
                            isVisible={showElementsALreadyHaveRegister}
                            onChange={(e) => {setFirstDate(inputFormattedToDateTime(e.target.value))}}
                        />
                    </div>
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showElementsALreadyHaveRegister  ? 'block' : 'none'}}>2ª data</div>
                        <HiddenStyledInput
                            name={"secondDate"}
                            value={secondDate}
                            readOnly={false}
                            isVisible={showElementsALreadyHaveRegister}
                            onChange={(e) => {setSecondDate(inputFormattedToDateTime(e.target.value))}}
                        />
                    </div>
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none'}}>3ª data</div>
                        <HiddenStyledInput
                            name={"thirdDate"}
                            value={thirdDate}
                            readOnly={false}
                            isVisible={showTwoMoreDatesIfRegistersIsWeekly}
                            onChange={(e) => {setThirdDate(inputFormattedToDateTime(e.target.value))}}
                        />
                    </div>
                    <div style={{marginBottom: '3px'}}>
                        <div style={{marginLeft: '10px', marginBottom: '3px', fontSize: '15px', display: showTwoMoreDatesIfRegistersIsWeekly  ? 'block' : 'none'}}>4ª data</div>
                        <HiddenStyledInput
                            name={"fourthDate"}
                            value={fourthDate}
                            readOnly={false}
                            isVisible={showTwoMoreDatesIfRegistersIsWeekly}
                            onChange={(e) => {setFourthDate(inputFormattedToDateTime(e.target.value))}}
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
                    
                    <ActionButton
                        name={'CancelButton'}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleResetPageInfo()
                        }}
                        style={{display: showElementsALreadyHaveRegister || showElementsAlreadyHaveUnicService ? 'block' : 'none', backgroundColor: 'red'}}
                    >
                        Cancelar Alteração
                    </ActionButton>
                    <ActionButton
                        name={'CancelButton'}
                        type={'submit'}
                        onClick={(e) => {
                            if(dataType === "package"){
                                setPackageStatus(0)
                            }
                            if(dataType === "unic"){
                                setSubmiteType('cancelService')
                            }
                            setMessage("Pacote cancelado")
                            setTimeout(() => {setMessage(""), window.location.reload()}, 1000)
                            
                        }}
                        style={{display: showElementsALreadyHaveRegister || showElementsAlreadyHaveUnicService ? 'block' : 'none', backgroundColor: 'red'}}
                    >
                        Cancelar Pacote
                    </ActionButton>
                </div>
                <p style={{ color: 'red' }}>{message}</p>
            </form>
        </div>
    )
}