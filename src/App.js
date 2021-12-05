import React, { useState } from "react";
import QRCode from "qrcode.react";
import { getBalance, readCount, setCount } from "./api/UseCaver";
import * as KlipAPI from "./api/UseKlip";
import "./App.css";

// 1 Get Smart Contract Address
// 2 Link to Smart Contract using caver-js
// 3 Display Result of the Smart Contract on App screen

const DEFAULT_QR_CODE = "DEFAULT";

function App() {
  const [balance, setBalance] = useState(0);
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);
  const onPressButton2 = (balance) => {
    setBalance(10);
  };
  // readCount();
  // getBalance('0x933bcb4908bdf20bfc85516cfc48f381d26a689c');
  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  };
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            onClickGetAddress();
          }}
        >
          {" "}
          get address{" "}
        </button>{" "}
        <button onClick={onClickSetCount}>set Count</button>
        <br />
        <QRCode value={qrvalue} /> <p> {balance} </p>{" "}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React{" "}
        </a>{" "}
      </header>{" "}
    </div>
  );
}

export default App;
