import React from 'react';
import {
    WagmiConfig,
    createClient,
    defaultChains,
    configureChains,
} from 'wagmi'
import './App.css';
import {DropZone} from "./dropzone";
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {Profile} from "./Profile";
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    publicProvider(),
])

// Set up client
const client = createClient({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
    ],
    provider,
    webSocketProvider,
})

function App() {
    return (
        <WagmiConfig client={client}>
            <div className="App">
                <header className="App-header">
                    <p style={{marginTop: "136px", marginBottom: "0", paddingBottom: "0", fontSize: 36}}>
                        Sharing <code>Files</code> with IPFS/Filecoin
                    </p>
                    <p style={{marginTop: "0", paddingTop: "0", fontSize: 36 , marginBottom:"0"}}>
                        On BlockChain
                    </p>
                    <Profile/>

                    <DropZone/>
                </header>
            </div>
        </WagmiConfig>
    );
}

export default App;
