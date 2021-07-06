import React, {useState} from 'react'
import {
    Avatar,
    Box,
    Grid, IconButton,
    List,
    ListItem,
    ListItemAvatar, ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {green, grey, indigo, red} from "@material-ui/core/colors";
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyle = makeStyles((theme) =>({
    container:{
        maxWidth:"1140px",
        // .spacing means 8px of spacing in material
        margin: "24px auto",
        padding: theme.spacing(2)
    },
    formContainer:{
        padding: theme.spacing(3),
    },
    heading:{
        textAlign: "center",
        color:indigo[500],
        marginBottom: theme.spacing(4)
    },
    secondColumn:{
        margin:theme.spacing(4,0 , 3, 0)
    },
    ListContainer: {
        background: "whitesmoke",
        padding: theme.spacing(2),
        minHeight:"300px",
        height:"auto",

    },
    emptyMsg: {
        textAlign: "center",
        color:  grey[400],
        marginTop: theme.spacing(10),
    },
    ListContainerTitle:{
        paddingLeft :theme.spacing(2),
        marginBottom:theme.spacing(1),
        color:indigo[500],
    },
    remainTaskAvatar:{
        background:indigo["A400"],
        color:"whitesmoke",
    },
    completeTaskAvatar:{
        background:green["600"],
        color:"whitesmoke",
    },
}))
export default function FormComponent() {
    const classes = useStyle();
    // we'll useState hook for value property, two variable and one can be anything and other can  setter method
    const [inputData,setInputData] = useState(""); // useState get import from react
    const [inputError,setInputError] = useState(""); // error  string state

    const [remainingTaskList,setRemainingTaskList] = useState([]); // this will be in a form of object
    const [completedTaskList,setCompletedTaskList] = useState([
        //to take the time of click on remain task green tick
        // {id: Math.random(),title: "day of the task", currentTime: "12:30 pm"}
    ]);


   const handleSubmit = (e) => {
       e.preventDefault();
           console.log("Form submit");

           if (inputData.length >5 && inputData !== ""){ //if input data is not empty, AND operator only if both are true then it'll submit into array
               const taskList = {
                       id: Math.random(),
                       title: inputData,
                   };

               const list = [...remainingTaskList];
               list.push(taskList)

               //updating the task list
               setRemainingTaskList(list);
               // not have the same task once enter on the screen
               setInputData("");
           }
   };


    const handleOnChange =({target})=>{
        target.value.length <= 5 ? setInputError("5 character minimum")// less then 5 then it'll show error
            :setInputError("")  // and if it's empty then error is not going to set and not going to be true and helperText={inputError} will not work
        setInputData(target.value ); // we'll update e.target.value by clicks // .target is a property
    };

    // To click event we need the id of the list
    const handleCheck = (id) => {
        const initial = [...remainingTaskList];
        const initialCompleteTask = [...completedTaskList];
        const currentTime = getCurrentTime(new Date())

        // to get the find the index of the id
        const  Index = initial.findIndex((item)=> item.id === id)

        //current Time
        remainingTaskList[Index].currentTime = currentTime;
        initialCompleteTask.push(remainingTaskList[Index])

        // delete as we delete from the remaining task
      const updatedRemainingTask =   initial.filter((item) => item.id !== id) // will not be equal to the remain id
        //update the complete task state
        setRemainingTaskList(updatedRemainingTask);
        setCompletedTaskList(initialCompleteTask);


    };
    const handleDelete = (id) => {
        const initial = [...remainingTaskList];
        //this will delete the , take 3 parameter; id here is not equal to id from handleDelete,
        const updated = initial.filter((item)=>item.id !== id)
        setRemainingTaskList(updated);
    };

    const getCurrentTime = (date)=>{
        let hour = date.getHours()
            let minutes = date.getMinutes()
        let amPm = hour >= 12 ? "pm" : "am";
        //formatting date 12: 30 pm

        hour = hour % 12;
        hour = hour ? hour : 12 // the hour "0" should be 12
        minutes = minutes< 10 ? "0" + minutes :minutes

        let currentTime = hour + ":" +minutes + amPm
        return currentTime

    }
    return (
        //Box : block level element which is imported from Material-ui

        /* it as a lot of props ,here it'll give the margin auto rather then writing div */
        /* to make a row we need Grid and ag ain imported by  Material-ui */
        /*  */
        <Box className={classes.container}>
              <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                     <form onSubmit={handleSubmit} className={classes.formContainer}>
                             <Typography variant="h5" className={classes.heading}>
                                 {" "}
                                 To-do List - React
                             </Typography>

                         <Grid container justify="center">
                             <Grid item xs={8}>
                                 <TextField
                                                                 id="inputTaskField"
                                                                 label="Add a task"
                                                                 variant="outlined"
                                     /* width is boolean value*/ fullWidth={true}
                                                                 size="small"
                                                                 value={inputData}
                                     /*to change input we use onchange method*/
                                                                 onChange={handleOnChange}
                                                                 error={inputError ? true : false} // if it's input data then true otherwise false
                                                                 helperText={inputError} // we'll put the error text here
                                 />
                             </Grid>
                         </Grid>
                    </form>
                    </Paper>
                </Grid>

                  {/* task grid container*/}
                  <Grid item xs={12} className={classes.secondColumn}>
                      <Grid container spacing ={2 }>
                          <Grid item xs={12} sm={6} lg={6}>
                              <List className={classes.ListContainer} dense={true} >
                                  <Typography className={classes.ListContainerTitle} variant="h5">
                                      Remaining Task
                                  </Typography>
                                  {/*mapping reaming list task*/}
                                  {/*to show empty message length > 0*/}
                                  {remainingTaskList.length > 0 ? remainingTaskList.map((item,i)=>(
                                      <ListItem key={i}>
                                          <ListItemAvatar>
                                              <Avatar className={classes.remainTaskAvatar}> {item.title[0]} </Avatar>
                                          </ListItemAvatar>
                                          <ListItemText primary={item.title} />
                                          <ListItemSecondaryAction>
                                              <IconButton style={{ color: green[500] }} onClick={()=> handleCheck(item.id)}>
                                                  <DoneOutlineOutlinedIcon />
                                              </IconButton>
                                              {/*red[600] : means the color in material-ui the number 600 color*/}
                                              <IconButton style={{color:red[600]}} onClick={()=> handleDelete(item.id)}>
                                                  <DeleteForeverIcon />
                                              </IconButton>
                                          </ListItemSecondaryAction>
                                      </ListItem>
                                  )) : <Typography className={classes.emptyMsg}>
                                      No Task added...!
                                  </Typography>}


                              </List>
                          </Grid>
                          <Grid item xs={12} sm={6} lg={6}>
                              <List className={classes.ListContainer} dense={true} >
                                  <Typography className={classes.ListContainerTitle} variant="h5" >
                                      Completed Task
                                  </Typography>
                                  {/*mapping completeTaskAvatar list task*/}
                                  {/*to show empty message length > 0*/}
                                  {completedTaskList.length > 0 ?
                                      completedTaskList.map((item,i)=>(
                                          <ListItem key={i}>
                                          <ListItemAvatar>
                                              <Avatar className={classes.completeTaskAvatar}> {item.title[0]} </Avatar>
                                          </ListItemAvatar>
                                          <ListItemText primary={item.title} secondary={item.currentTime} />

                                      </ListItem>
                                      )) : <Typography className={classes.emptyMsg}>
                                      Nothing Completed yet...!
                                  </Typography>}


                              </List>
                          </Grid>

                      </Grid>
                  </Grid>
            </Grid>
        </Box>
    )
}