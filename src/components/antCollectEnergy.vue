<template>
  <div class="Little-forest-droplet" :style="{ height: cHeight }">
    <img
      :src="require(`@/assets/tree${treenum}.png`)"
      :class="['tree', moveEnd ? 'flip' : '']"
      :style="{ width: `${treeWidth}rem`, height: `${treeHeight}rem` }"
    />
    <div
      :class="['circle', targetIndex === index ? '' : 'wave']"
      :style="circleStyle(item)"
      v-for="(item, index) in circleArr"
      :key="index"
      @click="startMove(index, item.lid)"
    >
      <div class="circle-text">{{ item.count }}</div>
      <div class="circle-wrod">{{ item.text }}</div>
    </div>
    <div class="my-integral">
      <div class="img">
        <img :src="me.WeChatImg || require(`@/assets/1.png`)" alt="" />
      </div>
      <div class="number">{{ "0" && numAllJs }}</div>
    </div>
    <div class="sendSign">
      <div class="info">
        <div class="day">{{ day.getDate() }}</div>
        <div class="month">{{ day.getMonth() + 1 }}月</div>
      </div>
      <div class="btns" @click="btnSendSign()">
        <img :src="require(`@/assets/day${me.isSign || 0}.png`)" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonal, personalEnd, sendSign } from "@/api/api";
