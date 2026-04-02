import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className={styles.field}>
   <input {...props} placeholder={props.placeholder || ' '} />
      {label && <label>{label}</label>}
    </div>
  )
}

export default Input
