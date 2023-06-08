<template>
  <div>
    <div>현재 시설번호 : {{ roomId }}</div>

    <div v-if="!roomId">
      시설번호 :
      <input v-model="tempRoomId" type="text" />
      <button @click="setRoomId">적용</button>
    </div>

    <div v-if="roomId">
      <button @click="disconnect">접속종료</button>
      <div>
        <button @click="btnClick('music')">음악</button>
      </div>
      <div>
        <button @click="btnClick('video')">영상</button>
      </div>
    </div>
    <div v-if="type === 'music'">
      <ul v-for="(item, mK) in musicList" :key="`mk_${mK}`">
        <li>{{ item.name }}</li>
        <button @click="musicClick(item.id)">재생</button>
      </ul>
    </div>
    <div v-else-if="type === 'video'">영상목록</div>
  </div>
  <div v-for="(item, idx) in recvList" :key="idx">
    <h3>{{ item }}</h3>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "MenuComp",
  data() {
    return {
      roomId: 200,
      userName: "home1",
      message: "",
      recvList: [],
      tempRoomId: 0,
      type: "HELLO",
      musicList: [],
    };
  },
  created() {
    // App.vue가 생성되면 소켓 연결을 시도합니다.
    // if (this.roomId !== null) {
    // }
      this.connect();
  },
  methods: {
    setRoomId() {
      this.roomId = this.tempRoomId;
      this.connect();
    },
    btnClick(type) {
      this.type = type;
      this.message = type;

      this.sendMessage();
      if (type === "music") {
        // get music list
        this.getMusicList();
      } else if (type === "video") {
        // get video list
      }
    },
    getMusicList() {
      this.axios.get("/api/menu").then((response) => {
        console.log(response.data);
        this.musicList = response.data;
      });
    },
    musicClick(musicId) {
      this.send({
        roomId: this.roomId,
        content: `음악재생 + musicId : ${musicId}`,
      });
    },
    sendMessage() {
      if (this.userName !== "" && this.message !== "") {
        this.send({
          content: this.message,
        });
        this.message = "";
      }
    },
    send(msg) {
      if (this.stompClient && this.stompClient.connected) {
        Object.assign(msg, {
          roomId: this.roomId,
          userName: this.userName,
          from: "MENU",
        });
        this.stompClient.send(
          `/app/hello`,
          JSON.stringify(msg),
          {}
        );
      }
    },
    connect() {
      const serverURL = `http://localhost:9090/chating`;
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.debug = () => {};

      this.stompClient.connect(
        {},
        () => {
          // 소켓 연결 성공
          this.connected = true;
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          this.stompClient.subscribe(`/topic`, (res) => {
            const messageBody = JSON.parse(res.body);
            if (messageBody.from !== "MENU") {
              this.recvList.push(messageBody);
            }
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },
    disconnect() {
      this.stompClient.disconnect(function () {
        alert("See you next time!");
      });
    },
  },
};
</script>
