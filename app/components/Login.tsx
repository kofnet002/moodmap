'use client'

import { Fugaz_One } from "next/font/google";
import { FC, useState } from "react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

interface PageProps { }

const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const LoginPage: FC<PageProps> = () => {

    const { signup, login } = useAuth() as any
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isRegister, setIsRegister] = useState(false)

    const handleOnChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!formData.email || !formData.password || formData.password.length < 6) {
            toast.error("Invalid input!");
            return;
        }

        setIsAuthenticating(true);

        const authPromise = isRegister
            ? signup(formData.email, formData.password)
            : login(formData.email, formData.password);

        toast.promise(
            authPromise,
            {
                loading: isRegister ? 'Registering...' : 'Logging in...',
                success: isRegister ? 'Registration successful!' : 'Login successful!',
                error: (error) => {
                    if (error instanceof FirebaseError) {
                        switch (error.code) {
                            case 'auth/email-already-in-use':
                                return 'Email already in use';
                            case 'auth/invalid-email':
                                return 'Invalid email address';
                            case 'auth/invalid-credential':
                                return 'Invalid incredential';
                            case 'auth/user-not-found':
                                return 'User not found';
                            case 'auth/wrong-password':
                                return 'Incorrect password';
                            case 'auth/weak-password':
                                return 'Password must be at least 6 characters';
                            default:
                                return 'An unexpected error occurred';
                        }
                    }
                    return 'An error occurred';
                }
            }
        );

        try {
            await authPromise;  // Proceed with the authentication process
        } catch (error: any) {
            console.error('Authentication error:', error.message);
        } finally {
            setIsAuthenticating(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} method="POST" className={`${fugaz.className} flex flex-col flex-1 justify-center items-center gap-4`}>
            <h3 className="text-4xl sm:text-5xl md:text-6xl">{isRegister ? 'Register' : 'Log In'}</h3>
            <p>You&#39;re one step away!</p>

            <input className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-pink-400 rounded-full outline-none duration-200 hover:border-pink-600 focus:border-pink-600 placeholder:text-pink-200" value={formData.email} onChange={handleOnChange} type="email" placeholder="Email" name="email" id="email" />
            <input className="w-full max-w-[400px] mx-auto px-3 py-2 sm:py-3 border border-solid border-pink-400 rounded-full outline-none duration-200 hover:border-pink-600 focus:border-pink-600 placeholder:text-pink-200" value={formData.password} onChange={handleOnChange} type="password" placeholder="Password" name="password" id="password" />

            <div className={`max-w-[400px] w-full mx-auto ${isAuthenticating ? 'hover:cursor-not-allowed' : 'cursor-pointer'}`}>
                <Button text={isAuthenticating ? 'Submitting...' : 'Submit'} full />
            </div>

            <p className="text-center">
                {isRegister ? 'Already have an account? ' : `Don't have an account ? `}
                <button onClick={(e) => { e.preventDefault(); setIsRegister(!isRegister) }} className="text-pink-600 hover:cursor-pointer">
                    {isRegister ? 'Log in' : 'Sign up'}
                </button>
            </p>
        </form>
    )
}

export default LoginPage;