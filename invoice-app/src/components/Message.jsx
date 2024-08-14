import React from "react";

const Message = ({message,color}) => {

    return (
        <div className="message" style={{background:color}}>{message}</div>
    )
};

export default Message;