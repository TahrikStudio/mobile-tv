<template>
  <div>
    <div class="content">
      <h1>Getting Started..</h1>
      <div class="disclaimer">
        <p>Dear User,</p>
        <p>Before we get started, we would like to authenticate you with Google. This is a secure login mechanism implemented by Google, and we won't take any of your details.</p>

        <p>After authentication, the app will get a token from Google which will be used for fetching YouTube content for you. This token will be stored locally in your device and neither we access it ourself, nor share with any one.</p>

        <p>You can read more about OAuth2.0 authentication mechanism <a href="https://developers.google.com/identity/protocols/oauth2">here</a></p>

      </div>
      <div class="google-btn" @click="signin">
        <div class="google-icon-wrapper">
          <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p class="btn-text"><b>Sign in with google</b></p>
      </div>
    </div>
  </div>
</template>

<script>
import CommonUtils from '../common/CommonUtils'

export default {
  name: 'Welcome',
  mounted: function () {
    if (this.getToken()) {
      // Redirect to menu
    }
  },
  methods: {
    signin: async function () {
      const googleUser = await this.$gAuth.signIn()
      console.log(googleUser.getAuthResponse())
    },
    getToken: function () {
      return CommonUtils.getLocalData('token')
    },
    saveToken: function (token) {
      CommonUtils.setLocalData('token', token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  background: var(--primary-color);
  height: 100vh;
  margin-top: -3.2rem;
  padding-top: 4rem;
  color: white;
}
.disclaimer {
  text-align: left;
  background: white;
  color: black;
  margin: 2rem;
  line-height: 1.5rem;
  height: 20em;
  overflow-y: scroll;
  padding: 1rem
}
.disclaimer a {
  color: var(--primary-color)
}
.google-btn {
  width: 184px;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,.25);
  margin: auto;
}
.google-btn:hover {
  box-shadow: 0 0 6px #4285f4;
}
.google-btn:active {
  background: #1669F2;
}
.google-icon-wrapper {
    position: absolute;
    margin-top: 1px;
    margin-left: 1px;
    width: 40px;
    height: 40px;
    border-radius: 2px;
    background-color: #fff;
    text-align: left;
  }
  .google-icon {
    position: absolute;
    margin-top: 11px;
    margin-left: 11px;
    width: 18px;
    height: 18px;
  }
  .btn-text {
    float: right;
    margin: 12px 11px 0 0;
    color: #fff;
    font-size: 14px;
  }
@import url(https://fonts.googleapis.com/css?family=Roboto:500);
</style>
