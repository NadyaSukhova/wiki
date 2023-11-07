<template>
  <div class="search_panel">
    <router-link style="color: rgb(191,222,66);" onclick="window.scrollTo(0,0);" :to="{ name: 'all_characters' }">
      All characters&nbsp;&nbsp;&nbsp;&nbsp;</router-link
    >
    <img src="../assets/portal.png" style="width: 70px" />
  </div>
  <div class="board">
    <div
      class="all_characters"
      v-for="(ch_item, index) in ch_list"
      :key="index"
    >
      Name:
      <router-link style="font-family: 'Custom'; font-size: larger"
        @click="this.character_id = Number(ch_item.id)"
        :to="{ name: 'character_page', params: { id: ch_item.id } }"
      >
        <div  class="name">{{ ch_item.name }}</div>
      </router-link> <br>
      <router-link
        @click="this.character_id = Number(ch_item.id)"
        :to="{ name: 'character_page', params: { id: ch_item.id } }"
        ><img :src="ch_item.image"
      /></router-link>
      <br />
      <br />
      Species: {{ ch_item.species }} <br />
      Episodes:
      <div
        style="display: inline"
        v-for="(ep, index) in getEpisodes(
          JSON.parse(JSON.stringify(ch_item.episode))
        )"
        :key="ep"
      >
        <div style="display: inline" v-if="index != 0">,</div>
        <router-link
          @click="this.episode_id = Number(ep)"
          :to="{ name: 'episode_page', params: { episode: ep } }"
        >
          {{ ep }}
        </router-link>
      </div>

      <div
        style="display: inline"
        v-if="JSON.parse(JSON.stringify(ch_item.episode)).length > 5"
      >
        , ...
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CharacterList",
  props: {
    name: String,
    status: String,
  },
  data() {
    return {
      character_id: 0,
      episode_id: 0,
      character_name: "",
      ch_list: [],
    };
  },
  mounted() {
    var path = "";
    if (this.$route.query.name != "") {
      if (this.$route.query.status != "") {
        path = `https://rickandmortyapi.com/api/character/?name=${this.$route.query.name}&status=${this.$route.query.status}`;
      } else {
        path = `https://rickandmortyapi.com/api/character/?name=${this.$route.query.name}`;
      }
    } else {
      if (this.$route.query.status != "") {
        path = `https://rickandmortyapi.com/api/character/?status=${this.$route.query.status}`;
      } else {
        alert("No query!");
        window.location.replace("/");
      }
    }
    try {
      axios.get(path).then((response) => {
        for (var character of response.data.results) {
          this.ch_list.push(character);
        }
      });
    } catch (error) {
      console.log("Error!");
      console.log(error);
    }
  },
  methods: {
    getEpisodes(urls) {
      let res = [];
      let min_size = Math.min(5, urls.length);
      for (let i = 0; i < min_size; i++) {
        res.push(
          urls[i].substring(urls[i].indexOf("episode/") + 8, urls[i].length)
        );
      }
      return res;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search_panel {
  left: -130px;
}
.search_panel:hover {
  left: 0;
}
</style>
