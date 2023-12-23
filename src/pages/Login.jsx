// REACT AND CONTEXTS
import React, { useState } from 'react';
import { useAuth } from '../context/UserAuthContext';

// CSS
import '../Css/styles.css';

import '../Css/login.css';

// FIREBASE
import {
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const Login = () => {


//<******************************VARIABLES*******************************>

// REGISTER
const { SignUp, currentuser } = useAuth();

// USER STATE
const [user, setUser] = useState({
  FullName: '',
  email: '',
  password: '',
});

// GOOGLE PROVIDER
const provider = new GoogleAuthProvider();

//<******************************FUNCTIONS*******************************>

// GOOGLE SIGN-IN FUNCTION
const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const curruser = result.user;

    // FIRESTORE REFERENCES
    const colRef = collection(db, 'users');
    const customDocId = curruser.uid;

    // USER DETAILS
    const userName = curruser.displayName;
    const userEmail = curruser.email;
    const profilePictureURL = curruser.photoURL;

    // TAG FIRESTORE REFERENCE
    const tagRef = collection(db, 'users', customDocId, 'Tags');
    const newTagRef = doc(tagRef);

    // DEFAULT TAGS
    const basicTag = {
      tags: ['None'],
    };

    try {
      // SET USER DATA TO FIRESTORE
      await setDoc(doc(colRef, customDocId), {
        id: customDocId,
        fullname: userName,
        email: userEmail,
        subscription: false,
        profilePictureURL: profilePictureURL,
        storage_take: 0,
        user_since: new Date().toLocaleDateString(),
      });

      // SETTING DEFAULT TAGS
      await setDoc(newTagRef, basicTag);
      console.log('Success Storing Google Document');
    } catch (err) {
      console.log(err);
      console.log('Failed Setting user Documents');
    }

    console.log('Successful Login With Google');
  } catch (error) {
    console.log(error.message);
    console.log('Failed The signinwithPopup function');
  }
};

// USER INPUT HANDLER
const UserHandler = (e) => {
  const { name, value } = e.target;
  console.log(name + '::::::::::' + value);
  setUser((pre) => {
    return {
      ...pre,
      [name]: value,
    };
  });
};

// REGISTER SUBMIT HANDLER
const SubmitHandler = async (e) => {
  e.preventDefault();
  const { email, password, FullName } = user;

  if (password === '' || email === '' || FullName === '') {
    alert('Please fill in all the fields.');
  } else if (!(password.length >= 6)) {
    alert('Password must be greater than 6 characters.');
  } else {
    SignUp(email, password, FullName);

    if (currentuser) {
      setUser({
        FullName: '',
        email: '',
        password: '',
      });
    }
  }
};

return (
<div id='login' className='container' >
  <div className='for'>
    <select class="form-select form-select-lg mb-3" aria-label="Large select example">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>

  <select class="form-select form-select-sm" aria-label="Small select example">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  </div>
</div>
);
};

export default Login;
