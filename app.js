import React from 'react';
const css = require('./src/stylesheets/style.scss');
import LeftPane from './src/components/left-pane';
import RightPane from './src/components/right-pane';

class App extends React.Component{
  constructor(props){
    super(props); 
  }
  render(){
    return(
      <div className="main">
        <LeftPane />
        <RightPane/>
      </div>
    );
  }
}

export default App;