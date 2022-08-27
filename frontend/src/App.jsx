import React, { useEffect, useState } from "react";
import "./App.css";
import ChatPage from "./components/ChatPage/ChatPage.jsx";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

function App() {
  const [authState, setAuthState] = useState(false || window.sessionStorage.getItem("authState") === "true");
  const [token, setToken] = useState("");
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (credentials) => {
      if (credentials) {
        setAuthState(true);
        window.sessionStorage.setItem("authState", "true");
        credentials.getIdToken().then((idToken) => {
          setToken(idToken);
        });
      }
    });
  }, []);

  function authenticate() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setAuthState(true);
        // setToken(token);
        // window.sessionStorage.setItem("authState", "true");
        console.log("User successfully signed in !");
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error signing in user !");
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  }

  return (
    <div className="App">
      {authState ? (
          <ChatPage token={token}/>
        ) : (
          <button onClick={authenticate}>Log In with Google</button>
        )
      }
    </div> 
  );
}

export default App;