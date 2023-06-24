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
  doc,
  setDoc,
  Timestamp,
  getDocs
} from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import {
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { styled } from '@mui/system'
import { Close } from '@mui/icons-material'
import { userTypes, Chat, Message } from '@/utils/constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { getUserByUsername } from 'pages/api/chat'
import { getProductName } from 'pages/api/product'
import ChatIcon from '@mui/icons-material/Chat'
interface ChatComponentProps {
  productId?: string
  charityId?: string
}
const StyledListItem = styled(ListItem)(() => ({
  marginBottom: '0.5rem',
  backgroundColor: '#F3F4F6',
  borderRadius: '0.5rem',
  padding: '1rem',
  cursor: 'pointer', // change cursor on hover
  '&:hover': {
    backgroundColor: '#E5E7EB' // change background color on hover
  }
}))

const StyledTypography = styled(Typography)(() => ({
  color: '#374151' // make text darker
}))
export const ChatComponent: React.FC<ChatComponentProps> = ({ productId, charityId }) => {
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

    const createNewChat = async () => {
      // first check if this has already been created anot
      if (productId && user) {
        // Create a new chat with the provided productId
        const chatsRef: CollectionReference = collection(firestore, 'chats')
        const chatsQuery = query(
          chatsRef,
          where('donorId', '==', user.uid),
          where('productId', '==', productId)
        )
        const chatDoc = await getDocs(chatsQuery)
        if (chatDoc.empty) {
          const docRef = doc(chatsRef)
          const docId = docRef.id
          const newDoc: Chat = {
            id: docId,
            productId: productId,
            donorId: user.uid || '',
            charityId: charityId || '', // Set the initial charityId as an empty string or set it to the appropriate value
            createdAt: Timestamp.now()
          }
          await setDoc(docRef, newDoc)
          setSelectedChat(newDoc)
        } else {
          const docRef = chatDoc.docs[0]
          const docData = docRef.data()
          setSelectedChat(docData as Chat)
        }
      }
    }
    if (user) {
      if (selectedChat) {
        getMessages(selectedChat.id)
      } else if (productId && charityId) {
        createNewChat()
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
  }, [user, selectedChat, productId, charityId])

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
      <div className="p-6 bg-white rounded-lg shadow">
        <List>
          {chats.map((chat) => (
            <StyledListItem key={chat.id} onClick={() => handleSelectChat(chat)}>
              <div>
                <StyledTypography variant="subtitle1">
                  Product: {productNameMap[chat.productId]}
                </StyledTypography>
                <StyledTypography variant="body2">
                  User:{' '}
                  {user.type === userTypes.DONOR
                    ? addressUsernameMap[chat.charityId]
                    : addressUsernameMap[chat.donorId]}
                </StyledTypography>
              </div>
            </StyledListItem>
          ))}
        </List>
      </div>
    )
  }

  const renderChatMessages = () => {
    return (
      <div>
        <Typography variant="h6" className="mb-4 text-gray-800">
          Product: {selectedChat && productNameMap[selectedChat.productId]}
        </Typography>
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
    <div className="z-50">
      <Button
        onClick={handleOpenChatModal}
        variant="contained"
        color="primary"
        endIcon={<ChatIcon />}
      >
        Chat
      </Button>
      <Modal open={open} onClose={handleCloseChatModal}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="p-4 bg-white rounded min-w-[50%]">
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
