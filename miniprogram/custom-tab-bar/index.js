// components/custom-tab-bar/index.js
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#2ae2cf",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/images/tab/icon_tip.png",
      selectedIconPath: "/images/tab/icon_tip_HL.png",
      text: "便签"
    }, {
      pagePath: "/pages/create/create",
      iconPath: "/images/tab/icon_add_HL.png",
      selectedIconPath: "/images/tab/icon_add_HL.png",
      text: ""
    },
    {
      pagePath: "/pages/find/find",
      iconPath: "/images/tab/icon_find.png",
      selectedIconPath: "/images/tab/icon_find_HL.png",
      text: "发现"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
