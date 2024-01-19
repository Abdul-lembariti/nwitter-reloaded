import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Button = styled.span`
  width: 100%;
  color: black;
  background-color: white;
  font-weight: 500;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 50px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
`
const Logo = styled.img`
  height: 25px;
`

export default function Google() {
  const navigate = useNavigate()
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Button onClick={onClick}>
      <Logo src="/google.svg" />
      Continue With Google &rarr;
    </Button>
  )
}
