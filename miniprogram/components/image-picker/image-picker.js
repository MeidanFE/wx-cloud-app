// components/image-picker/image-picker.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    images:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async addImage(){
      try{
        let {tempFiles} = await  wx.chooseMedia({
          count: 9,
          mediaType: ['image'],
          sizeType: ['original'],
          sourceType: ['album', 'camera'],
          // maxDuration: 30,
          camera: 'back',
        });

        let {images} = this.properties;
        images = images.concat(tempFiles.map(file=>file.tempFilePath));

        this.triggerEvent("change",{value:images})
      }catch(err){

        if (err.errMsg == 'chooseMedia:fail cancel') {
          return;
        }

        wx.showToast({
          title: '添加图片失败',
          icon: 'none'
        })
      }
      
   
    },
    async removeImage(e){
      let {idx} = e.target.dataset;
      let {images} = this.data;

      images.splice(idx,1);
     
      this.triggerEvent("change",{value:images})
      
    }
  }
})
