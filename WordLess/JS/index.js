const blocks_container = document.querySelector(".blocks-container")
const buttons = document.querySelectorAll("#button")
const start = document.querySelector("#start")
let blockArr = []
let count = 5
let line = count;
let lineNum = 0
let word;
let lineCount = 0
let pressedChars = [
    [],
    [],
    [],
    [],
    [],
]

blockArr.forEach(elem => {
    blocks_container.removeChild(elem)
})
let win = false

start.onclick = () => {
    gameStart()
    buttons.forEach(item => {
        item.disabled = true
        item.style.opacity = .7
    })

    start.disabled = true
    start.style.opacity = .7

    let words = AllWords[line]
    word = words[Math.floor(Math.random() * words.length)]
    console.log(word)
}

buttons.forEach((item) => {
    item.onclick = () => {
        blockArr.forEach(elem => {
            blocks_container.removeChild(elem)
        })

        blockArr = []
        item.classList.contains("minus") ? count -= 1 : count += 1

        if (count > 3 && count < 8) {
            buttons.forEach(button => {
                button.style.opacity = 1;
                button.disabled = false;
            })
        }

        if (item.classList.contains("minus") && count === 3) {
            item.disabled = true
            item.style.opacity = .7
        }

        if (item.classList.contains("plus") && count === 8) {
            item.disabled = true
            item.style.opacity = .7
        }

        blocks_container.style.width = count * 80 + 'px'
        CreateBlocks()
        line = count
        return line
    }
})

function CreateBlocks() {
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < 5; j++) {
            let block = document.createElement("div")
            block.classList.add("block")
            blocks_container.appendChild(block)
            blockArr.push(block)
        }
    }
}

function addChars() {
    let charCount = 0
    window.addEventListener("keydown", (e) => {
        chars.forEach((item) => {
            if (e.key === item && charCount < line && charCount != blockArr.length && win != true) {
                blockArr[charCount].textContent = e.key
                if (e.key === 'ւ') {
                    blockArr[charCount].textContent = 'ու'
                }
                blockArr[charCount].classList.add("animate")
                charCount += 1
                pressedChars[lineCount].push(e.key)
            }
        })

        if (e.key === 'Enter' && charCount % line === 0 && charCount <= blockArr.length && charCount > 1) {
            line += count

            // Bloks for rotation and color
            let animArray = [];

            function addColor(elem, color) {
                setTimeout(() => {
                    elem.style.background = color;
                }, 1000);
            }

            blockArr.forEach(elem => {
                let charArr = elem.textContent.split('')
                for (let i = 0; i < word.length; i++) {
                    if (elem.style.background != 'green') {
                        elem.textContent === word[i] || charArr[1] === word[i] ? addColor(elem, 'orange') : null;
                    }
                    animArray.push(blockArr[i + lineNum]);
                }
            })

            for (let i = 0; i < count; i++) {
                let everyElems = pressedChars[lineCount]
                let charArr = blockArr[i + lineNum].textContent.split('')

                if (everyElems.join('').includes(word)) {
                    addColor(blockArr[i + lineNum], 'green')
                    win = true
                } else if (word[i] === blockArr[i + lineNum].textContent || word[i] === charArr[1]) {
                    addColor(blockArr[i + lineNum], 'green')
                }
            }

            gsap.to(animArray, {
                rotateY: 360,
                stagger: 0.25,
                duration: 0.5,
            })


            lineNum += count
            lineCount += 1
            animArray = [];
        }


        if (e.key === 'Backspace' && charCount >= 1 && charCount > line - count) {
            charCount -= 1
            blockArr[charCount].classList.remove("animate")
            blockArr[charCount].textContent = ''
            pressedChars[lineCount].pop(e.key)
        }
    })
}

CreateBlocks()

function gameStart() {
    addChars()
}
