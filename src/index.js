import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

ReactDOM.render(
  <DndProvider backend={Backend}>
    <App />
  </DndProvider>,
  document.getElementById('root'),
)
