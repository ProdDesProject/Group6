import React from 'react'
import Spinning from '../CSS/831.svg'
import styles from "../CSS/LoadingScreen.module.css"

export default function LoadingScreen() {
    return (
        <div className={styles.blurBG}>
            <img src={Spinning} alt="logo" style={{
                position: "absolute",
                top: "48%",
                left: "48%",
                marginTop: "-50px",
                marginLeft: "-50px",
                zIndex: 10
            }}></img>
        </div>
    )
}
