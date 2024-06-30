<script>
  import GenericChat from "./GenericChat.svelte"
  import { createSSEChat } from "./sseChat"
  export let username = ""
  const { messages, sendMessage } = createSSEChat()
</script>

<GenericChat
  formTitle="New SSE Message"
  chatTitle="SSE Chat"
  {username}
  messages={$messages}
  on:message={e => sendMessage(e.detail)}
/>

<style>
</style>
