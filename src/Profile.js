import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
} from 'wagmi'

export function Profile() {
    const { address, connector, isConnected } = useAccount()
    const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected) {
        return (
            <div style={{fontSize:"18px",color:"#647d7d", marginBottom:"16px"}}>
                {/*<img src={ensAvatar} alt="ENS Avatar" />*/}
                <div>{address}</div>
                <button onClick={disconnect}>Disconnect</button>
            </div>
        )
    }

    return (
        <div style={{fontSize:"18px",color:"#647d7d", marginBottom:"16px"}}>
            {connectors.map((connector) => (
                <button
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                >
                    {connector.name}
                    {!connector.ready && ' (unsupported)'}
                    {isLoading &&
                    connector.id === pendingConnector?.id &&
                    ' (connecting)'}
                </button>
            ))}

            {error && <div>{error.message}</div>}
        </div>
    )
}