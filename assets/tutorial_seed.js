const seed = { 
  "membres": [
    {
      "id": 1,
      "id_publique": "tuto_moi",
      "pseudo": "alex",
      "courriel": "demo-alex@sync.invalid",
      "prenom": "Alex",
      "nom": "Tremblay",
      "bio": "Etudiant le jour, barista le soir.",
      "fuseau_horaire": "America/Toronto",
      "role": "membre",
      "statut_disponibilite": "disponible",
      "etat_ame": "Pret pour la semaine!"
    },
    {
      "id": 2,
      "id_publique": "tuto_lea",
      "pseudo": "lea.b",
      "courriel": "demo-lea@sync.invalid",
      "prenom": "Léa",
      "nom": "Bouchard",
      "bio": "Design, cafe et longues marches.",
      "fuseau_horaire": "America/Toronto",
      "role": "membre",
      "statut_disponibilite": "disponible",
      "etat_ame": "Toujours partante pour un souper"
    },
    {
      "id": 3,
      "id_publique": "tuto_sam",
      "pseudo": "sam.roy",
      "courriel": "demo-sam@sync.invalid",
      "prenom": "Samuel",
      "nom": "Roy",
      "bio": "Entrainement, jeux video et pizza.",
      "fuseau_horaire": "America/Toronto",
      "role": "membre",
      "statut_disponibilite": "disponible",
      "etat_ame": null
    }
  ],
  "amities": [
    {
      "id_membre_a": 1,
      "id_membre_b": 2,
      "temps_creation": {
        "jour": -30,
        "heure": "12:00"
      }
    },
    {
      "id_membre_a": 1,
      "id_membre_b": 3,
      "temps_creation": {
        "jour": -20,
        "heure": "12:00"
      }
    },
    {
      "id_membre_a": 2,
      "id_membre_b": 3,
      "temps_creation": {
        "jour": -25,
        "heure": "12:00"
      }
    }
  ],
  "parametres": [
    {
      "id_membre": 1,
      "notifications_push": 1,
      "notifications_email": 0,
      "visibilite_horaire": "public",
      "theme": "auto",
      "langue": "fr-CA",
      "autres_prefs": null
    }
  ],
  "evenements": [
    {
      "id": 1,
      "id_publique": "tuto_ev_01",
      "slug": "tuto-cours-programmation",
      "titre": "Cours - Programmation",
      "description": null,
      "debut": {
        "jour": 1,
        "heure": "09:00"
      },
      "fin": {
        "jour": 1,
        "heure": "12:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 1,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 2,
      "id_publique": "tuto_ev_02",
      "slug": "tuto-travail-cafe-mardi",
      "titre": "Travail - Café Le Pixel",
      "description": null,
      "debut": {
        "jour": 2,
        "heure": "13:00"
      },
      "fin": {
        "jour": 2,
        "heure": "18:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 1,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 3,
      "id_publique": "tuto_ev_03",
      "slug": "tuto-cours-bd",
      "titre": "Cours - Bases de données",
      "description": null,
      "debut": {
        "jour": 3,
        "heure": "10:00"
      },
      "fin": {
        "jour": 3,
        "heure": "12:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 1,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 4,
      "id_publique": "tuto_ev_04",
      "slug": "tuto-travail-cafe-jeudi",
      "titre": "Travail - Café Le Pixel",
      "description": null,
      "debut": {
        "jour": 4,
        "heure": "17:00"
      },
      "fin": {
        "jour": 4,
        "heure": "21:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 1,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 5,
      "id_publique": "tuto_ev_05",
      "slug": "tuto-lea-cours-design",
      "titre": "Cours - Design",
      "description": null,
      "debut": {
        "jour": 1,
        "heure": "13:00"
      },
      "fin": {
        "jour": 1,
        "heure": "16:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 2,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 6,
      "id_publique": "tuto_ev_06",
      "slug": "tuto-lea-shift-librairie",
      "titre": "Shift - Librairie",
      "description": null,
      "debut": {
        "jour": 2,
        "heure": "09:00"
      },
      "fin": {
        "jour": 2,
        "heure": "14:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 2,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 7,
      "id_publique": "tuto_ev_07",
      "slug": "tuto-lea-cours-marketing",
      "titre": "Cours - Marketing",
      "description": null,
      "debut": {
        "jour": 3,
        "heure": "14:00"
      },
      "fin": {
        "jour": 3,
        "heure": "17:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 2,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 8,
      "id_publique": "tuto_ev_08",
      "slug": "tuto-lea-sommeil",
      "titre": "Sommeil",
      "description": null,
      "debut": {
        "jour": 0,
        "heure": "23:00"
      },
      "fin": {
        "jour": 1,
        "heure": "07:30"
      },
      "prive": 1,
      "regle_recurrence": "RRULE:FREQ=DAILY",
      "createur_id": 2,
      "nature": "indisponibilite",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 9,
      "id_publique": "tuto_ev_09",
      "slug": "tuto-sam-travail-mardi",
      "titre": "Travail - Entrepôt",
      "description": null,
      "debut": {
        "jour": 1,
        "heure": "08:00"
      },
      "fin": {
        "jour": 1,
        "heure": "16:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 3,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 10,
      "id_publique": "tuto_ev_10",
      "slug": "tuto-sam-travail-mercredi",
      "titre": "Travail - Entrepôt",
      "description": null,
      "debut": {
        "jour": 2,
        "heure": "08:00"
      },
      "fin": {
        "jour": 2,
        "heure": "16:00"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 3,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 11,
      "id_publique": "tuto_ev_11",
      "slug": "tuto-sam-entrainement",
      "titre": "Entraînement",
      "description": null,
      "debut": {
        "jour": 3,
        "heure": "18:00"
      },
      "fin": {
        "jour": 3,
        "heure": "19:30"
      },
      "prive": 1,
      "regle_recurrence": null,
      "createur_id": 3,
      "nature": "evenement",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    },
    {
      "id": 12,
      "id_publique": "tuto_ev_12",
      "slug": "tuto-sam-sommeil",
      "titre": "Sommeil",
      "description": null,
      "debut": {
        "jour": 0,
        "heure": "00:00"
      },
      "fin": {
        "jour": 0,
        "heure": "08:00"
      },
      "prive": 1,
      "regle_recurrence": "RRULE:FREQ=DAILY",
      "createur_id": 3,
      "nature": "indisponibilite",
      "source": "sync",
      "jour_ferie": 0,
      "depuis_dispo_commune": 0
    }
  ],
  "participants_evenements": [
    {
      "id_evenement": 1,
      "id_membre": 1,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 2,
      "id_membre": 1,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 3,
      "id_membre": 1,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 4,
      "id_membre": 1,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 5,
      "id_membre": 2,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 6,
      "id_membre": 2,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 7,
      "id_membre": 2,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 8,
      "id_membre": 2,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 9,
      "id_membre": 3,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 10,
      "id_membre": 3,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 11,
      "id_membre": 3,
      "privilege": "editeur",
      "statut": "acceptee"
    },
    {
      "id_evenement": 12,
      "id_membre": 3,
      "privilege": "editeur",
      "statut": "acceptee"
    }
  ],
  "conversations": [
    {
      "id": 1,
      "id_publique": "tuto_conv_01",
      "titre": "Les copains",
      "serial_number": 3,
      "temps_creation": {
        "jour": -10,
        "heure": "18:00"
      }
    }
  ],
  "participants_conversations": [
    {
      "id_conversation": 1,
      "id_membre": 1,
      "role": "editeur"
    },
    {
      "id_conversation": 1,
      "id_membre": 2,
      "role": "editeur"
    },
    {
      "id_conversation": 1,
      "id_membre": 3,
      "role": "editeur"
    }
  ],
  "messages": [
    {
      "id": 1,
      "id_publique": "tuto_msg_01",
      "id_conversation": 1,
      "id_auteur": 2,
      "type": "texte",
      "temps_envoi": {
        "jour": -1,
        "heure": "20:15"
      }
    },
    {
      "id": 2,
      "id_publique": "tuto_msg_02",
      "id_conversation": 1,
      "id_auteur": 3,
      "type": "texte",
      "temps_envoi": {
        "jour": -1,
        "heure": "20:22"
      }
    },
    {
      "id": 3,
      "id_publique": "tuto_msg_03",
      "id_conversation": 1,
      "id_auteur": 1,
      "type": "texte",
      "temps_envoi": {
        "jour": -1,
        "heure": "20:30"
      }
    }
  ],
  "messages_texte": [
    {
      "id_message": 1,
      "contenu": "Salut la gang! On se fait un truc cette semaine?"
    },
    {
      "id_message": 2,
      "contenu": "Moi je finis tôt, je suis down pour un souper."
    },
    {
      "id_message": 3,
      "contenu": "Parfait, je regarde nos horaires dans Sync!"
    }
  ],
  "scenario": {
    "indisponibilitesSuggerees": [
      {
        "titre": "Sommeil (semaine)",
        "debut": {
          "jour": 0,
          "heure": "22:00"
        },
        "fin": {
          "jour": 1,
          "heure": "08:00"
        },
        "regle_recurrence": "RRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH"
      },
      {
        "titre": "Sommeil (fin de semaine)",
        "debut": {
          "jour": 0,
          "heure": "00:00"
        },
        "fin": {
          "jour": 0,
          "heure": "10:00"
        },
        "regle_recurrence": "RRULE:FREQ=WEEKLY;BYDAY=SA,SU"
      }
    ],
    "evenementSuggere": {
      "titre": "Souper entre amis",
      "description": "Un souper pour se retrouver cette semaine.",
      "debut": {
        "jour": 2,
        "heure": "19:00"
      },
      "fin": {
        "jour": 2,
        "heure": "21:00"
      },
      "depuis_dispo_commune": 1,
      "amiAInviter": "tuto_lea"
    },
    "reactions": {
      "autoAccepterInvitation": {
        "membre": "tuto_lea",
        "delaiMs": 800
      },
      "messageBienvenue": {
        "auteur": "tuto_lea",
        "contenu": "Je suis partante! 🎉",
        "delaiMs": 1500
      }
    }
  }
}

export default seed