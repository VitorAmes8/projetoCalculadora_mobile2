import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Botao from './Botao';

export default function App() {
    
    const[firstNumber, setFirstNumber] = useState(0);
    const[secondNumber, setSecondNumber] = useState(0);
    const[signal, setSignal] = useState('');
    const[stringCalculo, setStringCalculo] = useState('0');

    var numeros = [];

  for(var i = 0; i <= 9; i++){
      numeros.push(i);
  }
  function calcular(n){
        if(n == "C"){
            setFirstNumber(0);
            setSecondNumber(0);
            setSignal("");
            setStringCalculo("0");
        }
        if(signal == ""){
            setFirstNumber(parseInt(firstNumber.toString() + n.toString()));
            setStringCalculo(parseInt(firstNumber.toString() + n.toString()));
        }
        if((n == "/" || n == "*" || n == "+" || n =="-") && secondNumber == 0){
            setStringCalculo(firstNumber.toString() + n);
            setSignal(n);
        }
        if(signal != ""){
            setSecondNumber(parseInt(secondNumber.toString() + n.toString()));
            setStringCalculo(firstNumber+signal+parseInt(secondNumber.toString() + n.toString()));
        }

        if(n == "="){
            let resultado = 0;
            if(signal == "+"){
                resultado = firstNumber+secondNumber;
            }else if(signal == "-"){
              resultado = firstNumber-secondNumber;
            }
            else if(signal == "/"){
              resultado = firstNumber/secondNumber;
            }
            else if(signal == "*"){
              resultado = firstNumber*secondNumber;
            }
            setStringCalculo(resultado);
            setSignal("");
            setFirstNumber(resultado);
            setSecondNumber(0);
        }
  }
    return (
        <View style={{flex:1,backgroundColor:'black'}}>

            <View style={styles.topo}><Text style={{fontSize:24,color:'white'}}>{stringCalculo}</Text></View>
            <View style={{flexDirection:'row',flexWrap:'wrap',height:'16.6%'}}>
                <TouchableOpacity onPress={()=>calcular('C')} style={styles.numero1}>
                    <Text style={styles.fonte}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>calcular('+')} style={styles.numeros}>
                    <Text style={styles.fonte}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>calcular('-')} style={styles.numeros}>
                    <Text style={styles.fonte}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>calcular('/')} style={styles.numeros}>
                    <Text style={styles.fonte}>/</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>calcular('*')} style={styles.numeros}>
                    <Text style={styles.fonte}>*</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>calcular('=')} style={styles.numeros}>
                    <Text style={styles.fonte}>=</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap',borderTopColor:'black',borderTopWidth:2,height:'66.8%'}}>
                {
                    numeros.map(function(e){
                    return (<Botao calcular={calcular} numero={e}></Botao>);
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topo:{
      backgroundColor:'rgb(20,20,20)',
      height:'16.6%',
      justifyContent:'center',
      paddingLeft:20
    },
    numero1:{
      width:'25%',
      backgroundColor:'rgb(20,20,20)',
      justifyContent:'center',
      alignItems:'center',
      height:'100%'
    },
    numeros:{
      width:'15%',
      backgroundColor:'rgb(20,20,20)',
      justifyContent:'center',
      alignItems:'center',
      height:'100%'
    },
    fonte:{
    fontSize:24,
    color:'white'}

});