import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clones-2e9c4.firebaseapp.com",
  projectId: "netflix-clones-2e9c4",
  storageBucket: "netflix-clones-2e9c4.firebasestorage.app",
  messagingSenderId: "392513372546",
  appId: "1:392513372546:web:ec4e0fcb598fcae4d58f9b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc (collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}
export {auth, db, login, signup, logout};