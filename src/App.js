import React from 'react';
import './App.css';
import ProgressBar from './progressbar/ProgressBar'
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container mx-auto">
          <ProgressBar 
          URI={'fwd'}
          showHint={false}
          hint={'getting file'}
          smoothing={'high'}
          theme={'basic'}
          colorPrimary={'linear-gradient(to right, green, cyan)'}
          colorText={'cyan'}
          containerStyle={{
            marginBottom: '30px'
          }}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
          <ProgressBar 
          URI={'fwd'}
          showHint={false}
          hint={'DOWNLOADING'}
          displayPercent={false}
          smoothing={'medium'}
          theme={'outline'}
          colorPrimary={'linear-gradient(to right, green, cyan)'}
          colorText={'cyan'}
          onComplete={()=>{console.log('Oncomplete callback works!')}}></ProgressBar>
        </div>
      </header>
    </div>
  );
}

export default App;
