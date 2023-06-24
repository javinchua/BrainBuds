import { useEffect, useState } from 'react'
import { useAuth } from 'context/AuthContext'
import {
  CollectionReference,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  Timestamp,
  getDocs
} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { Button, Modal, TextField, Typography, IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import { userTypes } from '@/utils/constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { getUserByUsername } from 'pages/api/chat'
import { getProductName } from 'pages/api/product'
interface ChatComponentProps {
  productId?: string
  userType: 'donor' | 'charity'
}

interface Chat {
  id: string
  productId: string
  donorId: string
  charityId: string
  createdAt: Timestamp
}

interface Message {
  senderId: string
  content: string
  createdAt: Timestamp
  chatId: string
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ productId, userType }) => {
  const { user } = useAuth()
  const [chats, setChats] = useState<Chat[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [unsubscribeMessages, setUnsubscribeMessages] = useState<() => void>()
  const dispatch = useDispatch()
  const firestore = getFirestore()
  const addressUsernameMap = useSelector((state: RootState) => state.addressUsernameMap)
  const productNameMap = useSelector((state: RootState) => state.productNameMap)
  const getAddressUsernameMap = async (id: string) => {
    const addressUsernameMapCopy = Object.assign({}, addressUsernameMap)
    if (!addressUsernameMap[id]) {
      const username = await getUserByUsername(id)
      addressUsernameMapCopy[id] = username
      dispatch({
        type: 'SET_USERNAME',
        data: addressUsernameMapCopy
      })
    }
  }

  const getProductNameMap = async (id: string) => {
    const productNameMapCopy = { ...productNameMap }
    if (!productNameMap[id]) {
      const username = await getProductName(id)
      productNameMapCopy[id] = username
      dispatch({
        type: 'SET_PRODUCT_NAME',
        data: productNameMapCopy
      })
    }
  }
  const getMessages = async (chatId: string) => {
    const messagesRef: CollectionReference = collection(firestore, `chats/${chatId}/messages`)
    const messagesQuery = query(messagesRef, orderBy('createdAt'))

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messageList: Message[] = snapshot.docs.map((doc) => {
        const messageData = doc.data()
        return {
          id: doc.id,
          senderId: messageData.senderId,
          content: messageData.content,
          createdAt: messageData.createdAt,
          chatId: chatId
        }
      })
      setMessages(messageList)
    })

    setUnsubscribeMessages(() => unsubscribe)
  }

  useEffect(() => {
    let unsubscribeChats: () => void
    const getChats = async () => {
      if (user) {
        const chatsRef: CollectionReference = collection(firestore, 'chats')
        let chatsQuery
        if (user.type == userTypes.DONOR) {
          chatsQuery = query(chatsRef, where('donorId', '==', user.uid))
        } else {
          chatsQuery = query(chatsRef, where('charityId', '==', user.uid))
        }

        unsubscribeChats = onSnapshot(chatsQuery, (snapshot) => {
          const chatList: Chat[] = snapshot.docs.map((doc) => {
            const chatData = doc.data()
            getProductNameMap(chatData.productId)
            getAddressUsernameMap(chatData.donorId)
            getAddressUsernameMap(chatData.charityId)
            return {
              id: doc.id,
              productId: chatData.productId,
              donorId: chatData.donorId,
              charityId: chatData.charityId,
              createdAt: chatData.createdAt
            }
          })
          setChats(chatList)
        })
      }
    }
    if (user) {
      if (selectedChat) {
        getMessages(selectedChat.id)
      } else {
        getChats()
      }
    }

    return () => {
      if (unsubscribeChats) {
        unsubscribeChats()
      }
      if (unsubscribeMessages) {
        unsubscribeMessages()
      }
    }
  }, [user, userType, selectedChat])

  const handleOpenChatModal = () => {
    setOpen(true)
  }

  const handleCloseChatModal = () => {
    setOpen(false)
    setSelectedChat(null)
  }

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat)
    getMessages(chat.id)
  }

  const handleSendMessage = async () => {
    if (user && selectedChat && inputMessage.trim() !== '') {
      const messagesRef: CollectionReference = collection(
        firestore,
        `chats/${selectedChat.id}/messages`
      )
      console.log('here')
      await addDoc(messagesRef, {
        chatId: selectedChat.id,
        senderId: user.uid,
        content: inputMessage,
        createdAt: Timestamp.now()
      })

      setInputMessage('')
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }
  const renderChatList = () => {
    return (
      <div>
        <div>
          {chats.map((chat) => (
            <div key={chat.id} className="mb-2">
              <Typography>
                {user.type == userTypes.DONOR ? chat.charityId : chat.productId}
              </Typography>
              <Button onClick={() => handleSelectChat(chat)} variant="contained" color="primary">
                Open Chat
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderChatMessages = () => {
    return (
      <div>
        <div className="p-4 overflow-y-auto bg-white rounded h-96">
          {messages.map((message, index) => (
            <div key={index} className="p-2 mb-4 border border-gray-500 rounded">
              <Typography
                variant="body1"
                className={`${message.senderId == user.uid ? 'text-primary-400' : ''} `}
              >
                {addressUsernameMap[message.senderId]
                  ? addressUsernameMap[message.senderId]
                  : message.senderId}
                : {message.content}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {message.createdAt?.toDate().toLocaleString()}
              </Typography>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <TextField
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            label="Message"
            variant="outlined"
            fullWidth
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSendMessage} variant="contained" color="primary">
            Send
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Button onClick={handleOpenChatModal} variant="contained" color="primary">
        Open Chat
      </Button>
      <Modal open={open} onClose={handleCloseChatModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded">
            <div className="flex justify-between">
              <Typography variant="h6">{selectedChat ? 'Chat Messages' : 'Chat List'}</Typography>
              <IconButton onClick={handleCloseChatModal} size="small">
                <Close />
              </IconButton>
            </div>
            {selectedChat ? renderChatMessages() : renderChatList()}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ChatComponent
