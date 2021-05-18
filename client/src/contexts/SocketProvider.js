import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({children }) {
  const [socket, setSocket] = useState()
  const [leaveRoom,SetleaveRoom] = useState(false) 
  useEffect(() => {
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)
    return () => newSocket.close()
  }, [leaveRoom])

  return (
    <SocketContext.Provider value={{socket,SetleaveRoom}}>
      {children}
    </SocketContext.Provider>
  )
}