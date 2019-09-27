<template>
  <div class="bg-home full-screen text-center home">
    <div class="home-content">
      <div class="logo">
        <img src="../../imgs/york.png">
      </div>
      <div class="title"><a href="page/Introduction.html" target="_blank" title="关于我"><h1>YorK的世界</h1></a></div>
      <hr class="seperator_betweenNavAndLink" color="#eee">
    </div>
    
  </div>
</template>

<script>
  export default {
    mounted() {}
  }

</script>

<style lang="scss" scoped>
.home{
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    min-width: 320px;

  .home-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    .logo {
    overflow: hidden;
    position: relative;
    width: 8em;
    height: 8em;
    border: 1px solid var(--Color_MainBlue);
    border-radius: 50%;
    img {
      position: relative;
      width: 200%;
      height: 100%;
    }
    img:hover {
      position: relative;
      width: 200%;
      right:100%;
      height: 100%;
    }
    }
    .seperator_betweenNavAndLink {
    width:90%;
    }
    .title {
      margin-left: 5em;
      color: #5978f2;
    }
  }
  
  }
</style>
