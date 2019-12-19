<template>
  <div class="bg-home full-screen text-center home">
    <div id="chatbox" class=" receive" style="overflow:auto; height: 400px; width:700px; border: 1px solid #0099FF">

    </div>

    <input type="text" id="send-message" style="width: 650px">
    <button @click="sender()">发送</button>
    <p></p>
    <form action="\logout" method="POST">
      <button type="submit">退出聊天室</button>
    </form>
  </div>
</template>

<script src="./component.js">

</script>
