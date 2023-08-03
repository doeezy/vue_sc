<template>
  <div>
    <div
        v-for="(b, bI) in buttonList"
        :key="`button_${bI}`"
    >
      <button
          type="button"
          @click="send(b)"
      >{{b.name}}</button>
    </div>
  </div>
</template>

<script>
    import Stomp from 'webstomp-client'
    import SockJS from 'sockjs-client'

    export default {
        name: 'button-menu',
        data() {
            return {
                message: "",
                logs: [],
              buttonList: [
                { key: "M-1", name: "메인으로"},
                { key: "M-2",name: "놀이교실"},
                { key: "M-3",name: "노래교실"},
                { key: "M-4", name: "생방송"},
                { key: "B-1", name: "재생"},
                { key: "B-2", name: "정지"},
                { key: "B-3", name: "뒤로가기"}
              ]
            }
        },
        created() {
            // App.vue가 생성되면 소켓 연결을 시도합니다.
            this.connect()
        },
        methods: {
            send(btn) {
              if (btn === undefined || btn === null) {
                return false
              }
              const buttonName = `button_${btn.key}`

                console.log(`Clicked Button Name => ${buttonName}`);
                if (this.stompClient && this.stompClient.connected) {
                    const msg = {
                      comId: "test",
                      comName: "테스트경로당",
                      btn: btn.key,
                      btnNm: btn.name,
                      conTime: new Date()
                    };
                    this.stompClient.send("/pub/btn", JSON.stringify(msg), {});
                }
            },
            connect() {
                const serverURL = "http://localhost:9999/app/ws"
                let socket = new SockJS(serverURL);
                this.stompClient = Stomp.over(socket);
                console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
                this.stompClient.connect(
                    {},
                    frame => {
                        // 소켓 연결 성공
                        this.connected = true;
                        console.log('소켓 연결 성공', frame);
                        // 서버의 메시지 전송 endpoint를 구독합니다.
                        // 이런형태를 pub sub 구조라고 합니다.
                        this.stompClient.subscribe("/sub", res => {
                            console.log('구독으로 받은 메시지 입니다.', res.body);

                            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
                            this.logs.push(JSON.parse(res.body))
                        });
                    },
                    error => {
                        // 소켓 연결 실패
                        console.log('소켓 연결 실패', error);
                        this.connected = false;
                    }
                );
            }
        }
    }
</script>