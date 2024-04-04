import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Table from './components/Table';
import AddItem from './components/AddItem';

export interface Clothes {
  id: string,
  type: string,
  size: string,
  colour: string,
  image: string,
  date: Date
}

function App() {
  const [clothes, setClothes] = useState<Clothes[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/clothes/")
      .then(res => {
        setClothes(res.data);
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching clothes:', error);
      });
  }, []);

  return (
   <div className="App">
    <h1>Personal Closet App</h1>
      <AddItem />
      <Table clothes={clothes} updateClothes={setClothes}/>
   </div>
  )
}

export default App;
