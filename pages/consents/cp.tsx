import { CardMedia, Card, CardActions, CardContent, Button, Typography, Grid,
  Divider

} from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputField from "../../componets/InputField";
import {dbConnect} from '../../db/database';
import { Db, ObjectId } from 'mongodb';
import React from 'react';
import { useRouter } from 'next/router';

export interface CommunicationPreferencesProps {
  
}
let initialValues = {email: "", firstName: "", lastName: "", state: 'DE', type: "Other"}
const CommunicationPreferences: React.FC<CommunicationPreferencesProps> = ({token, new_user}: any) => {
  console.log("token --># ", token )
  const {email, name, state, hcpType, consents}=token
  const adcConsent = consents && consents.find((conse: any)=> conse.preference.type ==="UNBR")
  const commConsent = consents && consents.find((conse: any)=> conse.preference.type ==="BRAN")
  console.log("adcConsent --> ", adcConsent)
  console.log("commConsent --> ", commConsent)
  const [firstName, lastName] = name ? name.split(" ") : ["", ""]

  const [firstName_, setFirstName_] = React.useState(firstName)
  const [lastName_, setLastName_] = React.useState(lastName)
  const [state_, setState_] = React.useState(state)
  const [type_, setType_] = React.useState(hcpType)
  const [adc, setAdc] = React.useState(adcConsent ? adcConsent.preference.subscribed ? "adc_sub": "adc_unsub" : '');
  const [comm, setComm] = React.useState(commConsent ? commConsent.preference.subscribed ? "comm_sub": "comm_unsub" : '');
  const handleAdcPreferences = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdc(event.currentTarget.value);
  };
  const handleCommPreferences = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComm(event.currentTarget.value);
  };
  const router = useRouter()
  console.log("radio button value ---> ", adc, comm)

  React.useEffect(() => {
    if(!email){router.push('/')}
  }, [])
  const handleFormSubmit = async(e: any) => {
    e.preventDefault();
    const data = {firstName: firstName_, lastName: lastName_, 
      state: state_ || initialValues.state, type: type_ || initialValues.type,
      adc, comm
    }
    console.log("data --> handle submit ", data,  )
    await fetch(`https://consent.vercel.app/api/activate/user/${token._id}`, 
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )
    router.push('/consents/thanks')
  }
  return (  
    <div>
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
                Email Communication Preferences
              </Typography>
              <Typography variant="h5" component="h2" 
                style = {{
                  width: "92%", 
                  fontSize: 15, 
                  flexWrap: 'wrap',
                  fontFamily: "sans-serif",
                  color: '#686868'
                }}
              >
                ADCT respects your privacy. Please see our Privacy Notice for more information. Complete the information below to manage your email communication preferences from ADC Therapeutics.
              </Typography>
            </div>
            <div style ={{width: "35%"}}>
              <CardMedia 
                // className={classes.media}
                image="/hello.png"
                style = {{width: 222, height: 90}}
                title="Contemplative Reptile"
              />
            </div>
          </div>
        </CardContent>
        <Grid container  spacing={1} >
          <Grid item md={6} >
            <InputField
              placeholder='first name'
              value ={firstName_ || initialValues.firstName}
              onChange = {e => setFirstName_(e.target.value)}
              divStyle = {{display: 'flex', flexDirection: 'column', }}
              labelStyle = {{marginLeft: 21, marginBottom: 7}}
              label="Name*"
              disabled={!new_user}
              inputStyle={{
                width: "98%",
              }}
            />
          </Grid>
          <Grid item md={6}>
            <InputField
              placeholder='last name'
              value ={lastName_}
              onChange = {e => setLastName_(e.target.value)}
              divStyle = {{display: 'flex', flexDirection: 'column', }}
              labelStyle = {{marginLeft: 21, marginBottom: 7}}
              label= "*"
              disabled={!new_user}
              inputStyle={{
                width: "92%",
              }}
            />
          </Grid>
          <Grid item md={6} >
            <InputField
              placeholder='Delaware'
              value ={state_ || initialValues.state}
              onChange = {e => setState_(e.target.value)}
              divStyle = {{display: 'flex', flexDirection: 'column', }}
              labelStyle = {{marginLeft: 21, marginBottom: 7}}
              label="State*"
              disabled={!new_user}
              inputStyle={{
                width: "98%",
              }}
            />
          </Grid>
          <Grid item md={6}>
            <InputField
              placeholder='Other'
              value ={type_ || initialValues.type}
              onChange = {e => setType_(e.target.value)}
              divStyle = {{display: 'flex', flexDirection: 'column', }}
              labelStyle = {{marginLeft: 21, marginBottom: 7}}
              label="Type"
              inputStyle={{
                width: "92%",
              }}
            />
          </Grid>
          <Grid item md={12}>
            <InputField
              placeholder='Enter email address'
              value ={email||initialValues.email}
              divStyle = {{display: 'flex', flexDirection: 'column', }}
              labelStyle = {{marginLeft: 21, marginBottom: 7}}
              label="Email*"
              disabled={true}
              inputStyle={{
                width: "96%",
              }}
            />
          </Grid>
        </Grid>
        <div>
        <Typography color="textSecondary" gutterBottom
          style ={{
            fontSize: 25, 
            flexWrap: 'wrap',
            fontFamily: "sans-serif",
            color: '#00A7E1',
            margin: 20,
          }}
        >
          Subscription Details
        </Typography>
        <Divider style={{marginTop: -20}}/>
        <FormControl component="fieldset" style={{marginLeft: 20, marginTop: 12}}>
          <FormLabel style ={{color: "#686868"}}>ADC Therapeutics Corporate Email and News*</FormLabel>
          <RadioGroup value={adc} onChange={handleAdcPreferences}>
            <FormControlLabel value="adc_sub" control={<Radio style={{color: "#00A7E1"}} />} label="Subscribe" />
            <FormControlLabel value="adc_unsub" control={<Radio style={{color: "#00A7E1"}}/>} label="Unsubscribe" />
          </RadioGroup>
          <FormLabel style ={{color: "#686868"}}>Communications from Sales and Marketing*</FormLabel>
          <RadioGroup value={comm} onChange={handleCommPreferences}>
            <FormControlLabel value="comm_sub" control={<Radio style={{color: "#00A7E1"}} />} label="Subscribe" />
            <FormControlLabel value="comm_unsub" control={<Radio style={{color: "#00A7E1"}}/>} label="Unsubscribe" />
          </RadioGroup>
        </FormControl>
        </div>
        <div style={{margin: 18}}>
          <Typography gutterBottom style = {{fontSize: 13, fontFamily: "Poppins", textAlign: 'justify'}}>
          ADC Therapeutics America, Inc. (“ADCT”) understands protecting your personal information is very important. We do not share any personally identifiable information you give use with third parties for their own marketing use. I understand by selecting "Subscribe” and clicking "Submit" below, that the information provided by me may be used for marketing purposes by ADCT in order to keep me informed about its products, services, promotional education or other opportunities that may be of interest to me via email. I can opt out of marketing communications at any time by clicking the link in any email I receive, or by sending a letter with my opt out request to 430 Mountain Avenue, Suite #404, New Providence, NJ 07974.
          </Typography>
        </div>
        <CardActions>
          <Button 
            size="small"
            variant='contained'
            disabled = {email ? false: true}
            onClick={handleFormSubmit}
            style ={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              color: 'white',
              backgroundColor: email ?'#00A7E1' : '#c2c2c2',
              cursor: 'pointer',
              textTransform: "capitalize",
              fontFamily: "sans-serif"
          }}>Submit</Button>
        </CardActions>
      </Card>
    </div>
  );
}
 
export default CommunicationPreferences;

export const getServerSideProps = async (ctx: any) => {
  console.log("dksldkl", ctx.query)
  const id = ctx.query.token

  const d = await (await dbConnect()).collection('pending_consent_user').findOne({_id: new ObjectId(ctx.query.token)})
  console.log("d --->", d)
  const stringi = JSON.stringify(d)
  const parse = JSON.parse(stringi)
  if(parse && parse._id){
    const existing_user = await (await dbConnect()).collection('consent_user').findOne({_id: new ObjectId(parse._id)})
    console.log("stringi, parse ---> ", stringi, parse, existing_user)
    return {props:{token: {...parse}, new_user: true}}
  }
  const existing_user = await (await dbConnect()).collection('consent_user').findOne({_id: new ObjectId(ctx.query.token)})
  if(existing_user){
    const stringi = JSON.stringify(existing_user)
    const parse = JSON.parse(stringi)
    console.log("parse_existing user #--->", parse)
    return {props: {token: {...parse}, new_user: false}}
  }

  // calling the activate user api 
  return {props: {token: parse ? parse : {}, new_user: false}}
}