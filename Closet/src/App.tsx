import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Table from './components/Table';
import AddItem from './components/AddItem';
import Filter from './components/Filter';

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
  const [filter, setFilter] = useState('');

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
      <AddItem item={setClothes}/>
      <Filter selectedFilter={filter} setSelectedFilter={setFilter}/>
      <Table clothes={clothes.filter(item => filter === '' || item.type === filter)} updateClothes={setClothes}/>
   </div>
  )
}

export default App;
