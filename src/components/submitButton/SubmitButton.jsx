import './submitButton.css'

const SubmitButton = ({text}) => {
    return (
        <button type="submit" className="submit-btn">
            {text}
        </button>
    )
}

export default SubmitButton;