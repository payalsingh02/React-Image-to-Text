import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import background from "../src/image/bgy.jpg";
import './App.css';


const App = () => {

  const [isLoading , setIsLoading] = useState(false);
  const [text , setText] = useState("");
  const [image , setImage] = useState("");
  const [progress , setProgress] = useState(0);

  const styles = {
    // backgroundColor: 'red',
    fontSize: 12,
    color: 'White',
    backgroundImage:`url(${background})`
 }
 

  const handleClick = () => {
    setIsLoading(true);  //for loading progress bar
    Tesseract.recognize(
      image, 
      'eng',
      { logger: m => {
        console.log(m);
        if ( m.status === "recognizing text" ) {
          setProgress( parseInt(m.progress * 100) )
        } 
      },
      }).then(({ data: { text } }) => {
      setText(text);
      setIsLoading(false);
    });
  };

  return (
    <div className="container" style={styles}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto d-flex flex-column align-items-center">
          {!isLoading && <h1 className='mt-5 mb-4 ' color='pink' > <b> Image To Text </b> </h1>}

          {/* form */}
          {
            !isLoading && !text && (
              <>
                <input 
                  type="file"
                  className='form-control mt-5 '
                  onChange={(e) => 
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <input 
                  type="button" 
                  className='form-control btn btn-primary mt-4'
                  value="Convert"
                  onClick={handleClick}/>
              </>
            )}

            {/* progress bar */}
            {
              isLoading && (
                <>
                  <p className='text-center mt-5'> Converting :- {progress}%</p>
                </>
              )}
             {/* text area */}
             {
              !isLoading && text && (
                <>
                  <textarea className='form-control' rows="15" value={text} onChange={(e) =>
                    setText(e.target.value)}></textarea>
                </>
              )}<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
              <h6> Thanking You..!</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
