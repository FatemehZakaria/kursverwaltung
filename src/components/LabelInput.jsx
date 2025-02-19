const LabelInput = ({
    label,
    type = 'text',
    value,
    onChange,
    required = false,
    id,
}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default LabelInput;