import { useState } from 'react'
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Icon from '@react-native-vector-icons/ionicons'

import { usePalette } from '@/contextes/contextePalette'
import { Message } from '@/types/messaging'

const LARGEUR = 220
const HAUTEUR_MIN = 120
const HAUTEUR_MAX = 300

type Props = {
    message: Message
}

/**
 * A photo sent in a conversation: shown at its own shape (once loaded) in the bubble,
 * tapped to see it full screen (tap again or the ✕ to close).
 */
export default function ImageMessageBubble({ message }: Props) {
    const { colors } = usePalette()
    const { t } = useTranslation('inbox')
    // width / height of the photo, known once it's loaded (square until then)
    const [ratio, setRatio] = useState(1)
    const [chargee, setChargee] = useState(false)
    const [pleinEcran, setPleinEcran] = useState(false)

    const hauteur = Math.min(HAUTEUR_MAX, Math.max(HAUTEUR_MIN, LARGEUR / ratio))

    if (!message.imageUrl) return null

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setPleinEcran(true)}
                accessibilityRole="imagebutton"
                accessibilityLabel={t('photo.open')}
                style={[s.cadre, { width: LARGEUR, height: hauteur, backgroundColor: colors.border }]}
            >
                <Image
                    source={{ uri: message.imageUrl }}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                    onLoad={(e) => {
                        const { width, height } = e.nativeEvent.source
                        if (width > 0 && height > 0) setRatio(width / height)
                        setChargee(true)
                    }}
                />
                {!chargee && <ActivityIndicator style={StyleSheet.absoluteFill} color={colors.muted} />}
            </TouchableOpacity>

            <Modal visible={pleinEcran} transparent animationType="fade" onRequestClose={() => setPleinEcran(false)} statusBarTranslucent>
                <Pressable style={s.fond} onPress={() => setPleinEcran(false)} accessibilityLabel={t('photo.close')}>
                    <Image source={{ uri: message.imageUrl }} style={s.pleineImage} resizeMode="contain" />
                </Pressable>
                <View style={s.barreHaut} pointerEvents="box-none">
                    <TouchableOpacity
                        onPress={() => setPleinEcran(false)}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel={t('photo.close')}
                        style={s.fermer}
                    >
                        <Icon name="close" size={26} color="white" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    )
}

const s = StyleSheet.create({
    cadre: { borderRadius: 12, overflow: 'hidden' },
    fond: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center' },
    pleineImage: { width: '100%', height: '100%' },
    barreHaut: { position: 'absolute', top: 56, right: 16 },
    fermer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
})
