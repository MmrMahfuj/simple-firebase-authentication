import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';


initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({})
  const auth = getAuth();

  const handleGoogleSignIN = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then(result => {
        const { displayName, email, photoURL } = result.user
        const loggedInUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(loggedInUser);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
  }
  return (
    <div className="App">

      {!user.name ?
        <div>
          <button onClick={handleGoogleSignIN}>Google Sign in</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </div> :
        <button onClick={handleSignOut}>Sign Out </button>
      }
      <br />
      {
        user.name && <div>
          <h2>welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
