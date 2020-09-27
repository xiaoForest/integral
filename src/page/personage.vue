<template>
  <div>
    <Head :title="msg" :leftShow="isShowLeft" />
    <div class="rankingwrap">
        <Ranking :main="ranking" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Head from "@/components/head";
import Ranking from "@/components/ranking";
import Footer from "@/components/footer";
export default {
  name: "personage",
  components: {
    Head,
    Ranking,
    Footer,
  },
  data() {
    return {
      msg: "积分排行榜",
      isShowLeft: false,
      ranking: {
        csid: '1',
        tit: "",
        tabs: ["个人积分排行榜", "团队积分排行榜"],
        more: "personage",
      },
    };
  },
};
</script>

<style lang="scss">
.rankingwrap {
  margin-bottom: 120px;
}
.rankingwrap .rankingmod .van-tabs .van-tabs__wrap,
.rankingwrap .rankingmod .van-tabs .van-tabs__wrap .van-tabs__nav--card .van-tab.van-tab--active {
    border-radius: 0;
}
</style>