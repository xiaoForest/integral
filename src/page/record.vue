<template>
  <div>
    <Head :title="msg" />

    <van-list
      class="recordlist"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="load_more"
    >
      <div
        v-for="(item, index) in listOne()"
        :key="item"
        :title="index"
        class="items"
      >
        <div class="info">
          <span v-if="item.L_GoodsID > 0" class="img gift"
            ><img :src="require('@/assets/gift.png')" alt=""
          /></span>
          <span v-else class="img award"
            ><img :src="require('@/assets/award.png')" alt=""
          /></span>
          <div class="txt">
            <p>
              {{
                item.L_GoodsName == ""
                  ? `${item.L_CatName}`
                  : `${item.L_GoodsName}`
              }}
            </p>
            <p>{{ Number(item.L_AddTime * 1000) | dateFilter }}</p>
          </div>
        </div>
        <div class="number">{{ item.L_ChangedPoints }}</div>
      </div>
    </van-list>
    <Footer />
  </div>
</template>

<script>
import Head from "@/components/head";
import Footer from "@/components/footer";
import { getPersonalList } from "@/api/api";
export default {
  name: "record",
  components: {
    Head,
    Footer,
  },
  data() {
    return {
      msg: "积分记录",
      list: [
        // {
        //   L_ID: "8",
        //   Number: "2040",
        //   L_SID: "179",
        //   L_SName: "杜飞",
        //   L_BuMen: "81",
        //   L_Team: "94",
        //   L_Admin: "a1104201",
        //   L_AdminID: "3",
        //   L_CurrentPoints: "997015",
        //   L_ChangedPoints: "-3000",
        //   L_AddTime: "1598597981",
        //   L_Note: "测试",
        //   L_Type: "1",
        //   L_CatID: "0",
        //   L_CatName: "",
        //   L_GoodsName: "养生壶",
        //   L_GoodsID: "15",
        //   L_Select: "1",
        //   L_Receive: "0",
        // },
        // {
        //   L_ID: "6",
        //   Number: "2040",
        //   L_SID: "179",
        //   L_SName: "杜飞",
        //   L_BuMen: "81",
        //   L_Team: "94",
        //   L_Admin: "a1104201",
        //   L_AdminID: "3",
        //   L_CurrentPoints: "1000015",
        //   L_ChangedPoints: "5",
        //   L_AddTime: "1598519028",
        //   L_Note: "99",
        //   L_Type: "1",
        //   L_CatID: "2",
        //   L_CatName: "考勤",
        //   L_GoodsName: "",
        //   L_GoodsID: "0",
        //   L_Select: "0",
        //   L_Receive: "0",
        // },
        // {
        //   L_ID: "5",
        //   Number: "2040",
        //   L_SID: "179",
        //   L_SName: "杜飞",
        //   L_BuMen: "81",
        //   L_Team: "94",
        //   L_Admin: "a1104201",
        //   L_AdminID: "3",
        //   L_CurrentPoints: "0",
        //   L_ChangedPoints: "5",
        //   L_AddTime: "1598518947",
        //   L_Note: "1000010",
        //   L_Type: "1",
        //   L_CatID: "2",
        //   L_CatName: "考勤",
        //   L_GoodsName: "",
        //   L_GoodsID: "0",
        //   L_Select: "0",
        //   L_Receive: "0",
        // },
        // {
        //   L_ID: "2",
        //   Number: "2040",
        //   L_SID: "179",
        //   L_SName: "杜飞",
        //   L_BuMen: "81",
        //   L_Team: "94",
        //   L_Admin: "a1104201",
        //   L_AdminID: "3",
        //   L_CurrentPoints: "0",
        //   L_ChangedPoints: "1000000",
        //   L_AddTime: "1598518025",
        //   L_Note: "1000000",
        //   L_Type: "1",
        //   L_CatID: "8",
        //   L_CatName: "相互协作",
        //   L_GoodsName: "",
        //   L_GoodsID: "0",
        //   L_Select: "0",
        //   L_Receive: "1",
        // },
        // {
        //   L_ID: "1",
        //   Number: "2040",
        //   L_SID: "179",
        //   L_SName: "杜飞",
        //   L_BuMen: "81",
        //   L_Team: "94",
        //   L_Admin: "a1104201",
        //   L_AdminID: "3",
        //   L_CurrentPoints: "0",
        //   L_ChangedPoints: "5",
        //   L_AddTime: "1598518000",
        //   L_Note: "5",
        //   L_Type: "1",
        //   L_CatID: "2",
        //   L_CatName: "考勤",
        //   L_GoodsName: "",
        //   L_GoodsID: "0",
        //   L_Select: "0",
        //   L_Receive: "0",
        // },
      ],
      page: 0, //页数
      loading: false, // 当loading为true时，转圈圈
      finished: false, // 数据是否请求结束，结束会先显示- 没有更多了 -
      noData: false, // 如果没有数据，显示暂无数据
      isLoading: false, // 下拉的加载图案
    };
  },
  methods: {
    listOne() {
      let m = this.list.slice(0);
      m.splice(m.length - 1, 1);
      return m;
    },
    load_more: function () {
      this.page += 1; //页数+1
      this.onLoad();
    },
    onLoad() {
      setTimeout(() => {
        let data = {
          page: this.page,
        };

        getPersonalList(data)
          .then((res) => {
            if (res.data.code == 0) {
              // 加载状态结束
              console.log("加载状态结束");
              console.log(res.data.code);
              this.loading = false;
              console.log(res.data.data.data);
              this.list = this.list.concat(res.data.data.data); //追加数据

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
          })
          .catch((err) => console.log(err));
      }, 500);
    },
  },
};
</script>
 
<style lang="scss">
.recordlist {
  margin: 20px 0 130px;
  .items {
    margin-bottom: 20px;
    padding: 0 32px;
    height: 140px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        &.gift {
          background: #ebf6ef;
          img {
            height: 35px;
          }
        }
        &.award {
          background: #fde5e5;
          img {
            height: 40px;
          }
        }
        img {
          display: block;
        }
      }
    }
  }
  .txt {
    margin-left: 20px;
    p {
      text-align: left;
      margin: 5px 0;
      &:nth-child(1) {
        font-size: 30px;
        color: #000;
      }
      &:nth-child(2) {
        font-size: 20px;
        color: #999;
      }
    }
  }
  .number {
    font-size: 34px;
    color: #ec0000;
  }
}
</style>
