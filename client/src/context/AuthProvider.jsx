import { useContext, createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import useAxiosPbulic from '../hook/useAxiosPublic';

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPbulic();
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = ({ name, photoURL }) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signUpWithPopup = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    const authInfo = {
        user,
        setUser,
        updateUserProfile,
        login,
        logout,
        createUser,
        signUpWithPopup,
    };

    //check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post("/jwt", userInfo).then((response) => {
                    if (response.data.token) {
                        localStorage.setItem("access_token", response.data.token)
                    }
                })
            }
            else {
                localStorage.removeItem("access_token")
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider