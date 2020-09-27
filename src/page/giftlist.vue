<template>
  <div>
    <Head :title="msg" />
    <div class="changewrap"><Gift :tit="txt"/></div>
    <Footer />
  </div>
</template>

<script>
import Head from "@/components/head";
import Gift from "@/components/gift";
import Footer from "@/components/footer";

export default {
  name: "group",
  components: {
    Head,
    Gift,
    Footer,
  },
  data() {
    return {
      msg: "礼品展示",
      isShowLeft: false,
      txt: ''
    };
  },
  created() {
 
  },
};
</script>

<style lang="scss">
.changewrap {
    // margin: 20px 20px 110px  ;
}
</style>