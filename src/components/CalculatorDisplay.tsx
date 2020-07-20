import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

type CalculatorDisplayProps = {
  result: string;
  memorizedValue: string;
  displayValue: string[];
  inputValue: string
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  memorizedValue,
  displayValue, 
  inputValue, 
  result
}) =>  {
  const transformAnim = useState(new Animated.Value(-20))[0];

  useEffect(() =>{
    const isMemorizedValue = memorizedValue !=='0' ? 1 : -1;
    Animated.timing(
      transformAnim,
      {
        toValue: 100 * isMemorizedValue,
        duration: 400,
        useNativeDriver: true
      }
    ).start()
  }, [memorizedValue])

  return (
    <View style={styles.resultContainer}>
      <Animated.Text  
        style={[
          {  
            transform:[{translateY: transformAnim}], 
          },
            styles.memoryText
          ]}
      >
        mr
     </Animated.Text>   
      <Text  style={styles.inputedText}
        numberOfLines={2}   
        adjustsFontSizeToFit
        minimumFontScale={0.4}
      >
        {displayValue}
        {result? '=': ''}
        {inputValue}
      </Text>
    </View>    
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 2.5,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'flex-end'
  },
  inputedText: {
    color: '#fff',
    textAlign: 'right',
    paddingRight: 20,
    fontSize: 80,
    fontWeight: '600',
    paddingLeft: 50
  },
  memoryText: {
    position: 'absolute',
    zIndex: 100,
    top: -80,
    left: 20,
    color: 'red',
    fontSize: 30,
  }
});


  
  