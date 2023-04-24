import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import { TextField, Button } from '@mui/material';
import styles from '@/pages/resetpasswordemail/ResetPasswordEmail.module.css'
import { sendResetEmail } from "../../lib/api";
import { withAuth } from "@/components/withAuth";;

const inter = Inter({ subsets: ['latin'] })

const Login = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Submitted: ${email}`);
    setSubmitEnabled(true);
    await sendResetEmail(email);
  };
  return (
    <>
      asdf
    </>
  )
}
export default withAuth(Login);