import React from 'react';
import useWebSocket from 'react-use-websocket';

const host = process.env.NODE_ENV === 'development' ? 'ws://localhost:8080' : 'wss://pausemane-ws.pokijam.com';

export function usePauses(): number {
    const [pauses, setPauses] = React.useState(0);
    const mounted = React.useRef(true);
    const { lastMessage } = useWebSocket(host, {
        reconnectAttempts: Infinity,
        reconnectInterval: 3000,
        retryOnError: true,
        shouldReconnect: () => mounted.current === true,
    });

    React.useEffect(() => {
        if (!lastMessage) {
            return;
        }

        let parsed: object;
        try {
            parsed = JSON.parse(lastMessage.data) as object;
        } catch (err) {
            console.error(err);
            return;
        }

        if ((parsed as { type: string }).type === 'PAUSES') {
            setPauses((parsed as { pauses: number }).pauses);
        }
    }, [lastMessage]);

    React.useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);

    return pauses;
}
