import styled from "styled-components";

export const MenuButtonStyled = styled.button`
  width: 100%;               
  padding: 10px 16px;        
  outline: none;
  border: none;
  background-color: #000000;    
  color: #ffffff;               
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  text-align: left;
  white-space: nowrap;       
  overflow: hidden;          
  text-overflow: ellipsis;   
  transition: background-color 0.1s;

  &:hover {
    background-color: #535353;  /* efeito hover */
  }
`