import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface IButton {
  onPress: () => void;
  title: string,
  backgroundColor?: string
}

export const RoundButton: React.FC<IButton> = ({title, onPress, backgroundColor="#333333"}) => {

  return(  
    <TouchableOpacity
      onPress={onPress} 
      activeOpacity={0.7}  
      style={[
        styles.button,
        {backgroundColor: backgroundColor}, 
        title==='0' && {flex: 0.6}
      ]}
    >
      <Text 
        style={styles.text} 
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333'
  }, 
  text: {
    fontSize: 30,
    color: '#fff',
 
  }
})