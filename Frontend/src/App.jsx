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
  const [code, setCode] = useState(`function sum(a,b) {
return a+b
}`);

  const [review, setReview] = useState("");

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
    <>
      <main>
        <div className='left'>
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
        </div>
        <div className='right'>
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
