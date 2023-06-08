<template>
  <div>
    <input v-model="userName" type="text" />

    <button @click="register">회원가입</button>
  </div>
</template>

<script>
export default {
  name: "vueMain",
  data() {
    return {
      userName: null,
    };
  },
  methods: {
    register() {
      // this.axios.get("/keycloak", {}).then((r) => {
      //     console.log(r);
      // });
    },
  },
};
</script>

<style scoped></style>
