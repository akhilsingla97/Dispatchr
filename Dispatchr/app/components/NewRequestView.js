import React, { Component } from 'react';
import TextField from 'react-native-md-textinput';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import Button from 'apsl-react-native-button';
import { Text, View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import ActionButton from 'react-native-action-button';


export default class NewRequestView extends Component {
  render() {
    return (
      <View>
        <PopupDialog
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' }) }
            dialogTitle={<DialogTitle title="New Request" />}
            width={340}
            height={450}
            overlayOpacity={0.75}
          >
            <View>
                <TextField label={'Name'} highlightColor={'#00BCD4'} />
                <TextField
                  label={'Qty.'}
                  highlightColor={'#00BCD4'}
                  keyboardType={'numeric'}
                />
                <Button style={styles.requestButtonSave} onPress={()=>this._saveRequestAndAddNewItem()}textStyle={{color: 'white'}}>
                  Save + Add
                </Button>
                <Button style={styles.requestButtonSave} onPress={() => this._saveNewRequest()} textStyle={{color: 'white'}}>
                  Save
                </Button>
            </View>
          </PopupDialog>

          <ActionButton buttonColor="#0288D1" onPress={() => this._showPopup()} />
        </View>
    );
  }

  _showPopup = () => {
    console.log('hit');
    this.popupDialog.openDialog();
  }
  _saveNewRequest = () => {
    console.log("Request Saved!");
  }

  _saveRequestAndAddNewItem = () => {
    console.log("Added new item, and saved request");
  }

}

const styles = StyleSheet.create({
  requestButtonSave: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    width: 100,
    height: 25
  },
});

