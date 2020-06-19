const X_CLASS ='x'
const o_CLASS= 'o'
let circleturn
let winningmsgTextElement=document.querySelector('[data-winning-msg]') 
let cellElements= document.querySelectorAll('[data-cell]')
const board= document.getElementById('board')
const winningmsgelement= document.getElementById('winningmsg')
const restartbutt= document.getElementById('restart')
const winning_combination= [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]


]







startgame()



restartbutt.addEventListener('click', startgame)
// for place mark
// if true its circle else its x turn


function startgame()
{

    circleturn=false;
    

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(o_CLASS)
        cell.removeEventListener('click', handleClick)

        cell.addEventListener('click', handleClick, {once: true})
        
        })
        setboardhoverclass()
        winningmsgelement.classList.remove('show')

}

function handleClick(e)
{
    // place mark
    
    const cell= e.target

    const currentclass= circleturn ? o_CLASS : X_CLASS
    placemark(cell, currentclass)
    //check for win
    if (checkwin(currentclass))
    {

        endgame(false)
    }

    else if ( isdraw())
    {

        endgame(true)
    }

    //check for draw
    

    
    //switch turns

    swapturns()
    setboardhoverclass()
    
    
}

function placemark(cell, currentclass)
{
 cell.classList.add(currentclass)

}

function swapturns()
    {
        
    
    circleturn= !circleturn

    }
    function setboardhoverclass()
    {

        board.classList.remove(X_CLASS)
        board.classList.remove(o_CLASS)
        if(circleturn)
        {
            board.classList.add(o_CLASS)
        }
        else{
            board.classList.add(X_CLASS)
        }

    }

    function checkwin(currentclass){

        return winning_combination.some(combination =>{


            return combination.every(index =>{

                return cellElements[index].classList.contains(currentclass)
            })
        })
    }

    function endgame(draw)
    {


        if(draw)
        {
            winningmsgTextElement.innerText= 'Draw!'

        }
        else
{
            winningmsgTextElement.innerText=`${circleturn ? "o's" : "x's"} Wins!`
}
winningmsgelement.classList.add('show')
        
    }

    function isdraw()
    {

        return [...cellElements].every(cell=>{

            return cell.classList.contains(X_CLASS) || cell.classList.contains(o_CLASS)
        })
    }

