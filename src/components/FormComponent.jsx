import React, {useState} from 'react'
import {Box, Grid, makeStyles, Paper, TextField, Typography} from "@material-ui/core";
import {indigo} from "@material-ui/core/colors";

const useStyle = makeStyles((theme) =>({
    container:{
        // .spacing means 8px of spacing in matariel
        margin: theme.spacing(3,0,2,0),
        padding: theme.spacing(2)
    },
    formContainer:{
        padding: theme.spacing(2),
    },
    heading:{
        textAlign: "center",
        color:indigo[500],
        marginBottom: theme.spacing(3)
    }
}))
export default function FormComponent() {
    const classes = useStyle();
    // we'll useState hook for value property, two variable and one can be anything and other can  setter method
    const [inputData,setInputData] = useState("") // useState get import from react
    const [inputError,setInputError] = useState("") // error  string state
   const handleSubmit = (e) =>{
       e.preventDefault();
           console.log("Form submit")
   };

    const handleOnChange =({target})=>{
        target.value.length <= 5 ? setInputError("5 character minimum")// less then 5 then it'll show error
            :setInputError("")  // and if it's empty then error is not going to set and not going to be true and helperText={inputError} will not work
        setInputData(target.value ); // we'll update e.target.value by clicks // .target is a property
    }
    return (
        //Box : block level element which is imported from Material-ui

        /* it as a lot of props ,here it'll give the margin auto rather then writing div */
        /* to make a row we need Grid and again imported by Material-ui */
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
                                                                 helperText={inputError} // we'll put the erro text here
                                 />
                             </Grid>
                         </Grid>
                    </form>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}