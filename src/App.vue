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
}
</style>
