import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

interface ButtonProps {
  text: string;
  w?: number;
  h?: null | number;
  backgroundColor?: string;
  textColor?: string;
  onPress: (key: string) => void;
}

const Button = ({
  text,
  w = 0,
  h = null,
  backgroundColor = '#333333',
  textColor = 'white',
  onPress = () => {},
}: ButtonProps) => {
  const width = w;
  const height = h ?? w;
  return (
    <View style={[styles.buttonContainer, {width: width, height: height}]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: backgroundColor}]}
        onPress={() => onPress(text)}>
        <Text style={[styles.buttonText, {color: textColor}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

function App(): React.JSX.Element {
  const {width} = useWindowDimensions();
  const buttonContainerWidth = width / 4 - 5;
  const [firstValue, setFirstValue] = useState('');
  const [operator, setOperator] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [clearLabel, setClearLabel] = useState('AC');

  const onKeyPress = (key: string) => {
    switch (key) {
      case 'AC':
        setFirstValue('');
        setOperator('');
        setSecondValue('');
        break;
      case 'C':
        if (secondValue !== '') {
          setSecondValue('');
        } else {
          setFirstValue('');
        }

        setClearLabel('AC');
        break;
      case '+/-':
        if (firstValue !== '' || secondValue !== '') {
          if (firstValue !== '' && secondValue === '') {
            setFirstValue((parseFloat(firstValue) * -1).toString());
          } else {
            setSecondValue((parseFloat(secondValue) * -1).toString());
          }
        }
        break;
      case '%':
        calculate(firstValue, key, secondValue);
        break;
      case '/':
      case 'x':
      case '-':
      case '+':
        if (secondValue !== '') {
          calculate(firstValue, operator, secondValue);
        } else {
          setOperator(key);
        }
        break;
      case '=':
        calculate(firstValue, operator, secondValue);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case ',':
        setClearLabel('C');
        if (operator === '') {
          setFirstValue(e => `${e}${key}`);
        } else {
          setSecondValue(e => `${e}${key}`);
        }
        break;
    }
  };

  const calculate = (a = '', o = '', b = '') => {
    let result: number | string = 0;
    a = a.replace(',', '.');
    b = b.replace(',', '.');

    switch (o) {
      case '%':
        result = parseFloat(a) / 100;
        break;
      case '/':
        result = parseFloat(a) / parseFloat(b);
        break;
      case 'x':
        result = parseFloat(a) * parseFloat(b);
        break;
      case '-':
        result = parseFloat(a) - parseFloat(b);
        break;
      case '+':
        result = parseFloat(a) + parseFloat(b);
        break;
    }

    if (result % 1 !== 0) {
      const digitsValue = result.toString().split('.')[1];
      if (digitsValue.length > 6) {
        result = result.toFixed(6);
      }
    }

    result = result.toString().replace('.', ',');

    setFirstValue(result);
    setOperator('');
    setSecondValue('');
  };

  const getDisplayText = () => {
    if (secondValue !== '') return secondValue;
    if (firstValue === '') return '0';

    return firstValue;
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{getDisplayText()}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={clearLabel}
            backgroundColor="#A5A5A5"
            textColor="black"
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'+/-'}
            backgroundColor="#A5A5A5"
            textColor="black"
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'%'}
            backgroundColor="#A5A5A5"
            textColor="black"
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'/'}
            backgroundColor="#FF9F0a"
            textColor="white"
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={'7'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'8'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'9'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'x'}
            backgroundColor="#FF9F0a"
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={'4'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'5'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'6'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'-'}
            backgroundColor="#FF9F0a"
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={buttonContainerWidth}
            text={'1'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'2'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'3'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'+'}
            backgroundColor="#FF9F0a"
            onPress={key => onKeyPress(key)}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button
            w={width / 2 - 10}
            h={buttonContainerWidth}
            text={'0'}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={','}
            onPress={key => onKeyPress(key)}
          />
          <Button
            w={buttonContainerWidth}
            text={'='}
            backgroundColor="#FF9F0a"
            onPress={key => onKeyPress(key)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  displayContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  displayText: {
    fontSize: 70,
    color: 'white',
  },
  buttonsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
  },
});

export default App;
