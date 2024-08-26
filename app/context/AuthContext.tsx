'use client'

import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, UserCredential } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useContext, useState, useEffect, ReactNode } from "react"

interface AuthContextType {
    signup: (email: string, password: string) => Promise<UserCredential>
    login: (email: string, password: string) => Promise<UserCredential>
    logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | null>(null)

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [userDataObj, setUserDataObj] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    function signup(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setCurrentUser(null)
        setUserDataObj(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                // set the user to local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) return

                // if user exists, fetch data from firestore
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let _firebaseData = {}

                if (docSnap.exists()) {
                    _firebaseData = docSnap.data()['mood']
                }
                setUserDataObj(_firebaseData)
            } catch (error) {
                console.log('error', error)
                setLoading(false)

            } finally {
                setLoading(false)
            }
        })


        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        login,
        signup,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}
