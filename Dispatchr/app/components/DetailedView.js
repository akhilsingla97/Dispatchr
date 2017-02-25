import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, Alert, TouchableHighlight, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DetailedViewRequestProfile from './DetailedViewRequestProfile';
import renderIf from '../lib/renderif'

class DetailedView extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCancelOption: this.props.userInfo === this.props.request.user.username ? true : false,
      username: this.props.request.user.username
    }
  }
  _acceptRequest() {
    this.props.acceptRequest(this.props.request);
  }
  _alertCancel(){
    Alert.alert(
      'Request Cancelled',
      [
        {text: 'OK', onPress: () => {Actions.pop()}},
      ]
    )
  }
  _alertHide(username) {
    Alert.alert(
      'Request Declined',
      "You'll get them next time!",
      [
        {text: 'OK', onPress: () => { Actions.PaymentView({username}) }},
      ]
    )
  }
  render() {
    return (
      <View style = {{flex: 1}}>
          <DetailedViewRequestProfile request = {this.props.request}></DetailedViewRequestProfile>
          <ScrollView>
            {this.props.request.request_items.map((requestItem) => {
              return <View style = {styles.seperator}><Text>{requestItem.quantity_description} {requestItem.item.name} {/*}{requestItem.max_price}*/} {"\n"}</Text></View>
            })}
            </ScrollView>
          <View style={styles.content}>
            <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._acceptRequest() }}>
              <Text> Accept </Text>
            </TouchableHighlight>
            <View style={styles.divider}></View>
           {renderIf(this.state.showCancelOption)(
             <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._alertCancel() } }>
               <Text> Cancel </Text>
             </TouchableHighlight>
           )}
           {renderIf(!(this.state.showCancelOption))(
             <TouchableHighlight style={{flex: 1, alignItems: 'center'}} onPress = {() => { this._alertHide(this.state.username) } }>
               <Text> Hide </Text>
             </TouchableHighlight>
           )}
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
    content: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#EAEAEA',
        borderWidth: 1,
    },
    seperator: {
      borderBottomWidth: 1,
      borderColor: "gray",
    },
    buttonText: {
        fontSize: 20
    },
    divider: {
      backgroundColor: '#EAEAEA',
      width: 1,
      height: 35,
      marginTop: 5,
      marginBottom: 5
    }
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    acceptRequest: state.acceptRequest,
    userInfo: state.userInfo,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);
