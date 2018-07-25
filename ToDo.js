import React, {Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TextInput} from 'react-native';

const {width, height} = Dimensions.get("window");

export default class ToDo extends Component {
    state = {
        isComplete : false,
        isEditing: false,
        toDoValue:""
    }
    render(){
        const {isComplete,isEditing,toDoValue} = this.state
        const {text} = this.props
        return <View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isComplete ? styles.isCompleteCircle : styles.unCompletedCircle]} />
                    </TouchableOpacity>
                    {isEditing ?(
                        <TextInput value={toDoValue} 
                        style={[styles.text,
                            styles.input,
                            isComplete ? styles.isCompleteText : styles.unCompletedText]} 
                        multiline={true}
                        onChangeText={this._controllInput}
                        returnKeyType={"done"}
                        onBlur={this._finishEditing}>

                        </TextInput>
                    ):(
                        <Text style={[styles.text, isComplete ? styles.isCompleteText : styles.unCompletedText]}>{text}</Text>
                    )}
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
        const {text} = this.props;
        this.setState({
            isEditing:true,
            toDoValue: text           
        })
    }
    
    _controllInput = (text) => {
        this.setState({
            toDoValue: text
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
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
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
    },
    input:{
        width: width / 2,
        marginVertical: 15,
        paddingBottom: 5
    }
});