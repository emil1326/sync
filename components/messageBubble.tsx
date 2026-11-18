import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { usePalette } from '@/contextes/contextePalette'
import { useFont } from '@/contextes/contexteFont'

import { convertirTimestampHeure } from '@/functions/convertirTimestamp'
import { Message } from '@/types/messaging'

import ProfilPic from './pfp'
import VoiceMessageBubble from './voiceMessageBubble'

const TAILLE_AVATAR = 28

type Props = {
    message: Message
    estDeMoi: boolean
    /** group conversation: the others' messages get an avatar column and their pseudo */
    groupe?: boolean
    /** last message of a run from the same author: show the avatar and pseudo on this one */
    afficherAuteur?: boolean
    /** tapping the author's avatar or pseudo (opens their profile) */
    onPressAuteur?: () => void
}
export default function MessageBubble({message,estDeMoi,groupe = false,afficherAuteur = false,onPressAuteur}: Props){
    const {colors} = usePalette()
    const {fonts} = useFont()
    const { t } = useTranslation('inbox')

    // In a group, the others' messages have their avatar on the left and their pseudo
    // under the bubble, only once per run (like Messenger). My messages don't change.
    const avecAuteur = groupe && !estDeMoi
    const avecPseudo = afficherAuteur && !!message.auteurPseudo

    const bulle = (
        <View
            style={[
                styles.bulle,
                estDeMoi
                    ? { backgroundColor: colors.secondary, borderBottomRightRadius: 4 }
                    : { backgroundColor: colors.card, borderBottomLeftRadius: 4 },
                avecAuteur && styles.bulleGroupe,
            ]}
        >
            {message.type === 'vocal'
                ? <VoiceMessageBubble message={message} estDeMoi={estDeMoi} />
                : (
                    <Text style={{ color: estDeMoi ? 'white' : colors.text, fontFamily: fonts.body, fontSize: 15 }}>
                        {message.contenu}
                    </Text>
                )
            }
            <Text
                style={[
                    styles.heure,
                    { color: estDeMoi ? 'rgba(255,255,255,0.7)' : colors.muted, fontFamily: fonts.body },
                ]}
            >
                {convertirTimestampHeure(message.envoyeLe)}
            </Text>
        </View>
    )

    if (!avecAuteur) {
        return (
            <View style={[styles.ligne,estDeMoi ? styles.ligneMoi : styles.ligneAmi]}>
                {bulle}
            </View>
        )
    }

    return(
        <View style={[styles.ligne, styles.ligneGroupe, afficherAuteur && styles.finSerie]}>
            {/* the avatar sits at the bottom of the bubble; an empty space keeps the run aligned */}
            <View style={[styles.colonneAvatar, avecPseudo && styles.avatarAuDessusDuPseudo]}>
                {afficherAuteur && (
                    <TouchableOpacity
                        onPress={onPressAuteur}
                        disabled={!onPressAuteur}
                        hitSlop={6}
                        accessibilityRole="button"
                        accessibilityLabel={t('infos.openProfile', { pseudo: message.auteurPseudo ?? '' })}
                    >
                        <ProfilPic size={TAILLE_AVATAR} pfp={message.auteurFpUrl} />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.colonneBulle}>
                {bulle}
                {avecPseudo && (
                    <Text
                        numberOfLines={1}
                        onPress={onPressAuteur}
                        suppressHighlighting
                        style={[styles.pseudo, { color: colors.muted, fontFamily: fonts.body }]}
                    >
                        {message.auteurPseudo}
                    </Text>
                )}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    ligne: { width: '100%', paddingHorizontal: 12, marginVertical: 3 },
    ligneMoi: { alignItems: 'flex-end' },
    ligneAmi: { alignItems: 'flex-start' },
    ligneGroupe: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
    finSerie: { marginBottom: 8 },
    colonneAvatar: { width: TAILLE_AVATAR },
    // lines the avatar up with the bottom of the bubble, not of the pseudo under it
    avatarAuDessusDuPseudo: { marginBottom: 17 },
    colonneBulle: { flex: 1, alignItems: 'flex-start' },
    bulle: {
        maxWidth: '78%',
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 9,
        gap: 4,
    },
    // the avatar column already takes some width
    bulleGroupe: { maxWidth: '85%' },
    pseudo: { fontSize: 11, marginTop: 3, marginLeft: 4 },
})
