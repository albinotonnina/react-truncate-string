import React, { Component } from "react";
import TruncateString from "react-truncate-string";
import logo from "./logo.svg";
import "./App.css";

const string1 =
  "This is a long long long long long long long string that ends here";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container containerA">
          <TruncateString text={string1} />
        </div>
        <div className="container containerB">
          <TruncateString text={string1} />
        </div>
        <div className="container containerC">
          <TruncateString text={string1} />
        </div>
        <div className="container containerD">
          <TruncateString text={string1} />
        </div>
        <div className="container containerE">
          <TruncateString text={string1} />
        </div>
      </div>
    );
  }
}

export default App;
