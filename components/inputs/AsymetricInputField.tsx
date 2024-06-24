import StandardInputField, { InputFieldProps } from "./StandardInputField";


interface AsymetricInputFieldProps extends InputFieldProps {
    asymetricType: 'type1' | 'type2';
}

const AsymetricInputField: React.FC<AsymetricInputFieldProps> = (props) => {
    const className = props.asymetricType === 'type1' ? 'asymmetrical-type1' : 'asymmetrical-type2';
    return (
        <StandardInputField {...props} customStyles={`${className} rounded-none px-6`}/>
    );
}

export default AsymetricInputField;