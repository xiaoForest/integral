<template>
  <div>
    <van-tabs v-model="active" swipeable>
      <van-tab
        v-for="(value, index) in tablist"
        :key="index"
        :title="value.T_Name"
      >
        <div class="tablemod">
          <div class="toptit">{{ value.T_Name }}</div>
          <div v-html="value.T_Remarks">
            {{ value.T_Remarks }}
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "vantabs",
  props: {
    tablist: {
      type: Array,
      default: "",
    },
  },
  data() {
    return {
      active: 0,
      msg: "",
    };
  },
};
</script>

<style lang="scss">
.van-tabs--line {
  overflow: hidden;
  .van-tabs__wrap {
    height: 88px;
    padding-bottom: 15px;
    .van-tab {
      line-height: 1.2;
      font-size: 30px;
      color: #000;
      transition: 0.3s;
      &.van-tab--active {
        color: #1c9a4b;
      }
    }
    .van-tabs__line {
      background: -webkit-gradient(
        linear,
        100% 0%,
        0% 100%,
        from(#c6fbda),
        to(#1f9c4e)
      );
      width: 60px;
      height: 4px;
    }
  }
  .van-tabs__content {
    text-align: left;
    padding: 20px;
  }
}

.tablemod {
  position: relative;
  margin: 0 0 150px;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 1px;
    height: 100%;
    background: #fff;
  }
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    width: 1px;
    height: 100%;
    background: #fff;
  }
  .toptit {
    font-size: 26px;
    padding: 0 20px;
    color: #1a9847;
    height: 70px;
    background: #e8f5ec;
    display: flex;
    align-items: center;
  }
  table {
    width: 100% !important;
    tbody {
      tr {
        td {
          padding: 6px 15px;
          text-align: center;
          border-left: 1px #efefef solid;
          border-top: 1px #efefef solid;
          color: #000;
          font-size: 24px;
          &:last-child {
            color: red;
          }
        }
        &:nth-child(1) {
          td {
            border-top: 0;
          }
        }
      }
    }
  }
}
</style>