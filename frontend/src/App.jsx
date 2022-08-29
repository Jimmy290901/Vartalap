import React, { useEffect, useState } from "react";
import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage.jsx";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

function App() {
  const [authState, setAuthState] = useState(false || window.sessionStorage.getItem("authState") === "true");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (credentials) => {
      if (credentials) {
        setEmail(credentials.email);
        credentials.getIdToken().then((idToken) => {
          setToken(idToken);
        });
      }
    });
    return unsubscribe;
  }, []);

  function authenticate() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;        // The signed-in user info.
        setAuthState(true);
        window.sessionStorage.setItem("authState", "true");
        console.log("User successfully signed in !");
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error signing in user !");
        console.log("Error Code: " + errorCode);
        console.log("Message: " + errorMessage);
        console.log("Email: " + email);
      });
  }

  return (
    <div className="App">
      {authState ? (
          <ChatPage token={token} email={email} />
        ) : (
          <button onClick={authenticate}>Log In with Google</button>
        )
      }
    </div> 
  );
}

export default App;