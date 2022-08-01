import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DropZone} from "./dropzone";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p style={{marginTop: "136px", marginBottom: "0", paddingBottom: "0", fontSize: 36}}>
                    Sharing <code>Files</code> with IPFS/Filecoin
                </p>
                <p style={{marginTop: "0", paddingTop: "0", fontSize: 36}}>
                    On BlockChain
                </p>

                <DropZone/>
            </header>
        </div>
    );
}

export default App;
