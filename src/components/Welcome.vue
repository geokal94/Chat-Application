<template>
  <div class="welcome container in-down">
    <div class="card">
      <div class="card-content center-align">
        <h2 class="grey-text text-darken-3">Welcome</h2>
        <form @submit.prevent="enterChat">
          <label for="name" class="grey-text text-darken-3">Enter your chat name:</label>
          <input
            type="text"
            class="grey-text text-darken-3"
            name="name"
            autocomplete="off"
            maxlength="16"
            v-model="name"
          >
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <p v-if="incorrect_username" class="red-text">{{ incorrect_username }}</p>
          <button class="btn-large light-blue darken-1 large">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
import io from "socket.io-client";

export default {
  name: "Welcome",
  data() {
    return {
      name: null,
      feedback: null,
      incorrect_username: null,
      users: [],
      socket: io("chat-application-45.herokuapp.com")
    };
  },
  methods: {
    enterChat() {
      if (this.name) {
        if (this.users.find(username => username.user === this.name)) {
          this.incorrect_username =
            "Username currently in use. Please select another...";
          /* console.log("user already exists"); */
          this.feedback = null;
        } else {
          /* console.log("success"); */

          this.$router.push({ name: "Chat", params: { name: this.name } });
        }
      } else {
        this.feedback = "You must enter a name to join";
        this.incorrect_username = null;
      }
    },
    getUsers() {
      axios
        .get(`${server.baseURL}/users/users`)
        .then(data => (this.users = data.data));
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style>
.welcome {
  margin-top: auto;
  margin-bottom: auto;
}
.welcome .card {
  border-radius: 30px;
  opacity: 0.85;
}
.welcome label {
  font-size: 1.15em;
}
.welcome button {
  border-radius: 20px;
}
.welcome input {
  text-align: center;
  width: 80% !important;
  font-size: 1.3em !important;
  border-bottom: 1px solid #80cbc4 !important;
}
</style>
