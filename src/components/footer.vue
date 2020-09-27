<template>
    <van-tabbar
      v-if="
        $route.name == 'home' ||
        $route.name == 'record' ||
        $route.name == 'standard' ||
        $route.name == 'personage' ||
        $route.name == 'group' ||
        $route.name == 'giftlist'
      "
      v-model="active"
      active-color="#23a253"
      inactive-color="#999"
    >
      <van-tabbar-item
        replace
        :to="value.path"
        v-for="(value, index) in tabbarList"
        :key="index"
      >
        <span>{{ value.tit }}</span>
        <template #icon="props">
          <img :src="props.active ? value.active : value.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      active: 0,
      tabbarList: [
        {
          path: "/",
          tit: "首页",
          active: require("../assets/f11.png"),
          inactive: require("../assets/f1.png"),
        },
        {
          path: "/giftlist",
          tit: "积分礼品",
          active: require("../assets/f44.png"),
          inactive: require("../assets/f4.png"),
        },
        {
          path: "/record",
          tit: "兑换记录",
          active: require("../assets/f22.png"),
          inactive: require("../assets/f2.png"),
        },
        {
          path: "/standard",
          tit: "积分标准",
          active: require("../assets/f33.png"),
          inactive: require("../assets/f3.png"),
        },
      ],
    };
  },
  created() {
    let router_path = this.$route.path;
    if (router_path == "/record") {
      this.active = 2;
    } else if (router_path == "/standard") {
      this.active = 3;
    } else if (router_path == "/giftlist") {
      this.active = 1;
    } else {
      this.active = 0;
    }
  },
  watch: {
    $route(to) {
      this.activeTab(to.path);
    },
  },
  methods: {
    activeTab(path) {
      var index = this.tabbarList.map((item) => item.path).indexOf(path);
      if (index != -1) {
        this.active = index;
      }
    },
  },
};
</script>

<style lang="scss">
.van-tabbar--fixed {
  z-index: 10;
  height: 110px;
  .van-tabbar-item__icon {
    margin-bottom: 10px;
    img {
      height: 45px;
    }
  }
  .van-tabbar-item__text {
    span {
      font-size: 26px;
    }
  }
}

/*iphoneX*/
// @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
//   .van-tabbar--fixed {
//     padding-bottom: 10px !important;
//     padding-bottom: constant(safe-area-inset-bottom);
//     padding-bottom: env(safe-area-inset-bottom);
//   }
// }
/*iphoneX Max*/
// @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
//   .van-tabbar--fixed {
//     padding-bottom: 10px !important;
//     padding-bottom: constant(safe-area-inset-bottom);
//     padding-bottom: env(safe-area-inset-bottom);
//   }
// }
</style>