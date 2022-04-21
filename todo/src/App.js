
import Tasks from './Tasks';
import{ Paper, TextField} from "@material-ui/core"
import {Button, Checkbox,} from "@material-ui/core"
import './App.css';

class App extends Tasks{

  state ={tasks:[], currentTask:""}
  render(){
    const {tasks} = this.state
    return(
      <div className='App flex'>
        <Paper elevetation ={3} className="mainCont">
          <div className='heading'>
            To-Do Application
          </div>
          <form onSubmit={this.handleSubmit}
          className = "flex"
          style={{margin: "15px 0"}}
          >
            <TextField 
            variant="outlined"
            size="small"
            style={{width:"80%"}}
            value= {this.state.currentTask}
            required ={true}
            onChange ={this.handleChange}
            placeholder ="ADD Item"/>
            <Button  style={{height:"40px"}}
            color="primary"
            variant='outlined'
            type='submit'
            >
              SUBMIT
            </Button>
          </form>
          <div className=''>
            {tasks.map((task)=>(
              <Paper key ={task.id}
              className="flex taskCont">
                <Checkbox
                checked={task.completed}
                onClick={()=> this.handleUpdate(task._id)}
                color="primary"
                />
                <div className={task.completed ? "task line_through" : "task"}>
                  {task.task}
                </div>
                <Button onClick={()=> this.handleDelete(task._id)}
                
                color="secondary">Delete</Button>
              </Paper>
            ))}
          </div>
        </Paper>
      </div>
    )
  }
}
export default App