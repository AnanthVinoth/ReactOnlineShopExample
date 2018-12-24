import React, { Component } from 'react';
import { Navbar, NavbarBrand} from 'reactstrap';
import CreateTable from './containers/createTable';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar color="primary" light expand="lg">
          <NavbarBrand href="/">ONLINE SHOP</NavbarBrand>
        </Navbar>
      
        <div className="App">
          <div className="container" style={{ marginTop: "60px"}} >
            <div className="row">
              <div className="col-lg-12">
                <CreateTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
