import { useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'

import Icon from "@react-native-vector-icons/ionicons"

import TextInputAbs from '@/abstractions/textInputAbs'
import { usePalette } from '@/contextes/contextePalette'
import VoiceRecorderButton from './voiceRecorderButton'

type Props = {
    onEnvoyerTexte: (texte: string) => Promise<void> | void
    onEnvoyerVocal: (uri: string, dureeSecondes: number) => Promise<void> | void
    /** a photo picked from the library */
    onEnvoyerImage?: (photo: { uri: string, mimeType?: string, nomFichier?: string }) => Promise<void> | void
}

export default function MessageInput({ onEnvoyerTexte, onEnvoyerVocal, onEnvoyerImage }: Props){
    const {colors} = usePalette()
    const { t } = useTranslation('inbox')
    const [texte,setTexte] = useState('')
    const [enEnvoi, setEnEnvoi] = useState(false)
    const [envoiPhoto, setEnvoiPhoto] = useState(false)

    // Photo: picked from the library (no permission needed on recent iOS/Android),
    // sent right away. Quality 0.7: a lighter file, still sharp on a phone.
    const choisirPhoto = async () => {
        if (!onEnvoyerImage || envoiPhoto) return
        const resultat = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'images', quality: 0.7 })
        if (resultat.canceled || !resultat.assets?.[0]) return
        const photo = resultat.assets[0]
        setEnvoiPhoto(true)
        try {
            await onEnvoyerImage({ uri: photo.uri, mimeType: photo.mimeType, nomFichier: photo.fileName ?? undefined })
        } finally {
            setEnvoiPhoto(false)
        }
    }

    const envoyer = async () => {
        const t = texte.trim()
        if(t.length === 0 || enEnvoi) return
        setEnEnvoi(true)
        setTexte('')
        try {
            await onEnvoyerTexte(t)
        } catch {
            setTexte(t) // remettre le texte si l'envoi a échoué
        } finally {
            setEnEnvoi(false)
        }
    }
    const aDuTexte = texte.trim().length > 0

    return (
        <View style= {[styles.conteneur, {backgroundColor: colors.card, borderTopColor: colors.border}]}>
            {onEnvoyerImage && (
                <TouchableOpacity
                    onPress={choisirPhoto}
                    disabled={envoiPhoto}
                    hitSlop={6}
                    accessibilityRole="button"
                    accessibilityLabel={t('photo.send')}
                    accessibilityState={{ busy: envoiPhoto }}
                    style={styles.boutonPhoto}
                >
                    {envoiPhoto
                        ? <ActivityIndicator color={colors.muted} />
                        : <Icon name="image-outline" size={26} color={colors.text} />}
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
            {aDuTexte
                ? (
                    <TouchableOpacity
                        onPress={envoyer}
                        disabled={enEnvoi}
                        style={[styles.boutonEnvoyer,{backgroundColor: colors.secondary,opacity:enEnvoi ? 0.5 : 1}]}>
                            <Icon name="send" size={16} color="white"/>
                    </TouchableOpacity>
                )
                : <VoiceRecorderButton onEnregistrementTermine={onEnvoyerVocal} />
            }
        </View>
    )

}
const styles = StyleSheet.create({
    conteneur: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
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
})
