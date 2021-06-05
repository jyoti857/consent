import {  AppBar, makeStyles } from "@material-ui/core";
import { CardMedia, Card, CardActions, CardContent, Button, Typography, TextField} from '@material-ui/core'
import Image from 'next/image'
import React from "react";
export interface EntryPageProps {
  
}

const EntryPage: React.FC<EntryPageProps> = () => {
  const [email, setEmail] = React.useState("")
  const handleChange = e => {
    e.preventDefault();
    setEmail(e.target.value)
  }
  return (  
    <div> 
      <AppBar>Consents</AppBar>
      <Card style= {{width: 730, margin: '40px auto', position: 'relative', paddingBottom: 32,}}>
        <CardContent>
          <div style = {{display: 'flex'}}>
            <div>
              <Typography color="textSecondary" gutterBottom
                style ={{
                  fontSize: 25, 
                  flexWrap: 'wrap',
                  fontFamily: "sans-serif",
                  color: '#00A7E1'
                }}
              >
                Validate your email
              </Typography>
              <Typography variant="h5" component="h2" 
                style = {{
                  width: "92%", 
                  fontSize: 15, 
                  flexWrap: 'wrap',
                  fontFamily: "sans-serif",
                  color: '#686868'
                  }}>
                ADC Therapeutics respects your privacy. Please enter 
                {" "}
                your email address to confirm that you have access to that address. We will send you an email with a verification link.
              </Typography>
            </div>
            <div style ={{width: "35%"}}>
              <CardMedia 
                // className={classes.media}
                image="/adct_logo_small.png"
                style = {{width: 222, height: 90}}
                title="Contemplative Reptile"
              />
            </div>
          </div>
        </CardContent>
        {/* <TextField 
          label={`Email ${true ? "*" : ""}`}
          value={email}
          onChange={handleChange}
          variant='outlined'
        /> */}
        <div style = {{display: 'flex', flexDirection: 'column', }}>
          <label style = {{marginLeft: 21, marginBottom: 7}}>Email*</label>
          <input 
            type = 'text'
            onChange={handleChange}
            value={email}
            placeholder='Enter email address'
            style = {{
              borderWidth: 1,
              borderRadius: 3,
              width: "94%",
              height: 33,
              lineHeight: 1.5, 
              letterSpacing: 1.2,
              outlineColor: 'grey',
              fontFamily: "sans-serif",
              fontSize: 16,
              margin: "2px 20px",
            }}
          />
        </div>
        
        <CardActions>
          <Button 
            size="small"
            variant='contained'
            color = 'inherit' 
            style ={{
              // display: 'flex',
              // flexDirection: 'row-reverse',
              // width: "100%",
              // alignSelf: "flex-end",
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: '#00A7E1'
          }}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  );
}
 
export default EntryPage;