import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import 'toastr/build/toastr.min.js';
// import {Button} from 'primereact/button';

import Navbar from '../components/navbar';
import Rotas from './router';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css";                 
import "primeicons/primeicons.css";                                
class App extends React.Component {

  render(){
    return (
      <>
        {/* <Button label="click" icon="pi pi-check" iconPos="right"> */}
        <Navbar/>
        <div className="container">
          <Rotas/>
        </div>
      </>  
    );
  }
 
}

export default App;
