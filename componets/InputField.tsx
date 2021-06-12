import styles from '../styles/Home.module.css'

export interface InputFieldProps {
  value?: any;
  onChange?: (e: any) => void;
  placeholder: string;
  divStyle?: any;
  labelStyle?: any;
  label?: any;
  inputStyle?: any;
  disabled?: boolean
}
 
const InputField: React.FC<InputFieldProps> = ({onChange, value, placeholder, divStyle, 
  labelStyle, label, inputStyle, disabled
}) => {
  return ( 
    <div style = {divStyle}>
      <label style={labelStyle}>{label}</label>
      <input 
        type = 'text'
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        style = {{...inputStyle}}
        className={styles.input_c}
      />
    </div>
   );
}
 
export default InputField;