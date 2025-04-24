// -------------------- VARIABLES -------------------------------------------------

const val_sat = 94; 
const val_fr = 14;
const val_fc = 40;

// PRESSION ARTERIELLE
const val_ta_ref_sys = 120;
const val_ta_ref_dia = 70;

const val_pa_sys = [0, 50, 90 ,115, 120, 129, 139, 159, 179, 180, 160];
const val_pa_dia = [0, 50, 60 ,75, 80, 84, 89, 99, 109, 110, 90];
const val_pa_text = ["Hypotension sévère", "Hypotension", "Optimal", "Normal", "Normal élevée", "Pré-hypertension", "Hypertension légère", "Hypertension modérée", "Hypertension avancée", "Hypertension systoloque"];

const val_fc_min = 40;
const val_fc_max = 120;

const val_pa_sys_max = 180;
const val_pa_sys_min = 50;
const val_pa_dia_max = 110;
const val_pa_dia_min = 50;

// ---------------------------------------------------------------------------------

// TIMEOUT & CLEAR
const timeoutID = [];

function searchID(element){ // search for first param of element in timeoutID and return second when found
    for (var i = 0; i < timeoutID.length; i++) {
        if (timeoutID[i][0] == element){
            return timeoutID[i][1];
        }
    }
}

function is_blinking(element){ // return true if element is blinking
    for (var i = 0; i < timeoutID.length; i++) {
        if (timeoutID[i][0] == element){
            return true;
        }
    }
    return false;
}

function delete_id(element){ // delete element in timeoutID
    for (var i = 0; i < timeoutID.length; i++) {
        if (timeoutID[i][0] == element){
            timeoutID.splice(i, 1);
        }
    }
}

function clear(element){ // clear timeout of element
    var id = searchID(element);
    clearTimeout(id);
    delete_id(element);
}

function update_to_id(element, id){ // update timeoutID with new id*
    if (!is_blinking(element)){ // if element is not blinking
        timeoutID.push([element, id]);
    } else {
        for (var i = 0; i < timeoutID.length; i++) {
            if (timeoutID[i][0] == element){
                timeoutID[i][1] = id;
            }
        }
    }
}

// ---------------------------------------------------------------------------------

// Bloc horaire
function horaire(element, button){ // remplace text in element with current hour
    var input = document.getElementsByName(element)[0];
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    input.value = h + "h" + m;
    var btn = document.getElementsByName(button)[0];
    btn.className = "btn btn-success";
    verify_horaire();
}

function verify_horaire(){ // if all class element are the same, change card border color
    var depart = document.getElementsByName("button-horaire1")[0].className;
    var arrivee = document.getElementsByName("button-horaire2")[0].className;
    var hopital = document.getElementsByName("button-horaire3")[0].className;
    var depart2 = document.getElementsByName("button-horaire4")[0].className;
    var fin = document.getElementsByName("button-horaire5")[0].className;
    if (depart == arrivee && arrivee == hopital && hopital == depart2 && depart2 == fin){
        var card = document.getElementsByName("horaire-card")[0];
        card.className = "card border-success mb-3";
    }
}

// Bloc détresse
function blink_detresse(element){ // loop between red and white on element button
    var btn = document.getElementsByName(element)[0];
    switch (element) {
        case "detresse_respi":
            var card = document.getElementById("card-respi");
            break;
        case "detresse_circu":
            var card = document.getElementById("card-circu");
            break;
        case "detresse_neuro":
            var card = document.getElementById("card-neuro");
            break;
    }
    btn.style.fontWeight = "bold";
    if (btn.className == "btn btn-danger"){
        btn.className = "btn btn-warning";
        btn.style.color = "red";
        card.className = "card border-warning";
    } else {
        btn.className = "btn btn-danger";
        btn.style.color = "white";
        card.className = "card border-danger";
    }
    var card = document.getElementsByName("detresse-card")[0];
    card.className = "card border-danger mb-3";
    id = setTimeout(function(){blink_detresse(element);}, 400);
    update_to_id(element, id);
}

function reset_blink(element){ // reset blink on element button detresse
    switch (element) {
        case "detresse_respi":
            var card2 = document.getElementById("card-respi");
            break;
        case "detresse_circu":
            var card2 = document.getElementById("card-circu");
            break;
        case "detresse_neuro":
            var card2 = document.getElementById("card-neuro");
            break;
    }
    var btn = document.getElementsByName(element)[0];
    btn.className = "btn btn-secondary";
    btn.style.color = "white";
    btn.style.fontWeight = "normal";
    var card = document.getElementsByName("detresse-card")[0];
    card.className = "card border-secondary mb-3";
    card2.className = "card border-secondary";
    clear(element);
}

