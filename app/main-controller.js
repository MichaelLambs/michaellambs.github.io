function MainController(){

    var mainService = new MainService();
    
    var injectorElem = document.getElementById('hob-info')
    var template = '';
    
    this.showDeets = function showDeets(n) {
        
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


    this.sendEmail = function sendEmail(event){
        event.preventDefault();
        var emailBody = {
            name: event.target.name.value,
            email: event.target.email.value,
            body: event.target.body.value,
            msgType: event.target.msgType.value
        }
        mainService.sendEmail(emailBody);

        event.target.name.value = ""
        event.target.email.value = ""
        event.target.body.value = ""

    }
}