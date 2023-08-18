import React from 'react'
import style from './DelModal.module.css'


const DelModal = ({ closeModal , delRoom }) => {
  return (
      <div className={style.modalBackground}>
          <div className={style.modalContainer}>
              <div className={style.titleCloseBtn}>
                  <button
                      onClick={() => {
                          closeModal(false)
                      }}
                  >
                      X
                  </button>
              </div>
              <div className={style.title}>
                  <h1>Are You Sure You Want to Continue?</h1>
              </div>
              <div className={style.body}>
                  <p>On clicking continue your room will be removed</p>
              </div>
              <div className={style.footer}>
                  <button
                      onClick={() => {
                         closeModal(false)
                      }}
                      id="cancelBtn"
                  >
                      Cancel
                  </button>
                  <button onClick={()=>{
                      delRoom()
                  }}>Continue</button>
              </div>
          </div>
      </div>
  )
}

export default DelModal