// Blocs individuels
function blink_button(element, state){ // loop between red and white on element button
    var btn = document.getElementsByName(element)[0];
    btn.style.fontWeight = "bold";
    if (btn.className == "btn btn-danger"){
        btn.className = "btn btn-warning";
        btn.style.color = "red";
    } else {
        btn.className = "btn btn-danger";
        btn.style.color = "white";
    }
    id = setTimeout(function(){blink_button(element, state);}, 400);
    update_to_id(element, id);
}

function reset_button(element){ // reset blink on element button
    var btn = document.getElementsByName(element)[0];
    btn.className = "btn btn-secondary";
    btn.style.color = "white";
    btn.style.fontWeight = "normal";
    clear(element);
}

function check_detresse(){ // check for each detresse if there is at least one element of this detresse blinking
    var detresses = ["detresse_respi", "detresse_circu", "detrese_neuro"];
    var respi = ["button-sat", "button-fr", "check-respi", "check-obva"];
    var circu = ["button-pa1", "button-pa2", "button-fc", "check-circu"];
    var neuro = ["check-conscience"];
    // check respi detresse
    var state = false;
    for (var i = 0; i < respi.length; i++) {
        if (is_blinking(respi[i])){
            state = true;
            break;
        }
    }
    if (!state){
        reset_blink("detresse_respi");
    }
    // check circu detresse
    state = false;
    for (var i = 0; i < circu.length; i++) {
        if (is_blinking(circu[i])){
            state = true;
            break;
        }
    }
    if (!state){
        reset_blink("detresse_circu");
    }
    // check circu neuro
    state = false;
    for (var i = 0; i < neuro.length; i++) {
        if (is_blinking(neuro[i])){
            state = true;
            break;
        }
    }
    if (!state){
        reset_blink("detresse_neuro");
    }
}

function blink_switch(element){ // déclenche le blink d'une détresse si un switch correspondant est activé ou désactivé
    switch (element) {
        case "check-respi":
            if(!is_blinking("detresse_respi")){
                detresse_son();
                blink_detresse("detresse_respi");
                update_to_id("check-respi", 0);
            }
            break;
        case "check-obva":
            if(!is_blinking("detresse_respi")){
                detresse_son();
                blink_detresse("detresse_respi");
                update_to_id("check-obva", 0);
            }
            break;
        case "check-circu" :
            if(!is_blinking("detresse_circu")){
                detresse_son();
                blink_detresse("detresse_circu");
                update_to_id("check-circu", 0);
            }
            break;
        case "check-conscience":
            if(!is_blinking("detresse_neuro")){
                detresse_son();
                blink_detresse("detresse_neuro");
                update_to_id("check-conscience", 0);
            }
            break;  
    }
}

// ---------------------------------------------------------------------------------

// GENERATION DES VALEURS
function sat(element, text){ // generate a value between 80 and 100
    var sat = Math.floor(Math.random() * 20) + 80;
    var text = document.getElementsByName(text)[0];
    text.value = sat;
    text.style.color = "blue";
    text.style.fontWeight = "bold";
    if (sat < val_sat){
        if (!is_blinking(element)){
            blink_button(element);
            detresse_son();
            blink_detresse("detresse_respi")
        }
    } else {
        reset_button(element);
        check_detresse()
    }
}

function fr(element, text){ // generate a value between 12 and 20
    var fr = Math.floor(Math.random() * 8) + 12;
    var text = document.getElementsByName(text)[0];
    text.value = fr;
    text.style.color = "blue";
    text.style.fontWeight = "bold";
    if (fr < val_fr){
        if (!is_blinking(element)){
            blink_button(element);
            detresse_son();
            blink_detresse("detresse_respi")
        }
    } else {
        reset_button(element);
        check_detresse()
    }
}

