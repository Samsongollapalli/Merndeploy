import {useEffect,useState} from "react"
import axios from "axios"
function App() {
  const [item,setItem] = useState([])
  const [newtask,setNewTask] = useState("")
  useEffect(()=>{
      axios.get("http://localhost:5000/gettask").then(
        arr  => setItem(arr.data)
      )
  },[])
  const submitHandler = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/addtask",{todo:newtask}).then(
      arr => setItem(arr.data))
  }
  const deleteHandler = (id)=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(
      arr => setItem(arr.data)
    )
  }
  return (
   <div>
    <center>
      <form onSubmit={submitHandler}>
        <input type="text" value={newtask}  onChange={(e)=>setNewTask(e.target.value)} />
         <input type="submit" value="submit" /> 
      </form>
      {
        item.map((each)=>{
        return(
          <>
          <h1>{each.todo}</h1>
          <h3>{each.data} <button onClick={()=>deleteHandler(each._id)}> Delete </button> </h3>
          
          </>
          
        )
        })
      }
    </center>
   </div>
  );
}

export default App;