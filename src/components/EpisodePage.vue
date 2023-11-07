<script setup>
import { useEpisodeStore } from "@/stores/episodes";
</script>

<template>
    <div class="search_panel">
      <router-link style="color: rgb(191,222,66);" onclick="window.scrollTo(0,0);" :to="{ name: 'all_characters' }"> All characters&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
      <img src="../assets/portal.png" style="width:70px" />
    </div>

  <br />
  <div class="episode">
    Name: {{ item.name }} <br />
    Date air: {{ item.air_date }} <br />
    Characters: {{ gotImages() }}
    <div class="board">
      <div class="ch_img" v-for="path in got_pics" :key="path">
        <router-link
          :to="{
            name: 'character_page',
            params: {
              id: Number(
                path.substring(path.indexOf('avatar/') + 7, path.length - 5)
              ),
            },
          }"
          ><img :src="path"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EpisodePage",
  props: {
    episode: String,
  },
  data() {
    return {
      item: [],
      pics: [],
      got_pics: [],
      flag: true,
      episodesObj: useEpisodeStore(),
    };
  },
  beforeMount() {
    window.scrollTo(0,0);
  },
  mounted() {
    if (
      this.episodesObj.episodes_ids.includes(Number(this.$route.params.episode))
    ) {
      this.item = this.episodesObj.episodes.find(
        (episode) => episode.id === Number(this.$route.params.episode)
      );

      this.pics = this.episodesObj.episodes
        .find((episode) => episode.id === Number(this.$route.params.episode))
        .characters.map((element) => {
          return element.substring(element.indexOf("api/") + 4, element.length);
        });
    } else {
      axios
        .get(
          "https://rickandmortyapi.com/api/episode/" +
            String(this.$route.params.episode)
        )
        .then(
          (response) => (
            this.episodesObj.pushEpisode(response.data),
            (this.item = response.data),
            (this.pics = response.data.characters.map((element) => {
              return element.substring(
                element.indexOf("api/") + 4,
                element.length
              );
            }))
          )
        );
    }
  },
  methods: {
    gotImages() {
      if (this.flag & (this.pics.length > 0)) {
        this.flag = false;
        this.got_pics = [];
        for (let pic of JSON.parse(JSON.stringify(this.pics))) {
          axios
            .get("https://rickandmortyapi.com/api/" + pic)
            .then((response) => this.got_pics.push(response.data.image));
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.episode {
  text-align: left;
  background-color: white;
  width: fit-content;
  padding: 20px;
  border-radius: 30px;
}

.ch_img {
  padding-top: 20px;
}
.search_panel{
  left: -130px;
}
.search_panel:hover{
  left: 0;
}
</style>
