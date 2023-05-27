interface IInputContainerProps {
  labelName: string
  placeHolder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: 'text' | 'password' | 'email'
  condition: boolean
}

export const InputContainer: React.FC<IInputContainerProps> = ({
  labelName,
  placeHolder,
  onChange,
  type,
  condition
}) => {
  return (
    <div className="flex flex-col flex-grow">
      <label
        className={`${condition ? 'text-pink ' : 'text-white'} block mb-2 text-sm font-medium `}
      >
        {labelName}
      </label>
      <input
        onChange={onChange}
        type={type}
        className={`${
          condition ? 'border-pink text-pink' : 'border-gray-600 text-white'
        } border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
        placeholder={placeHolder}
      />
    </div>
  )
}
