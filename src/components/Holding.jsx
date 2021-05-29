export default function Holding({ coin, data }) {
    let { currentPrice } = data.filter(value => value.name === coin.name)[0]
    let currentValue = currentPrice * coin.currentHolding
    let profit = Number((currentValue - coin.paid).toFixed(2))
    return (
        <div className="holding">
            <p>{coin.name}: {coin.currentHolding}</p>
            <p>Total Paid: {coin.paid.toFixed(2)}, Current Value: {currentValue.toFixed(2)}</p>
            <p>P/L : ${profit} {profit > 0 ? '🔺' : profit < 0 ? '🔻' : '〰'}</p>
        </div>
    )
}