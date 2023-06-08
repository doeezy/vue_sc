import { createApp } from "vue";
import App from "./App.vue";
import axios from "./utils/axios.js";

// import keycloak from "./utils/keycloak";

import router from "@/router/index.js";

const app = createApp(App);

// [라우터 사용 설정]
app.use(router);

app.config.globalProperties.axios = axios;

app.mount("#app");
//
// keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
//   if (authenticated) {
//     // [main 아이디 : 렌더링 시작점]
//     app.mount("#app");
//
//     // new Vue({
//     //   render: (h) => h(App),
//     // }).$mount("#app");
//   }
// });
