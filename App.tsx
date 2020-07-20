import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RoundButton} from './src/components/RoundButton';
import {buttonValues} from './src/helpers/constants';
import { CalculatorDisplay } from './src/components/CalculatorDisplay';

export default function App() {
  const [inputValue, setInputValue] = useState<string>('0');
  const [displayValue, setDisplayValue] = useState<string[]>([]);
  const [memorizedValue, setMemorizedValue] = useState<string>('0')
  const [result, setResult] = useState<string>('');

  const clearDisplay = () => {
    setResult('');
    setInputValue('0');
    setDisplayValue([])
  }

  const toggleSign = () => {
    if(!displayValue.length && inputValue==='0') {
      return;
    } 

    const lastSymbol = displayValue[displayValue.length-1];
    if(lastSymbol === '+') { 
      changeSign('-'); 
      return; 
    }
    if(lastSymbol === '-') { 
      changeSign('+'); 
      return; 
    }
    if(result) {  
      setResult(`${+result * -1}`);
    } 
    setInputValue(`${+inputValue * -1}`);
  }

  const changeSign = (operator: string) => {
    setDisplayValue(state => [...state.slice(0, -1), operator]);
  }

  const setDot = () => {
    if(result) {
      return;
    }

    !inputValue.includes('.') && setInputValue(state => state + '.') ; 
  }
  
  const handleInput = (symbol: string) => {
    if(result) {    
      setResult('');
      setInputValue(symbol) 
      return
    }  
     
    if(inputValue ==='0' && !displayValue.length) {  
      setInputValue(symbol) 
      return;
    } 

    setInputValue(state => state + symbol)
  }

  const handleOperator = (operator: string) => {
    if(result) {
      setDisplayValue([result, operator])
      setInputValue('')
      setResult('');
      return;
    }
    if(displayValue.length && !inputValue.length) {
      changeSign(operator);
      return;
    }

      setDisplayValue(state => [...state, inputValue, operator])
      setInputValue('')
      return;
  }

  const calculatePercentage = () => {
    const percentOfValue = displayValue.length ? +displayValue[displayValue.length - 2] / 100 * +inputValue : +inputValue / 100;
    setInputValue(`${percentOfValue}`)
  }

  const calculateResult = () => {
    let resultValue: string;
    const value = !inputValue.length 
      && isNaN(+displayValue[displayValue.length - 1]) 
      ? displayValue.slice(0, -1) 
      : displayValue;
  
    try {
      resultValue = String(eval(value.join('') + inputValue));
      if(resultValue.includes('.')){
        resultValue = String(Math.round(+resultValue * 100) / 100);
      }
      if(String(resultValue) === 'Infinity') {
        throw new Error('Error');
      } 
    } catch (e) {
      resultValue = 'Error';
    }
    setResult(resultValue);
    setInputValue(resultValue);
    setDisplayValue([])
  }

  const addMemorizedValue = (sign: string) => {
    let newMemorizedValue: string;

    try {
      newMemorizedValue = String(eval(`${memorizedValue} + ${inputValue} * ${sign}`));
      if(newMemorizedValue.includes('.')){
        newMemorizedValue = String(Math.round(+newMemorizedValue * 100) / 100);
      }
    } catch (e) {
      return;
    }
    setMemorizedValue(newMemorizedValue)
  }

  const showMemory = () => {
    setResult(memorizedValue);
    setInputValue(memorizedValue)
    setDisplayValue([])
  }

  const clearMemory = () => {
    setMemorizedValue('0')
  }

  const handleOperation = (operator: string) => {
    switch(operator) {
      case 'AC': {
        clearDisplay();
        break;
      } 
      case '=': {
        calculateResult();
        break;
      }
      case '%': {
        calculatePercentage();
        break;
      }
      case '+/-': {   
        toggleSign();
        break;
      }
      case ',': {
        setDot();
        break;
      }
      case 'm+': {
        addMemorizedValue('1'); 
        break;}
      case 'm-': { 
        addMemorizedValue('-1'); 
        break;
      }
      case 'mr': { 
        showMemory();
        break;
      }
      case 'mc': { 
        clearMemory();
        break;
      }
      default: {
        handleOperator(operator);
        break;
      }
    }
  }

  return (
    <View style={styles.container}>
      <CalculatorDisplay 
        displayValue={displayValue}  
        inputValue={inputValue} 
        memorizedValue={memorizedValue}
        result={result}
      />
      <View style={styles.buttonContainer}>
        {buttonValues.map((row, ind) => 
          <View  key={ind} style={styles.row}>
            {row.map((btn, index) => 
              <RoundButton  
                key={btn.title}
                title={btn.title} 
                backgroundColor={btn.bgColor} 
                onPress={btn.action 
                  ? () => handleOperation(btn.title) 
                  : () => handleInput(btn.title) 
                }
              />)
            }
          </View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  buttonContainer: {
    marginTop: 20,
    flex: 7.5,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    width: '100%',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});
