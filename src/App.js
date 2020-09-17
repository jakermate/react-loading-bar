import React, {useState, useEffect} from 'react';
import './App.css';
import ProgressBar from './loaders/ProgressBar'
import ProgressSpinner from './loaders/ProgressSpinner'
import earth from './earthspin.mp4'
function App(props) {
  const [percent, setPercent] = useState(0)
  const [isDone, setIsDone] = useState(false)
  useEffect(()=>{
    setTimeout(()=>{
      setIsDone(true)
    }, 2000)
    // 100 count
    // let interval = setInterval(()=>{
    //   if(percent < 101){
    //     setPercent(prev=>prev+1)
    //     console.log(percent)
    //   }
    //   else{
    //     clearInterval(interval)
    //   }
    // }, 100)
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <div className="container mx-auto">
          <ProgressBar 
          URL={earth}
          showHint={false}
          hint={'getting file'}
          smoothing={'high'}
          theme={'basic'}
          dumb={false}
          smoothing={'medium'}
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
          URL={earth}
          dumb={false}
          showHint={true}
          hint={'DOWNLOADING'}
          displayPercent={true}
          smoothing={'medium'}
          theme={'outline'}
          colorPrimary={'linear-gradient(to right, gray, white)'}
          colorText={'cyan'}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
          <ProgressBar 
          dumb={true}
          showHint={true}
          hint={'DOWNLOADING'}
          displayPercent={true}
          smoothing={'medium'}
          theme={'outline'}

          percent={50}
          colorPrimary={'linear-gradient(to right, gray, white)'}
          colorText={'white'}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
        </div>
        <ProgressBar URL={earth}></ProgressBar>
        <ProgressSpinner
          URL={earth}
          radius={200}
        ></ProgressSpinner>
        <ProgressSpinner
          dumb
          radius={100}
          percent={percent}
        ></ProgressSpinner>
      </header>
    </div>
  );
}

export default App;
