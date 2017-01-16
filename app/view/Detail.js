import React, { Component} from 'react';
import { View, StyleSheet,WebView,ActivityIndicator,Text,Image, Alert,Navigator } from 'react-native';

import BaseRequestApi from '../connect/BaseRequestApi';

export default class Detail extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isLoading:false,
      blogId:this.props.blogId,
      title:"",
      desc:"",
      detail:""
    };
  }

  //点击返回上级navigator
    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    componentDidMount(){
        //获取详情
        this.getBlogRequest(this.state.blogId);
    }


    getBlogRequest(blogId){
    if(this.state.isLoading){
      return;
    }
    try {
        BaseRequestApi.getBlogDetail(blogId)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
           this.setState({
             title: data.title,
             desc:data.description,
             detail:data.content,
             isLoading:true
            });
            }else{
              Alert.alert(
              '提示信息',
              msg,
              );
          }
        })
      } catch(e) {
        Alert.alert(
            '提示信息',
            JSON.stringify(e),
          );
        this.setState({
         isLoading:false
        });
      }
  }
  //显示加载
  renderLoadingView()
  {
         return (
        <ActivityIndicator
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
        />
        );
  }
  render() {

    if (!this.state.isLoading) {
             return this.renderLoadingView();
    }
    //加上一段css,限制图片宽度
    let cssstr="<style>img{max-width:100%;display:block;margin:0 auto;}</style>";
    this.state.detail=cssstr+this.state.detail;
    return (
          <View style={{flex:1,flexDirection:'column'}}>
          <View style={styles.topView}><Text style={{textAlign:'center',color:'#3F51B5',fontSize:20}} adjustsFontSizeToFit={true}>{this.state.title}</Text></View>
          <View style={styles.descView}><Text style={{textAlign:'center',color:'#3F51B5'}}>{this.state.desc}</Text></View>
          <View style={styles.detailView} ><WebView style={styles.webviewCss} source={{html:this.state.detail}} scalesPageToFit={true} automaticallyAdjustContentInsets={true} /></View>
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
    padding: 8,
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
  descView: {
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FFFFFF'
  },
  detailView: {
    flex:9,
  },
  webviewCss:{
    width:swidth,
  },
});