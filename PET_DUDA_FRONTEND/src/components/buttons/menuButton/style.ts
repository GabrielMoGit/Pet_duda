import styled from "styled-components";

export const MenuButtonStyled = styled.button`
  width: 100%;               
  padding: 10px 16px;        
  background-color: #fff;    
  color: #000;               
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;       
  overflow: hidden;          
  text-overflow: ellipsis;   
  transition: background-color 0.2s;

  &:hover {
    background-color: #ddd;  /* efeito hover */
  }
`