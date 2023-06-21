// import { useState, useEffect } from 'react'
// import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
// import { getFirestore } from 'firebase/firestore'

// const firestore = getFirestore()
// const ChatBox = () => {
//   const [messages, setMessages] = useState([])
//   const [newMessage, setNewMessage] = useState('')

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const productRef = collection(firestore, 'messages')
//       const productSnapshot = await getDocs(productRef)
//       const updatedMessages = productSnapshot.docs.map((doc) => doc.data())
//       setMessages(updatedMessages)
//     }

//     fetchMessages()
//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     // Add new message to Firestore collection
//     await addDoc(collection(firestore, 'messages'), {
//       message: newMessage,
//       timestamp: serverTimestamp()
//     })

//     setNewMessage('')
//   }

//   return (
//     <div>
//       <ul>
//         {messages.map((message) => (
//           <li key={message.timestamp}>{message.message}</li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   )
// }

// export default ChatBox
