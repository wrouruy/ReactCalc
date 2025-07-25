import React from 'react'

export default function ButtonItem(props) {
  return (
    <button style={{ backgroundColor: props.bgcolor }}>
        {props.symbol}
    </button>
  )
}
