<template>
  <div class="rankingmod">
    <div class="tit">{{ main.tit }}</div>

    <van-tabs
      v-model="active"
      :class="'bgc' + main.csid"
      type="card"
      lazy-render
      :v-model="refreshing"
      @click="onRefresh()"
      v-preventReClick
    >
      <van-tab :title="main.tabs[0]">
        <van-list
          class="rankinglist"
          v-model="loading"
          :finished="finished"
          :finished-text="ifPage == 1 ? '' : '没有更多了'"
          @load="load_more"
        >
          <div
            v-for="(item, index) in listOne()"
            :key="item.sUID"
            :title="index"
            class="items"
          >
            <div class="box">
              <div class="num">{{ index + 1 }}</div>
              <div class="img">
                <img
                  :src="
                    item.uName != '高军'
                      ? item.Img || require('@/assets/1.png')
                      : require('@/assets/mao.jpg')
                  "
                  alt=""
                />
              </div>
              <div class="name">
                {{ item.uName != "高军" ? item.uName : "刘欣" }}
              </div>
            </div>
            <div class="grade">{{ item.L_CurrentPoints }}分</div>
          </div>
        </van-list>

        <router-link v-if="more" class="btnslookmore" to="personage/0"
          >查看更多</router-link
        >
      </van-tab>
      <van-tab :title="main.tabs[1]">
        <van-list
          class="rankinglist"
          v-model="loading"
          :finished="finished"
          :finished-text="ifPage == 1 ? '' : '没有更多了'"
          @load="load_moreTeam"
        >
          <div
            v-for="(item, index) in listTwo()"
            :key="item.sUID"
            :title="index"
            class="items"
          >
            <div class="box">
              <div class="num">{{ index + 1 }}</div>
              <div class="img">
                <img :src="item.Img || require('@/assets/2.png')" alt="" />
              </div>
              <div class="name">{{ item.BuMen }} {{ item.Team }}</div>
            </div>
            <div class="grade">{{ item.L_CurrentPoints }}分</div>
          </div>
        </van-list>

        <router-link v-if="more" class="btnslookmore" to="personage/1"
          >查看更多</router-link
        >
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getIntegralLog } from "@/api/api";
export default {
  name: "Ranking",
  props: {
    main: {
      type: Object,
      default: "",
    },
    more: {
      type: Boolean,
      default: false,
    },
    ifPage: {
      type: Number,
      default: 0,
    },
    qt: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 0,
      active: null,
      queryType: 1, //1-个人 2-团队
      queryMoney: "year", //day-当天 month-本月 year-本年(为空或不传返回全部)
      listTeam: [],
      list: [
        // {
        //   //列表多维数组
        //   L_CurrentPoints: "9970115", //当前积分
        //   AddTime: "2020-08-28 14:59:41", //积分最新变动时间
        //   sUID: "179", //员工档案id
        //   uName: "杜飞", //员工名字
        //   BuMenID: "1", //部门id
        //   TeamID: "2", //团队id
        //   BuMen: "技术部", //部门名字
        //   Team: "研发部", //团队名字
        //   Img: "", //头像
        // },
        // {
        //   L_CurrentPoints: "997015", //当前积分
        //   AddTime: "2020-08-28 14:59:41", //积分最新变动时间
        //   sUID: "179", //员工档案id
        //   uName: "彭晶晶", //员工名字
        //   BuMenID: "1", //部门id
        //   TeamID: "2", //团队id
        //   BuMen: "技术部", //部门名字
        //   Team: "研发部", //团队名字
        //   Img: "", //头像
        // },
      ],
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
      refreshing: false,
      timer1: null,
      timer2: null,
    };
  },
  created() {
    let b = this.$route.params.id * 1;
    this.active = b;
  },
  computed: {},
  methods: {
    onRefresh() {
      // 清空列表数据
      console.log("清空数据" + this.active);
      clearTimeout(this.timer1);
      clearTimeout(this.timer2);
      this.list = [];
      this.listTeam = [];
      this.page = 1;
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;

      if (this.active == 0) {
        this.onLoad();
      } else {
        this.onLoadTeam();
      }
    },
    listOne() {
      if (this.ifPage == 1) {
        console.log(this.ifPage + "");
        return this.list;
      } else {
        let m = this.list.slice(0);
        m.splice(m.length, 0);
        return m;
      }
    },
    load_more() {
      this.page += 1; //页数+1
      this.onLoad();
    },
    onLoad() {
      if (this.refreshing) {
        this.list = [];
        this.refreshing = false;
      }
      this.timer1 = setTimeout(() => {
        let data = {
          page: this.page,
          QueryType: 1, //1-个人 2-团队
          QueryMoney: this.queryMoney, //day-当天 month-本月 year-本年(为空或不传返回全部)
        };
        getIntegralLog(data)
          .then((res) => {
            if (res.data.code == 0) {
              // 加载状态结束
              console.log("加载状态结束");
              console.log(res.data.code);
              if (res.data.data.dataArr.length == 0) {
                this.finished = true;
                return false;
              }
              this.loading = false;
              console.log(res.data.data.dataArr);
              this.list = this.list.concat(res.data.data.dataArr); //追加数据
              if (this.ifPage == 1) {
                //数据全部加载完成
                this.finished = true;
                return false;
              } else {
                if (
                  this.page == res.data.data.pageNum ||
                  res.data.data.dataArr.length == 0
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
            console.log("我该出场了是嘛1");
            // this.networkError = true
          });
      }, 500);
    },
    listTwo() {
      if (this.ifPage == 1) {
        return this.listTeam;
      } else {
        let m = this.listTeam.slice(0);
        m.splice(m.length, 0);
        return m;
      }
    },
    load_moreTeam() {
      this.page += 1; //页数+1
      this.onLoadTeam();
    },
    onLoadTeam() {
      if (this.refreshing) {
        this.listTeam = [];
        this.refreshing = false;
      }
      this.timer2 = setTimeout(() => {
        let data = {
          page: this.page,
          QueryType: 2, //1-个人 2-团队
          QueryMoney: this.queryMoney, //day-当天 month-本月 year-本年(为空或不传返回全部)
        };
        getIntegralLog(data)
          .then((res) => {
            if (res.data.code == 0) {
              // 加载状态结束
              console.log("加载状态结束");
              console.log(res.data.code);
              if (res.data.data.dataArr.length == 0) {
                this.finished = true;
                return false;
              }
              this.loading = false;
              console.log(res.data.data.dataArr);
              this.listTeam = this.listTeam.concat(res.data.data.dataArr); //追加数据
              if (this.ifPage == 1) {
                //数据全部加载完成
                this.finished = true;
                return false;
              } else {
                if (
                  this.page == res.data.data.pageNum ||
                  res.data.data.dataArr.length == 0
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
            console.log("我该出场了是嘛2");
            // this.networkError = true
          });
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.rankingmod {
  margin-bottom: 10px;
  .van-tabs {
    background: #fff;
    .van-tabs__wrap {
      height: 90px;
      border-radius: 6px;
      .van-tabs__nav--card {
        margin: 0;
        height: 90px;
        border: none;
        border-bottom: 1px #f0f0f0 solid;
        .van-tab {
          color: #333;
          font-weight: bold;
          border-right: none;
          transition: 0.3s;
          &.van-tab--active {
            border-radius: 10px 10px 0 0;
            color: #fff;
          }
          .van-tab__text--ellipsis {
            line-height: 2;
            font-size: 28px;
          }
        }
      }
    }
  }
  .rankinglist {
    margin-top: 20px;
    .items {
      padding: 24px 0;
      border-bottom: 1px #f0f0f0 solid;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .box {
        display: flex;
        align-items: center;
        .num {
          color: #9c9c9c;
          font-size: 30px;
          font-style: oblique;
          font-weight: bold;
          width: 74px;
          text-align: center;
        }
        .img {
          position: relative;
          width: 82px;
          height: 82px;
          border: 3px #fff solid;
          margin-right: 24px;
          border-radius: 50%;
          img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .name {
          font-size: 28px;
          color: #333;
        }
      }
      .grade {
        font-size: 28px;
        color: #333;
        margin-right: 20px;
      }
      &:nth-child(1) {
        background: -webkit-gradient(
          linear,
          0% 0%,
          0% 100%,
          from(#fff),
          to(#fff9f0)
        );
        .num {
          color: #f99e18;
        }
        .img {
          border-color: #f3bb57;
          &:after {
            display: block;
            content: "";
            position: absolute;
            top: -20px;
            left: -18px;
            background: url(../assets/ranking1.png) no-repeat;
            width: 39px;
            height: 40px;
            background-size: 39px;
          }
        }
        .grade {
          color: #c90000;
        }
      }
      &:nth-child(2) {
        background: -webkit-gradient(
          linear,
          0% 0%,
          0% 100%,
          from(#fff),
          to(#fff9f0)
        );
        .num {
          color: #adaab4;
        }
        .img {
          border-color: #adaab4;
          &:after {
            display: block;
            content: "";
            position: absolute;
            top: -20px;
            left: -18px;
            background: url(../assets/ranking2.png) no-repeat;
            width: 39px;
            height: 40px;
            background-size: 39px;
          }
        }
        .grade {
          color: #c90000;
        }
      }
      &:nth-child(3) {
        background: -webkit-gradient(
          linear,
          0% 0%,
          0% 100%,
          from(#fff),
          to(#fff9f0)
        );
        .num {
          color: #f77e52;
        }
        .img {
          border-color: #f77e52;
          &:after {
            display: block;
            content: "";
            position: absolute;
            top: -20px;
            left: -18px;
            background: url(../assets/ranking3.png) no-repeat;
            width: 39px;
            height: 40px;
            background-size: 39px;
          }
        }
        .grade {
          color: #c90000;
        }
      }
    }
  }
  .btnslookmore {
    height: 98px;
    text-align: center;
    font-size: 28px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.rankingmod {
  .bgc1 {
    .van-tab--active {
      background: #f99e18;
    }
  }
  .bgc2 {
    .van-tab--active {
      background: #1c9a4b;
    }
  }
}
</style>