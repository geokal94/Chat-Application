<template>
  <div class="chat container in-down">
    <div class="row">
      <div class="col s3">
        <div class="card fixed-height left-menu">
          <div class="card-content left-menu-top">
            <h6 class="center white-text">Online users: {{this.num_of_onlineUsers}}</h6>
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
                  <span class="white-text fs18">{{username}}</span>
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
                <i class="material-icons status-icon">brightness_1</i>
                <i
                  @click="leaveChat"
                  title="Disconnect"
                  class="material-icons right power-icon"
                >power_settings_new</i>
              </span>
            </div>
          </div>
          <div class="card-content cc2" v-chat-scroll>
            <ul class="messages" v-chat-scroll>
              <li class="msg" v-for="(message,index) in messages" :key="index">
                <span class="teal-text">{{message.user}}:&nbsp;</span>
                <span class="grey-text text-darken-3">{{message.message}}</span>
                <span class="crud-buttons">
                  <i
                    class="material-icons"
                    @click="deleteMessage"
                    title="Delete message"
                  >delete_forever</i>
                  <i class="material-icons" @click="editMessage" title="Edit Message">edit</i>
                </span>
                <span class="grey-text time">{{message.timestamp}}</span>
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
      num_of_onlineUsers: null,
      onlineUsers: [],
      socket: io("localhost:3000")
    };
  },
  methods: {
    addMessage(e) {
      if (this.newMessage) {
        e.preventDefault(); // prevents page reloading

        this.socket.emit("SEND_MESSAGE", {
          user: this.name,
          message: this.newMessage,
          timestamp: moment(Date.now()).format("lll")
        });
        this.feedback = null;
        let messageData = {
          user: this.name,
          message: this.newMessage,
          timestamp: String(moment(Date.now()).format("lll"))
        };
        /* console.log("messageData: ", messageData); */
        this.__submitToServer(messageData);
        this.newMessage = "";
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    },
    __submitToServer(data) {
      axios.post(`${server.baseURL}/messages/create`, data).then(data => {});
    },
    leaveChat() {
      this.socket.emit("REMOVE_ONLINE_USER", this.name);
      location.reload(true); //reload and dont just change component so disconnect event is fired
    },
    getMessages() {
      axios
        .get(`${server.baseURL}/messages/messages`)
        .then(data => (this.messages = data.data));
    },
    deleteMessage() {},
    editMessage() {}
  },

  created() {
    this.socket.emit("ADD_ONLINE_USER", this.name);
    this.getMessages();
  },
  mounted() {
    this.socket.on("NUM_OF_USERS", data => {
      this.num_of_onlineUsers = data;
    });

    this.socket.on("ONLINE_USERS", data => {
      this.onlineUsers = data;
    });

    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // or this.messages.push(data)
    });
  }
};
</script>

<style scoped>
@media only screen and (max-width: 991px) {
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
.fs18 {
  font-size: 18px;
}
.fs14 {
  font-size: 14px;
}
.msg {
  background: white;
  padding: 10px 10px 10px 30px;
  border-radius: 30px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.27);
  margin: 5px;
  display: block;
  height: auto !important;
  overflow: auto !important;
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
  font-size: 0.9em;
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