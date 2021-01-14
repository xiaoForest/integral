<template>
  <div>
    <Head :title="msg" />
    <div class="hint">(图片仅供参考，具体以实物为准)</div>
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
.hint {
  color: #cecece;
  padding: 14px 4px 0;
  font-size: 14px;
  background: #fff;
}
</style>