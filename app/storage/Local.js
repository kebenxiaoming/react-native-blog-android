import React, { Component} from 'react';
import {AsyncStorage} from 'react-native';

import BaseRequestApi from '../connect/BaseRequestApi';

export default {
    saveData(key,value){
        try {
            AsyncStorage.setItem(
                key,
                value,
                (error)=>{
                    if (error){
                        alert('存值失败:',error);
                    }
                    if(key=="userinfo"){
                        global.userinfo=value;
                    }
                }
            );
        } catch (error){
            alert('失败'+error);
        }
    },
    getValue(key){
        try {
            AsyncStorage.getItem(
                key,
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }
                    if(key=="userinfo"){
                        global.userinfo=result;
                    }
                }
            )
        }catch(error){
            alert('失败'+error);
        }
    },
    //自动登录之用
    autoLogin(nowObject){
      try {
            AsyncStorage.getItem(
                "userinfo",
                (error,result)=>{
                    if (error){
                        alert('取值失败:'+error);
                    }
                    if(result!=undefined&&result!=""){
                    nowObject.setModalVisible(true);
                    global.userinfo=result;
                    var resObj=JSON.parse(result);
                    BaseRequestApi.autoLogin(resObj.username,resObj.password,resObj.tokentime,nowObject);
                    }
                }
            )
        }catch(error){
            alert('失败'+error);
        }
    },
    removeData(key){
        try {
            AsyncStorage.removeItem(
                key,
                (error)=>{
                    if(error){
                        alert('移除失败');
                    }
                }
            )
        }catch (error){
            alert('失败',+error);
        }
    },
};