import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from 'react-markdown';
import axios from 'axios';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(`const express = require('express')
const app = express()

// Middleware with a typo
app.use(express.json) // ❌ should be express.json()

// Wrong route method (should be app.get)
app.gt('/hello', (req, res) => {
    res.send('Hello World')
})

// Function with a missing return
function add(a, b) {
    c = a + b // ❌ c is not declared with let/const
    // missing return statement
}

console.log("Server starting...")

// Missing PORT variable (should use process.env.PORT or define one)
app.listen(PORT, () => {
    console.log('Server running on port', PORT)
}) `)

const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll();
  })

async function reviewCode() {
  const response = await axios.post("https://code-pilot-rho.vercel.app/ai/get-review", { code })

  setReview(response.data);
}  

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.js, 'js')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid grey",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />
        </div>
        <div
         onClick={reviewCode}
         className="review">Review</div>
      </div>
      <div className="right"><Markdown>{review}</Markdown></div>
    </main>
    </>
  )
}

export default App
