import { ButtonProps } from "../types"

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <div className="p-2 m-2 bg-red-300 rounded-md text-white" onClick={onClick}>{title}</div>
  )
}

export default Button