import { Toast } from "vant";
export default {
  name: "jsVersion",
  data() {
    return {
      imgss: 0,
      day: new Date(),
      canvas: null,
      cxt: null,
      circlePadding: 150, // 左右边距，也会影响到生成的球的横坐标边界
      treeWidth: 6.19, // 树的宽度 rem
      treeHeight: 6.12, // 树的高度 rem
      moveTarget: null, // 移动对象
      targetIndex: null, // 被点击的对象的索引
      isMoving: false, // 是否在移动中
      moveEnd: false, // 移动结束状态，用于触发树的动画
      circleArr: [], // 所有点的集合数组
      xArr: [], // 所有点的横坐标数组
      easing: 0.1, // 阻尼系数
      r: 20, // 圆形半径
      numAll: 0,
      treenum: 0,
      me: [],
      integral: [],
      howMany: 20, // 从0开始计算
      numberTree: [
        10000000000000,
        18900,
        15700,
        12500,
        9300,
        7700,
        6100,
        4500,
        3700,
        2900,
        2100,
        1700,
        1300,
        900,
        700,
        500,
        300,
        200,
        100,
        0,
      ],
    };
  },
  computed: {
    cWidth() {
      return window.innerWidth;
    },
    cHeight() {
      return window.innerHeight;
    },
    centerX() {
      return this.cWidth / 2;
    },
    centerY() {
      return this.cHeight / 2;
    },
    numAllJs() {
      // return this.numAll;
      return this.numAll + Number(this.me.Total) || 0;
    },
  },
  watch: {
    isMoving(nv, ov) {
      if (!nv && ov) {
        this.moveEnd = true;
      } else if (nv && !ov) {
        this.moveEnd = false;
      }
    },
  },
  mounted() {
    this.init();
  },

  methods: {
    btnSendSign() {
      if (this.me.isSign == 1) {
        return false;
      }

      sendSign()
        .then((res) => {
          if (this.me.isSign == undefined) {
            return false;
          }
          if (res.code == -1) {
            Toast("签到失败，请刷新页面重新点击");
            return false;
          }
          console.log(res);
          this.me.isSign = 1;
          Toast("签到成功");
          this.init();
          this.$emit("pf");
        })
        .catch((err) => {
          console.log("失败sendSign");
        });
    },
    taken(e) {
      this.init();
    },
    init() {
      let data = {
        num: 3,
      };
      getPersonal(data)
        .then((res) => {
          this.move();
          this.me = res.data.data;
          let datalist = res.data.data.dataList;
          this.integral = datalist;
          this.createList(datalist.length);
          console.log("getPersonal" + this.me.Total);
          console.log(res);
          this.growing();
        })
        .catch((err) => {
          console.log("失败");
        });
      // this.move();
      // this.createList(3);
      // this.growing();
      // this.createList(this.integral.length);
    },
    circleStyle(item) {
      const r = item.r * 2;
      // console.log(item);
      return {
        top: `${item.y/160}rem`,
        left: `${item.x / 45}rem`,
        width: `${r}px`,
        height: `${r}px`,
        lineHeight: `${r}px`,
        borderRadius: "50%",
        transform: `scale(${item.scale})`,
      };
    },
    startMove(index, hqlid) {
      if (!this.isMoving) {
        this.moveTarget = this.circleArr[index]; // 保存要移动的目标对象
        this.targetIndex = index; // 保存移动目标的索引
        this.isMoving = true;
        this.move();

        let data = {
          lid: hqlid,
        };
        personalEnd(data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      }
    },
    move() {
      if (this.moveTarget) {
        let { moveTarget, centerX, centerY, easing } = this;
        // 当目标距离中心点很近的时候停止动画，否则继续执行动画
        if (
          Math.abs(moveTarget.x - centerX) > 2 &&
          Math.abs(moveTarget.y - centerY) > 2
        ) {
          // 每次移动距离目标点剩余距离的阻尼倍数的距离，以此实现阻尼效果
          moveTarget.x += (centerX - moveTarget.x) * easing;
          moveTarget.y += (centerY - moveTarget.y) * easing;
          moveTarget.scale -= 0.02;
          window.requestAnimationFrame(this.move);
        } else {
          // 重置移动相关参数
          this.numAll += Number(this.circleArr[this.targetIndex].count);
          console.log(this.circleArr[this.targetIndex].count);
          this.growing();
          this.isMoving = false;
          this.circleArr.splice(this.targetIndex, 1); // 删除移动完成的点
        }
      }
    },
    // 生成随机数方法
    randomNum(from, to) {
      return Math.floor(Math.random() * (to - from + 100) + from);
    },
    // 生成圆点方法
    createList(count) {
      let { cWidth, cHeight, circlePadding, treeHeight } = this;
      let index = 0;
      let num = 0;
      while (this.circleArr.length < count) {
        if (index > 100) return false;
        index++;
        var x = this.randomNum(0, cWidth - circlePadding + 70);
        // y的范围为树的最高点到屏幕顶部
        var y = this.randomNum(
          cHeight - treeHeight - 1000,
          cHeight - treeHeight - 666
        );
        // 判断是否与已有的点太近
        if (!this.isNear(x)) {
          console.log(count);
          console.log(this.integral);
          num++;
          console.log(this.integral[num]);
          this.circleArr.push({
            x,
            y,
            r: this.r,
            count: this.me.dataList[num - 1].Points,
            text: this.me.dataList[num - 1].catName,
            lid: this.me.dataList[num - 1].lid,
            // count: 1156,
            // text: "测试哈哈",
            // lid: 5,
            scale: 1, // 用于动画缩放倍数的参数，默认为1
          });
          // xArr用于判断点与点是否太近
          this.xArr.push(x);
        }
      }
    },
    isNear(x) {
      var near = false;
      this.xArr.forEach((val) => {
        // 本来为至少要小于2倍半径，但如果其余的点把屏幕均分了，下一个点就永远满足不了条件，故改为小于1.5倍半径，即有多于4/3个圆的部分重叠，则判断为太近
        // 这里可以根据需要更改判断条件
        if (Math.abs(x - val) < (this.r * 4) / 2) {
          near = true;
        }
      });
      return near;
    },
    growing() {
      let num = this.howMany;
      let arr = new Array(num).fill(0).map((_, idx) => num - idx - 1);
      for (let i = 0; i < arr.length; i++) {
        if (this.numAllJs >= this.numberTree[i]) {
          this.treenum = arr[i];
          break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.Little-forest-droplet {
  .sendSign {
    position: absolute;
    top: -140px;
    left: 1vh;
    width: 206px;
    height: 186px;
    background: url(../assets/sendSign.png) no-repeat;
    background-size: 197px;
    z-index: 1;
    transform: scale(0.7);
    transition: 0.3s;
    animation: day 2s;
    .info {
      height: 78px;
      padding-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #258c4a;
      .day {
        line-height: 1.4;
        font-size: 64px;
        margin: 4px 0 0 12px;
        font-weight: bold;
      }
      .month {
        line-height: 1.2;
        text-align: center;
        font-size: 26px;
        width: 35px;
        line-height: 1;
      }
    }
    .btns {
      width: 199px;
      height: 137px;
      margin-left: 8px;
      img {
        width: 100%;
      }
    }
  }
  position: absolute;
  top: 260px;
  width: 750px;
  height: 500px;
  z-index: 10;
  .my-integral {
    position: absolute;
    top: -200px;
    right: 0;
    padding-right: 10px;
    min-width: 168px;
    height: 72px;
    border-radius: 70px 0 0 70px;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    animation: mymove 1.5s;
    z-index: 2;
    .img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin: 8px;
      border: 2px #66b88a solid;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .number {
      font-size: 36px;
      color: #66b88a;
    }
  }
  .tree {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    background-size: 319px;
    transform-origin: bottom;
    transition: 0.3s;
    &.flip {
      animation: treeFlip 0.7s ease-in-out;
    }
  }
  .circle {
    position: absolute;
    background: #fdce44;
    border: 8px #fde86c solid;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
    &.wave {
      animation: wave 2.5s infinite ease-in-out;
    }
    .circle-text {
      color: #fffd53;
      font-size: 34px;
      line-height: 1;
    }
    .circle-wrod {
      position: absolute;
      top: 70px;
      font-size: 24px;
      color: #fff;
      white-space: pre;
    }
  }
}
@keyframes day {
  from {
    transform: translateY(168px) scale(0.7);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(0.7);
    opacity: 1;
  }
}
@keyframes mymove {
  from {
    transform: translateX(168px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes wave {
  0% {
    transform: translateY(-3px);
  }

  50% {
    transform: translateY(3px);
  }

  100% {
    transform: translateY(-3px);
  }
}
@keyframes treeFlip {
  from {
    transform: scale3d(1, 1, 1) translateX(-50%);
  }

  25% {
    transform: scale3d(1, 1.05, 1) translateX(-50%);
  }

  50% {
    transform: scale3d(1, 0.95, 1) translateX(-50%);
  }

  75% {
    transform: scale3d(1, 1.05, 1) translateX(-50%);
  }

  to {
    transform: scale3d(1, 1, 1) translateX(-50%);
  }
}
</style>