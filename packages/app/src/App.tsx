import React from 'react';

import Styles from './App.module.scss';
import { usePauses } from './hooks/use-pauses';

function App() {
    const pauses = usePauses();
    return (
        <div className={Styles.App}>
            <div className={Styles.App__pauses}>
                <div className={Styles.App__pauses__container}>
                    <span>Pause Counter : {pauses}</span>
                </div>
                <div className={Styles.App__pauses__container}></div>
            </div>
        </div>
    );
}

export default App;
