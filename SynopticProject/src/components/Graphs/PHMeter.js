import RNSpeedometer from 'react-native-speedometer';

const phLabels = [
  {
    key: 3,
    name: 'Extremely Acidic',
    labelColor: '#ebc034',
    activeBarColor:'#ebc034',
  },
  {
    key: 4,
    name: 'Very Acidic',
    labelColor:'#ebeb34',
    activeBarColor:'#ebeb34',
  },
  {
    key: 5,
    name: 'Mildy Acidic',
    labelColor:'#b4eb34',
    activeBarColor:'#b4eb34',
  },
  {
    key: 6,
    name: 'Very Little Acid',
    labelColor:'#6beb34',
    activeBarColor:'#6beb34',
  },
  {
    key: 7,
    name: 'Neutral',
    labelColor:'#3aeb34',
    activeBarColor:'#3aeb34',
  },
  {
    key: 8,
    name: 'Very Little Alakali',
    labelColor:'#34eba5',
    activeBarColor:'#34eba5',
  },
  {
    key: 9,
    name: 'Mildly Alkaline',
    labelColor:'#34d9eb',
    activeBarColor:'#34d9eb',
  },
  {
    key: 10,
    name: 'Very Alkaline',
    labelColor:'#34aeeb',
    activeBarColor:'#34aeeb',
  },
  {
    key: 11,
    name: 'Extremely Alkaline',
    labelColor:'#348feb',
    activeBarColor:'#348feb',
  },
]

const PHMeter = (props) => {
  let size = props.containerWidth - (props.containerPadding * 2);

  return (
    <RNSpeedometer
      labels={phLabels}
      minValue={3}
      maxValue={11}
      value={props.value}
      labelStyle={{
        fontSize: size * 0.2
      }}
      labelNoteStyle={{
        fontSize: size * 0.13
      }}
      wrapperStyle={{
        transform: [
          { translateY: - size * 0.245 },
        ],
      }}
      size={size}
    />
  );
};

export default PHMeter;
