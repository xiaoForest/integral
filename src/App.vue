<template>
  <div id="app">
    <transition mode="out-in" :name="transitionName">
      <router-view />
    </transition>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Footer from "@/components/footer";
export default {
  name: "App",
  components: {
    Footer,
  },
  data() {
    return {
      transitionName: "",
    };
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    },
  },
  methods: {},
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  background: #f8f8f8;
}
body {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
p,
span {
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
  max-width: 750px;
  width: 750px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
}
#app > div {
  width: 750px;
}

.van-toast__text {
  font-size: 30px;
  padding: 10px;
}
.van-empty__image {
  width: 400px;
  height: 400px;
}
.van-empty__description {
  font-size: 30px;
}

.van-loading .van-loading--circular {
  padding: 10px;
}
.van-list__finished-text {
  font-size: 28px;
  padding: 14px 0;
}
.van-loading__text {
  font-size: 28px;
  padding-bottom: 14px;
  position: relative;
  top: 5px;
}
.van-pull-refresh__head {
  height: 80px;
}
.van-pull-refresh__head div {
  font-size: 24px;
}
.van-image-preview .van-image-preview__close-icon {
  top: 20px;
  font-size: 50px;
}
.van-image__error .van-icon-photo-fail {
  font-size: 200px;
}
.van-image-preview .van-image-preview__index {
  font-size: 30px;
  line-height: 2;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.footer {
  position: fixed;
  bottom: 0;
  width: 750px;
  z-index: 10;
}
</style>
