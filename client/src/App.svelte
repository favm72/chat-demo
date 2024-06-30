<script>
  import SocketChat from "./lib/SocketChat.svelte"
  import SseChat from "./lib/SSEChat.svelte"
  let username = ""
</script>

<main class="main">
  <section>
    <h2>Username</h2>
    <input type="text" bind:value={username} placeholder="Username" />
  </section>
  <div class="chats">
    <SocketChat {username} />
    <SseChat {username} />
  </div>
</main>

<style>
  .chats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
</style>
