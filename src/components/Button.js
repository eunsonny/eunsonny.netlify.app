import React from "react"

const Button = (props) => {
  return (
    <button
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        border: "none",
        boxShadow: "none",
        textDecoration: "none",
        margin: "8px",
        padding: "8px 12px",
        background: "#E2E8F022",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#E2E8F0",
        fontSize: "14px",
        fontFamily: "sans-serif",
        lineHeight: "1",
      }}
      {...props}
    />
  )
}

export default Button;
