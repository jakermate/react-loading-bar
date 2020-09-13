import React, {useState, useEffect} from 'react';
import './App.css';
import ProgressBar from './progressbar/ProgressBar'
import ProgressSpinner from './progressbar/ProgressSpinner'
import earth from './earthspin.mp4'
function App(props) {
  const [isDone, setIsDone] = useState(false)
  useEffect(()=>{
    setTimeout(()=>{
      setIsDone(true)
    }, 2000)
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <div className="container mx-auto">
          <ProgressBar 
          URL={'fwd'}
          showHint={false}
          hint={'getting file'}
          smoothing={'high'}
          theme={'basic'}
          dumb={false}
          textStyle={{
            fontSize:'8px'
          }}
          colorPrimary={'linear-gradient(to right, green, cyan)'}
          colorText={'cyan'}
          containerStyle={{
            marginBottom: '30px'
          }}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
          <ProgressBar 
          URL={'fwd'}
          dumb={false}
          showHint={true}
          hint={'DOWNLOADING'}
          displayPercent={false}
          smoothing={'medium'}
          theme={'outline'}
          colorPrimary={'linear-gradient(to right, gray, white)'}
          colorText={'cyan'}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
          <ProgressBar 
          dumb={true}
          showHint={true}
          hint={'DOWNLOADING'}
          displayPercent={false}
          smoothing={'medium'}
          theme={'outline'}
          percent={88}
          triggerComplete={isDone}
          colorPrimary={'linear-gradient(to right, gray, white)'}
          colorText={'white'}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
        </div>
        <ProgressSpinner
          URL={earth}
          radius={200}
        ></ProgressSpinner>
      </header>
    </div>
  );
}

export default App;
