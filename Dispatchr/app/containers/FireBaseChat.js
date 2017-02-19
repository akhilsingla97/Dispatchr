import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AppState
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import * as firebase from 'firebase';
// Initialize Firebase

export default class FireBaseChat extends Component {
  constructor(props){
    super(props);
    this.database = firebase.database();
    this.state = {
      chat: '',
      chats: [],
      userOnline: 0
    }
    this.userOnlineRef = this.database.ref('userOnline');
    this.chatsRef = this.database.ref('chats');
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.sendChat = this.sendChat.bind(this);
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(){
    console.log("AppState", AppState.currentState);
    if (AppState.currentState == 'active'){
      this.getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction();
    }else if(AppState.currentState == 'inactive'){
      BackgroundTimer.setTimeout(() => this.decreaseNumberOfUserOnlineByTransaction(), 0);
    }
  }

  getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction(){
    this.userOnlineRef.transaction(function(currentUserOnline) {
      return currentUserOnline + 1;
    });
  }

  decreaseNumberOfUserOnlineByTransaction(){
    this.userOnlineRef.transaction(function(currentUserOnline) {
      return currentUserOnline>0?currentUserOnline-1:0;
    });
  }

  listeningForNumberOfUserOnline(){
    this.userOnlineRef.on('value', (snapshot) =>{
      console.log("UserOnline change", snapshot.val());
      this.setState({userOnline:snapshot.val()});
    });
  }

  listeningForChatChange(){
    this.chatsRef.on('value', (snapshot) => {
      console.log("Chats change:", snapshot.val());
      this.setState({chats: snapshot.val()});
    })
  }

  componentDidMount(){
    this.listeningForNumberOfUserOnline();
    this.getNumberOfUserOnlineOnceAndIncreaseBy1ByTransaction();
    this.listeningForChatChange();
  }

  removeChat(i){
    console.log("RemoveChat", i);
    this.chatsRef.transaction((chats)=>{
      if (!chats){
        chats = [];
      }
      chats.splice(i, 1);
      this.setState({chat:""});
      return chats;
    });
  }

  sendChat(){
    console.log(this.state.chat);
    this.chatsRef.transaction((chats)=>{
      if (!chats){
        chats = [];
      }
      chats.push(this.state.chat);
      this.setState({chat:""});
      return chats;
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.labelText}>
            #User online: {this.state.userOnline}
          </Text>
        </View>
        <View style={styles.content}>
          {this.state.chats ? this.state.chats.map((chat,i) =>
            <View><Text key={i}>{chat}</Text><TouchableOpacity onPress={()=>this.removeChat(i)}><Text> X</Text></TouchableOpacity></View>):null}
        </View>
        <View style={styles.footer}>
          <TextInput style={styles.textInput}
            value={this.state.chat}
            onChangeText={(t)=>this.setState({chat:t})}>
          </TextInput>
          <TouchableOpacity style={styles.button}
            onPress={this.sendChat}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  content:{
    padding: 10,
    flex:1,
  },
  labelText:{
    fontSize: 20
  },
  header:{
    justifyContent:'center',
    alignItems: 'center',
    height: 50,
    padding: 5,
    backgroundColor: '#dddddd'
  },
  footer:{
    height: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row'
  },
  textInput:{
    flex:1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5
  },
  button:{
    width: 100,
    backgroundColor: 'darkblue',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    fontSize: 20,
    color: 'white'
  }

});
