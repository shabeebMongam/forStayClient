import React from 'react'
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";


const VerifyEmail = () => {

    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/users/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);
  return (
      <div> {validUrl ? (
          <div className='mx-auto flex justify-center items-center container'>
              <h1>Email verified successfully</h1>
              <Link to="/login">
                  <button >Login</button>
              </Link>
          </div>
      ) : (
          <h1>404 Not Found</h1>
      )}</div>
  )
}

export default VerifyEmail