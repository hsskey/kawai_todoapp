import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TextInput} from 'react-native';

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component {
    state = {
        isComplete : false,
        isEditing: false
    }
    render(){
        const {isComplete,isEditing} = this.state
        return <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isComplete ? styles.isCompleteCircle : styles.unCompletedCircle]} />
                    </TouchableOpacity>
                    <Text style={[styles.text, isComplete ? styles.isCompleteText : styles.unCompletedText]}>Hello I'am Todos~!</Text>
                </View>
                
                    {isEditing ?(
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._finishEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <View style={styles.actions}>
                            <TouchableOpacity onPressOut={this._startEditing}>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>✏️</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.actionContainer}>
                                    <Text style={styles.actionText}>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                
            </View>
    }

    _toggleComplete = () =>{
        this.setState(prevState =>{
            return {
                isComplete : !prevState.isComplete
            }
        })
    }

    _startEditing = () =>{
        this.setState({
            isEditing:true
        })
    }

    _finishEditing =() =>{
        this.setState({
            isEditing:false
        })
    }
}

const styles = StyleSheet.create({
    container : {
    width: width-50,
    borderBottomColor: "#bbb",
    borderBottomWidth : StyleSheet.hairlineWidth,
    flexDirection : "row",
    alignItems:"center",
    justifyContent:"space-between"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 3,
        marginRight: 20,
      },
      isCompleteCircle:{
        borderColor:"#bbb"
      },
      unCompletedCircle: {
        borderColor: "#F23657"
      },
      isCompleteText:{
        color:"#bbb",
        textDecorationLine:"line-through"
      },
      unCompletedText:{
        color:"#353535"
      },
    text: {
        fontWeight:"600",
        fontSize: 20,
        marginVertical : 20
    },
    column:{
        flexDirection:"row",
        alignItems:"center",
        width:width / 2
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10
    }
});