function radio(name) { // get value from radio button
    var radio = document.getElementsByName(name);
    for (var i = 0, length = radio.length; i < length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
}

function get_devenir(){
    var buttons = ["devenir1", "devenir2", "devenir3", "devenir4"];
    for (var i = 0; i < buttons.length; i++) {
        var classes = document.getElementsByName(buttons[i])[0].className;
        if (classes.includes("success")) {
            return buttons[i];
        }
    }
}

function generate_url($variables){ // javascript function to generate url with variables urlencoded
    var url = "victime?";
    for (var key in $variables) {
        if ($variables.hasOwnProperty(key)) {
            url += key + "=" + encodeURIComponent($variables[key]) + "&";
        }
    }
    return url;
}

function send_request(variables){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "victime", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify(variables));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // redirect user to victime page with variables in url
            window.location.href = generate_url(variables);
        }
    }
}

function store_victime() { // get all values from input, radio, checlbox and select from victime.php and call a php script to store them in a database
    var nature = document.getElementById("nature-inter").value;
    var date = document.getElementById("date").value;
    var lieu = document.getElementById("lieu").value;
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var sexe = radio("sexe")
    var dob = document.getElementById("dob").value;
    var circonstanciel = document.getElementById("circonstanciel").value;
    var sur_accident = document.getElementById("check1").checked;
    var degagement_urgence = document.getElementById("check2").checked;
    var secours_insuffisants = document.getElementById("check3").checked;
    var horaire1 = document.getElementById("horaire1").value;
    var horaire2 = document.getElementById("horaire2").value;
    var horaire3 = document.getElementById("horaire3").value;
    var horaire4 = document.getElementById("horaire4").value;
    var horaire5 = document.getElementById("horaire5").value;
    var respiration = document.getElementById("check-respi").checked;
    var otva = document.getElementById("check-obva").checked;
    var sat = document.getElementById("sat-text").value;
    var fr = document.getElementById("fr-text").value;
    var respi1 = radio("respi")
    var respi2 = radio("respi2")
    var respi3 = radio("respi3")
    var valeur_o2 = document.getElementById("valeur-o2").value;
    var saignement = document.getElementById("check-circu").checked;
    var pag = document.getElementById("pa1-text").value;
    var pad = document.getElementById("pa2-text").value;
    var fc = document.getElementById("fc-text").value;
    var circu1 = radio("fc_radio")
    var circu2 = radio("fc_radio2")
    var circu3 = radio("fc_radio3")
    var trc = document.getElementById("check-trc").checked;
    var conscience = document.getElementById("check-conscience").checked;
    var neuro1 = radio("neuro_radio")
    var neuro2 = radio("neuro_radio2")
    var neuro3 = radio("neuro_radio3")
    var espace = document.getElementById("check-neuro").checked;
    var temps = document.getElementById("check-neuro2").checked;
    var comportement1 = document.getElementById("comportement1").checked;
    var comportement2 = document.getElementById("comportement2").checked;
    var comportement3 = document.getElementById("comportement3").checked;
    var comportement4 = document.getElementById("comportement4").checked;
    var comportement5 = document.getElementById("comportement5").checked;
    var sueurs = document.getElementById("sueurs").checked;
    var cyanoses = document.getElementById("cyanoses").checked;
    var paleurs = document.getElementById("paleurs").checked;
    var marbrures = document.getElementById("marbrures").checked;
    var trauma1 = document.getElementById("trauma1").checked;
    var trauma2 = document.getElementById("trauma2").checked;
    var trauma3 = document.getElementById("trauma3").checked;
    var trauma4 = document.getElementById("trauma4").checked;
    var trauma5 = document.getElementById("trauma5").checked;
    var trauma6 = document.getElementById("trauma6").checked;
    var trauma7 = document.getElementById("trauma7").checked;
    var trauma8 = document.getElementById("trauma8").checked;
    var examen1 = document.getElementById("examen1").checked;
    var examen2 = document.getElementById("examen2").checked;
    var examen3 = document.getElementById("examen3").checked;
    var examen4 = document.getElementById("examen4").checked;
    var examen5 = document.getElementById("examen5").checked;
    var examen6 = document.getElementById("examen6").checked;
    var observation = document.getElementById("text-trauma").value;
    var pqrst_p = document.getElementById("pqrst_p").value;
    var pqrst_q = document.getElementById("pqrst_q").value;
    var pqrst_r = document.getElementById("pqrst_r").value;
    var pqrst_s = document.getElementById("pqrst_s").value;
    var pqrst_t = document.getElementById("pqrst_t").value;
    var mhta_m = document.getElementById("mhta_m").value;
    var mhta_h = document.getElementById("mhta_h").value;
    var mhta_t = document.getElementById("mhta_t").value;
    var mhta_a = document.getElementById("mhta_a").value;
    var resume = document.getElementById("text-gestes").value;
    var devenir = get_devenir();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var vardate =  dd + '/' + mm + '/' + yyyy;
    var h = today.getHours();
    var m = today.getMinutes();
    if (h < 10) {
        h = '0' + h
    }
    if (m < 10) {
        m = '0' + m
    }
    var vartime = h + 'h' + m;

    variables = { 
        "nature": nature,
        "date": date,
        "lieu": lieu,
        "nom": nom,
        "prenom": prenom,
        "sexe": sexe,
        "dob": dob,
        "circonstanciel": circonstanciel,
        "sur_accident": sur_accident,
        "degagement_urgence": degagement_urgence,
        "secours_insuffisants": secours_insuffisants,
        "horaire1": horaire1,
        "horaire2": horaire2,
        "horaire3": horaire3,
        "horaire4": horaire4,
        "horaire5": horaire5,
        "respiration": respiration,
        "otva": otva,
        "sat": sat,
        "fr": fr,
        "respi1": respi1,
        "respi2": respi2,
        "respi3": respi3,
        "valeur_o2": valeur_o2,
        "saignement": saignement,
        "pag": pag,
        "pad": pad,
        "fc": fc,
        "circu1": circu1,
        "circu2": circu2,
        "circu3": circu3,
        "trc": trc,
        "conscience": conscience,
        "neuro1": neuro1,
        "neuro2": neuro2,
        "neuro3": neuro3,
        "espace": espace,
        "temps": temps,
        "comportement1": comportement1,
        "comportement2": comportement2,
        "comportement3": comportement3,
        "comportement4": comportement4,
        "comportement5": comportement5,
        "sueurs": sueurs,
        "cyanoses": cyanoses,
        "paleurs": paleurs,
        "marbrures": marbrures,
        "trauma1": trauma1,
        "trauma2": trauma2,
        "trauma3": trauma3,
        "trauma4": trauma4,
        "trauma5": trauma5,
        "trauma6": trauma6,
        "trauma7": trauma7,
        "trauma8": trauma8,
        "examen1": examen1,
        "examen2": examen2,
        "examen3": examen3,
        "examen4": examen4,
        "examen5": examen5,
        "examen6": examen6,
        "observation": observation,
        "pqrst_p": pqrst_p,
        "pqrst_q": pqrst_q,
        "pqrst_r": pqrst_r,
        "pqrst_s": pqrst_s,
        "pqrst_t": pqrst_t,
        "mhta_m": mhta_m,
        "mhta_h": mhta_h,
        "mhta_t": mhta_t,
        "mhta_a": mhta_a,
        "resume": resume,
        "devenir": devenir,
        "date": vardate,
        "heure": vartime
    };

    // for every null parameter, set it to ""
    for (var key in variables) {
        if (variables[key] == null) {
            variables[key] = "";
        }
    }
    //console.log(variables);
    // send the request if at least "nature", "date" and "lieu" are filled
    if (variables["nature"] != "" && variables["date"] != "" && variables["lieu"] != "") {
        send_request(variables);
    } else {
        notification_error("Veuillez remplir au moins les champs 'Nature de l'intervention', 'Date' et 'Lieu'");
    }
}