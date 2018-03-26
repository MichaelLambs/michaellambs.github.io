var injectorElem = document.getElementById('hob-info')
var template = '';

function showDeets(n) {

    if (n == 1) {
        if (template.length > 0) {
            template = ''
        } else {
            template = `<p>Able to speak, read and write in spanish.</p>`
        }
    } else if (n == 2) {
        if (template.length > 0) {
            template = ''
        } else {
            template = `<p>Played Pac-12 College Football for 5 years.</p>`
        }
    } else if (n == 3) {
        if (template.length > 0) {
            template = ''
        } else {
            template = `<p>I tap dance. Started in middle school and it has stuck with me ever since.</p>`
        }
    } else if (n == 4) {
        if (template.length > 0) {
            template = ''
        } else {
            template = `<p>I love traveling and experiencing new cultures.</p>`
        }
    } else if (n == 5) {
        if (template.length > 0) {
            template = ''
        } else {
            template = `<p>Volunteer at Habitat for Humanity, community centers, and schools.</p>`
        }
    } else {
        if (template.length > 0) {
            template = ''
        } else {
            template = `<p>Currently my favorite song is Rocket Man by Elton John</p>`
        }
    }

    injectorElem.innerHTML = template
}