<template>
  <van-nav-bar v-if="isShow" :title="title" />
  <van-nav-bar v-else left-arrow :title="title" @click-left="onClickLeft"/>
</template>

<script>
export default {
  name: "Head", 
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    leftShow: {
      type: Boolean ,
      default: true,
    }
  },
  data() {
    return {
      isShow: this.leftShow
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
};
</script>

<style lang="scss">
.van-nav-bar {
    height: 50PX;
    .van-nav-bar__left {
        .van-nav-bar__arrow {
            font-size: 20PX;
            &.van-icon {
                color: #000;
            }
        }
    }
    .van-nav-bar__title {
        font-size: 20PX;
    }
}
</style>