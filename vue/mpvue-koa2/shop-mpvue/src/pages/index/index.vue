<template>
  <div class="index">
    <div class="search">
      <div @click="toMappage">{{cityName}}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div
        v-for="(item, index) in channel"
        :key="index"
        @click="categroyList(item.sort_order,item.name)"
      >
        <img :src="item.icon_url" alt />
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="brand">
      <div class="head" @click="tobrandList">品牌制造商直供</div>
      <div class="content">
        <div v-for="(item, index) in brandList" :key="index" @click="branddetail(item.id)">
          <div>
            <p>{{item.name}}</p>
            <p class="price">{{item.floor_price}}元起</p>
          </div>
          <img :src="item.new_pic_url" alt />
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item ,index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt />
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>¥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item ,index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt />
              <p>{{item.name}}</p>
              <p>{{item.goods_brief}}</p>
              <p>¥{{item.retail_price}}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="topicList">
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item ,index) in topicList" :key="index" @click="topicdetail(item.id)">
              <img :src="item.item_pic_url" alt />
              <div class="btom">
                <div>
                  <p>{{item.title}}</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div>{{item.price_info}}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item ,index) in newCategoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="sublist">
          <div v-for="(subitem, subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt />
            <p>{{subitem.name}}</p>
            <p>{{subitem.retail_price}}</p>
          </div>
          <div>
            <div class="last">
              <p>{{item.name}}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { mapState, mapMutations } from "vuex";
import { get } from "../../utils/index";
export default {
  data() {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: []
    };
  },
  mounted() {
    this.getData(), this.getCityName();
  },
  methods: {
    ...mapMutations(["update"]),
    toMappage() {
      //通过wx.getSetting 先查询用户是否授权""scoped.record"
      let _this = this;
      wx.getSetting({
        success: res => {
          //如果没有同意授权，打开设置
          console.log(res);
          if (!res.authSetting["scope.userInfo"]) {
            wx.openSetting({
              success: res => {
                //获取位置信息
                _this.getCityName();
              }
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main"
            });
            // _this.getCityName()
          }
        },
        fail: err => {
          console.log(err);
        },
        complete: () => {}
      });
    },
    getCityName() {
      let _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "b69fa42f707e033a718d666cc5ee4c2e"
      });
      myAmapFun.getRegeo({
        success: function(data) {
          console.log(data, "-----");
        },
        fail: function(info) {
          //失败回调
          console.log(info, "11111");
          _this.update({ cityName: "北京" });
        }
      });
    },
    async getData() {
      const data = await get("/index/index"); //http://localhost:5757/lm/index/index
      console.log(data);
      this.banner = data.banner;
      this.channel = data.channel;
      this.brandList = data.brandList;
      this.newGoods = data.newGoods;
      this.hotGoods = data.hotGoods;
      this.topicList = data.topicList;
      this.newCategoryList = data.newCategoryList;
    },
    categroyList(index, name) {
      wx.navigateTo({
        url: "/pages/categroylist/main?id=" + index
      });
      console.log(name, index);
    },
    branddetail(index) {
      wx.navigateTo({
        url: "/pages/branddetail/main?id=" + index
      });
    },
    goodsList(info) {
      if (info == "hot") {
        wx.navigateTo({
          url: "/pages/newgoods/main?isHot=" + 1
        });
      } else {
        wx.navigateTo({
          url: "/pages/newgoods/main?isNew=" + 1
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: "/pages/topicdetail/main?id=" + id
      });
    }
  },
  computed: {
    ...mapState(["cityName"])
  }
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>