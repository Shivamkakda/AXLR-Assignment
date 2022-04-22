
import { Component } from 'react'
import { addTask,getTask,updateTask,deleteTask } from './services/taskServices'

class Tasks extends Component{
  state = {tasks:[],currentTask:""}

  async componentDidMount(){
    try{
      const{data} = await getTask();
      this.setState({tasks:data});
      
    }catch(error){
      console.log(error)
    }
  }

  handleChange =({currentTarget: input})=>{
    this.setState({currentTask: input.value});
  }

  handleSubmit = async()=>{
   
    const orignalTasks = this.state.tasks
    try {
      const{data} =await addTask({task:this.state.currentTask});
      const tasks = orignalTasks;
      tasks.push(data);
      this.setState({tasks,currentTask: ""});
    } catch (error) {
      console.log(error)
    }
  }

  handleUpdate = async(currentTask)=>{
    const orignalTasks = this.state.tasks;
    try {
      const tasks = [...orignalTasks];
      const index = tasks.findIndex((task)=> task._id === currentTask);
      tasks[index] = {...tasks[index]};
      tasks[index].completed = !tasks[index].completed;
      this.setState({tasks});
       await updateTask(currentTask,{completed: tasks[index].completed})
    } catch (err) {
      this.setState({tasks:orignalTasks})
      console.log(err)
    }
   }

   handleDelete = async(currentTask)=>{
     const orignalTasks = this.state.tasks;
     try {
       const tasks = orignalTasks.filter(
         (task)=> task._id !== currentTask
       )
       this.setState({tasks});
       await deleteTask(currentTask);

     } catch (error) {
       this.setState({tasks:orignalTasks});
       console.log(error)
     }
   }
}

export default Tasks