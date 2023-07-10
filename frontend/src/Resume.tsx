import React from 'react';
import Fade from '@mui/material/Fade';

function Resume(){
    return (
    <div className="Resume" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}>
      <div style= {{backgroundImage: `url("/Image.jpeg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: '25% 65%',
        width: '100vw',
        height: '100vh'
        }}>
        {/* <Fade appear={true} in={true} timeout={2500} easing="ease-in"> */}
            <object data="/SamarthPatelResume.pdf" type="application/pdf" width="100%" height="100%">
                <p>Samarth's Resume</p>
            </object>
        {/* </Fade> */}
      </div>
    </div>
    )
}

export default Resume