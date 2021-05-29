import { useContext, useEffect, useRef, useState } from "react"
import CryptoContext from '../contexts/CryptoContext'

export default function PopUp({ visible, selected, setVisible }) {
    let [quantity, setQuantity] = useState('0')
    let [checked, setChecked] = useState('Buy')
    let [disabled, setDisabled] = useState(false)
    let inputRef = useRef();
    let { data, wallet, changeWallet, portfolio, changePortfolio, transactions, changeTransactions } = useContext(CryptoContext);



    let changeHandler = (e) => {
        setChecked(e.target.value)
        setQuantity('0')
        inputRef.current.value = '0'
        checkDisabled()
    }

    let closeDialogBox = () => {
        setVisible(false)
    }

    let transactionHandler = () => {
        let amount = Number((Number(quantity) * data[selected].currentPrice).toFixed(2))
        changeWallet(checked === 'Buy' ? (wallet - amount <= 0 ? 0 : Number((wallet - amount).toFixed(2))) : Number((wallet + amount).toFixed(2)))
        let newPortfolio = [...portfolio]
        let currentHoldings = newPortfolio[selected].currentHolding
        newPortfolio[selected].currentHolding = checked === 'Buy' ? currentHoldings + Number(quantity) : currentHoldings - Number(quantity)

        if (checked === 'Buy') {
            newPortfolio[selected].paid = newPortfolio[selected].paid === 0 ? amount : (((portfolio[selected].paid + amount) / (currentHoldings + Number(quantity))) * (currentHoldings + Number(quantity)))
        } else {
            newPortfolio[selected].paid -= amount
        }
        if (newPortfolio[selected].currentHolding <= 0) {
            newPortfolio[selected].paid = 0
        }
        changePortfolio(newPortfolio)
        // {name: 'Bitcoin', qty: 0.0005, currentPrice: 49000, transactiontype: 'buy', value: 24.5, timeStamp: Date.now()}
        let newTransactions = [...transactions]
        newTransactions.unshift({ name: data[selected].name, qty: quantity, currentPrice: data[selected].currentPrice, transactionType: checked.toLowerCase(), value: amount, timeStamp: getTimeStamp() })
        changeTransactions(newTransactions)
        setVisible(false)
    }

    function getTimeStamp() {
        let date = new Date()
        let currentDate = date.getDate()
        let currentMonth = Number(date.getMonth()) + 1
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return (currentDate < 10 ? '0' + currentDate : currentDate) + '/' + (currentMonth < 10 ? '0' + currentMonth : currentMonth) + '/' + date.getFullYear() + ', ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    }

    let maxClickHandler = (e) => {
        inputRef.current.value = e.target.innerText.split(' ')[1]
        setQuantity(e.target.innerText.split(' ')[1])
    }

    let checkDisabled = () => {
        if (checked === 'Buy') {
            if (data[selected] === undefined) {
                setDisabled(true)
            } else {
                if (Number(quantity) === 0) {
                    setDisabled(true)
                } else {
                    setDisabled(wallet < data[selected].currentPrice * Number(quantity))
                }
            }
        } else{
            if (Number(quantity) === 0) {
                setDisabled(true)
            } else {
                setDisabled(Number(quantity) > portfolio[selected].currentHolding)
            }
        }
    }

    let getMaxBuy = () => {
        let maxBuyQty = (wallet / data[selected].currentPrice).toString()
        if(maxBuyQty.length > 8){
            maxBuyQty = maxBuyQty.substring(0, 8)
        }
        return Number(maxBuyQty)
    }

    useEffect(() => {
        if (!visible) {
            setQuantity('0')
            setChecked('Buy')
            checkDisabled()
        }
        // eslint-disable-next-line
    }, [visible])

    useEffect(() => {
        checkDisabled()
        // eslint-disable-next-line
    }, [quantity])

    return (
        <>
            {visible && <div className="pop-up">
                <div className="dialog-box">
                    <div className="dialog-box-header">
                        <p>{checked} {data[selected].name}</p>
                        <p className='close' onClick={closeDialogBox}>x</p>
                    </div>
                    <div className="dialog-box-body">
                        <p className='currentprice'>Current Price : {data[selected].currentPrice}</p>
                        <div className="input-box" >
                            <input type="number" ref={inputRef} min='0' step='any' onChange={(e) => setQuantity(e.target.value)} />
                            <p className='max' onClick={maxClickHandler}>Max: {checked === 'Buy' ? getMaxBuy() : portfolio[selected].currentHolding}</p>
                        </div>
                        <p className='amount-display' style={{ opacity: Number(quantity) > 0 ? '1' : '0' }}>You {checked === 'Buy' ? 'will be charged' : 'will receive'} : {(Number(quantity) * data[selected].currentPrice).toFixed(2)}</p>
                        <div className="radio-buttons">
                            <div className="buy-radio">
                                <input type="radio" name='buy-sell' id='buy' value='Buy' checked={checked === 'Buy'} onChange={changeHandler} />
                                <label htmlFor="buy">Buy</label>
                            </div>
                            <div className="sell-radio">
                                <input type="radio" name='buy-sell' id='sell' value='Sell' checked={checked === 'Sell'} onChange={changeHandler} />
                                <label htmlFor="sell">Sell</label>
                            </div>
                        </div>
                        <button className='transaction-type' onClick={transactionHandler} disabled={disabled} style={{ backgroundColor: disabled ? 'gray' : 'crimson' }}>{checked}</button>
                    </div>
                </div>
            </div>}
        </>
    )
}