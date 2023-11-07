import { defineStore } from "pinia";

export const useEpisodeStore = defineStore({
  id: "EpisodeStore",
  state: () => ({
    episodes: [],
    episodes_ids: [],
    loading: false,
    error: null,
  }),
  persist: true,
  actions: {
    pushEpisode(episode) {
        this.episodes = [...this.episodes, episode];
        this.episodes_ids = [...this.episodes_ids, Number(episode.id)];
      
    },
  },
});
