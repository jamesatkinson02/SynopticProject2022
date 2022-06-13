import RMText from "./RMText";

const FormError = (props) => {
  return(
    <RMText style={{
      color: '#fa2f47',
      textAlign: 'center',
      marginTop: 10,
    }}>{props.children}</RMText>
  );
};

export default FormError;
