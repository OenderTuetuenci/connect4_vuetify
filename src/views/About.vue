<template>
  <v-container class="grey pa-6" fill-height fluid>
    <v-row align="center" justify="center">
      <h1 class="text-h2 font-weight-black">Welcome to Connect4!</h1>
    </v-row>
    <v-row class="pa-6" align="center" justify="center">
      <v-img class="ma-2" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Connect4_Wins.PNG" contain max-height="400"></v-img>
    </v-row>
    <v-row>
      <dl class="text-center">
        <dt class="text-h4">About Connect4</dt>
        <dd class="mx-10 pa-2">Connect Four (also known as Four Up, Plot Four, Find Four, Four in a Row, Four in a Line, Drop Four,
          and Gravitrips in the Soviet Union) is a two-player connection board game, in which the players choose
          a color and then take turns dropping colored discs into a seven-column, six-row vertically suspended grid.
        </dd>
        <dt class="text-h4">Rules</dt>
        <dd class="mx-10 pa-2">The Connect 4 Board Game Rules are easy to understand. In fact, it is in the name. To win Connect Four,
          all you have to do is connect four of your colored checker pieces in a row, much the same as tic tac toe.
          This can be done horizontally, vertically or diagonally. Each player will drop in one checker piece
          at a time. This will give you a chance to either build your row, or stop your opponent from getting
          four in a row.The game is over either when you or your friend reaches four in a row, or when all forty
          two slots are filled, ending in a stalemate. If you and your friend decide to play again,
          the loser typically goes first.
        </dd>
      </dl>
      <v-row align="center" justify="center" class="text-center pa-6">
        <p class="text-center mx-6">
          The game was first sold under the Connect Four trademark[3] by Milton Bradley in February 1974.<br>source:
          <a href="https://en.wikipedia.org/wiki/Connect_Four"> wikipedia </a>
        </p>
      </v-row>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn color="primary" to="/">Start Game!</v-btn>
    </v-row>
  </v-container>
</template>
