<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="grey-text text-darken-3">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name" class="grey-text text-darken-3">Enter your chat name:</label>
          <input type="text" name="name" autocomplete="off" v-model="name">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button class="btn grey-text text-darken-3">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      name: null,
      feedback: null
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.feedback = "You must enter a name to join";
      }
    }
  }
};
</script>

<style>
.welcome {
  opacity: 0.96;
  margin-top: auto;
  margin-bottom: auto;
}
.welcome label {
  font-size: 1.1em;
}
</style>
