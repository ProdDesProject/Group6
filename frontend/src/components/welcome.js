import React from 'react'

export default function welcome(props) {
    return (
        <div>
            Welcome page
            <div>{props.example_state}</div>
        </div>
    )
}
