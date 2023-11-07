<template>
  <div class="pickles">
    <div class="pickles1"></div>
    <div class="pickles3"></div>
    <div class="pickles2"></div>
  </div>

  <div id="content">
    <img id="logo" src="./assets/Rick_and_Morty.svg" />
    <CharacterList />
  </div>
</template>

<script>
import CharacterList from "./components/CharacterList.vue";

export default {
  name: "App",
  components: {
    CharacterList,
  },
};

</script>

<style>
* {
  cursor: url("./assets/pickle.cur"), default;
}

body {
  background-color: cadetblue;
}

.pickles {
  background-color: transparent;
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: -1;
}

.pickles1 {
  position: fixed;
  background-image: url("./assets/pickle.png");
  filter: blur(20px);
  width: 100%;
  height: 100%;
  animation: pickles1 14s linear infinite;
}
.pickles3 {
  position: fixed;
  background-image: url("./assets/pickle3.png");
  filter: blur(5px);
  width: 100%;
  height: 100%;
  animation: pickles1 7s linear infinite;
}

.pickles2 {
  position: fixed;
  background-image: url("./assets/pickle2.png");
  width: 100%;
  height: 100%;
  animation: pickles1 5s linear infinite;
}
@keyframes pickles1 {
  from {
    background-position: 0 -300px;
  }
  50% {
    background-position: 2% 100px;
  }
  to {
    background-position: 0% 700px;
  }
}

@keyframes pickles2 {
  from {
    background-position: 0 -300px;
  }
  50% {
    background-position: 1% 100px;
  }
  to {
    background-position: 0% 700px;
  }
}

@keyframes pickles3 {
  from {
    background-position: 0 -300px;
  }
  50% {
    background-position: 0% 100px;
  }
  to {
    background-position: 0% 700px;
  }
}

#logo {
  width: 50%;
  filter: drop-shadow(16px 16px 20px rgb(233, 255, 143));
}

#content {
  background-color: transparent;
  text-align: center;
}
 
a{
  text-decoration: none;
}

@font-face {
  font-family: "Bebas";
  src: url("./assets/BebasNeue-Regular.ttf");
}
@font-face {
  font-family: "Custom";
  src: url("./assets/Creepster-Regular.ttf");
}
* {
  font-family: "Bebas";
  font-size: 22px;
}

a {
  color:darkgreen;
}

.name{
  width: 320px;
  font-family: "Custom";
  font-size: larger;
  color: rgb(191,222,66);
  -webkit-text-stroke: 1px rgb(27, 69, 78);
}
</style>
