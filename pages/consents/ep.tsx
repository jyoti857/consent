import {  AppBar, makeStyles } from "@material-ui/core";
import { CardMedia, Card, CardActions, CardContent, Button, Typography, TextField} from '@material-ui/core'
import React from "react";
import InputField from "../../componets/InputField";
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

export interface EntryPageProps {
  
}

const EntryPage = (
  // props?: InferGetStaticPropsType<typeof getStaticProps>
  ) => {
  const [email, setEmail] = React.useState("")
  const [emailCheck, setEmailCheck] = React.useState(false)
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
  const router = useRouter()
  const onFormSubmit = async (e: any) => {
    e.preventDefault();
    router.push('/consents/thanks')
    // const s = await fetch("https://consent.vercel.app/api/register",
    const s = await fetch("http://localhost:3000/api/register",
      { 
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
  }
  return (  
    <div className = {styles.main}> 
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
                image="/hello.png"
                style = {{width: 222, height: 90}}
                title="adct consents"
              />
            </div>
          </div>
        </CardContent>
        <InputField 
          placeholder='Enter email address'
          value ={email}
          onChange={handleChange}
          divStyle = {{display: 'flex', flexDirection: 'column', }}
          labelStyle = {{marginLeft: 20, marginBottom: 7}}
          label="Email*"
        />
        
        <CardActions>
          <Button 
            size="small"
            variant='contained'
            color = 'inherit' 
            disabled = {!emailCheck}
            onClick={onFormSubmit}
            style ={{
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