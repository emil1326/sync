import { router } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Icon from '@react-native-vector-icons/ionicons'

import VisionneusePhotos from '@/components/visionneusePhotos'
import { useAPI } from '@/contextes/contexteAPI'
import { useFont } from '@/contextes/contexteFont'
import { usePalette } from '@/contextes/contextePalette'
import useAlbumEvenement from '@/hooks/useAlbumEvenement'

const TAILLE = 72
const MAX_APERCU = 10

type Props = {
    /** the event's public id */
    idEvenement: string
}

/**
 * The event's shared photo album, as a block of its page: the latest photos in a strip,
 * a + to add some (several at once), "See all" for the whole album. Every member of the
 * event (its creator and the participants who accepted) can add photos. Not shown to
 * someone who isn't in the event.
 */
export default function AlbumEvenement({ idEvenement }: Props) {
    const { t } = useTranslation('events')
    const { colors } = usePalette()
    const { fonts } = useFont()
    const { APIBaseURL } = useAPI()
    const { photos, accessible, envoi, ajouter, supprimer } = useAlbumEvenement(idEvenement)
    const [indexVu, setIndexVu] = useState<number | null>(null)

    if (!accessible || photos === null) return null

    const apercu = photos.slice(0, MAX_APERCU)
    const ouvrirAlbum = () => router.push({ pathname: '/(tabs)/home/details/album/[eventId]', params: { eventId: idEvenement } })

    return (
        <View style={[s.bloc, { backgroundColor: colors.card }]}>
            <View style={s.entete}>
                <View style={s.titre}>
                    <Icon name="images-outline" size={22} color={colors.text} />
                    <Text style={[s.texteTitre, { color: colors.text, fontFamily: fonts.body }]}>
                        {t('album.title')}{photos.length > 0 ? ` · ${photos.length}` : ''}
                    </Text>
                </View>
                {photos.length > 0 && (
                    <TouchableOpacity onPress={ouvrirAlbum} hitSlop={8} style={s.voirTout} accessibilityRole="button">
                        <Text style={{ color: colors.muted, fontFamily: fonts.body, fontSize: 14 }}>{t('album.seeAll')}</Text>
                        <Icon name="chevron-forward" size={16} color={colors.muted} />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.bande}>
                <TouchableOpacity
                    onPress={ajouter}
                    disabled={envoi}
                    accessibilityRole="button"
                    accessibilityLabel={t('album.add')}
                    accessibilityState={{ busy: envoi }}
                    style={[s.case, s.ajouter, { borderColor: colors.border }]}
                >
                    {envoi
                        ? <ActivityIndicator color={colors.muted} />
                        : <Icon name="add" size={30} color={colors.muted} />}
                </TouchableOpacity>
                {apercu.map((p, i) => (
                    <TouchableOpacity
                        key={p.id}
                        onPress={() => setIndexVu(i)}
                        accessibilityRole="imagebutton"
                        accessibilityLabel={t('album.open', { pseudo: p.auteur.pseudo })}
                        style={[s.case, { backgroundColor: colors.border }]}
                    >
                        <Image source={{ uri: `${APIBaseURL}${p.url}` }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    </TouchableOpacity>
                ))}
                {photos.length > MAX_APERCU && (
                    <TouchableOpacity onPress={ouvrirAlbum} style={[s.case, s.ajouter, { borderColor: colors.border }]} accessibilityRole="button">
                        <Text style={{ color: colors.muted, fontFamily: fonts.title, fontSize: 16 }}>+{photos.length - MAX_APERCU}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {photos.length === 0 && (
                <Text style={[s.vide, { color: colors.muted, fontFamily: fonts.body }]}>{t('album.empty')}</Text>
            )}

            <VisionneusePhotos
                photos={apercu}
                indexDepart={indexVu}
                onFermer={() => setIndexVu(null)}
                onSupprimer={(photo) => supprimer(photo, () => { if (apercu.length <= 1) setIndexVu(null) })}
            />
        </View>
    )
}

const s = StyleSheet.create({
    bloc: { borderRadius: 16, padding: 14, gap: 12 },
    entete: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    titre: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    texteTitre: { fontSize: 18 },
    voirTout: { flexDirection: 'row', alignItems: 'center', gap: 2 },
    bande: { gap: 8 },
    case: { width: TAILLE, height: TAILLE, borderRadius: 10, overflow: 'hidden' },
    ajouter: { borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
    vide: { fontSize: 14 },
})
