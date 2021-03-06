const form = document.querySelector('.form') 
const color = document.querySelector('.color')
const result = document.querySelector('.output')

const printResult = resultColor => {
    result.innerHTML = `<p>Converted ${color.value} to ${color.value.includes('#') ? 'RGB' : 'HEX'} is:</p>
                        <h3>${resultColor}</h3>
                        <div class="color-square" style="background-color: ${resultColor}"></div>`
}

const rgbToHex = (colorArr) => {
    let newArr = colorArr.map(num => {
        return num = Number(num).toString(16)
    })
    let final = []
    newArr.forEach(num => {
        if (num.length === 1) {
            final.push('0' + num)
        } else {
            final.push(num)
        }
    }) 
    return printResult(`#${final.join('')}`)
}

const hexToRgb = (colorArr) => {
    colorArr = colorArr.join('')
    let r,g,b = 0
    if (colorArr.length === 6) {
      r = '0x' + colorArr[0] + colorArr[1] 
      g = '0x' + colorArr[2] + colorArr[3]
      b = '0x' + colorArr[4] + colorArr[5]     
    }
    return printResult('rgb('+ Number(r) + ',' + Number(g) + ',' + Number(b) + ')') 
}

const errorLog = () => {
    result.innerHTML = `<h2>Please enter color in proper format!</h2>`
}

const changeColorType = e => {
    e.preventDefault()
    let hex = /^\#[0-9a-z]{6}$/
    let rgb = /^\(?[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)?$/
    

    if (hex.test(color.value)) {
        let hexChars = color.value.match(/[0-9a-z]{6}/g)
        hexToRgb(hexChars)
    }
    else if (rgb.test(color.value)) {
        let rgbChars = color.value.match(/[0-9]{1,3}/g)
        let isProperLength = true

        rgbChars.forEach(num => {
        if (num >= 256) {
            isProperLength = false
            }            
        })

        if (isProperLength) {
            rgbToHex(rgbChars)
        } else {
            errorLog()
        } 

    }
    else {
        errorLog()
    }
    
    color.value = ''
}

form.addEventListener('submit', changeColorType)

