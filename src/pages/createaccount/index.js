import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { TextField, Button } from '@mui/material';
import styles from '@/pages/createaccount/CreateAccount.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = "/api/auth"
    const res = await fetch("http://localhost:3000/"+url, {
      method: "Post",
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword
      }),
      headers: {
        "content-type": "application/json"
      },
    }).catch((e) =>console.log(e)); // Error for fetch request only

    // wait for the responce from request and get the body
    const data = await res.json(); 

    // If status code returns error print the code in the body
    if(res.status == 400){ 
      console.log(data.errorMessage);
    }

    //If route is good then log the results and rout the use to login Screen
    if(res.status == 200){
      console.log(data.message);
      router.push("/login");
    }
    
  };
  return (
    <>
      <main className={styles.main}>
        <div className={styles.squircle}>
          <div id={styles.text}>
            <div className={styles.heading}>
              <p>Create Account</p>
            </div>
            <div className={styles.description}>
              <p>Enter your information below</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="First Name"
              className={styles.formTextField}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Last Name"
              className={styles.formTextField}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Email"
              className={styles.formTextField}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Username"
              className={styles.formTextField}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              className={styles.formTextField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              type="password"
              className={styles.formTextField}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className={styles.submitbutton} type="submit" variant="contained">
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}