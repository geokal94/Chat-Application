<template>
  <div class="chat container">
    <div class="row">
      <div class="col s3">
        <div class="card fixed-height left-menu">
          <div class="card-content">
            <h5 class="center white-text">Online Users</h5>
          </div>
          <div class="card-action">
            <div class="card-content">
              <ul>
                <li v-for="(user,index) in onlineUsers" :key="index">
                  <span class="white-text">{{this.name}}:</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col s9">
        <div class="card">
          <div class="card-content cc1">
            <form @submit.prevent="leaveChat">
              <span>
                <i class="material-icons left small">account_circle</i>
                Welcome {{this.name}}
                <!-- <button
                  class="btn grey-text text-darken-3 right small"
                >-->
                <i id="iii" class="material-icons right small">list</i>
                <!-- Disconnect -->
                <!-- </button> -->
              </span>
            </form>
          </div>
          <div class="card-content cc2" v-chat-scroll>
            <ul class="messages" v-chat-scroll>
              <li class="msg" v-for="(message,index) in messages" :key="index">
                <span class="teal-text">{{message.user}}:&nbsp;</span>
                <span class="grey-text text-darken-3">{{message.message}}</span>
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
                  <div class="col s3 center">
                    <button class="btn waves-effect waves-light" type="submit" name="action">
                      Send
                      <i class="material-icons right">send</i>
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
      socket: io("localhost:3000")
    };
  },
  methods: {
    addMessage(e) {
      if (this.newMessage) {
        e.preventDefault();

        this.socket.emit("SEND_MESSAGE", {
          user: this.name,
          message: this.newMessage,
          timestamp: moment(Date.now()).format("lll")
        });
        this.newMessage = "";
        this.feedback = null;
      } else {
        this.feedback = "You must enter a message in order to send one";
      }
    },
    leaveChat() {
      this.$router.push({ name: "Welcome" });
    }
  },
  //set listener when component is created , order by timestamp
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
};
</script>

<style>
.new-message input {
  background: white !important;
  padding: 2px 10px !important;
  border-radius: 10px !important;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.27) !important;
  overflow: auto !important;
  margin-top: 6px;
}
.new-message button {
  margin-top: 6px;
  margin-left: 15px;
  border-radius: 10px;
  height: 42px;
}
form {
  width: 100%;
}
.left-menu {
  background: #434753;
}
.cc1 {
  height: 50px;
  border-radius: 10px;
  border-bottom: 3px solid white;
  background: #eaeef1;
  display: flex;
  align-items: center;
  color: #434753;
}
.cc2 {
  height: 300px;
  padding-top: 0 !important;
  overflow: auto;
  background: #f2f5f8;
}
.ca2 {
  height: 100px;
  background: #f2f5f8 !important;
  border-top: 3px solid white !important;
}
.fs18 {
  font-size: 18px;
}
.fs14 {
  font-size: 14px;
}
.msg {
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.27);
  margin: 5px;
  overflow: auto;
}
.page-footer {
  padding: 0;
}

.fixed-height {
  height: 450px;
}

.card {
  border-radius: 10px;
  opacity: 0.97;
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