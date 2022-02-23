/* 
- Create Array ++
- Change Turn ++
- if Space Occupied Return ++
- Check for 3 values in a row 
- Check for tie
- Create Player Objects
- Keep Score
 */


/* import .contains method from https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript */
if(Array.prototype.contains)
    console.warn("Overriding existing Array.prototype.contains. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .contains method to Array's prototype to call it on any array
Array.prototype.contains = function (thing) {
    // if the other array is a falsy value, return false
    if (!this)
        return false;
    
    //start by assuming the array doesn't contain the thing
    let result = false;
    for (let i = 0, l=this.length; i < l; i++) 
      {
      //if anything in the array is the thing then change our mind from before
      
      if (this[i] instanceof Array)
        {if (this[i].equals(thing))
          result = true;}
        else
          if (this[i]===thing)
            result = true;
      
    
      } 
     //return the decision we left in the variable, result
    return result;     
}


const module1 = (function(){
    const gameBoardArray = []
    let CurrentTurn = 0
    const changeTurn = function (){
        if (CurrentTurn === 0){
            return CurrentTurn = 1
        } CurrentTurn = 0
    }
    let writeIntoArray = function(x,y,e){
        let posibleInput1 = [x,y,0].join()
        let posibleInput2 = [x,y,1].join()
        if (gameBoardArray.includes(posibleInput1)||gameBoardArray.includes(posibleInput2)){
            return
        }
        buttonChange(e)
        let currentInput = [x,y,CurrentTurn].join()
        gameBoardArray.push(currentInput)
         let winner = checkForMatch()
        if (winner){
            console.log(winner)
        }
        changeTurn()
        }
    let getResultValue = function(array1,array2){
        let result = 0
        for (let i = 0 ; i < array1.length; i++){
            if (array1.contains(array2[i])){
                result++
            }
        }
        return result
    };
    let measureAllResults = function(array1,array2){
        let maxValue = 3
        for (let i = 0; i < array2.length ; i++){
            if(getResultValue(array1,array2[i])=== maxValue){
                return true
            } 
        } return false
    }
    let checkForMatch = function(){
        let win1x = ['1,1,0','2,1,0','3,1,0']
        let win2x = ['1,2,0','2,2,0','3,2,0']
        let win3x = ['1,3,0','2,3,0','3,3,0']
        let win4x = ['1,1,0','1,2,0','1,3,0']
        let win5x = ['2,1,0','2,2,0','2,3,0']
        let win6x = ['3,1,0','3,2,0','3,3,0']
        let win7x = ['1,3,0','2,2,0','3,1,0']
        let win8x = ['3,1,0','2,2,0','1,3,0']
        let win9x = ['1,2,0','2,2,0','3,2,0']
        let win10x = ['2,1,0','2,2,0','2,3,0']
        let win1o = ['1,1,1','2,1,1','3,1,1']
        let win2o = ['1,2,1','2,2,1','3,2,1']
        let win3o = ['1,3,1','2,3,1','3,3,1']
        let win4o = ['1,1,1','1,2,1','1,3,1']
        let win5o = ['2,1,1','2,2,1','2,3,1']
        let win6o = ['3,1,1','3,2,1','3,3,1']
        let win7o = ['1,3,1','2,2,1','3,1,1']
        let win8o = ['3,1,1','2,2,1','1,3,1']
        let win9o = ['1,2,1','2,2,1','3,2,1']
        let win10o = ['2,1,1','2,2,1','2,3,1']

        let winX = [win1x,win2x,win3x,win4x,win5x,win6x,win7x,win8x,win9x,win10x]
        let winO = [win1o,win2o,win3o,win4o,win5o,win6o,win7o,win8o,win9o,win10o]

        let winner = null
        let resultO = measureAllResults(gameBoardArray,winO)
        console.log(resultO)
        let resultX = measureAllResults(gameBoardArray,winX)
        console.log(resultX)
        if (resultO){
            winner = "O"
        }
        if (resultX){
            winner = "X"
        }
        return winner
        }
    let gridListen = function (){
        let allButtons = document.querySelectorAll('.grid-item')
        allButtons.forEach(Element =>{
            Element.addEventListener('click', e =>{
                let preamble = e.target.value
                let inputArray = preamble.split(',')
                let x = inputArray[0]
                let y = inputArray[1]
                writeIntoArray(x,y,e)
            })
        })
        }
        gridListen()
    let buttonChange = function(e){
        let currentSimbol = function(CurrentTurn){
            if (CurrentTurn === 0){
                return "X"
            } return "O"
        }(CurrentTurn)
        let pressedBttn = e.target
        pressedBttn.textContent = `${currentSimbol}`
    }
    return{
        checkForMatch,
        gameBoardArray,
        writeIntoArray,
        gridListen
    }
})(document);