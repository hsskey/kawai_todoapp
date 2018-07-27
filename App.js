import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  Platform,
  AsyncStorage
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
            {Object.values(toDos).map(toDo =>
          <ToDo 
            key={toDo.id}  
            deleteToDo={this._deleteToDo}
            uncompleteToDo={this._uncompleteToDo}
            completeToDo={this._completeToDo}
            updateToDo={this._updateToDo}
            {...toDo}
          />
          )
            
            }
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
  //async - wait를 안할시 
  _loadToDos =async () =>{
    try {
      const toDos = await AsyncStorage.getItem("toDos");
      const parsedToDos = JSON.parse(toDos);
      this.setState({
        loadedToDos:true,
        toDos: parsedToDos

      })
      console.log(toDos);
    } catch(err){
      console.log(err);
    }
  }
  _addToDo = () => {
    const {newToDo} = this.state;
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
        this._saveToDo(newState.toDos);
        return {...newState};
      })
    }
  }

  _deleteToDo = (id) => {
    this.setState(prevState =>{
        const toDos = prevState.toDos;
        delete toDos[id];
        const newState ={
            ...prevState,
            ...toDos
        }
        this._saveToDo(newState.toDos);
        return {...newState};
    })
}

  _uncompleteToDo = id => {
    this.setState(prevState => {
      
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false
          }
        }
      }
      this._saveToDo(newState.toDos);
      return { ...newState };
    })
  }

  _completeToDo = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true
          }
        }
      }
      // console.log("첫번째 : ...prevState: ");
      // console.log({...prevState});
      // console.log("두번째 : ...prevState.toDos: ");
      // console.log({...prevState.toDos});
      // console.log("세번째 : ...prevState.toDos[id]: ");
      // console.log({...prevState.toDos[id]});
      // console.log("newState : " + {newState});

      this._saveToDo(newState.toDos);
      return {...newState};
    })
  }
  _updateToDo = (id,text) =>{
    this.setState(prevState =>{
      const newState = {
        ...prevState,
        toDos : {
          ...prevState.toDos,
          [id] : {
            ...prevState.toDos[id],
            text : text
          }
        }
      }
      this._saveToDo(newState.toDos);
      return { ...newState };
    })
  }
  _saveToDo = (newToDo) => {
    //console.log(JSON.stringify(newToDo));
    AsyncStorage.setItem("toDos",JSON.stringify(newToDo))
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
