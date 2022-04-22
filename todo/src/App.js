import axios from 'axios';
import './App.css';

import React, { useEffect, useState } from 'react'


function App() {
  const [itemText, setItemtext] = useState('')
  const [listItems, setListItems] = useState([])
  const[isUpdating,setIsUpdating] = useState('')
  const [updateItemText, setUpdateItemtext] = useState('')

  //post api call
  const addItem = async(e) =>{
    e.prevenDefault()
    try {
      const res = await axios.post(`http://localhost:5000/api/tasks/add`, {item: itemText})
      setListItems(prev => [...prev, res.data])
      setItemtext('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    const getItemList = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks`)
        setListItems(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getItemList()
  },[])

  //delete
const deleteItem = async(id)=>{
  try {
    const res = await axios.delete(`http://localhost:5000/api/tasks/${id}`)
    const newListItems = listItems.filter(item=> item._id !==id);
    setListItems(newListItems)
  } catch (error) {
    console.log(error)
  }
}

//update
const updateItem = async (e)=>{
  e.prevenDefault()
  try {
    const res = await axios.put(`http://localhost:5000/api/tasks/${isUpdating}`, {item:updateItemText })
    setUpdateItemtext('')
    setIsUpdating('')
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

const updateForm =()=>{
  <form className='updateForm' onSubmit={(e)=>{updateItem(e)}}>
    <input className='updateInput' type="text" placeholder='Add Item' onChange={e =>{setUpdateItemtext(e.target.value)}} value={updateItemText}/>
    <button className='btn4' type='submit'>Update</button>
  </form>
}

  return (
    <div className='App flex'>
      <form className='form'  onSubmit={e=>addItem(e)}>
        <input  type="text" placeholder='Add item' onChange={e=>{setItemtext(e.target.value)}} value={itemText}/>
        <button className='btn1' type='submit'>Add</button>
      </form>
      <div className='taskCont'>
       {
         listItems.map(item => (
          <div className='todoItem'>
            {
              isUpdating === item._id
              ? updateForm() : 
              <>
             <p className='item'>{item.task}</p>
             <button className='btn2' onClick={()=>{setIsUpdating(item._id)}}>update</button>
             <button className='btn3' onClick={()=>{deleteItem(item._id)}}>delete</button>
              </>
            }
        </div>
         ))
       }
      </div>
    </div>
  )
}

export default App
