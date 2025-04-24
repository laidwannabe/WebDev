import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

class App extends Component
{
handleClick(){
  //console.log('done!');
  axios.get('https://api.github.com/users/maecapozzi').then(response => this.setState({id:
response.data.id}))
// .then(response => console.log(response));
}
constructor() {
super();
this.state = {
id: ''
}
this.handleClick = this.handleClick.bind(this);
}
render()

{

return (<div className ='button_container'>

<Button variant="flat" size="xxl" className = 'button' onClick =
{this.handleClick}>
push me <span class="glyphicon glyphicon-star" aria-hidden="true"></span>
</Button> 
<p>{this.state.id}</p>
</div>)
}
}


export default App;
