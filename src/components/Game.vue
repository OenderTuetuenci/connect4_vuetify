<template>
  <v-container>
    <v-row class="py-6">
      <v-col v-for="i in buttons"
             :key="i">
        <v-btn
            color="primary"
            fab
            elevation="2"
            v-on:click.native="draw(i)">
          {{i}}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <canvas class="grid" id="mycanvas"></canvas>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: "Game",
  data: () => ({
    buttons: [0,1,2,3,4,5,6],
    canvas: {ctx:null,width:0,height:0},
    cell: {width: 0,height: 0,stone:0},
    widthlines: [],
    heightlines:[],
    centerx:[],
    centery:[],
    websocket:null
  }),
  mounted() {
    let c = document.getElementById("mycanvas");
    this.canvas.ctx = c.getContext("2d");
    this.canvas.ctx.lineWidth = 2;
    this.canvas.width = c.width;
    this.canvas.height = c.height;

    this.cell.width = Math.floor(this.canvas.width/7);
    this.cell.height = Math.floor(this.canvas.height/6);
    this.cell.stone = Math.floor(this.cell.height/2.5);

    let x = Math.floor(this.cell.width/2);
    let y = Math.floor(this.cell.height/2);
    for(let i = 0; i < 7; i++){
      this.centerx.push(x);
      x+=this.cell.width;
    }
    for(let i = 0; i < 6; i++){
      this.centery.push(y);
      y+=this.cell.height;
    }

    let start = 0;
    for(let i = 0; i<6;i++){
      this.widthlines.push(start+this.cell.width)
      start+=this.cell.width;
    }
    start = 0;
    for(let i = 0;i<5;i++){
      this.heightlines.push(start+this.cell.height);
      start+=this.cell.height;
    }


    for(let i = 0; i<this.widthlines.length;i++){
      this.canvas.ctx.beginPath();
      this.canvas.ctx.moveTo(this.widthlines[i],0);
      this.canvas.ctx.lineTo(this.widthlines[i],this.canvas.height);
      this.canvas.ctx.stroke();
    }
    for(let i = 0;i<this.heightlines.length;i++){
      this.canvas.ctx.beginPath();
      this.canvas.ctx.moveTo(0,this.heightlines[i]);
      this.canvas.ctx.lineTo(this.canvas.width,this.heightlines[i]);
      this.canvas.ctx.stroke();
    }
    axios.get("http://localhost:9000/json").then(response=> {
      let cells = response.data.grid.cells
      for(let i = 0;i<cells.length;i++) {
        let val = cells[i].val;
        let row = cells[i].row;
        let col = cells[i].col;
        if (val === 1) {
          this.canvas.ctx.fillStyle = "#c82124";
        } else {
          this.canvas.ctx.fillStyle = "#3370d4";
        }
        if (val !== 0) {
          this.canvas.ctx.beginPath();
          this.canvas.ctx.arc(this.centerx[col], this.centery[row], this.cell.stone, 0, 2 * Math.PI);
          this.canvas.ctx.fill();
        }
      }
    });
    this.connect();
  },
  methods: {
    draw: function (column){
      axios.get("http://localhost:9000/json/"+column).then(response => {
        let cells = response.data.grid.cells;
        this.drawCircles(cells);
      })
    },
    drawCircles:function (cells){
      for(let i = 0;i<cells.length;i++){
        let val = cells[i].val;
        let row = cells[i].row;
        let col = cells[i].col;
        if(val === 1){
          this.canvas.ctx.fillStyle = "#c82124";
        }else{
          this.canvas.ctx.fillStyle = "#3370d4";
        }
        if(val !== 0){
          this.canvas.ctx.beginPath();
          this.canvas.ctx.arc(this.centerx[col],this.centery[row],this.cell.stone,0,2*Math.PI);
          this.canvas.ctx.fill();
        }
      }
    },
    connect:function (){
      this.websocket = new WebSocket("ws://localhost:9000/ws");
      this.websocket.setTimeout;
      let vm = this;

      this.websocket.onopen = function (){
        console.log("Connected to Websocket");
      };
      this.websocket.onclose = function(){
        console.log("Connection with Websocket Closed");
      };
      this.websocket.onmessage = function (e){
        if(typeof e.data === "string"){
          let json = JSON.parse(e.data);
          let cells = json.grid.cells;
          vm.drawCircles(cells);
        }
      };
      this.websocket.onerror = function (error){
        console.log("Error in Websocket Occured: " +error);
      };
    }
  }
}
</script>

<style scoped>
.grid{
  background-color: white;
  width: 100%;
  height: 100%;
}
</style>