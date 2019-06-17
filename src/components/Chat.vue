<template>
  <div class="teal lighten-3">
    <nav class="teal lighten-5">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center grey-text text-darken-3">Online Chat Room</a>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li>
            <a href="sass.html" class="grey-text text-darken-3 fs18">Sign Out</a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="chat container">
      <div class="row">
        <div class="col s3">
          <div class="card fixed-height teal lighten-5">
            <div class="card-content">
              <h5 class="center grey-text text-darken-3">Online Users</h5>
            </div>
            <div class="card-action">
              <div class="card-content">
                <ul>
                  <li v-for="(user,index) in onlineUsers" :key="index">
                    <!-- <span class="teal-text text-lighten-1">{{message.user}}:</span> -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col s9">
          <div class="card fixed-height teal lighten-5">
            <div class="card-content">
              <ul class="messages" v-chat-scroll>
                <li class="msg teal lighten-5" v-for="(message,index) in messages" :key="index">
                  <span class="teal-text">{{message.user}}:</span>
                  <span class="grey-text text-darken-3">{{message.message}}</span>
                  <span class="grey-text time">{{message.timestamp}}</span>
                </li>
              </ul>
            </div>
            <div class="card-action teal lighten-4">
              <div class="new-message">
                <form @submit.prevent="addMessage">
                  <input type="text" name="new-message" v-model="newMessage">
                  <p class="red-text" v-if="feedback">{{ feedback }}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="page-footer teal lighten-5">
      <div class="footer-copyright">
        <div class="container center fs16 grey-text text-darken-4">© Developed by George Kallis</div>
      </div>
    </footer>
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
.fs18 {
  font-size: 18px;
}
.fs16 {
  font-size: 16px;
}
.msg {
  background: white;
  width: auto;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
}
.page-footer {
  padding: 0;
}

.fixed-height {
  min-height: 75vh;
  max-height: 75vh;
  overflow: auto;
}
.card {
  border-radius: 10px;
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
  /* min-height:300px;
    max-height: 300px; */
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