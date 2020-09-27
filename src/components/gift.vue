<template>
  <div>
    <div class="giftmod">
      <div class="tit">{{ tit }}</div>
      <van-sticky>
        <div class="rangeprice">
          <div
            v-for="(item, index) in productType"
            :key="item.id"
            :title="index"
            class="item"
            :class="{ changeStyle: changeSelectStyle == index }"
            @click="changeStyle(index, item.sn, item.sx)"
            v-preventReClick
          >
            {{ item.value }}
          </div>
        </div>
      </van-sticky>
      <van-list
        class="giftlist"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="load_more"
      >
        <div
          class="items"
          v-for="(item, index) in listOne()"
          :key="item.id"
          :title="index"
          @click="openImg(listOne(), index)"
        >
          <div class="img">
            <img :src="item.G_Img || require('@/assets/3.png')" alt="" />
          </div>
          <p class="name">{{ item.G_Name }}</p>
          <span class="number">{{ item.G_Score }}分</span>
        </div>
      </van-list>
      <!-- <a v-if="more" class="btnslookmore" href="#/giftlist">查看更多</a> -->
    </div>
  </div>
</template>

<script>
import preventReClick from "@/utils/preventReClick"; //防多次点击，重复提交

import { ImagePreview } from "vant";
import { getIntegralGoodsList } from "@/api/api";
export default {
  name: "Gift",
  props: {
    tit: {
      type: String,
      default: "",
    },
    ifPage: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      networkError: false,
      list: [
        // {
        //   G_AddTime: "1598584990",
        //   G_ID: "5",
        //   G_Img: "https://img.yzcdn.cn/vant/apple-2.jpg?fdasf=fdsf",
        //   G_Name: "MINI榨汁机",
        //   G_Note: "",
        //   G_Score: "1000",
        //   G_Sn: "0000005",
        //   Number: "2040",
        // },
        // {
        //   G_AddTime: "1598584990",
        //   G_ID: "5",
        //   G_Img: "",
        //   G_Name: "MINI榨汁机",
        //   G_Note: "",
        //   G_Score: "1000",
        //   G_Sn: "0000005",
        //   Number: "2040",
        // },
        // {
        //   G_AddTime: "1598584990",
        //   G_ID: "5",
        //   G_Img: "",
        //   G_Name: "MINI榨汁机",
        //   G_Note: "",
        //   G_Score: "1000",
        //   G_Sn: "0000005",
        //   Number: "2040",
        // },
        // {
        //   G_AddTime: "1598584990",
        //   G_ID: "5",
        //   G_Img: "",
        //   G_Name: "MINI榨汁机",
        //   G_Note: "",
        //   G_Score: "1000",
        //   G_Sn: "0000005",
        //   Number: "2040",
        // },
      ],
      page: 0, //页数
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
      smin: 0,
      smax: 20000,
      changeSelectStyle: "",
      productType: [
        { value: "1-2万积分", sn: "0", sx: "20000" },
        { value: "2-4万积分", sn: "20000", sx: "40000" },
        { value: "4-6万积分", sn: "40000", sx: "60000" },
        { value: "6万积分以上", sn: "60000", sx: "0" },
      ],
      timer: null,
    };
  },
  created() {},
  methods: {
    changeStyle(index, sn, sx) {
      if (index == this.changeSelectStyle) {
        return false;
      }
      clearTimeout(this.timer)
      this.changeSelectStyle = index;
      this.smin = sn;
      this.smax = sx;
      this.list = [];
      this.page = 1;
      this.finished = false;
      this.loading = true;
    },
    listOne() {
      if (this.ifPage == 1) {
        return this.list;
      } else {
        let m = this.list.slice(0);
        m.splice(m.length - 1, 1);
        return m;
      }
    },
    load_more: function () {
      this.page += 1; //页数+1
      this.onLoad();
    },
    onLoad() {
      this.timer = setTimeout(() => {
        let data = {
          page: this.page,
          order: "G_Score",
          sort: 0,
          scoreMin: this.smin,
          scoreMax: this.smax,
        };

        getIntegralGoodsList(data)
          .then((res) => {
            if (res.data.code == 0) {
              // 加载状态结束
              console.log("加载状态结束");
              console.log(res.data.code);
              this.loading = false;
              console.log(res.data.data.data);
              this.list = this.list.concat(res.data.data.data); //追加数据
              if (this.ifPage == 1) {
                //数据全部加载完成
                this.finished = true;
                return false;
              } else {
                if (
                  this.page == res.data.data.pageNum ||
                  res.data.data.data.length == 0
                ) {
                  //数据全部加载完成
                  this.finished = true;
                } else {
                  this.finished = false;
                }
              }
            }
          })
          .catch((err) => {
            console.log("我该出场了是嘛");
            // this.networkError = true
          });
      }, 500);
    },
    openImg(item, index) {
      let imgs = [];
      for (let i = 0; i < item.length; i++) {
        imgs.push(item[i].G_Img.split("?")[0]);
      }
      ImagePreview({
        images: imgs, // 图片数组
        startPosition: index, //图片索引
        closeable: false, //预览可以关闭
      });
    },
  },
  computed: {
    address() {
      let { smin, smax } = this;
      return {
        smin,
        smax,
      };
    },
  },
  watch: {
    address(val) {
      console.log("变化了吗");
      this.onLoad();
    },
  },
};
</script>

<style lang="scss">
.rangeprice {
  padding: 20px;
  margin-bottom: 20px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    margin: 0 5px;
    width: 100%;
    height: 60px;
    font-size: 24px;
    border-radius: 100px;
    color: #000;
    border: 2px #fff solid;
    background: #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    &.changeStyle {
      border: 2px #1c9a4b solid;
      color: #1c9a4b;
      background: #ddf0e4;
    }
  }
}
.giftmod {
  .giftlist {
    display: flex;
    flex-wrap: wrap;
    margin: 0 20px 150px;
    .items {
      margin: 0 4px 5px;
      width: 230px;
      height: 350px;
      border-radius: 6px;
      margin-bottom: 20px;
      background: #fff;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      &:nth-child(3n + 1) {
        margin-left: 0;
      }
      .img {
        width: 210px;
        height: 210px;
        margin: 10px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .name {
        width: 90%;
        text-align: center;
        font-size: 28px;
        margin: 5px 0 10px;
        color: #494949;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .number {
        background: #1c9a4b;
        color: #fff;
        font-size: 26px;
        width: 180px;
        height: 45px;
        border-radius: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .btnslookmore {
    height: 68px;
    text-align: center;
    font-size: 28px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.van-list__loading {
  width: 100%;
}
.van-list__placeholder {
  width: 100%;
}
.van-list__finished-text {
  width: 100%;
}
</style>