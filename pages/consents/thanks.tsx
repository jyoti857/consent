import { link } from 'fs';
import Image from 'next/image';
import Link from 'next/Link'
import React from 'react';

export interface ThanksProps {
  
}
 
const Thanks: React.FC<ThanksProps> = () => {
  const [hover, setHover]=React.useState(false)
  const handleHover = () => setHover(prev => !prev)
  return ( 
    <div>
      <div style = {{display: 'flex', justifyContent: 'center', padding: 12}}>
        <Image src="/tic.svg" height={30} width={30} />
        <p style = {{fontFamily: 'sans-serif', fontSize: 20, paddingLeft: 7}}>Thank You</p>
      </div>
      <div style = {{fontFamily: 'sans-serif', lineHeight: '60%', fontSize: 14, color: '#004', margin: '0 12px', padding: '0 42px', textAlign: 'center'}}>
        <p>
          Thank you for submitting your email communication preferences to ADC Therapeutics. We will process your preferences within 7-10 business days.
        </p>
        <p>
          If you have opted out in error and wish to update your preferences, please visit the <Link href='/consents/ep'><a onMouseEnter={handleHover} onMouseLeave={handleHover} style={hover?{color: '#ffb86c', textDecorationLine: 'underline'}: {color: '#ffb86c'}}>Email Communications Portal</a></Link> and adjust your preferences. Please note that you will 
        </p>
        <p>continue to receive email regarding important safety information of ADC Therapeutics products.</p>
      </div>
      <div style = {{margin: '30px 440px'}}>
        <Image src="/thanks.svg" height={330} width={330} />
      </div>

    </div>

   );
}
 
export default Thanks;