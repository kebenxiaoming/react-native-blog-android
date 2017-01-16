const baseURL = "http://kebenxiaoming.info";

function fetchAction(...props) {
  this.url = props.shift(1);
  this.options = props.shift(1);
  return fetch(this.url, Object.assign({}, this.options))
  .then((response) =>response.json());
}
export default {
  getBlogs(page) {
    var apiPort = "index.php?g=api&c=Blog&a=index&p="+page;
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  getBlogDetail(blogId){
    var apiPort = "index.php?g=api&c=Blog&a=detail";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:'id='+blogId,
    });
  },
  goLogin(username,password){
    var apiPort = "index.php?g=api&c=Login&a=index";
    return fetchAction(`${baseURL}/${apiPort}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:'username='+username+'&password='+password,
    });
  },
  autoLogin(username,password,tokentime,nowObject){
    nowObject.setModalVisible(false);
    nowObject.setLoginState(true);
    nowObject.setState({username:username});
    let now=Date.parse(new Date()); 
    if((tokentime+2*60*60)*1000<now){
      //token过期重新登录
      try {
        this.goLogin(username,password)
        .then((response) => {
           let status=response.status;
           let data = response.data;
           let msg=response.msg;
           if(status==1){
            nowObject._saveLocal(username,password,data.token,data.token_time);
            nowObject.setModalVisible(!nowObject.state.modalVisible);
            }else{
              nowObject.setModalVisible(!nowObject.state.modalVisible);
              Alert.alert(
              '提示信息',
              msg,
              );
          }
        })
      } catch(e) { 
        nowObject.setModalVisible(!nowObject.state.modalVisible);
        Alert.alert(
            '提示信息',
            JSON.stringify(e),
          );
      }
    }
  }
};