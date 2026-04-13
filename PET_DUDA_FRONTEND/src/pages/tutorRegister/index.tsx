import { GenericStyledInput } from '../../components/inputs/genericInput'
import { RegisterButton } from '../../components/buttons/registerButton'
import { useState } from 'react'
import { api } from '../../services/api'

export function TutorRegister(){

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)

    //variables for interactive input to search streets
    const [streetTyped, setStreetTyped] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
            const text = e.target.value
            setStreetTyped(text)

            try{
                const response = await api.get('/listStreets',{
                    params: {name: text}
                })

                const filteredStreets = response.data.filter((street: string) => street.toLowerCase().includes(text.toLowerCase()))

                setSuggestions(filteredStreets)
                setShowSuggestions(true)
            }catch{

            }
    }

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault()

        const cleanPhone = phone.replace(/\D/g, '')
        try{
            const response = await api.post('/tutor',{
                name,
                phone: cleanPhone
            })

            setHasSuccess(true)
            setMessage(response.data.message)
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
                placeholder="Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                hasError={hasError}
                hasSuccess={hasSuccess}
                />
                <GenericStyledInput 
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
                    <div style={{ position: "relative", flex: 1 }}>
                        <GenericStyledInput 
                        placeholder="Rua" 
                        value={streetTyped}
                        onChange={handleChange}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            background: '#fff',
                            border: '1px solid #ccc',
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            zIndex: 10
                        }}>
                            {suggestions.map((street, index) => (
                                <li 
                                    key={index}
                                    onClick={() => {
                                        setStreetTyped(street)
                                        setShowSuggestions(false)
                                    }}
                                    style={{
                                        padding: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {street}
                                </li>
                            ))}
                        </ul>
                    )}
                    </div>
                    
                    <GenericStyledInput 
                        placeholder="Bairro" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
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