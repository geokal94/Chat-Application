<template>
  <div class="chat container in-down">
    <div class="row">
      <div class="col s3">
        <div class="card fixed-height left-menu">
          <div class="card-content left-menu-top">
            <h6 class="center white-text">Online users</h6>
          </div>
          <div class="card-action" v-chat-scroll>
            <div class="card-content">
              <ul>
                <li class="users-margin" v-for="(username, index) in onlineUsers" :key="index">
                  <span>
                    <i
                      class="material-icons left small material-icon white-text hide-icon"
                    >account_circle</i>
                  </span>
                  <span class="white-text fs17">{{username.user}}</span>
                  <span>
                    <i class="material-icons status-icon">brightness_1</i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col s9">
        <div class="card">
          <div class="card-content cc1 full-width">
            <div class="full-width">
              <span>
                <i class="material-icons left small material-icon">account_circle</i>
                {{this.name}}
              </span>
              <span>
                <i class="material-icons status-icon">brightness_1</i>
              </span>
              <span v-for="(username, index) in onlineUsers" :key="index">
                <i
                  v-if="username.user === name"
                  @click="deleteUser(username._id)"
                  title="Disconnect"
                  class="material-icons right power-icon"
                >power_settings_new</i>
              </span>
            </div>
          </div>
          <div class="card-content cc2" v-chat-scroll>
            <ul class="messages" v-chat-scroll>
              <li
                v-bind:class="{msg:true, sender:message.user === name}"
                v-for="message in messages"
                :key="message._id"
              >
                <span class="teal-text">{{message.user}}:&nbsp;</span>
                <span class="grey-text text-darken-3">{{message.message}}</span>

                <span class="grey-text time">
                  {{message.timestamp}}
                  <span v-if="message.user === name" class="crud-buttons">
                    <i
                      class="material-icons"
                      @click="deleteMessage(message._id)"
                      title="Delete message"
                    >delete_forever</i>
                    <i class="material-icons" @click="editMessage" title="Edit Message">edit</i>
                  </span>
                </span>
              </li>
            </ul>
          </div>
          <div class="card-action ca2">
            <div class="new-message">
              <form @submit.prevent="addMessage">
                <div class="row">
                  <div class="col s9">
                    <input
                      type="text"
                      name="new-message"
                      placeholder="Type your message"
                      autocomplete="off"
                      maxlength="300"
                      v-model="newMessage"
                    >
                  </div>
                  <div class="col s3">
                    <button class="btn waves-effect waves-light right" type="submit" name="action">
                      <i class="material-icons center">send</i>
                    </button>
                  </div>
                </div>
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
import moment from "moment"; //moment(time).format('lll');
import io from "socket.io-client";

export default {
  name: "Chat",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      feedback: null,
      user: "",
      content: "",
      messages: [],
      onlineUsers: [],
      socket: io("chat-application-45.herokuapp.com")
    };
  },
  methods: {
    addMessage(e) {
      if (this.newMessage) {
        e.preventDefault(); // prevents page reloading

        let messageData = {
          user: this.name,
          message: this.newMessage,
          timestamp: String(moment(Date.now()).format("lll"))
        };

        this.__submitToServer_message(messageData);

        this.socket.emit("SEND_MESSAGE", messageData);
        this.feedback = null;

        this.newMessage = "";
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    },
    __submitToServer_message(data) {
      axios.post(`${server.baseURL}/messages/create`, data).then(data => {
        this.getMessages();
      });
    },
    deleteUser(id) {
      axios.delete(`${server.baseURL}/users/delete?userID=${id}`).then(data => {
        console.log("delete user with data: ", data);
        this.$router.push({ name: "Welcome" });
        /* location.reload(true); */
      });
    },
    getMessages() {
      axios
        .get(`${server.baseURL}/messages/messages`)
        .then(data => (this.messages = data.data));
    },
    getUsers() {
      axios
        .get(`${server.baseURL}/users/users`)
        .then(data => (this.onlineUsers = data.data));
    },
    addUser() {
      let userData = {
        user: this.name
      };

      this.__submitToServer_user(userData);
    },
    __submitToServer_user(data) {
      axios.post(`${server.baseURL}/users/create`, data).then(data => {
        this.getUsers();
      });
    },
    deleteMessage(id) {
      axios
        .delete(`${server.baseURL}/messages/delete?messageID=${id}`)
        .then(data => {
          console.log("delete message with data: ", data);
          this.getMessages();
        });
    },
    editMessage(/* id  */) {
      /* let messageData = {
        user: this.name,
        message: this.newMessage,
        timestamp: String(moment(Date.now()).format("lll"))
      };
      axios.put(
        `${server.baseURL}/messages/update?messageID=${this.id}`,
        messageData 
      ); */
    },
    onrefresh: function onrefresh(event) {
      console.log("refreshed");
      /* this.socket.emit("REMOVE_ONLINE_USER", this.name); */
      this.$router.push({ name: "Welcome" });
    }
  },
  deactivated() {
    //on back button
    console.log("deactivated");
    location.reload(true);
  },
  created() {
    this.addUser();
    /* this.getUsers(); */
    this.getMessages();
    window.addEventListener("beforeunload", this.onrefresh);
  },
  mounted() {
    this.socket.on("NUM_OF_USERS", data => {
      //when tracing a new connection/disconnection update online users
      this.getUsers();
    });

    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // or this.messages.push(data)
    });
  }
};
</script>

