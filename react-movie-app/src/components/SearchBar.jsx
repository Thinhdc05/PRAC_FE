import{useState,useRef,useEffect} from 'react';
import { useDebounce } from '../hooks/useDebounce';

export function SearchBar({onSearch}){
const [search,setSearch]=useState('');
const debouncedSearch =useDebounce(search,500);
const inputRef=useRef(null);
const handleClear=()=>{
    setSearch('');
    inputRef.current?.focus();
  }
useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch]);
return (
    <div>
         {console.log('render-ui')}
    <input 
    ref={inputRef}
    type="text" 
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    style={{padding:'10px',width:'100%',fontSize:'16px'}}
    />
    <button onClick={handleClear}
    style={{ padding: '10px', marginLeft: '8px', cursor: 'pointer' }}
    >Xoa</button>
        </div>

  )
}