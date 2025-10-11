const EditButton = ({text, onClick}) => {
  return (
    <button
      className="edit-button"
      onClick={onClick}
    >
    {text}
    </button>
    )
}

export default EditButton