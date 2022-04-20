import React, { useState, useEffect } from "react";
import firebase from "../firebase";


export const FetchPage = (collection, id) => {
  const [error, setError] = useState(null)
  const [rpage, setPage] = useState(null)

useEffect(() => {
  const ref = firebase.firestore().collection(collection).doc(id)

  const unsub = ref.onSnapshot((snapshot) => {
      
    if(snapshot.data()) {
      setPage({...snapshot.data(), id: snapshot.id })
      setError(null)
    }
    if(!snapshot.data()) {
        setError('Sorry this page does not exist')
    }
  }, (err) => {
      console.log(err.message)
      setError('Failed to retrieve')
})
    return() => unsub()

}, [collection, id])

return {rpage, error}

}