export default function Transaction({ value }) {
    return (
        <div className="transaction" style={{ borderLeft: value.transactionType === 'buy' ? '5px solid #34aa33' : '5px solid #f44646' }}>
            <p>{value.name} - {value.qty}@{value.currentPrice}</p>
            <p>{value.transactionType === 'buy' ? 'Paid' : 'Received'}: ${value.value.toFixed(2)}</p>
            <p>{value.transactionType === 'buy' ? 'Bought' : 'Sold'} on: {value.timeStamp}</p>
        </div>
    )
}