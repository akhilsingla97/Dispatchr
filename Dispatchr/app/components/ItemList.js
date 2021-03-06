import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';



class ItemList extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.items)
      })
    }
  }

  render() {
    return (
      <ListView
        style={{flex: 1}}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderSeparator={this._renderSeparator}
        renderFooter={this._renderFooter}
      />
    );
  }

  _renderRow(rowData, sectionId, rowId, highlightRow) {
    const rowAction = () => {
      highlightRow(sectionId, rowId);
      Actions.EditItemForm({rowData});
    };
    return (
      <TouchableOpacity underlayColor="transparent" onPress={rowAction}>
         <View>
           <View style={styles.rowContainer}>
             <Text style={styles.text}>
               {rowData.name} - Qty. {rowData.quantity_description}
             </Text>
           </View>
         </View>
       </TouchableOpacity>
    );
  }

  _renderSeparator(sectionId, rowId) {
    return (
      <View key={rowId} style={styles.separator} />
    );
  }

  _renderFooter(){
    return(
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => Actions.NewItemForm()}>
          <Text style={styles.text}>Add an item!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  footerContainer: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderColor: '#8E8E8E',
      borderWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
  },
  text: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

/* Connects to the actions, so we can do stuff! Boilerplate!!! */
function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
