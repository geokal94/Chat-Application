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
        <div class="card fixed-height">
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
                <label class="fs14 grey-text text-darken-3">Enter message:</label>
                <div class="row">
                  <div class="col s9">
                    <input type="text" name="new-message" autocomplete="off" v-model="newMessage">
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
.left-menu {
  background: #434753;
}
.cc2 {
  min-height: 60vh;
  max-height: 60vh;
  overflow: auto;
}
.ca2 {
  min-height: 15vh;
  max-height: 15vh;
  background: #444;
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
  min-height: 75vh;
  max-height: 75vh;
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