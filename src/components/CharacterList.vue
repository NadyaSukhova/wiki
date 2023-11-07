<script setup>
import { useCharacterStore } from "@/stores/characters";

const charactersStore = useCharacterStore();
</script>

<template>
  <div v-if="character_id > 0">
    <router-view />
  </div>
  <div v-else-if="episode_id > 0">
    <router-view />
  </div>
  <div v-else-if="search">
    <router-view />
  </div>
  <div v-else>
    <div style="color:white" class="search_panel">
      Name: <input v-model="character_name" />
      Status: <select v-model="character_status">
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <router-link
      style="color: rgb(191,222,66)"
        @click="this.search = true"
        :to="{
          name: 'search_page',
          query: { name: character_name, status: character_status },
        }"
      >
        Search
      </router-link>
      <img src="../assets/icons8-search-50.png" />
    </div>
    <div class="board">
      <div
        class="all_characters"
        v-for="(ch_item, index) in charactersStore.characters"
        :key="index"
      >
        <router-link
          style="font-family: 'Custom'; font-size: larger"
          @click="this.character_id = Number(ch_item.id)"
          :to="{ name: 'character_page', params: { id: ch_item.id } }"
        >
          <div class="name">{{ ch_item.name }}</div>
        </router-link>
        <br />
        <router-link
          @click="this.character_id = Number(ch_item.id)"
          :to="{ name: 'character_page', params: { id: ch_item.id } }"
          ><img class="ch_image" :src="ch_item.image"
        /></router-link>
        <br />
        <div style="text-align: left; padding-left: 10px">
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
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CharacterList",
  data() {
    return {
      page: Math.floor(useCharacterStore().characters.length / 20),
      character_id: 0,
      episode_id: 0,
      character_name: "",
      character_status: "",
      search: false,
      charactersObj: useCharacterStore(),
    };
  },
  mounted() {
    setTimeout(3000);
    this.scroll();
  },
  beforeMount() {
    this.charactersObj.firstPage();
    this.page++;
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
    scroll() {
      
      if (!this.search & (this.episode_id === 0) & (this.character_id === 0) & (this.page < 42)) {
        window.onscroll = () => {
          let bottomOfWindow =
            window.scrollY + window.innerHeight + 100 >
            document.body.scrollHeight;
          if (
            bottomOfWindow &
            !this.search &
            (this.character_id === 0) &
            (this.episode_id === 0)
          ) {
            this.page++;
            try {
              axios
                .get(
                  "https://rickandmortyapi.com/api/character/?page=" + this.page
                )
                .then((response) => {
                  for (var character of response.data.results) {
                    this.charactersObj.pushCharacter(character);
                  }
                });
            } catch (error) {
              console.log("Error!");
              console.log(error);
            }
          }
        };
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.all_characters {
  width: fit-content;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.75);
  margin-top: 50px;
  padding-top: 20px;
  padding-bottom: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  align-items: center;
  margin: 2%;
  filter: grayscale(70%);
}

.all_characters:hover {
  background-color: rgb(255, 255, 255);
  filter: grayscale(0%);
}

.search_panel {
  background-color: rgb(75, 98, 131);
  width: cover;
  padding: 10px;
  position: fixed;
  top: 15px;
  left: -450px;
  transition: left 1s;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  z-index: 10;
  display: flex;
  align-items: center
}


.search_panel:hover {
  left: 0;
}

.board {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
