import { useState } from "react"
import { GenericInputStyled } from "../../components/inputs/genericInput/styles"
import { RegisterButton } from "../../components/buttons/registerButton"

export function PackageRegister(){

    const [petName, setPetName] = useState('')
    const [packageType, setPackageType] = useState('')
    const [serviceDate, setServiceDate] = useState('')
    const [value, setValue] = useState('')
    const [hasError, setHasError] = useState(false)
    const [hasSuccess, setHasSuccess] = useState(false)

    return(
        <div>
            <h1>Cadastrar Pacote</h1>
            
            <form>
                <div style={{ width: '62%'}}>
                    <GenericInputStyled
                        name="petName"
                        placeholder="Nome do Pet"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                </div>
                <br/>
                <div style={{ width: '62%'}}>
                    <GenericInputStyled
                        name="packageType"
                        placeholder="Nome do Pet"
                        value={packageType}
                        onChange={(e) => setPackageType(e.target.value)}
                        hasError={hasError}
                        hasSuccess={hasSuccess}
                    />
                </div>
                <br/>
                <div style={{ display: 'flex', gap: '25px'}}>
                    <div style={{width: '20%'}}>
                        <GenericInputStyled
                            name="serviceDate"
                            placeholder="Data inicial do pacote"
                            value={serviceDate}
                            onChange={(e) => setServiceDate(e.target.value)}
                            hasError={hasError}
                            hasSuccess={hasSuccess}
                        />
                    </div>
                    <div style={{width: '20%'}}>
                        <GenericInputStyled
                            name="value"
                            placeholder="Valor"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
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