import { useContext, useState } from "react"
import CryptoContext from '../contexts/CryptoContext'
import CurrencyCard from "./CurrencyCard";
import PopUp from "./PopUp";


export default function ListOfCurrencies(props) {
    let [visible, setVisible] = useState(false)
    let [selected, setSelected] = useState(0)

    let {data} = useContext(CryptoContext)

    let getCurrencyId = (id) => {
        setSelected(id)
        setVisible(true)
    }

    return (
        <div className="listofcurrencies">
            { data.map((item, idx) =>
                <CurrencyCard
                    name={item.name}
                    percentageChange={item.percentageChange}
                    currentPrice={item.currentPrice}
                    image={item.image}
                    method={getCurrencyId}
                    key={idx}
                    index={idx}
                />)
            }

            <PopUp visible = {visible} selected = {selected} setVisible = {setVisible}/>
        </div>
    )
}