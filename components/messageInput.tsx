import { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'

import Icon from "@react-native-vector-icons/ionicons"

import TextInputAbs from '@/abstractions/textInputAbs'
import { usePalette } from '@/contextes/contextePalette'
import VoiceRecorderButton from './voiceRecorderButton'

/** A photo picked from the library, waiting to be sent */
export type PhotoAEnvoyer = { uri: string, mimeType?: string, nomFichier?: string }

/** Photos per send (the picker stops there) */
const MAX_PHOTOS = 10

type Props = {
    onEnvoyerTexte: (texte: string) => Promise<void> | void
    onEnvoyerVocal: (uri: string, dureeSecondes: number) => Promise<void> | void
    /** the picked photos, sent as ONE message (an album when several); throws if it failed */
    onEnvoyerImages?: (photos: PhotoAEnvoyer[]) => Promise<void> | void
}

export default function MessageInput({ onEnvoyerTexte, onEnvoyerVocal, onEnvoyerImages }: Props){
    const {colors} = usePalette()
    const { t } = useTranslation('inbox')
    const [texte,setTexte] = useState('')
    const [photos, setPhotos] = useState<PhotoAEnvoyer[]>([])
    const [enEnvoi, setEnEnvoi] = useState(false)

    // Photos: several can be picked from the library (no permission needed on recent
    // iOS/Android). Nothing is sent yet: they wait above the field, where one can be
    // removed or more added, until the send button. Quality 0.7: lighter, still sharp.
    const choisirPhotos = async () => {
        if (!onEnvoyerImages || enEnvoi) return
        const place = MAX_PHOTOS - photos.length
        if (place <= 0) return
        const resultat = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            quality: 0.7,
            allowsMultipleSelection: true,
            selectionLimit: place,
            orderedSelection: true,
        })
        if (resultat.canceled || !resultat.assets?.length) return
        const choisies = resultat.assets.slice(0, place).map((a) => ({
            uri: a.uri,
            mimeType: a.mimeType,
            nomFichier: a.fileName ?? undefined,
        }))
        setPhotos((avant) => [...avant, ...choisies.filter((p) => !avant.some((x) => x.uri === p.uri))])
    }

    const retirerPhoto = (uri: string) => setPhotos((avant) => avant.filter((p) => p.uri !== uri))

    // The photos first, all in one message (in the picked order), then the text, like
    // Messenger. If the photos fail, they stay in the strip (and the text in the field).
    const envoyer = async () => {
        const texteAEnvoyer = texte.trim()
        if ((texteAEnvoyer.length === 0 && photos.length === 0) || enEnvoi) return
        setEnEnvoi(true)
        try {
            if (photos.length > 0 && onEnvoyerImages) {
                await onEnvoyerImages(photos)
                setPhotos([])
            }
            if (texteAEnvoyer.length > 0) {
                setTexte('')
                try {
                    await onEnvoyerTexte(texteAEnvoyer)
                } catch {
                    setTexte(texteAEnvoyer) // remettre le texte si l'envoi a échoué
                }
            }
        } catch {
            // the photos failed: the error was shown, they (and the text) stay
        } finally {
            setEnEnvoi(false)
        }
    }
    const aEnvoyer = texte.trim().length > 0 || photos.length > 0

    return (
        <View style={[styles.conteneur, {backgroundColor: colors.card, borderTopColor: colors.border}]}>
            {photos.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.bandePhotos}
                >
                    {photos.map((p) => (
                        <View key={p.uri} style={[styles.miniature, { borderColor: colors.border, opacity: enEnvoi ? 0.6 : 1 }]}>
                            <Image source={{ uri: p.uri }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                            {!enEnvoi && (
                                <TouchableOpacity
                                    onPress={() => retirerPhoto(p.uri)}
                                    hitSlop={8}
                                    accessibilityRole="button"
                                    accessibilityLabel={t('photo.remove')}
                                    style={styles.retirer}
                                >
                                    <Icon name="close" size={14} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    {photos.length < MAX_PHOTOS && !enEnvoi && (
                        <TouchableOpacity
                            onPress={choisirPhotos}
                            accessibilityRole="button"
                            accessibilityLabel={t('photo.add')}
                            style={[styles.miniature, styles.ajouter, { borderColor: colors.border }]}
                        >
                            <Icon name="add" size={26} color={colors.muted} />
                        </TouchableOpacity>
                    )}
                </ScrollView>
            )}

            <View style={styles.ligne}>
                {onEnvoyerImages && (
                    <TouchableOpacity
                        onPress={choisirPhotos}
                        disabled={enEnvoi || photos.length >= MAX_PHOTOS}
                        hitSlop={6}
                        accessibilityRole="button"
                        accessibilityLabel={t('photo.send')}
                        style={[styles.boutonPhoto, { opacity: photos.length >= MAX_PHOTOS ? 0.4 : 1 }]}
                    >
                        <Icon name="image-outline" size={26} color={colors.text} />
                    </TouchableOpacity>
                )}
                <TextInputAbs
                    value={texte}
                    onChangeText={setTexte}
                    placeholder="écris un message…"
                    multiline
                    maxLength={2000}
                    style={styles.input}
                />
                {aEnvoyer
                    ? (
                        <TouchableOpacity
                            onPress={envoyer}
                            disabled={enEnvoi}
                            accessibilityRole="button"
                            accessibilityState={{ busy: enEnvoi }}
                            style={[styles.boutonEnvoyer,{backgroundColor: colors.secondary,opacity:enEnvoi ? 0.5 : 1}]}>
                                <Icon name="send" size={16} color="white"/>
                        </TouchableOpacity>
                    )
                    : <VoiceRecorderButton onEnregistrementTermine={onEnvoyerVocal} />
                }
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    conteneur: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        gap: 8,
    },
    ligne: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
    },
    input: { flex: 1, maxHeight: 100 },
    boutonPhoto: { width: 36, height: 48, alignItems: 'center', justifyContent: 'center' },
    boutonEnvoyer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bandePhotos: { gap: 8, paddingTop: 2 },
    miniature: {
        width: 64,
        height: 64,
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
    },
    ajouter: { alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' },
    retirer: {
        position: 'absolute',
        top: 3,
        right: 3,
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
})
