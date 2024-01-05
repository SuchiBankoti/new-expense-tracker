import "../CSS/Expense.css";

export default function Expense(props) {
    const {detail,cost,category}=props.expense
    return (
        <div className="expense">
            <div className="icon-container"> <img
               src={`${process.env.PUBLIC_URL}/image/${category}.png`}
                 className="mini-expense-icon" /></div>
            <div className="expense-title">
            <p className="name">{category}</p>
            <p className="detail">{detail}</p>
            </div>
            <div className="cost">${cost}</div>
            <div className="border"></div>
        </div>
    )
}