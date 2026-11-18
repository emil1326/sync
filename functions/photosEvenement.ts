import type { AxiosInstance } from 'axios'
import * as ImagePicker from 'expo-image-picker'

import { PhotoEvenement } from '@/types/albumEvenement'

/** Photos per upload (the picker stops there; the API accepts as many) */
export const MAX_PHOTOS_PAR_ENVOI = 20

/**
 * The album of an event, most recent first. `null` when the member can't see it
 * (not in the event: 403, or the event is gone: 404): the album isn't shown then.
 *
 * @param {AxiosInstance} api
 * @param {string} idEvenement - Public id.
 * @returns {Promise<PhotoEvenement[] | null>}
 */
export async function chargerPhotosEvenement(api: AxiosInstance, idEvenement: string): Promise<PhotoEvenement[] | null> {
    try {
        const { data } = await api.get(`/evenements/${encodeURIComponent(idEvenement)}/photos`)
        return data?.photos ?? []
    } catch (error: any) {
        const statut = error?.response?.status
        if (statut === 403 || statut === 404) return null
        throw error
    }
}

/**
 * Lets the member pick photos (several at once) and adds them to the event's album.
 *
 * @param {AxiosInstance} api
 * @param {string} idEvenement - Public id.
 * @param {() => void} [onEnvoi] - Called once photos were picked, before the upload (spinner).
 * @returns {Promise<PhotoEvenement[]>} The added photos (empty if nothing was picked).
 */
export async function ajouterPhotosEvenement(api: AxiosInstance, idEvenement: string, onEnvoi?: () => void): Promise<PhotoEvenement[]> {
    const resultat = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 0.7,
        allowsMultipleSelection: true,
        selectionLimit: MAX_PHOTOS_PAR_ENVOI,
        orderedSelection: true,
    })
    if (resultat.canceled || !resultat.assets?.length) return []
    onEnvoi?.()

    const form = new FormData()
    resultat.assets.slice(0, MAX_PHOTOS_PAR_ENVOI).forEach((a, i) => {
        const nom = a.fileName || a.uri.split('/').pop() || `photo-${i + 1}.jpg`
        form.append('photos', { uri: a.uri, name: nom, type: a.mimeType || 'image/jpeg' } as any)
    })
    const { data } = await api.post(`/evenements/${encodeURIComponent(idEvenement)}/photos`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        transformRequest: (d) => d, // axios ne doit pas sérialiser le FormData en React Native
        timeout: 120000,
    })
    return data?.photos ?? []
}

/**
 * Removes a photo from the album (its author, or the event's creator).
 *
 * @param {AxiosInstance} api
 * @param {string} idEvenement - Public id.
 * @param {string} idPhoto - Public id.
 * @returns {Promise<void>}
 */
export async function supprimerPhotoEvenement(api: AxiosInstance, idEvenement: string, idPhoto: string): Promise<void> {
    await api.delete(`/evenements/${encodeURIComponent(idEvenement)}/photos/${encodeURIComponent(idPhoto)}`)
}
