import logo from './logo.svg';
import { getBalance, readCount, setCount } from './api/UseCaver';

import './App.css';



// 1 Get Smart Contract Address
// 2 Link to Smart Contract using caver-js
// 3 Display Result of the Smart Contract on App screen

function App() {
    readCount();
    getBalance('0x933bcb4908bdf20bfc85516cfc48f381d26a689c');
    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        img src = { logo }
        className = "App-logo"
        alt = "logo" / >
        <
        button onClick = {
            () => { setCount(100) }
        } > setCount 100 < /button> <
        p >
        Edit < code > src / App.js < /code> and save to reload. < /
        p > <
        a className = "App-link"
        href = "https://reactjs.org"
        target = "_blank"
        rel = "noopener noreferrer" >
        Learn React <
        /a> < /
        header > <
        /div>
    );
}

export default App;