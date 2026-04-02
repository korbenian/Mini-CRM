import styles from './Button.module.scss'
type ButtonProps = {
  label: string
  onClick?: () => void
  type: 'button' | 'submit'
}
const Button = ({ label, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button className={styles.Button} onClick={onClick} type={type}>
      {label}
    </button>
  )
}
export default Button
