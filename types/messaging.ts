import { DateTime } from "luxon"

export type Message = {
    id: string
    conversationId: string
    auteurId: string
    /** pseudo and profile picture of the author (shown in group conversations) */
    auteurPseudo?: string
    auteurFpUrl?: string
    type: 'texte' | 'vocal'
    contenu?: string
    audioUrl?: string
    dureeSecondes?: number
    envoyeLe: DateTime
    lu: boolean
}

export type Conversation = {
    id: string
    ami: {
        id: string
        pseudo: string
        fp_url?: string
    }
    dernierMessage?:{
        type: 'texte' | 'vocal'
        contenu?: string
        envoyeLe: DateTime
        auteurId: string
    }
    nonLus: number
    titre?: string
    /** the other members of the conversation (without me) */
    participants?: {
        id: string
        pseudo: string
        fp_url?: string
    }[]
    /** Story #21: public id of the event this group conversation belongs to */
    evenementId?: string
}

export type MessageBrut = Omit<Message,'envoyeLe'> & {envoyeLe: string}
export type ConversationBrute = Omit<Conversation,'dernierMessage'> & {
    dernierMessage?: Omit<NonNullable<Conversation['dernierMessage']>,'envoyeLe'> & { envoyeLe: string}
}


/** Ce que l'écran de conversation envoie au contexte */
export type EnvoiMessage =
    | { type: 'texte', contenu: string }
    | { type: 'vocal', uri: string, dureeSecondes: number }
