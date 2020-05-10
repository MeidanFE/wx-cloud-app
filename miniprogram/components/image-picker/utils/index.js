import uuid from "../../../utils/uuid";

export const choosePhotos = () => {

  return new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 9,
      mediaType: ['image'],
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      // maxDuration: 30,
      camera: 'back',
      success: (res) => {

        const {
          tempFiles
        } = res;

        resolve(tempFiles);

        // this.setData({
        //   images
        // },()=>{

        // })
        // console.log(res.tempFilePath)
        // console.log(res.size)
      },
      fail: (err) => {
        if (err.errMsg == 'chooseMedia:fail cancel') {
          return;
        }
        reject(err);

        wx.showToast({
          title: '添加图片失败',
          icon: 'none'
        })
      }
    })
  })
}


export const uploadPhoto = async (filePath) => {

  const cloudPath = uuid() + path.match(/\.[^.]+?$/)[0]

  try{
    const {tempFiles} = await wx.cloud.uploadFile({
      cloudPath,
      filePath, // 文件路径
    });

    return tempFiles;
  }catch(err){
    if (err.errMsg == 'chooseMedia:fail cancel') {
      return err;
    }

    wx.showToast({
      title: '添加图片失败',
      icon: 'none'
    })

    return err;
  }

}
