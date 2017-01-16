import React, { Component} from 'react';
import { View, StyleSheet,ActivityIndicator,Modal,TouchableHighlight,Text,Image, Alert,TextInput,Navigator,AsyncStorage } from 'react-native';

import Register from './Register';
import Forget from './Forget';
import Main from './Main';

import MyStorage from '../storage/Local';

import BaseRequestApi from '../connect/BaseRequestApi';

global.userinfo="";

export default class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {username:this.props.username,password:"",modalVisible: false,islogin:this.props.login};
  }

  componentDidMount(){
    if(!this.state.islogin){
      MyStorage.autoLogin(this);
    }
  }
  //修改modal显示状态
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  //修改登录状态
  setLoginState(flag){
     this.setState({islogin: flag});
  }

  //点击跳转navigator
  _pressRButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Register',
                component: Register,
            })
        }
    }

    //点击跳转navigator
    _pressOkButton() {
        //点击确认后请求
        if(this.state.username==""||this.state.password==""){
			Alert.alert(
              '提示信息',
              '请输入后再提交!',
              );
          return;
        }
        this.setModalVisible(true);
        this._goLogin(this.state.username,this.state.password);
    }

    //登陆成功之后跳转
    _redirectMain(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'Main',
                component: Main,
            })
        }
    }
    //保存用户信息
    _saveLocal(username,password,token,tokentime){
        this.setLoginState(true);
        let userinfo={username:username,password:password,token:token,tokentime:tokentime};
        MyStorage.saveData("userinfo",JSON.stringify(userinfo));
    }

    _goLogin(username,password){
    try {
        BaseRequestApi.goLogin(username,password)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
            this._saveLocal(username,password,data.token,data.token_time);
            this.setModalVisible(!this.state.modalVisible);
            }else{
              this.setModalVisible(!this.state.modalVisible);
              Alert.alert(
              '提示信息',
              msg,
              );
          }
        })
      } catch(e) { 
        this.setModalVisible(!this.state.modalVisible);
        Alert.alert(
            '提示信息',
            JSON.stringify(e),
          );
      }
  }
  //退出
  logout(){
    global.userinfo="";
    this.setLoginState(false);
    MyStorage.removeData("userinfo");
  }

    //点击跳转navigator
  _pressLButton() {
        const { navigator } = this.props;
        if(navigator) {
          //很熟悉吧，入栈出栈
            navigator.push({
                name: 'Forget',
                component: Forget,
            })
        }
    }

  render() {
    if(this.state.islogin){
        return (
          <Image style={styles.backgroundImage} source={require('../assets/images/login.jpg')} resizeMode={'cover'}>
          <View style={styles.mainView}>
          <View style={styles.formView}>
          <View style={styles.formTitleView}><Text
          style={{height: 50,textAlign:'center'}}
          >
          已经登录喽
          </Text>
          </View>
          <View style={styles.nameView}><Text
          style={{height: 50,textAlign:'center'}}
          >
          {this.state.username}
          </Text>
          </View>
          <View style={styles.submitView}>
          <Text style={styles.buttonStyle} onPress={this.logout.bind(this)}>退出</Text>
          </View>
          </View>
          </View>
          </Image>  
          );
    }
      
    return (
      <Image style={styles.backgroundImage} source={require('../assets/images/login.jpg')} resizeMode={'cover'}>
      <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
      >
      <View style={styles.centering}>
          <View>
          <Text style={{fontSize:15,color:'white'}}>正在登陆,请稍后...</Text>
          <ActivityIndicator
          animating={true}
          style={styles.indicatorStyle}
          color='white'
          size="large"
           />
          </View>
         </View>
      </Modal>
      <View style={styles.mainView}>
      <View style={styles.formView}>
        <View style={styles.nameView}><TextInput
          style={{height: 50}}
          placeholder='用户名'
          onChangeText={(username) => this.setState({username})}
        />
        </View>
        <View style={styles.passView}><TextInput
          style={{height: 50}}
          placeholder='密码'
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          />
        </View>
        <View style={styles.submitView}>
        <Text style={styles.buttonStyle} onPress={this._pressOkButton.bind(this)}>登录</Text>
        </View>
      </View>
      <View style={styles.bottomView}>
      <Text style={{textAlign:'left',
    width:0.3*swidth}} onPress={this._pressLButton.bind(this)} >
      忘记密码
      </Text>
      <Text style={{textAlign:'right',
    width:0.3*swidth}} onPress={this._pressRButton.bind(this)}>
      注册
      </Text>
      </View>
      </View>
      </Image>  
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
    backgroundColor:"rgba(0,0,0,0.6)"
  },
  indicatorStyle:{
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage:{
    width:swidth,
    height:sheight
  },
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView:{
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height:0.8*sheight,
  },
  formTitleView: {
    width:200,
    height: 50, 
  },
  formTitleText: {
    padding: 10, 
    fontSize: 20,
    textAlign:'center'
  },
  nameView:{
    width:0.7*swidth,
    height: 50, 
    //设置圆角程度
    borderRadius: 18,
    //设置边框的颜色
    borderColor: 'green',
    //设置边框的宽度
    borderWidth: 1,
    //内边距
    paddingLeft: 10,
    paddingRight: 10,
    //外边距
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    //设置相对父控件居中
    alignSelf: 'center',
  },
  passView:{
    width:0.7*swidth,
    height: 50, 
    //设置圆角程度
    borderRadius: 18,
    //设置边框的颜色
    borderColor: 'green',
    //设置边框的宽度
    borderWidth: 1,
    //内边距
    paddingLeft: 10,
    paddingRight: 10,
    //外边距
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    //设置相对父控件居中
    alignSelf: 'center',
  },
  submitView:{
    width:0.5*swidth,
    height: 50, 
    marginTop:100,
    //设置圆角程度
    borderRadius: 18,
    //设置边框的颜色
    borderColor: 'blue',
    //设置边框的宽度
    borderWidth: 1,
    //内边距
    paddingLeft: 10,
    paddingRight: 10,
    //外边距
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    //设置相对父控件居中
    alignSelf: 'center',
  },
  buttonStyle:{
    flex:2,
    padding: 10, 
    fontSize: 20,
    textAlign:'center'
  },
  bottomView:{
    flex:2,
    flexDirection: 'row',
    height:0.2*sheight,
    justifyContent: 'space-between',
    alignItems:'center',
  },
  bottonLeftText:{
    textAlign:'left',
    width:0.3*{swidth}
  },
  bottonRightText:{
    textAlign:'right',
    width:0.3*{swidth}
  },
});