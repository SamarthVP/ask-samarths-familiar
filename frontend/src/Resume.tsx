import React from 'react';
import {isMobile} from 'react-device-detect';
import { Page, Document, pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function load_resume(){
  if (isMobile){
    return (<Document file="/SamarthPatelResume.pdf" >
              <Page pageNumber={1}/>
            </Document>)
  }
  return (<object data="/SamarthPatelResume.pdf#toolbar=0" type="application/pdf" width="100%" height="100%" scroll-behavior= "smooth">
    <p>Samarth's Resume</p>
  </object>)
}

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
        height: '125vh',
        display: "flex",
        justifyContent: "center",
        }}>
            {load_resume()}
      </div>
    </div>
    )
}

export default Resume