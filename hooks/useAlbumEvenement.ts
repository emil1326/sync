import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { useTranslation } from 'react-i18next'

import ToastAbs from '@/abstractions/toastAbs'
import { toastTypes } from '@/constants/toastConfig'
import { useAPI } from '@/contextes/contexteAPI'
import catcher from '@/functions/catcher'
import { ajouterPhotosEvenement, chargerPhotosEvenement, supprimerPhotoEvenement } from '@/functions/photosEvenement'
import { PhotoEvenement } from '@/types/albumEvenement'

/**
 * An event's shared album: loaded each time the screen is shown, photos added (picked
 * several at once) and deleted (after a confirmation). Used by the album block of the
 * event page and by the album screen.
 *
 * @param {string | undefined} idEvenement - Public id.
 */
export default function useAlbumEvenement(idEvenement: string | undefined) {
    const { t } = useTranslation('events')
    const { api } = useAPI()
    // null: not loaded yet, or the member can't see this album (not in the event)
    const [photos, setPhotos] = useState<PhotoEvenement[] | null>(null)
    const [accessible, setAccessible] = useState(true)
    const [envoi, setEnvoi] = useState(false)

    useFocusEffect(useCallback(() => {
        if (!idEvenement) return
        let actif = true
        chargerPhotosEvenement(api, idEvenement)
            .then((liste) => {
                if (!actif) return
                setAccessible(liste !== null)
                setPhotos(liste ?? [])
            })
            .catch((error) => { if (actif) catcher(error, t('album.loadFailed')) })
        return () => { actif = false }
    }, [api, idEvenement, t]))

    const ajouter = useCallback(async () => {
        if (!idEvenement || envoi) return
        try {
            const ajoutees = await ajouterPhotosEvenement(api, idEvenement, () => setEnvoi(true))
            if (ajoutees.length > 0) {
                setPhotos((avant) => [...ajoutees, ...(avant ?? [])])
                ToastAbs.show({ type: toastTypes.success, text2: t('album.added', { count: ajoutees.length }) })
            }
        } catch (error) {
            catcher(error, t('album.addFailed'))
        } finally {
            setEnvoi(false)
        }
    }, [api, idEvenement, envoi, t])

    /** Asks first; `onSupprimee` once it's gone (e.g. to close the viewer when it was the last one). */
    const supprimer = useCallback((photo: PhotoEvenement, onSupprimee?: () => void) => {
        if (!idEvenement) return
        Alert.alert(t('album.deleteTitle'), t('album.deleteMessage'), [
            { text: t('album.cancel'), style: 'cancel' },
            {
                text: t('album.deleteConfirm'),
                style: 'destructive',
                onPress: async () => {
                    try {
                        await supprimerPhotoEvenement(api, idEvenement, photo.id)
                        setPhotos((avant) => (avant ?? []).filter((p) => p.id !== photo.id))
                        onSupprimee?.()
                    } catch (error) {
                        catcher(error, t('album.deleteFailed'))
                    }
                },
            },
        ])
    }, [api, idEvenement, t])

    return { photos, accessible, envoi, ajouter, supprimer }
}
