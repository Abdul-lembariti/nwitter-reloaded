import styled from 'styled-components'

export const Button = styled.input`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #1d9bf0;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 0px;
  font-size: 15px;
  cursor: pointer;
  &:active {
    opacity: 0.9;
  }
`
