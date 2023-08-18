import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";
import style from  './Loading.module.css'

const Loading = () => {
  return (
    <div className={style.forLoading}>
        <PuffLoader color="#36d7b7" />
      </div>
    )
}

export default Loading