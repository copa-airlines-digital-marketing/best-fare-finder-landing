let selectOrigin = document.querySelector(".selectOriDest")
let selectDestOnly = document.querySelector(".selectDestOnly")
let initialWidth = selectOrigin.offsetWidth
let initialWidthO = selectDestOnly.offsetWidth
let maxOptValLen = findMaxLengthOpt(selectOrigin)
let maxOptValLenO = findMaxLengthOpt(selectDestOnly)
let letterWidth = initialWidth / maxOptValLen
let letterWidthO = initialWidthO / maxOptValLenO
let corCoef = 2; // Based on visual appearance
let corCoefD = 4; // Based on visual appearance
console.log(initialWidth, maxOptValLen)
console.log(initialWidthO, maxOptValLenO)

selectOrigin.addEventListener("change", e => {
    let newOptValLen = getSelected(e.target).textContent.length
    let correction = (maxOptValLen - newOptValLen) * corCoef
    let newValueWidth = (newOptValLen * letterWidth) + (correction + 24)
    console.log('new width for origin', newValueWidth, 'new option len', newOptValLen)
    e.target.style.width = newValueWidth + "px"
}, false);


selectDestOnly.addEventListener("change", e => {

    let newOptValLen = getSelected(e.target).textContent.length
    let correction = (maxOptValLen - newOptValLen) * corCoefD
    let newValueWidth = (newOptValLen * letterWidth) + (correction + 24)
    console.log('new width for dest', newValueWidth, 'new option len', newOptValLen)
    e.target.style.width = newValueWidth + "px";

}, false);



function getSelected(selectEl) {
    return [...selectEl.options].find(o => o.selected)
}

function findMaxLengthOpt(selectEl) {
    return [...selectEl.options].reduce((result, o) => o.textContent.length > result ? o.textContent
        .length :
        result, 0)
}