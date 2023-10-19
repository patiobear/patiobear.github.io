document.onreadystatechange = function () {
    console.log('loading')
    const state = document.readyState
    if (state === 'complete') {
        // $('#loading').fadeOut();
        console.log('loaded')
        document.getElementsByClassName('loadingBear')[0].style.opacity = 0;
        document.getElementsByClassName('loadingBearText')[0].style.opacity = 0;
        setTimeout(() => {
            document.getElementsByClassName('loading')[0].style.display = 'none';
        }, 1000)
    }
}

document.getElementById('plus6').onclick = () => {
    show(6);
}
document.getElementById('plus5').onclick = () => {
    show(5);
}
document.getElementById('plus4').onclick = () => {
    show(4);
}
document.getElementById('plus3').onclick = () => {
    show(3);
}
document.getElementById('plus2').onclick = () => {
    show(2);
}
const show = (releaseNumber) => {
    const releaseContent = document.getElementById(`release-content${releaseNumber}`);
    const plus = document.getElementById(`plus${releaseNumber}`);
    if (releaseContent.style.display == 'none') {
        releaseContent.style.display = 'block';
        plus.innerHTML = 'Lyrics   <span class="fa fa-angle-right"></span>'
    }
    else {
        releaseContent.style.display = 'none';
        plus.innerHTML = 'Lyrics   <span class="fa fa-angle-down"></span>'
    }
}
