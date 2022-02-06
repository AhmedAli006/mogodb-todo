
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [todolist, settodo] = useState([])
  const [list, setlist] = useState('')
  const [loader, setLoader] = useState(false)



  const apiHandle = axios.create({
    baseURL: "http://localhost:5000"
  })

  const getData = () => {
    apiHandle
      .get("/lists")
      .then((res) => {
        console.log(res.data)
        settodo([...res.data])

        console.log(todolist);
        setLoader(true)
      })
  }

  const postData = () => {

    apiHandle
      .post("/lists", { todo: list })
      .then((res) => {
        console.log(res.data.todo)
      })
  }
  const delData = () => {
    apiHandle
      .delete("/lists/:id")
      .then((res) => {
      })
  }
  return (
    loader?<><p>loaging</p></>:
    <div className="App">
      <div>
        <h1>todo  App</h1>
        <input onChange={(e) => setlist(e.target.value)} />
        <button onClick={getData}>get</button>
        <button onClick={postData}>post</button>
        {todolist.length > 0 ? todolist.map((e, i) => {
          return (
            <div key={i}>

              <p >{e.todo}</p>
              <button onClick={delData}>delete</button>

             
            </div>

          )
        }) : ''}

      </div>
    </div>
  );
}

export default App;