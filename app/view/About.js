import React, { Component} from 'react';
import { View, StyleSheet,WebView,ActivityIndicator,Text,Image,Navigator } from 'react-native';


export default class About extends Component {
	constructor(props) {
    super(props);
  }

  render() {

    return (
          <View style={{flex:1,flexDirection:'column'}}>
          <View style={styles.topView}><Text style={{textAlign:'center',color:'#3F51B5'}}>关于我</Text></View>
          <View style={styles.detailView} ><WebView style={styles.webviewCss} source={{uri:'https://kebenxiaoming.github.io/darling.html'}} startInLoadingState={true} automaticallyAdjustContentInsets={true} javaScriptEnabled={true}/></View>
          </View>
    )
  }
}

//获取屏幕的宽高
var Dimensions = require('Dimensions'); 
var swidth = Dimensions.get("window").width;
var sheight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  centering: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  topView: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFFFFF'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  detailView: {
    flex:9,
  },
  webviewCss:{
    width:swidth,
  },
});