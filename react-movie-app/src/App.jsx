import { useState } from 'react';

function App() {
  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState([]);
  const handelSubmit = () => {
    setJobs([...jobs, job])
    setJob('')
  }
  const handleDelete=(index)=>{
    setJobs(prev=>prev.filter((_,i) => i!==index));
  }
  return (
    <div>
      <input type="text" 
        value={job}
        onChange={(e)=>setJob(e.target.value)}
      />
      <button onClick={handelSubmit}>add</button>
      <ul>
        {jobs.map((job,index)=>(
          <li key={index}>{job}
          <button onClick={()=>handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>

    </div>
  ) 
}

export default App;