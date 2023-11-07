<template>
      <div class="search_panel">
      <router-link style="color: rgb(191,222,66);" onclick="window.scrollTo(0,0);" :to="{ name: 'all_characters' }"> All characters&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
      <img src="../assets/portal.png" style="width:70px" />
    </div>
    <br />
    <center>
  <div class="all_characters">
    <img style="width:400px" :src="item.image" /> <br>
    Name: {{ item.name }} <br />
    Species: {{ item.species }} <br />
    <div v-if="item.type != ''">Type: {{ item.type }} <br /></div>
    Origin: {{ getName(this.item.origin) }} <br />
    Location: {{ getName(this.item.location) }} <br />
    Url: {{ item.url }} <br />
  </div>
</center>
</template>

<script>
import axios from "axios";

export default {
  name: "CharacterPage",
  props: {
    id: String,
  },
  data() {
    return {
      item: [],
    };
  },
  mounted() {
    axios
    .get("https://rickandmortyapi.com/api/character/" + String(this.$route.params.id))
      .then((response) => (this.item = response.data));
  },
  methods: {
    getName(obj) {
      if (obj) {
        return obj.name;
      }
      else return "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all_characters{
  text-align: left;
  padding: 15px;
  background-color: rgb(255, 255, 255);
  filter: grayscale(0%)
}
.all_characters img {
  text-align: center;
}

.search_panel{
  left: -130px;
}
.search_panel:hover{
  left: 0;
}
</style>
