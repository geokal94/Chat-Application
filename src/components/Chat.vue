<template>
    <div class="chat container">
        <h2 class="center teal-text">Online Chat Room</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <!--add to li: v-for="message in messages" :key="message.id" -->
                    <li>
                        <span class="teal-text">Name: <!--{{message.name}}--></span>
                        <span class="grey-text text-darken-3">message <!--{{message.content}}--></span>
                        <span class="grey-text time">time <!--{{message.timestamp}}--></span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="name"/>
            </div>
        </div>
    </div>
</template>

<script>
import NewMessage from './NewMessage.vue';
import moment from 'moment'; //moment(time).format('lll');
//import db from '';

export default {
    name: 'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data() {
        return {
            messages: []
        }
    },
    //set listener when component is created , order by timestamp
    created() {
        
    }
}
</script>

<style>

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
    max-height: 300px;
    overflow: auto; /* scroll bar after 300px */
}

.messages::-webkit-scrollbar {
    width:3px;
}

.messages::-webkit-scrollbar-track {
    background:#ddd;
}

.messages::-webkit-scrollbar-thumb {
    background: #aaa;
}

</style>