<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="forestmod">
        <div class="tit">小积累大惊喜，积极参与吧</div>
        <AntCollectEnergy @pf="parent" ref="mychild" />
        <div class="seagull"><img src="@/assets/seagull.png" alt="" /></div>
        <div class="cloud cloud1"><img src="@/assets/cloud.png" alt="" /></div>
        <div class="cloud cloud2"><img src="@/assets/cloud.png" alt="" /></div>
        <div class="bg"><img src="@/assets/bg.png" alt="" /></div>
      </div>
      <div class="container">
        <Ranking
          ref="myRanking"
          :main="rankingOne"
          :more="ifmore"
          :ifPage="page"
        />
        <Gift ref="myGift" :tit="giftTxt" :more="ifmore" :ifPage="page" />
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import AntCollectEnergy from "@/components/antCollectEnergy";
import Ranking from "@/components/ranking";
import Gift from "@/components/gift";

export default {
  name: "home",
  components: {
    AntCollectEnergy,
    Ranking,
    Gift,
  },
  data() {
    return {
      count: 0,
      isRouterAlive: true,
      isLoading: false,
      msg: "1",
      rankingOne: {
        csid: "1",
        tit: "积分排行榜",
        tabs: ["个人积分排行榜", "团队积分排行榜"],
        more: "personage",
      },
      giftTxt: "礼品展示",
      ifmore: true,
      page: 1,
    };
  },
  mounted() {},
  methods: {
    parent() {
      this.$refs.myRanking.onRefresh();
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
        this.$refs.mychild.init();
      }, 1000);
    },
  },
};
</script>
<style lang="scss">
body {
  background: #f8f8f8;
}
.forestmod {
  position: relative;
  width: 750px;
  height: 850px;
  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#4ba1fe), to(#fff));
  overflow: hidden;
  .tit {
    color: #fff;
    font-size: 30px;
    width: 50%;
    margin: 10px auto;
    line-height: 1.2;
    padding: 70px 0;
    font-weight: bold;
    text-align: center;
  }
  .seagull {
    position: absolute;
    top: 60px;
    width: 750px;
    img {
      width: 100%;
    }
  }
  .cloud {
    position: absolute;
    top: 0;
    display: block;
    margin: 70px auto;
    background-repeat: no-repeat;
    width: 1076px;
    height: 437px;
    background-size: 1076px;
    img {
      width: 100%;
    }
    &.cloud1 {
      animation: cloud1 100s infinite linear;
      left: 0;
    }
    &.cloud2 {
      animation: cloud2 100s infinite linear;
      left: 1076px;
    }
  }
  .bg {
    position: absolute;
    bottom: 0;
    img {
      width: 100%;
    }
  }
}
@keyframes cloud1 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  50% {
    transform: translate3d(-1076px, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes cloud2 {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  50% {
    transform: translate3d(-1076px, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
.container {
  position: relative;
  background: #f8f8f8;
  padding: 0 20px 150px;
  text-align: left;
  border-radius: 20px 20px 0 0;
  margin-top: -35px;
  overflow: hidden;
  z-index: 10;
  .tit {
    font-size: 34px;
    height: 100px;
    font-weight: bold;
    line-height: 100px;
    color: #494949;
  }
  .rangeprice {
    border-radius: 14px 14px 0 0;
  }
  .giftlist {
    &.van-list {
      margin: 0;
    }
  }
}
</style>