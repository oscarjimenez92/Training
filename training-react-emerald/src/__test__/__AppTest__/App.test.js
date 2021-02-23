import React from 'react'
import ReactDOM from 'react-dom'
import App from "../../app"

test('render app correctly ', () => {
    const div = document.createElement("div")
    ReactDOM.render(<App />, div);
})
