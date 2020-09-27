<template>
  <div>
    <Head :title="msg" />
    <vantabs :tablist="tabs" />
    <Footer />
  </div>
</template>

<script>
import Head from "@/components/head";
import Footer from "@/components/footer";
import vantabs from "@/components/vantabs";
import { ruleNavigation } from "@/api/api";
export default {
  name: "standard",
  components: {
    Head,
    Footer,
    vantabs,
  },
  data() {
    return {
      active: 2,
      msg: "积分标准",
      // tabs: [],
      tabs: [
        {
          T_ID: "1",
          Number: "2040", //一级分类
          T_Name: "规章制度	", //名字
          T_Parent: "0",
          T_Standard: "",
          T_Value: "0",
          T_Type: "1",
          sonDataArr: [
            {
              //二级分类数组
              T_ID: "2",
              Number: "2040",
              T_Name: "考勤",
              T_Parent: "1", //上级分类id
              T_Standard:
                "月度内无迟到早退、漏打卡（补卡在规定的时间内补卡，次数不超过3次）、请假（包括产假、病假、年假等）异常现象；（以钉钉打卡为准）",
              T_Value: "5", //积分
              T_Type: "1", //1-团队 2-个人
              sonDataArr: "",
            },
            {
              T_ID: "3",
              Number: "2040",
              T_Name: "着装",
              T_Parent: "1",
              T_Standard:
                "员工在完成分内工作任务后，在遵守公司规章制度的前提下能够及时主动热情帮助其他同事完成工作任务的；",
              T_Value: "10",
              T_Type: "2",
              sonDataArr: "",
            },
          ],
        },
        {
          T_ID: "7",
          Number: "2040",
          T_Name: "员工认可",
          T_Parent: "0",
          T_Standard: "",
          T_Value: "0",
          T_Type: "1",
          sonDataArr: [
            {
              T_ID: "8",
              Number: "2040",
              T_Name: "相互协作",
              T_Parent: "7",
              T_Standard:
                "员工在完成分内工作任务后，在遵守公司规章制度的前提下能够及时主动热情帮助其他同事完成工作任务的；",
              T_Value: "5",
              T_Type: "1",
              sonDataArr: "",
            },
            {
              T_ID: "9",
              Number: "2040",
              T_Name: "价值观体现",
              T_Parent: "7",
              T_Standard:
                "为人处事能够充分体现公司价值观诚信敬业、协作担当、乐观主动、开拓创新、好学精进（解释说明部分），且有相关具体事例详细说明； （备注：如有其中一项不符合，则不获得该积分.依据相关事实，可互相监督）",
              T_Value: "100",
              T_Type: "1",
              sonDataArr: "",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.loadrule(); //需要触发的函数
  },
  methods: {
    loadrule() {
      ruleNavigation()
        .then((res) => {
          console.log(res.data.data);
          this.tabs = res.data.data;
        })
        .catch((err) => console.log("失败了" + err));
    },
  },
};
</script>
 
<style lang="scss">
</style>
