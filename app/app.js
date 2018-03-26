var injectorElem = document.getElementById('hob-info')
var template = '';

function showDeets(n) {

    if (n == 1) {
        template = `<p>Able to speak, read and write in spanish.</p>`
    } else if (n == 2) {
        template = `<p>Played Pac-12 College Football for 5 years.</p>`
    } else if (n == 3) {
        template = `<p>I tap dance. Started in middle school and it has stuck with me ever since.</p>`
    } else if (n == 4) {
        template = `<p>I love traveling and experiencing new cultures.</p>`
    } else if (n == 5) {
        template = `<p>Volunteer at Habitat for Humanity, community centers, and schools.</p>`
    } else {
        template = `<p>Currently my favorite song is Rocket Man by Elton John</p>`
    }

    injectorElem.innerHTML = template
}