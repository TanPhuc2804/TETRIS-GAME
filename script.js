//CONST
const COLS=10
const ROWS=20
const BLOCK_SIZE=30

const COLOR_MAPPING=[
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
]

const COLOR_WHITE_ID=7

const BRICK_LAYOUT = [
    [
      [
        [1, 7, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 1],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 1, 7],
        [7, 1, 7],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [7, 1, 7],
        [7, 1, 1],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 7, 1],
        [1, 1, 1],
        [7, 7, 7],
      ],
    ],
    [
      [
        [1, 7, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
      [
        [7, 1, 1],
        [1, 1, 7],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 7, 1],
      ],
      [
        [7, 7, 7],
        [7, 1, 1],
        [1, 1, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 7],
        [1, 7, 7],
      ],
      [
        [1, 1, 7],
        [7, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 7, 1],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 7],
        [7, 1, 1],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
        [7, 7, 1, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 7, 7, 7],
        [1, 1, 1, 1],
        [7, 7, 7, 7],
      ],
      [
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
        [7, 1, 7, 7],
      ],
    ],
    [
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
      [
        [7, 7, 7, 7],
        [7, 1, 1, 7],
        [7, 1, 1, 7],
        [7, 7, 7, 7],
      ],
    ],
    [
      [
        [7, 1, 7],
        [1, 1, 1],
        [7, 7, 7],
      ],
      [
        [7, 1, 7],
        [7, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 7, 7],
        [1, 1, 1],
        [7, 1, 7],
      ],
      [
        [7, 1, 7],
        [1, 1, 7],
        [7, 1, 7],
      ],
    ],
  ];
  

const KEY_DOWN={
    'RIGHT':'ArrowRight',
    'LEFT':'ArrowLeft',
    'UP':'ArrowUp',
    'DOWN':'ArrowDown'
}

const canvas=document.getElementById('board')
const ctx=canvas.getContext('2d')

ctx.canvas.height=ROWS*BLOCK_SIZE
ctx.canvas.width=COLS*BLOCK_SIZE

class Board{
    constructor(ctx){
        this.ctx=ctx
        this.grid=this.generateWhileBroad()
        this.score=0
        this.gameOver = false;
        this.isPlaying = false;
    }

    generateWhileBroad(){
        return Array.from({length: ROWS},()=>Array(COLS).fill(COLOR_WHITE_ID))
    }

    reset() {
        this.score = 0;
        this.gameOver = false;
        this.drawBoard();
    }

    drawCell(x,y,colorId){
        this.ctx.fillStyle=COLOR_MAPPING[colorId]||COLOR_MAPPING[COLOR_WHITE_ID]
        this.ctx.fillRect(
            x*BLOCK_SIZE,
            y*BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
        )

        this.ctx.fillStyle='black'
        this.ctx.strokeRect(
            x*BLOCK_SIZE,
            y*BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
        )
    }

    drawBoard(){
        for(let row=0;row<this.grid.length;row++){
            for(let col=0;col<this.grid[0].length;col++){
                this.drawCell(col,row,this.grid[row][col])
            }
        }

    

    }

    handleCompleteRow(){
        const lasterRow=board.grid.filter((row)=>{
            return row.some(col=>col===COLOR_WHITE_ID)
        })
        const newScore=ROWS-lasterRow.length
        const newRow=Array.from({length: newScore},()=>Array(COLS).fill(COLOR_WHITE_ID))
        if(newScore){
            board.grid=[...newRow,...lasterRow]
            this.handleScore(newScore*10)
        }
    }

    handleScore(newScore){
        this.score+=newScore
        document.getElementById('score').innerHTML=this.score
    }

    handleGameOver() {
        this.gameOver = true;
        this.isPlaying = false;
        alert('GAME OVER!!!');
      }
}

class Brick{
    constructor(id){
        this.id=id
        this.Layout=BRICK_LAYOUT[id]
        this.activeIndex=0
        this.colPos=3
        this.rowPos=-2
    }

    draw(){
        for(let row=0;row<this.Layout[this.activeIndex].length;row++){
            for(let col=0;col<this.Layout[this.activeIndex][0].length;col++){
                if(this.Layout[this.activeIndex][row][col]!==COLOR_WHITE_ID){
                    board.drawCell(col+this.colPos,row+this.rowPos,this.id)
                }
            }
        }
    }

    moveLeft(){

        if(!this.checkPosition(
            this.colPos-1,
            this.rowPos,
            this.Layout[this.activeIndex]
            )){
            this.Clear()
            this.colPos--
            this.draw()
        }
    }

    moveRight(){
        if(!this.checkPosition(
            this.colPos+1,
            this.rowPos,
            this.Layout[this.activeIndex]
            )){
            this.Clear()
            this.colPos++
            this.draw()
        }
    }

    moveDown(){
        if(!this.checkPosition(
            this.colPos,
            this.rowPos+1,
            this.Layout[this.activeIndex]
            )){
            this.Clear()
            this.rowPos++
            this.draw()

            return
        }

        this.handleLanded()
        generateBrick()
    }

    Rotate(){
        if(!this.checkPosition(
            this.colPos,
            this.rowPos,
            this.Layout[(this.activeIndex+1)%4]
            )){
            this.Clear()
            this.activeIndex = (this.activeIndex+1)%4
            this.draw()
        }
    }
    
    Clear(){
        for(let row=0;row<this.Layout[this.activeIndex].length;row++){
            for(let col=0;col<this.Layout[this.activeIndex][0].length;col++){
                if(this.Layout[this.activeIndex][row][col]!==COLOR_WHITE_ID){
                    board.drawCell(col+this.colPos,row+this.rowPos,COLOR_WHITE_ID)
                }
            }
        }
    }

    checkPosition(nextCol,nextRow,nextLayout){
        

        for(let row=0;row<nextLayout.length;row++){
            for(let col=0;col<nextLayout[0].length;col++){
                if(nextLayout[row][col]!==COLOR_WHITE_ID&&nextRow>=0){
                    if(
                        col+nextCol<0||
                        col+nextCol >= COLS||
                        row+nextRow >=ROWS||
                        board.grid[row+nextRow][col+nextCol]!==COLOR_WHITE_ID

                    ){
                        return true
                    }
                }
            }
        }


        return false
    }

    handleLanded(){
        if(this.rowPos<=0){
            board.handleGameOver()
            return
        }

        for(let row=0;row<this.Layout[this.activeIndex].length;row++){
            for(let col=0;col<this.Layout[this.activeIndex][0].length;col++){
                if(this.Layout[this.activeIndex][row][col]!==COLOR_WHITE_ID){
                   board.grid[row+this.rowPos][col+this.colPos]=this.id
                }
            }
        }

        board.handleCompleteRow()
        board.drawBoard()


    }
}

function generateBrick(){
    brick=new Brick(Math.floor(Math.random()*10)%BRICK_LAYOUT.length)

}

var board = new Board(ctx)
board.drawBoard()

document.getElementById('btn-play').addEventListener('click',()=>{
    board.reset()

    board.isPlaying=true

    generateBrick()

    const refresh = setInterval(() => {
        if (!board.gameOver) {
          brick.moveDown();
        } else {
          clearInterval(refresh);
        }
      }, 1000);
})





document.addEventListener('keydown',(e)=>{
        switch(e.code){
            case KEY_DOWN.LEFT: brick.moveLeft(); break ;
            case KEY_DOWN.RIGHT: brick.moveRight(); break ;
            case KEY_DOWN.DOWN: brick.moveDown(); break ;
            case KEY_DOWN.UP: brick.Rotate(); break ;
            default: break;
        }
    }

)



