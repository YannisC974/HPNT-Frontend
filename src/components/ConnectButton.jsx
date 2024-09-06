import { ConnectButton } from "@rainbow-me/rainbowkit";

const CustomConnectButton = () => {
    return (
        <ConnectButton.Custom>
            {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
            }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
                <div
                {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    },
                })}
                >
                {(() => {
                    if (!connected) {
                    return (
                        <button onClick={openConnectModal} type="button" style={{width: '300px', height: '2.8vw'}}>
                        Connect to your wallet
                        </button>
                    );
                    }

                    if (chain.unsupported) {
                    return (
                        <button onClick={openChainModal} type="button">
                        Wrong network
                        </button>
                    );
                    }

                    return (
                    <div className="flex justify-start items-center w-[22.917vw] md:text-[14px] h-[3.385vw] text-[1.458vw] text-[#FFFFFF] md:w-[324px] md:h-[47px]">
                        <button
                        onClick={openChainModal}
                        style={{ display: 'flex', alignItems: 'center'}}
                        type="button"
                        >
                        {chain.hasIcon && (
                            <div
                            style={{
                                background: chain.iconBackground,
                                width: '2vw',
                                height: '2vw',
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                            }}
                            >
                            {chain.iconUrl && (
                                <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: '2vw', height: '2vw' }}
                                />
                            )}
                            </div>
                        )}
                        {chain.name}
                        </button>

                        <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        </button>
                    </div>
                    );
                })()}
                </div>
            );
            }}
    </ConnectButton.Custom>
    )
}

export {CustomConnectButton};
