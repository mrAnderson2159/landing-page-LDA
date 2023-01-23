from .vue_text_layout import text_field

TEXT_LAYOUT = {
    'whatsappPhoneNumber': text_field(
        '',
        "Numero di telefono di Whatsapp",
        placeholder="Es. +39 371 23 45 451 scritto tutto attaccato 393712345451"
    ),
    'homepageTitle': text_field(
        "Noleggia una macchina di lusso",
        "Titolo della Homepage"
    ),
    'homePageSubtitle': text_field(
        "Scegli l'auto, lascia un recapito e pensiamo a tutto noi!",
        "Sottotitolo della Homepage"
    ),
    'homePageSubmit': text_field(
        "Scegli una macchina",
        "Pulsante di invio della Homepage"
    ),
    'homePageInstruction1title': text_field(
        "Sceglila",
        "Titolo del primo messaggio di istruzioni della Homepage"
    ),
    'homePageInstruction1message': text_field(
        "Seleziona una macchina tra quelle disponibili nel nostro catalogo",
        "Testo del primo messaggio di istruzioni della Homepage"
    ),
    'homePageInstruction2title': text_field(
        "Scrivici",
        "Titolo del secondo messaggio di istruzioni della Homepage"
    ),
    'homePageInstruction2message': text_field(
        "Inviaci un recapito telefonico o una mail su cui possiamo contattarti per concordare \
          il preventivo",
        "Testo del secondo messaggio di istruzioni della Homepage"
    ),
    'homePageInstruction3title': text_field(
        "Ricevila",
        "Titolo del terzo messaggio di istruzioni della Homepage"
    ),
    'homePageInstruction3message': text_field(
        "Ricevi la macchina chiavi in mano e restituiscila a fine periodo",
        "Testo del terzo messaggio di istruzioni della Homepage"
    ),
    'homePageFooterLink1': text_field(
        "Chi siamo",
        "Primo link del footer",
        url='#'
    ),
    'homePageFooterLink2': text_field(
        "Termini e Condizioni",
        "Secondo link del footer",
        url='#'
    ),
    'homePageFooterLink3': text_field(
        "Note Legali",
        "Terzo link del footer",
        url='#'
    ),
    'carSelectionPageLeadMessage': text_field(
        "Scegli la macchina che preferisci quindi lascia un recapito per essere ricontattato",
        "Messaggio principale della pagina di selezione delle macchine",
    ),
    'feedbackPageThankMessage1': text_field(
        "Grazie per averci scelto",
        "Primo messaggio della pagina di ringraziamento per la prenotazione",
    ),
    'feedbackPageThankMessage2': text_field(
        "Ti contatteremo entro 24H per un preventivo",
        "Secondo messaggio della pagina di ringraziamento per la prenotazione",
    ),
    'feedbackPageThankMessage3': text_field(
        "A presto!",
        "Terzo messaggio della pagina di ringraziamento per la prenotazione",
    ),
    'feedbackPageFailureMessage1': text_field(
        "Purtroppo qualcosa è andato storto",
        "Primo messaggio della pagina di fallimento della prenotazione",
    ),
    'feedbackPageFailureMessage2': text_field(
        "Non siamo riusciti ad inoltrare la richiesta",
        "Secondo messaggio della pagina di fallimento della prenotazione",
    ),
    'feedbackPageFailureMessage3': text_field(
        "Ti preghiamo di riprovare più tardi",
        "Terzo messaggio della pagina di fallimento della prenotazione",
    ),
}