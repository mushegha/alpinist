<template lang="pug">
div
  aside.level
    .level-item
      .field
        b-switch(v-model="hideHistory") Open positions only

  b-table(
    :data="data"
    :columns="columns"
  )
    template(slot-scope="props")
      b-table-column(
        field="amount"
        numeric
      )
        | {{ props.row.amount }}

      b-table-column(
        field="investment"
        numeric
      )
        | {{ props.row.investment }}

      b-table-column(
        field="priceOpen"
        numeric
      )
        | {{ props.row.priceOpen }}

      b-table-column(
        field="timeOpen"
      )
        | {{ props.row.timeOpen }}

      b-table-column(
        field="priceClose"
        numeric
      )
        | {{ props.row.priceClose }}

      b-table-column(
        field="timeClose"
      )
        | {{ props.row.timeClose }}

      b-table-column(
        field="profit"
        numeric
      )
        .tag(:class="classOf(props.row)")
          | {{ props.row.profit }}

</template>

<xxtemplate slot-scope="props">
    <b-table-column field="original_title" label="Title" sortable>
        {{ props.row.original_title }}
    </b-table-column>

    <b-table-column field="vote_average" label="Vote Average" numeric sortable>
        <span class="tag" :class="type(props.row.vote_average)">
            {{ props.row.vote_average }}
        </span>
    </b-table-column>

    <b-table-column field="vote_count" label="Vote Count" numeric sortable>
         {{ props.row.vote_count }}
    </b-table-column>

    <b-table-column field="release_date" label="Release Date" sortable centered>
        {{ props.row.release_date ? new Date(props.row.release_date).toLocaleDateString() : '' }}
    </b-table-column>

    <b-table-column label="Overview" width="500">
        {{ props.row.overview | truncate(80) }}
    </b-table-column>
</xxtemplate>

<script src="./script.js"></script>
