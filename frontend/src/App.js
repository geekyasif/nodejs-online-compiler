import './App.css';
import { useEffect, useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import Header from './components/Header';
import axios from 'axios';


function App() {

  const [value, setValue] = useState('');
  const [output, setOutput] = useState('')
  const[lang, setLang] = useState('c++')
  const [loading, setLoading] = useState(false);






  const runCode = async () => {
    setLoading(true)
    const data = {
                "lang": lang,
                "input": "",
                "code": JSON.stringify(value)
            }

    const res = await axios.post('http://localhost:5000/compile', data)
    const result = await res.data
    console.log("This is output", result.stdout)
    setOutput(result.stdout)
    setLoading(false)
  }


  console.log(lang)

  return (
    <div className='App'>
      <Header/>
          <div className="row">
            <div className="editor">
            <div className='lang-btn-row'>
            <button className='run' onClick={runCode}>{loading ? "loading..." : "Run"}</button>
            <div style={{marginLeft: '10px'}}>
                <select value={lang} onChange={ (event) => setLang(event.target.value)}>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                  <option value="python">Python</option>
              </select>
            </div>
            </div>
            <MonacoEditor
              height="100vh"
              width="900px"
              language="c"
              theme="vs-dark"
              value={value}
              options={{
                lineNumbers: 'on',
                automaticLayout: true,
                tabCompletion: "on",
              }}
              editorDidMount={(editor, monaco) => {
                // Use the editor and monaco objects to programmatically manipulate the Monaco Editor instance
                editor.focus();
              }}
              onChange={(newValue, event) => {
                setValue(newValue);
              }}
            />
            </div>
            <div className="output">
              {output}
            </div>
          </div>
    </div>
  );
}

export default App;
