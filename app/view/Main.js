import React, { Component,PropTypes} from 'react';
import {DeviceEventEmitter,BackAndroid,ToastAndroid,NativeModules,View, ScrollView,StyleSheet,TouchableHighlight,Text,Image,Navigator,Alert} from 'react-native';

import List from './List';
import Login from './Login';
import About from './About';
import Contact from './Contact';

import MyStorage from '../storage/Local';

//获取屏幕的宽高
var Dimensions = require('Dimensions'); 
var swidth = Dimensions.get("window").width;
var sheight = Dimensions.get("window").height;


export default class Main extends Component {
	constructor(props) {
    super(props);
  }

  componentDidMount(){
  		var nowthis=this;
  		//添加左侧菜单的选择跳转
        DeviceEventEmitter.addListener('selectView', function(e: Event) {
    		if(e.select=="bloglist"){
    			nowthis._pressListButton();
    		}else if(e.select=="about"){
    			nowthis._AboutMe();
    		}else if(e.select=="contact"){
    			nowthis._ContactMe();
    		}else if(e.select=="home"){
    			nowthis._toHome();
    		}else if(e.select=="login"){
    			nowthis._pressLoginButton();
    		}
  		});
  		BackAndroid.addEventListener('hardwareBackPress',function(){
  		  const { navigator } = nowthis.props;
          if(navigator){
          	navigator.pop();
            return true;
          }else{
            return false;
          }
      });
  }

  _toHome(){
     const { navigator } = this.props;
        if(navigator) {
          navigator.popToTop();
        }
  }
  _pressListButton() {
        const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'List',
                component: List,
            })
        }
    }

  _pressLoginButton(){
    if(global.userinfo!=""){
      isLogin=true;
      username=JSON.parse(global.userinfo).username;
    }else{
      isLogin=false;
      username="";
    }
    const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Login',
                component: Login,
                params:{  
                    login:isLogin,  
                    username:username
                }  
            })
        }
  }

  _AboutMe(){
    const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'About',
                component: About,
            })
        }
  }

  _ContactMe(){
    const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Contact',
                component: Contact,
            })
        }
  }
  //测试回调
  async testToastModule(){
        NativeModules.MyToastAndroid.pickImage((msg) => {
                    ToastAndroid.show('JS界面:从Activity中传输过来的数据为:'+msg,ToastAndroid.SHORT);
                  },
                   (result) => {
                    ToastAndroid.show('JS界面:错误信息为:'+result,ToastAndroid.SHORT);
        });
  }

  render() {

    return (
      <Image style={styles.backgroundImage} source={require('../assets/images/main.jpg')} resizeMode={'cover'}>
      <ScrollView>
          <Text style={{fontSize:33,textAlign:'center',color:'#3F51B5'}}>Know Nothing May Be Better Than Know A Little</Text>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:swidth,height:0.3*sheight}}>
          <TouchableHighlight onPress={this._pressListButton.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll1.jpg')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={this._pressLoginButton.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll2.jpg')} />
          </TouchableHighlight>
          </View>
          <View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center',width:swidth,height:0.3*sheight}}>
           <TouchableHighlight onPress={this._ContactMe.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll3.jpg')} />
           </TouchableHighlight>
           <TouchableHighlight onPress={this._AboutMe.bind(this)} >
          <Image style={{width:0.3*swidth,height:0.2*sheight}} source={require('../assets/images/scroll4.jpg')} />
           </TouchableHighlight>
           </View>
           <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'flex-end',width:swidth,height:0.12*sheight}}>
           <Text style={{color:'white'}}>Created By sunnier</Text>
           </View>
        </ScrollView>
      </Image>
    )
  }
}



const styles = StyleSheet.create({
  backgroundImage:{
    width:swidth,
    height:sheight,
    opacity:20
  },
});