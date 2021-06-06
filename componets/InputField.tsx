

export interface InputFieldProps {
  value?: any;
  onChange?: (e: any) => void;
  placeholder: string;
  divStyle?: any;
  labelStyle?: any;
  label?: any;
  inputStyle?: any
}
 
const InputField: React.FC<InputFieldProps> = ({onChange, value, placeholder, divStyle, 
  labelStyle, label, inputStyle
}) => {
  return ( 
    <div style = {divStyle}>
      <label style={labelStyle}>{label}</label>
      <input 
        type = 'text'
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style = {{...inputStyle, 
          borderWidth: 1,
          borderRadius: 3,
          height: 33,
          outlineColor: 'grey',
          fontFamily: "Poppins",
          fontSize: 16,
          margin: "2px 20px",
          padding: 12,
          color: 'grey',
          fontWeight: '600'
        }}
      />
    </div>
   );
}
 
export default InputField;