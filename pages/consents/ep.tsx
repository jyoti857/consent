import {  AppBar, makeStyles } from "@material-ui/core";
import { CardMedia, Card, CardActions, CardContent, Button, Typography, TextField} from '@material-ui/core'
import { InferGetStaticPropsType } from "next";
import Image from 'next/image'
import React from "react";
import InputField from "../../componets/InputField";
export interface EntryPageProps {
  
}

const EntryPage = (
  // props?: InferGetStaticPropsType<typeof getStaticProps>
  ) => {
  const [email, setEmail] = React.useState("")
  const [emailCheck, setEmailCheck] = React.useState(false)
  console.log("email0---> ", email )
  const handleChange = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value)
    if(email.indexOf("@") !== -1 && email.indexOf(".") !== -1){
      console.log("inside if > ", email )
      setEmailCheck(true)
    }else {
      console.log("inside else > ", email )
      setEmailCheck(_ => false)
    }
  }

  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    const s = await fetch("http://localhost:3000/api/register",
      { 
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
    console.log("from on formSubmit -->", s)
  }
  return (  
    <div> 
      {/* <AppBar>Consents</AppBar> */}
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
        <InputField 
          placeholder='Enter email address'
          value ={email}
          onChange={handleChange}
          divStyle = {{display: 'flex', flexDirection: 'column', }}
          labelStyle = {{marginLeft: 21, marginBottom: 7}}
          label="Email*"
          inputStyle={{
            borderWidth: 1,
            borderRadius: 3,
            width: "94%",
            height: 33,
            // lineHeight: 1.5, 
            // letterSpacing: 1.2,
            outlineColor: 'grey',
            fontFamily: "sans-serif",
            fontSize: 16,
            margin: "2px 20px",
          }}
        />
        
        <CardActions>
          <Button 
            size="small"
            variant='contained'
            color = 'inherit' 
            disabled = {!emailCheck}
            onClick={onFormSubmit}
            style ={{
              // display: 'flex',
              // flexDirection: 'row-reverse',
              // width: "100%",
              // alignSelf: "flex-end",
              position: 'absolute',
              bottom: 10,
              right: 10,
              color: 'white',
              backgroundColor: emailCheck ?'#00A7E1' : '#c2c2c2',
              cursor: 'pointer',
              textTransform: "capitalize",
              fontFamily: "sans-serif"
          }}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  );
}
 
export default EntryPage;


// export const getStaticProps = async () => {
//   console.log("dksldkl")
//   const resp = await fetch("http://localhost:3000/api/movies")
//   const res = await resp.json()
//   console.log("sd-->", res)
//   return {props: {res}}
// }