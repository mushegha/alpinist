<template lang="pug">
  div.card
    div.card-content
      p.field
        span.tag.is-medium
          | {{ status$.bid }}
      p.field
        span.tag.is-medium
          | {{ status$.ask }}
</template>

<script src="./script.js"></script>
