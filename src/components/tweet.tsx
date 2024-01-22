import styled from 'styled-components'
import { ITweet } from './timeline'
import { auth, db, storage } from '../firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useState } from 'react'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`
const Column = styled.div``
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`
const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`

const EditButton = styled.button`
  background-color: dodgerblue;
  margin: 0px 20px;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`
const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`

const EditInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser
  const [isEditing, setIsEditing] = useState(false)
  const [editedTweet, setEditedTweet] = useState(tweet)

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet')
    if (!ok || user?.uid !== userId) return
    try {
      await deleteDoc(doc(db, 'tweets', id))
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`)
        await deleteObject(photoRef)
      }
    } catch (err) {
      console.log(err)
    } finally {
      // opyio
    }
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onSaveEdit = async () => {
    try {
      await updateDoc(doc(db, 'tweets', id), { tweet: editedTweet })
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <EditForm>
            <EditInput
              type="text"
              value={editedTweet}
              onChange={(e) => setEditedTweet(e.target.value)}
            />
            <button type="button" onClick={onSaveEdit}>
              Save
            </button>
          </EditForm>
        ) : (
          <Payload>{tweet}</Payload>
        )}
        {user?.uid === userId ? (
          <>
            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
            {!isEditing && <EditButton onClick={onEdit}>Edit Tweet</EditButton>}
          </>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  )
}
