import { GenericStyledInput } from '../../components/inputs/genericInput'
import { RegisterButton } from '../../components/buttons/registerButton'
import { HiddenInputStyled } from '../../components/inputs/hiddenInput/style'
import { ActionButton } from '../../components/buttons/ActionButton'
import { useState } from 'react'
import { api } from '../../services/api'

export function PetRegister(){

    type Pets = {
        id: string,
        id_tutor: string,
        name: string
    }

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)
    const [selectedPetId, setSelectedPetId] = useState("")
    const [petList, setPetList] = useState<Pets[]>([])

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()
        
        const cleanPhone = phone.replace(/\D/g, '')
        try{
            const response = await api.post('/pet',{
                name,
                phone: cleanPhone
            })

            setHasSuccess(true)
            setMessage(response.data.message)
            setTimeout(() => setHasSuccess(false), 500)
            setName('')
            await loadTutorsPets(cleanPhone)
        }
        catch(error: any){
            if(error.response){
                if(error.response.status === 404){
                    setMessage(error.response.data.error)
                    setHasError(true)
                    setTimeout(() => setHasError(false), 500)
                }
                if(error.response.status === 400){
                    setMessage(error.response.data.error)
                    setHasError(true)
                    setTimeout(() => setHasError(false), 500)
                }
            }   
            else{
                setMessage("Erro de conexão com o servidor")
            }
        }
    }

    async function loadTutorsPets(tutor_phone: string){

        try{
            const pets = await api.get('/listPetsForTutor',{
                params:{
                    tutor: tutor_phone  
                }
            })
            setPetList(pets.data)
            
        }catch(Error){
            setHasError(true)
            setMessage('Erro ao carregar pets')
            setTimeout(() => setHasError(false), 500)
            setTimeout(() => setMessage(""), 2000)
            return 
        }   
    }

    async function alterPetData(id: string, name: string){

        try{    
            const response = await api.patch('/alterPetData', {
                id: id,
                name: name
            })

            setMessage(response.data.message)

        }catch(error: any){
            if(error.response){
                setMessage(error.response.data.error)
            }

        }
    }

    return(
        <div>
            <h1>Cadastrar Pet</h1>

            <form autoComplete="off" onSubmit={handleSubmit}>
                <GenericStyledInput 
                name="tutorPhone"
                placeholder="telefone do Tutor"     
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
                    if(onlyNumbers.length === 11){
                        loadTutorsPets(onlyNumbers)
                        
                    }
                    else{
                        setPetList([])
                    }
                }}
                
                hasError={hasError}
                hasSuccess={hasSuccess}
                />
                <br/>
                <div style={{display: 'flex', gap: '5px', width: '85%'}}>
                    <GenericStyledInput 
                    name="name"
                    placeholder="Nome" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    hasError={hasError}
                    hasSuccess={hasSuccess}
                    />
                    <RegisterButton 
                        type="submit">Cadastrar
                    </RegisterButton>
                </div>
                <br/>
                <p style={{ color: 'red' }}>{message}</p>
                <br/>
                {petList.map((pet, index) => (
                    <div key={index} style={{display: 'flex', gap: '5px', marginBottom: '10px'}}>
                        <HiddenInputStyled
                            name={pet.id}
                            value={pet.name}
                            onChange={(e) => {
                            setPetList(oldList =>
                                oldList.map(item =>
                                    item.id === pet.id
                                        ? { ...item, name: e.target.value }
                                        : item
                                )
                            )
                        }}
                        />
                        <div style={{width: '50%',display: 'flex', gap: '4px'}}>
                            <ActionButton
                                name={'alterPetNameButton'}
                                type={'button'}
                                onClick={(e) => {
                                    alterPetData(pet.id, pet.name)
                                }}
                                style={{backgroundColor: '#007bff'}}
                            >
                                Alterar
                            </ActionButton>
                            <ActionButton
                                name={'RemovePetButton'}
                                onClick={(e) => {
                                }}
                                style={{backgroundColor: 'red'}}
                            >
                                Remover
                            </ActionButton>
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )
}

