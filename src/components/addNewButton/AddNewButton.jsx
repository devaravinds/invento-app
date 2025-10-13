import './addNewButton.css'

export const AddNewButton = ({text, onClick}) => {
  return (
    <button
      className="add-new-btn"
      onClick={onClick}
    >
    {text}
    </button>
    )
}