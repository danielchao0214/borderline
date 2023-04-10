import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { TextField, Button } from '@mui/material';
import styles from '@/pages/createaccount/CreateAccount.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted: ${email} ${password}`);
    router.push('/'); // this should be changed to whatever
    // handle submit logic here
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Last Name"
              className={styles.formTextField}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Password"
              className={styles.formTextField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Confirm Password"
              className={styles.formTextField}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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