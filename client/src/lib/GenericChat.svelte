<script>
  import { createEventDispatcher } from "svelte"
  export let formTitle = "New Message"
  export let chatTitle = "Chat"
  export let username = ""
  export let messages = []

  const dispatch = createEventDispatcher()
</script>

<div>
  <section>
    <h2>{formTitle}</h2>
    <form
      on:submit|preventDefault={e => {
        const formData = new FormData(e.currentTarget)
        const content = formData.get("content")
        dispatch("message", {
          username,
          content,
        })
        e.currentTarget.reset()
      }}
    >
      <input type="text" name="content" />
      <button type="submit" disabled={!username.trim()}>Add</button>
    </form>
  </section>
  <section>
    <h2>{chatTitle}</h2>
    <ul>
      {#each messages as message}
        <li>{message.username}: {message.content}</li>
      {/each}
    </ul>
  </section>
</div>

<style>
</style>
