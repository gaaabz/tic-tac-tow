import './Square.scss'

const Square = ({ children, index, updateBoard }) => {
  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className='board__square' onClick={handleClick}>
      {children}
    </div>
  )
}

export default Square
