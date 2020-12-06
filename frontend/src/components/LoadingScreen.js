import React from 'react'
import Spinning from '../CSS/831.svg'

export default function LoadingScreen() {
    return (
        <div>
            <img src={Spinning} alt="logo" style={{
                position: "fixed",
                top: "48%",
                left: "48%",
                marginTop: "-50px",
                marginLeft: "-50px",
            }}></img>
        </div>
    )
}