<style scoped>
* {
  word-wrap: break-word;
}
@media only screen and (max-width: 850px) {
  .hide-icon {
    display: none;
  }
  .left-menu li {
    text-align: center;
  }
}
@media only screen and (max-width: 806px) {
  .new-message input {
    width: 80% !important;
  }
}
@media only screen and (max-width: 520px) {
  .new-message input {
    width: 60% !important;
  }
}

.crud-buttons {
  float: right;
  color: #434753;
  cursor: pointer;
}

.users-margin {
  margin-bottom: 8px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.left-menu-top {
  padding: 14px 24px;
}
.left-menu .card-action .card-content {
  padding: 0;
}
.left-menu .card-action {
  padding: 0 10px;
  overflow: auto;
  height: 390px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5) !important;
  border-top: 2px solid rgba(255, 255, 255, 0.5) !important;
}

.material-icon {
  font-size: 30px;
}
i.power-icon {
  font-size: 30px;
  color: #bb2124;
  cursor: pointer;
}
.align-center {
  display: flex;
  align-items: center;
}
i.status-icon {
  color: green;
  font-size: 8px;
  margin-left: 5px;
}
.new-message input {
  background: white !important;
  padding: 2px 30px !important;
  border-radius: 30px !important;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.27) !important;
  overflow: auto !important;
  margin-top: 6px;
  width: 100%;
}
.new-message button {
  border-radius: 30px;
  height: 48px;
  margin-top: 6px;
}
.full-width {
  width: 100%;
}

.left-menu {
  background: #434753;
}
.cc1 {
  height: 50px;
  border-top-right-radius: 30px !important;
  border-top-left-radius: 30px !important;
  border-bottom: 3px solid white;
  background: #eaeef1;
  display: flex;
  align-items: center;
  color: #434753;
}
.cc2 {
  height: 350px;
  padding-top: 0 !important;
  overflow: auto;
  background: #f2f5f8;
}
.ca2 {
  height: 100px;
  background: #f2f5f8 !important;
  border-top: 3px solid white !important;
  border-bottom-right-radius: 30px !important;
  border-bottom-left-radius: 30px !important;
}
.fs17 {
  font-size: 17px !important;
}

.msg {
  background: #f2f5f8;
  padding: 10px 10px 10px 30px;
  border-radius: 30px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.27);
  margin: 5px;
  display: block;
  height: auto !important;
  width: 50% !important;
  overflow: auto !important;
}
.sender {
  float: right;
  background: white;
}
.messages span {
  font-size: 17px !important;
}
.messages span i {
  font-size: 18px !important;
}
.page-footer {
  padding: 0;
}

.fixed-height {
  height: 500px;
}

.card {
  border-radius: 30px;
  opacity: 0.85;
}
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}

.chat span {
  font-size: 1.4em;
}

.chat .time {
  display: block;
  font-size: 12px !important;
}

.messages {
  overflow: auto; /* scroll bar after 300px  */
}

.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
</style>