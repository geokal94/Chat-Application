<template>
  <div id="app">
    <!-- <vue-particles color="#000000"></vue-particles> -->
    <router-view/>
  </div>
</template> 

<style>
* {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.welcome {
  max-width: 400px;
  margin-top: 100px;
}

.welcome h2 {
  font-size: 3em;
}

.welcome button {
  margin: 30px auto;
}

#app {
  height: 100vh;
  background-image: url("./assets/bgp.png");
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

@-webkit-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translatey(-10px);
    -moz-transform: translatey(-10px);
    -o-transform: translatey(-10px);
    transform: translatey(-10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translatey(0);
    -moz-transform: translatey(0);
    -o-transform: translatey(0);
    transform: translatey(0);
  }
}
@-moz-keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translatey(-10px);
    -moz-transform: translatey(-10px);
    -o-transform: translatey(-10px);
    transform: translatey(-10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translatey(0);
    -moz-transform: translatey(0);
    -o-transform: translatey(0);
    transform: translatey(0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    -webkit-transform: translatey(-10px);
    -moz-transform: translatey(-10px);
    -o-transform: translatey(-10px);
    transform: translatey(-10px);
  }
  to {
    opacity: 1;
    -webkit-transform: translatey(0);
    -moz-transform: translatey(0);
    -o-transform: translatey(0);
    transform: translatey(0);
  }
}
.in-down {
  -webkit-animation-name: fadeInDown;
  -moz-animation-name: fadeInDown;
  -o-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-fill-mode: both;
  -moz-animation-fill-mode: both;
  -o-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  -o-animation-duration: 1s;
  animation-duration: 1s;
}
</style>
