import { createRouter, createWebHistory } from "vue-router";
import CharacterPage from "@/components/CharacterPage.vue";
import CharacterList from "@/components/CharacterList.vue";
import EpisodePage from "@/components/EpisodePage.vue";
import SearchPage from "@/components/SearchPage.vue";
const routes = [
  {
    path: '/',
    redirect: { name: 'all_characters' }
  },
  {
    path: '/home',
    name: "all_characters",
    component: CharacterList,
  },
  {
    path: "/character/:id",
    name: "character_page",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CharacterPage,
  },
  {
    path: "/episode/:episode",
    name: "episode_page",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EpisodePage,
  },
  {
    path: "/seacrh",
    name: "search_page",
    query: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SearchPage,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
