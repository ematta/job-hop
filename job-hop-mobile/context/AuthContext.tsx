import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {}
})

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const now = Date.now()
      const tsStr = await AsyncStorage.getItem('loginTimestamp')
      let ts = tsStr ? parseInt(tsStr, 10) : null
      if (session?.user) {
        if (!ts) {
          ts = now
          await AsyncStorage.setItem('loginTimestamp', ts.toString())
        }
        // expire after 90 days
        if (now - ts > 90 * 24 * 60 * 60 * 1000) {
          await supabase.auth.signOut()
          await AsyncStorage.removeItem('loginTimestamp')
          setUser(null)
        } else {
          setUser(session.user)
        }
      }
      setLoading(false)

      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        if (newSession?.user) {
          const loginNow = Date.now()
          await AsyncStorage.setItem('loginTimestamp', loginNow.toString())
          setUser(newSession.user)
        } else {
          await AsyncStorage.removeItem('loginTimestamp')
          setUser(null)
        }
      })
    }
    init()
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    if (data.user) {
      const now = Date.now()
      await AsyncStorage.setItem('loginTimestamp', now.toString())
      setUser(data.user)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    await AsyncStorage.removeItem('loginTimestamp')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
