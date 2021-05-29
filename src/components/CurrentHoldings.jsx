import { useContext, useEffect, useState } from 'react'
import CryptoContext from '../contexts/CryptoContext'
import Holding from './Holding'

export default function CurrentHoldings() {
    let { data, portfolio } = useContext(CryptoContext)
    let [activeHoldings, setActiveHoldings] = useState(portfolio.filter(coin => coin.currentHolding > 0))

    useEffect(() => {
        setActiveHoldings(portfolio.filter(coin => coin.currentHolding > 0))
        // eslint-disable-next-line
    }, [portfolio])
    return (
        <div className="current-holdings">
            <h1>Current Holdings</h1>
            {!activeHoldings.length && <p>Go buy some 🚀</p>}
            {activeHoldings.length > 0 && activeHoldings.map((coin, idx) => <Holding coin={coin} data={data} key={idx} />)}
        </div>
    )
}