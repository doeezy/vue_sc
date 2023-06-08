import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/common/components/Menu.vue"),
  },
  {
    path: "/view",
    name: "view",
    component: () => import("@/common/components/View.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/common/components/Chat.vue"),
  },
  {
    path: "/vueMain",
    name: "vueMain",
    component: () => import("@/common/components/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
