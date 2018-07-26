import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  Platform
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppLoading } from "expo";
import ToDo from './ToDo';
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos:{}
  }
  componentDidMount = () =>{
    this._loadToDos();
  }

  render() {
    const { newToDo, loadedToDos,toDos } = this.state
    console.log(toDos);
    if (!loadedToDos) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"Hello I am To Do!"} />
          </ScrollView>
        </View>

      </View>
    );
  }

  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
  _loadToDos = () =>{
    this.setState({
      loadedToDos:true
    })
  }
  _addToDo = () => {
    const {newToDo} = this.setState;
    if(newToDo !==""){
      this.setState(prevState =>{
        const ID = uuidv1();
        const newToDoObject = {
          [ID] : {
            id: ID,
            isCompleted : false,
            text: newToDo,
            createdAt : Date.now()
          }
        }
        /** ... == "전개연산자"
         * 1) ...prevState : 이전 toDo를 그대로 불러오고
         * 2) newToDo를 비우면서,
         * 3) toDos 에 입력을 받은 객체(내용)을 newToDoObject에 넣는것
         */
        const newState = {
          ...prevState,
          newToDo:"",
          toDos : {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return {...newState}
      })
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
