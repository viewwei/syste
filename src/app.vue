<template>
    <div>带我去dwdqwdq多群
      <test/>
    </div>
</template>
<script>
import b from "./b.vue"
export default {
    components:{
        "test":b
    },
    name:"app",
    mounted(){
      console.log(this.test())  
    },
    methods:{
        test(){
         var arr = [new Promise(function () {}), new Promise(function () {})];
arr.map(function (item) {
  console.log(item);
});
        }
    }
}
</script>
<style scoped>
div {
    background: orange;
}
</style>