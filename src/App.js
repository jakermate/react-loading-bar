import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoadingBar from './loadingbar/LoadingBar'
function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container mx-auto">
          <LoadingBar URI={'d'}></LoadingBar>
        </div>
      </header>
    </div>
  );
}

export default App;
