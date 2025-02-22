import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`Paste your code here...`);

  const [review, setReview] = useState(
    "Your code review feedback will appear here afer submission..."
  );

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    axios
      .post("http://localhost:3000/ai/get-review", { code })
      .then((res) => {
        console.log(res.data);
        setReview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main>
      <div className='header'>
        <h1>AI Code Review</h1>
        <p>
          Submit your code for an instant, comprehensive review powered by AI.
        </p>
      </div>

      <div className='inputWrapper'>
        <h3>Your Code</h3>
        <div className='code-editor-box'>
          <div className='code'>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                borderRadius: "15px",
                height: "100%",
                width: "100%",
              }}></Editor>
          </div>
        </div>
        <div className='review-btn' onClick={reviewCode}>
          Submit for Review
        </div>
      </div>

      {/* <div className='code-editor-box'>
        <div className='code'>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}></Editor>
        </div>
        <div className='review' onClick={reviewCode}>
          Review
        </div>
      </div> */}

      <div className='review-wrapper'>
        <h3>Review output</h3>
        <hr />
        <div className='code-review-box'>
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </div>
    </main>
  );
}

export default App;
