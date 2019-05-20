import React from "react"
import Flippy, { FrontSide, BackSide } from 'react-flippy';


const Card = (props) => 
    <Flippy
        flipOnHover={false}
        flipOnClick={true}
        flipDirection="horizontal"
        style={{ width: '80%', height: '300px', textAlign: 'center', marginTop: '20px' }}
  >
    <FrontSide
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        {props.question}
    </FrontSide>
    
    <BackSide
      style={{ 
          backgroundColor: '#f7ffc7',
          borderRadius: '20px',
          textAlign: 'center',
          overflow: 'auto'
      }}>
      <div dangerouslySetInnerHTML={{ __html: props.answer }} />
    </BackSide>

  </Flippy>

export default Card;