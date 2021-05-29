import CurrentHoldings from "./CurrentHoldings";
import TransactionsList from "./TransactionsList";

export default function DisplayBoard(){
    return(
        <div className="display-board">
            <CurrentHoldings />
            <TransactionsList />
        </div>
    )
}