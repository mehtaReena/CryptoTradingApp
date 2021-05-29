import { useContext, useEffect } from 'react'
import CryptoContext from '../contexts/CryptoContext'
import Transaction from './Transaction'

export default function TransactionsList() {
    let { transactions } = useContext(CryptoContext)
    useEffect(() => { }, [transactions])
    return (
        <div className="transactions-list">
            <h1>Transactions</h1>
            <div className="list">
                {!transactions.length && <p>No transactions yet...</p>}
                {transactions.length > 0 && transactions.map((transaction, idx) => <Transaction value={transaction} key={idx} />)}
            </div>
        </div>
    )
}