//index.js
//获取应用实例
var app = getApp()
var inputValue
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    array:[{
      num: '00000',
      password:'000000'
    }]
  },

  bindKeyInput: function(e) {
      inputValue = e.detail.value

  },

  //事件处理函数
  bindViewTap: function() {
    var self = this;
     var urlstr = 'https://api.leancloud.cn/1.1/classes/OfoPassword?where={"num":"'+inputValue+'"}'
    wx.request({
    url: urlstr,
    data: {},
   header:{
      "Content-Type":"application/json",
   },
   success: function(res) {

     var data = res.data;
     console.log(data)
     data = data['results'];
      console.log(data)
      var arr=[];

     if (data.length <= 0){
        wx.showToast({
        title: '查询不到数据',
         icon: 'success',
       duration: 2000
      })
      }else{
        self.setData({
      textValue: ''
    })
          wx.showToast({
           title: '查询成功',
            icon: 'success',
           duration: 2000
      })
     }

     for (var i = 0; i < data.length; i++) {
       var object = data[i];
        var flag = true;
          for (var j = 0; j < self.data.array.length; j++) {
              var object2 =  self.data.array[j];
              if(object2['num'] == object['num']){
                flag = false;
              }
          }
          if (flag){
              arr.push({num: object['num'],password: object['password']});
          }


     }

   self.setData({
      array: arr.concat(self.data.array)
    })
   }
});
  },

 addViewTap: function() {
   console.log('onLoad')
   wx.navigateTo({
        url: '../add/add'
    })
 },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
