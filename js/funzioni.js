
/**
 * espressione regolare per la validazione dell'email
 */
var patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * valida l'email 
 * @param {String} value valore del campo email
 * @returns {Boolean} true se è un email valida altrimenti false
 */
function validateEmail(value){
    var patt = new RegExp(patternEmail);
    return patt.test(value);
}

/**
 * se l'email inserita è valida sostituisce il form con un messaggio di avvenuta iscrizione 
 * altrimenti creo un tooltip di email non valida
 * @param {String} value  valore del campo email
 */
function checkFormField(value){
    jQuery('[data-toggle="tooltip"]').tooltip("enable");
    if(validateEmail(value)){
        jQuery("form[name='newsletter']").closest(".row").html(" <div class='col-sm-12 text-center'><h3>Grazie per esserti iscritto!</h3></div>");
    }else{
        jQuery('[data-toggle="tooltip"]').tooltip('show');
        removeToltipOnfocus();
    }
}

/**
 * Modifica in maiuscolo la prima lettera di una stringa 
 * @param {String} text stringa da modificare
 * @returns {String} stringa modificata
 */
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * creo una chiamata ajax per abdare a leggere le news 
 * @param {String | number} id_news id della news da leggere  
 */
function loadNews(id_news){
    jQuery.ajax({
        url:"https://jsonplaceholder.typicode.com/posts/"+id_news,
        type:"get",
        dataType:"text",
        success : function(response){
            var news = null; 
            try{
                 news = JSON.parse(response);
            }catch(error){
                console.log(error); 
                return false; 
            }
            jQuery(".par").html(news.title);
            var capit = capitalizeFirstLetter(news.body);
            jQuery(".desc-par").html(capit + ".<br /><br />");
            for(var x = 0; x < 4; x++){
                jQuery(".desc-par").html(jQuery(".desc-par").html() + capit + ".<br /><br />");
            }
        },
        error : function(error){
            console.log(error); 
        }
    })
}

/**
 * aggiungo un evento click ai pulssanti in modo da chiamare la funzione per caricare le news
 * al click del submit 
 */
function getNewsToButtonClick(){
    var button_active = "button-active"; 
    var class_button_active = "."+button_active; 
    jQuery(".call-news").off("click").on("click", function(){
        loadNews(this.id);
        jQuery(class_button_active).removeClass(button_active);
        jQuery(this).addClass(button_active);
    });
}

/**
 * aggiungo un evento focus all'input email per evitare che si continua a vedere il tooltip email non valida
 * anche durante l'inserimento
 */
function removeToltipOnfocus(){
    jQuery(".email").off("focus").on("focus", function(){
        jQuery("[data-toggle='tooltip']").tooltip("hide");
        jQuery("[data-toggle='tooltip']").tooltip("disable");
    });

}

/**
 * funzione che richiama tutte le chevogliamo eseguire al caricamento della pagina
 */
function init(){
    jQuery(document).ready(function(){
        loadNews(1);
        getNewsToButtonClick();
    });
}

init();
