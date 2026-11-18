/** A photo of an event's shared album (GET /evenements/:id/photos) */
export type PhotoEvenement = {
    id: string
    /** relative address (/img/evenements/...): shown with the app's server address in front */
    url: string
    auteur: { id: string, pseudo: string, fp_url: string | null }
    /** UTC */
    cree_le: string
    de_moi: boolean
    /** its author, or the event's creator */
    peut_supprimer: boolean
}
