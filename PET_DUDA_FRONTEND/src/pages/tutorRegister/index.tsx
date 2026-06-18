import { GenericStyledInput } from "../../components/inputs/genericInput";
import { RegisterButton } from "../../components/buttons/registerButton";
import { SuggestionList } from "../../components/suggestionList";
import { ActionButton } from "../../components/buttons/ActionButton";
import { useState, useRef, useEffect } from "react";
import { api } from "../../services/api";

export function TutorRegister() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);

  //phone number to save de original phone, in case to change, to found in backend
  const [oldPhone, setOldPhone] = useState("");

  const [submitButtonName, setSubmitButtonName] = useState("Cadastrar");

  const [userHasRegister, setUserHasRegister] = useState<any>();

  const [submitType, setSubmitType] = useState("register");

  //variables for interactive input to search streets
  const [streetTyped, setStreetTyped] = useState("");
  const [streetSuggestions, setStreetSuggestions] = useState([]);
  const [showStreetSuggestions, setStreetShowSuggestions] = useState(false);

  //variables for interactive input to search neighborhoods
  const [neighborhoodTyped, setNeighborhoodTyped] = useState("");
  const [neighborhoodSuggestions, setNeighborhoodSuggestions] = useState([]);
  const [showNeighborhoodSuggestions, setShowNeighborhoodSuggestions] =
    useState(false);

  const [number, setNumber] = useState("");

  //Position reference to know where de click happens
  const positionRef = useRef<HTMLDivElement>(null);

  //Initial state to know wich item is been selected, "-1" = none selected
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let selectedList: string[] = [];
    let selection = "";

    if ((e.currentTarget as HTMLDivElement).dataset.type === "neighborhood") {
      selectedList = neighborhoodSuggestions;
      selection = "neighborhood";
    }
    if ((e.currentTarget as HTMLDivElement).dataset.type === "street") {
      selectedList = streetSuggestions;
      selection = "street";
    }

    if (!showStreetSuggestions && !showNeighborhoodSuggestions) {
      return;
    }
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < selectedList.length - 1 ? prev + 1 : prev,
      );
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prev) => {
        if (prev === -1) return selectedList.length - 1;
        if (prev > 0) return prev - 1;
        return 0;
      });
    }
    if (e.key === "Enter") {
      e.preventDefault();

      if (selectedIndex >= 0) {
        const selected = selectedList[selectedIndex];
        if (selection === "street") {
          setStreetTyped(selected);
          setStreetShowSuggestions(false);
        } else if (selection === "neighborhood") {
          setNeighborhoodTyped(selected);
          setShowNeighborhoodSuggestions(false);
        }
      }
    }
  };

  const resetPageInfo = () => {
    setName("");
    setPhone("");
    setStreetTyped("");
    setNeighborhoodTyped("");
    setNumber("");
    setUserHasRegister(false);
    setSubmitButtonName("Cadastrar");
    setSubmitType("register");
  };

  //function do identify where the click mouse happens
  useEffect(() => {
    const handleClickOutside = (e: TouchEvent) => {
      if (
        positionRef.current &&
        !positionRef.current.contains(e?.target as Node)
      ) {
        setStreetShowSuggestions(false);
        setShowNeighborhoodSuggestions(false);
      }
    };

    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("touchend", handleClickOutside);
    };
  });

  async function loadTutorData(phone: string) {
    try {
      const response = await api.get("/loadTutorData", {
        params: {
          phone: phone,
        },
      });
      if (response) {
        setOldPhone(phone);
        setUserHasRegister(true);
        setSubmitType("update");
        setSubmitButtonName("Alterar");
        setName(response.data.tutorFound.name);
        setStreetTyped(response.data.addressFound[0].streetName);
        setNeighborhoodTyped(response.data.addressFound[0].neighborhoodName);
        setNumber(response.data.addressFound[0].number);
      }
    } catch {}
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    let route = "";

    if (e.target.name === "street") {
      setStreetTyped(text);
      route = "listStreets";
    }
    if (e.target.name === "neighborhood") {
      setNeighborhoodTyped(text);
      route = "listNeighborhood";
    }

    setSelectedIndex(-1);

    try {
      const response = await api.get(route);

      const onlyTypedByUserResponse = response.data.filter((content: string) =>
        content.toLowerCase().includes(text.toLowerCase()),
      );

      if (e.target.name === "street") {
        setStreetSuggestions(onlyTypedByUserResponse);
        setStreetShowSuggestions(true);
        if (text.trim() === "") {
          setStreetSuggestions([]);
          setStreetShowSuggestions(false);
          return;
        }
      }
      if (e.target.name === "neighborhood") {
        setNeighborhoodSuggestions(onlyTypedByUserResponse);
        setShowNeighborhoodSuggestions(true);
        if (text.trim() === "") {
          setNeighborhoodSuggestions([]);
          setShowNeighborhoodSuggestions(false);
          return;
        }
      }
    } catch {}
  };

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");

    if (name === "") {
      setMessage("Nome não informado");
      return;
    } else if (phone === "") {
      setMessage("Telefone não informado");
      return;
    } else if (streetTyped === "") {
      setMessage("Rua não informada");
      return;
    } else if (neighborhoodTyped === "") {
      setMessage("Bairro não informado");
      return;
    }

    if (submitType === "register") {
      try {
        await api.post("/neighborhood", {
          name: neighborhoodTyped,
        });
      } catch {
        setHasError(true);
        setMessage("Erro em criaçao de bairro");
        setTimeout(() => setHasError(false), 500);
        setTimeout(() => setMessage(""), 2000);
        return;
      }
      try {
        await api.post("/street", {
          name: streetTyped,
        });
      } catch {
        setHasError(true);
        setMessage("Erro em criação de rua");
        setTimeout(() => setHasError(false), 500);
        setTimeout(() => setMessage(""), 2000);
        return;
      }
      try {
        await api.post("/tutor", {
          name,
          phone: cleanPhone,
        });
      } catch {
        setHasError(true);
        setMessage("Erro em criação de tutor");
        setTimeout(() => setHasError(false), 500);
        setTimeout(() => setMessage(""), 2000);
        return;
      }
      try {
        await api.post("/address", {
          tutorPhone: cleanPhone,
          streetName: streetTyped,
          neighborhoodName: neighborhoodTyped,
          number: number,
        });
      } catch {
        setHasError(true);
        setMessage("Erro em criação de endereço");
        setTimeout(() => setHasError(false), 500);
        setTimeout(() => setMessage(""), 2000);
        return;
      }
      setHasSuccess(true);
      setMessage("Tutor criado");
      setTimeout(() => setHasSuccess(false), 500);
      setName("");
      setPhone("");
      setNeighborhoodTyped("");
      setStreetTyped("");
    }
    if (submitType === "update") {
      try {
        const response = await api.patch("/AlterTutorData", {
          name: name,
          newPhone: cleanPhone,
          oldPhone: oldPhone,
          street: streetTyped,
          neighborhood: neighborhoodTyped,
          number: number,
        });
        setHasSuccess(true);
        setMessage(response.data.message);
        setTimeout(() => setHasSuccess(false), 500);
        setTimeout(() => setMessage(""), 2000);
      } catch (error: any) {
        setHasError(true);
        setMessage(error.response?.data?.message);
        setTimeout(() => setHasError(false), 500);
        setTimeout(() => setMessage(""), 2000);
      }
    }
  }

  return (
    <div>
      <h1>Gerenciar dados do Tutor</h1>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <GenericStyledInput
          name="phone"
          placeholder="telefone"
          value={phone}
          onChange={(e) => {
            const onlyNumbers = e.target.value.replace(/\D/g, "");
            const limitedNumbers = onlyNumbers.slice(0, 11);

            let formatted = limitedNumbers;

            if (limitedNumbers.length > 0) {
              formatted = "(" + limitedNumbers;
            }

            if (limitedNumbers.length > 2) {
              formatted =
                "(" +
                limitedNumbers.slice(0, 2) +
                ")" +
                limitedNumbers.slice(2);
            }

            if (limitedNumbers.length > 7) {
              formatted =
                "(" +
                limitedNumbers.slice(0, 2) +
                ")" +
                limitedNumbers.slice(2, 7) +
                "-" +
                limitedNumbers.slice(7);
            }

            setPhone(formatted);
            if (onlyNumbers.length === 11) {
              loadTutorData(onlyNumbers);
            }
          }}
          hasError={hasError}
          hasSuccess={hasSuccess}
        />
        <br />
        <GenericStyledInput
          name="name"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          hasError={hasError}
          hasSuccess={hasSuccess}
        />
        <br />

        <div
          data-type="street"
          style={{ position: "relative", flex: 1, width: "100%" }}
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

          {showStreetSuggestions &&
            streetSuggestions.length > 0 &&
            streetTyped.length > 2 && (
              <SuggestionList
                suggestions={streetSuggestions}
                selectedIndex={selectedIndex}
                onSelect={(street) => {
                  setStreetTyped(street);
                  setStreetShowSuggestions(false);
                }}
              />
            )}
        </div>
        <br />
        <div
          data-type="neighborhood"
          style={{ position: "relative", flex: 1, width: "100%" }}
          onKeyDown={handleKeyDown}
          ref={positionRef}
        >
          <div style={{ flex: 1, width: "100%" }}>
            <GenericStyledInput
              name="neighborhood"
              placeholder="Bairro"
              value={neighborhoodTyped}
              onChange={handleChange}
              hasError={hasError}
              hasSuccess={hasSuccess}
            />

            {showNeighborhoodSuggestions &&
              neighborhoodSuggestions.length > 0 &&
              neighborhoodTyped.length > 2 && (
                <SuggestionList
                  suggestions={neighborhoodSuggestions}
                  selectedIndex={selectedIndex}
                  onSelect={(neighborhood) => {
                    setNeighborhoodTyped(neighborhood);
                    setShowNeighborhoodSuggestions(false);
                  }}
                />
              )}
          </div>
        </div>
        <br />
        <div style={{ width: "40%" }}>
          <GenericStyledInput
            name="number"
            placeholder="Número"
            value={number}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/\D/g, "");
              setNumber(onlyNumbers);
            }}
            hasError={hasError}
            hasSuccess={hasSuccess}
          />
        </div>
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <RegisterButton type="submit">{submitButtonName}</RegisterButton>
          <ActionButton
            name={"cancelButton"}
            type={"button"}
            onClick={(e) => {
              resetPageInfo();
            }}
            style={{
              display: userHasRegister ? "block" : "none",
              backgroundColor: "red",
            }}
          >
            Cancelar
          </ActionButton>
        </div>
        <p style={{ color: "red" }}>{message}</p>
      </form>
    </div>
  );
}