function pa(element, text, type){ // generate a fake blood pressure value
    var nature = document.getElementsByName("nature-inter")[0].value;
    var sys = Math.floor(Math.random() * 121); // génère une valeur aléatoire entre 0 et 120 pour la tension systolique
    var dia = Math.floor(Math.random() * 91); // génère une valeur aléatoire entre 0 et 90 pour la tension diastolique
    switch (nature) {
        case "1": // Malaise
          // Rendre plus probable une hypotension
          sys = Math.floor(Math.random() * 51); // génère une valeur aléatoire entre 0 et 50 pour la tension systolique
          dia = Math.floor(Math.random() * 61); // génère une valeur aléatoire entre 0 et 60 pour la tension diastolique
          break;
        case "2": // Plaie simple
          // Ne pas modifier les valeurs générées aléatoirement
          break;
        case "3": // Accident voie publique
          // Rendre moins probable une hypertension avancée
          if (sys >= 160 && dia >= 110) {
            sys = Math.floor(Math.random() * 140); // génère une valeur aléatoire entre 0 et 139 pour la tension systolique
            dia = Math.floor(Math.random() * 100); // génère une valeur aléatoire entre 0 et 99 pour la tension diastolique
          }
          break;
        case "4": // Plaie par balle
          // Rendre plus probable une hypertension
          sys = Math.floor(Math.random() * 61) + 120; // génère une valeur aléatoire entre 120 et 180 pour la tension systolique
          dia = Math.floor(Math.random() * 41) + 80; // génère une valeur aléatoire entre 80 et 120 pour la tension diastolique
          break;
        case "5": // Plaie par arme blanche
          // Rendre plus probable une hypertension légère
          sys = Math.floor(Math.random() * 11) + 139; // génère une valeur aléatoire entre 139 et 149 pour la tension systolique
          dia = Math.floor(Math.random() * 21) + 89; // génère une valeur aléatoire entre 89 et 109 pour la tension diastolique
          break;
        case "6": // Traumatisme ou Autre
          // Rendre moins probable une hypotension
          if (sys <= 90 && dia <= 60) {
            sys = Math.floor(Math.random() * 60) + 60; // génère une valeur aléatoire entre 60 et 120 pour la tension systolique
            dia = Math.floor(Math.random() * 30) + 30; // génère une valeur aléatoire entre 30 et 60 pour la tension diastolique
          }
          break;
        case "7": // autre
        // Ne pas modifier les valeurs générées aléatoirement
          break;
    }
    var full_text = sys + "/" + dia;
    var text = document.getElementsByName(text)[0];
    text.value = full_text;
    text.style.color = "blue";
    text.style.fontWeight = "bold";
    if (sys < val_pa_sys_min || sys > val_pa_sys_max || dia < val_pa_dia_min || dia > val_pa_dia_max){
        if (!is_blinking(element)){
            blink_button(element);
            if (!is_blinking("detresse_circu")){
                detresse_son();
                blink_detresse("detresse_circu");
            }
        }
    } else {
        reset_button(element);
        check_detresse()
    }
}

function fc(element, text){ // generate a cardiac frequency value based on the nature of the intervention
    var nature = document.getElementsByName("nature-inter")[0].value;
    var fc = Math.floor(Math.random() * 121); // génère une valeur aléatoire entre 0 et 120 pour la fréquence cardiaque
    switch (nature) {
        case "1": // Malaise
            // Rendre plus probable une fréquence cardiaque basse
            fc = Math.floor(Math.random() * 51); // génère une valeur aléatoire entre 0 et 50 pour la fréquence cardiaque
            break;
        case "2": // Plaie simple
            // Ne pas modifier les valeurs générées aléatoirement
            break;
        case "3": // Accident voie publique
            // Rendre moins probable une fréquence cardiaque élevée
            if (fc >= 100) {
                fc = Math.floor(Math.random() * 100); // génère une valeur aléatoire entre 0 et 99 pour la fréquence cardiaque
            }
            break;
        case "4": // Plaie par balle
            // Rendre plus probable une fréquence cardiaque élevée
            fc = Math.floor(Math.random() * 61) + 60; // génère une valeur aléatoire entre 60 et 120 pour la fréquence cardiaque
            break;
        case "5": // Plaie par arme blanche
            // Rendre plus probable une fréquence cardiaque élevée
            fc = Math.floor(Math.random() * 61) + 60; // génère une valeur aléatoire entre 60 et 120 pour la fréquence cardiaque
            break;
        case "6": // Traumatisme ou Autre
            // Rendre moins probable une fréquence cardiaque basse
            if (fc <= 60) {
                fc = Math.floor(Math.random() * 60) + 60; // génère une valeur aléatoire entre 60 et 120 pour la fréquence cardiaque
            }
            break;
        case "7": // autre
            // Ne pas modifier les valeurs générées aléatoirement
            break;
    }
    var text = document.getElementsByName(text)[0];
    text.value = fc;
    text.style.color = "blue";
    text.style.fontWeight = "bold";
    if (fc < val_fc_min || fc > val_fc_max){
        if (!is_blinking(element)){
            blink_button(element);
            if (!is_blinking("detresse_circu")){
                detresse_son();
                blink_detresse("detresse_circu");
            }
        }
    } else {
        reset_button(element);
        check_detresse()
    }
}

// DEVENIR
function devenir(element){
    var buttons = ["devenir1", "devenir2", "devenir3", "devenir4"];
    var card = document.getElementsByName("devenir-card")[0];
    var clicked = document.getElementsByName(element)[0];
    clicked.className = "btn btn-success";
    card.className = "card border-success";
    for (var i = 0; i < buttons.length; i++){
        if (buttons[i] != element){
            var button = document.getElementsByName(buttons[i])[0];
            button.className = "btn btn-secondary";
        }
    }
}

// Alert detresse
function detresse_son(){
    var sound = new Howl({
        src: ['sons/beep.mp3'],
        volume: 0.01
      });
      sound.play();
}