<script>
  import GenericChat from "./GenericChat.svelte"
  import { createSocketChat } from "./socketChat"
  export let username = ""
  const { messages, sendMessage } = createSocketChat()
</script>

<GenericChat
  formTitle="New Socket Message"
  chatTitle="Socket Chat"
  {username}
  messages={$messages}
  on:message={e => sendMessage(e.detail)}
/>

<style>
</style>
