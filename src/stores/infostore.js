import { defineStore } from "pinia";

export const useInfoStore = defineStore('infoStore', {
  state: () => {
    return {
        info: [],
    }
  },
  actions: {
    pushInfo(urls) {
      console.log('U R IN PINIA, pushInfo')
      console.log(urls);
      this.info = [...this.info, ...urls]
      console.log(this.info);
    },
  },
});
