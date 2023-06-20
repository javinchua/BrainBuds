import ChatComponent from '@/components/Chat'
import React from 'react'
import { useAuth } from 'context/AuthContext'
import Link from 'next/link'
const ChatPage = () => {
  const { user } = useAuth()
  return (
    <div>
      {user ? (
        <ChatComponent></ChatComponent>
      ) : (
        <>
          <h1>Please log in</h1>
          <Link href="src/pages/login.tsx">
            <h1>Login</h1>
          </Link>
        </>
      )}
      <ChatComponent></ChatComponent>
    </div>
  )
}

export default ChatPage
