
import { Component } from 'react'
import { addTask,getTask,updateTask,deleteTask } from './services/taskServices'

class Tasks extends Component{
  state = {tasks:[],currentTask:""}

  async componentDidMount(){
    try{
      const{data} = await getTask();
      this.setState({tasks:data});
    }catch(err){
      console.log(err)
    }
  }

  handleChange =({currentTarget: input})=>{
    this.setState({currentTask: input.value});
  }

  handleSubmit = async(e)=>{
    e.preventDefault();
    const mainTasks = this.state.tasks
    try {
      const{data} =await addTask({task:this.state.currentTask});
      const tasks = mainTasks;
      tasks.push(data);
      this.setState({tasks,currentTask: ""});
    } catch (error) {
      console.log(error)
    }
  }

  handleUpdate = async(currentTask)=>{
    const mainTasks = this.state.tasks;
    try {
      const tasks = [...mainTasks];
      const index = tasks.findIndex((task)=> task._id === currentTask);
      tasks[index] = {...tasks[index]};
      tasks[index].completed = !tasks[index].completed;
      this.setState({tasks});
       await updateTask(currentTask,{completed: tasks[index].completed})
    } catch (err) {
      this.setState({tasks:mainTasks})
      console.log(err)
    }
   }

   handleDelete = async(currentTask)=>{
     const mainTasks = this.state.tasks;
     try {
       const tasks = mainTasks.filter(
         (task)=> task._id !== currentTask
       )
       this.setState({tasks});
       await deleteTask(currentTask);

     } catch (error) {
       this.setState({tasks:mainTasks});
       console.log(error)
     }
   }
}

export default Tasks