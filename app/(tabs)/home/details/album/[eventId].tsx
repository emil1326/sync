import { Stack, useLocalSearchParams } from 'expo-router'
import { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Icon from '@react-native-vector-icons/ionicons'

import VisionneusePhotos from '@/components/visionneusePhotos'
import { useAPI } from '@/contextes/contexteAPI'
import { useFont } from '@/contextes/contexteFont'
import { usePalette } from '@/contextes/contextePalette'
import useAlbumEvenement from '@/hooks/useAlbumEvenement'

const COLONNES = 3
const ESPACE = 2

/**
 * An event's whole shared album (opened from its page): every photo in a grid, most
 * recent first, + in the header to add some. Tap a photo to see it full screen.
 */
export default function AlbumEvenementEcran() {
    const { t } = useTranslation('events')
    const { colors } = usePalette()
    const { fonts } = useFont()
    const { APIBaseURL } = useAPI()
    const { width } = useWindowDimensions()
    const { eventId } = useLocalSearchParams<{ eventId: string }>()
    const { photos, accessible, envoi, ajouter, supprimer } = useAlbumEvenement(eventId)
    const [indexVu, setIndexVu] = useState<number | null>(null)

    const cote = (width - ESPACE * (COLONNES - 1)) / COLONNES

    const options = useMemo(() => ({
        headerRight: () => (
            <TouchableOpacity onPress={ajouter} disabled={envoi || !accessible} hitSlop={10} accessibilityRole="button" accessibilityLabel={t('album.add')}>
                {envoi ? <ActivityIndicator color={colors.text} /> : <Icon name="add" size={28} color={colors.text} />}
            </TouchableOpacity>
        ),
    }), [ajouter, envoi, accessible, colors.text, t])

    let contenu
    if (photos === null) {
        contenu = <View style={s.centre}><ActivityIndicator color={colors.muted} /></View>
    } else if (!accessible) {
        contenu = <View style={s.centre}><Text style={{ color: colors.muted, fontFamily: fonts.body }}>{t('album.noAccess')}</Text></View>
    } else if (photos.length === 0) {
        contenu = (
            <View style={s.centre}>
                <Icon name="images-outline" size={48} color={colors.muted} />
                <Text style={[s.vide, { color: colors.muted, fontFamily: fonts.body }]}>{t('album.empty')}</Text>
                <TouchableOpacity onPress={ajouter} disabled={envoi} style={[s.bouton, { backgroundColor: colors.primary }]} accessibilityRole="button">
                    {envoi ? <ActivityIndicator color="white" /> : <Icon name="add" size={20} color="white" />}
                    <Text style={{ color: 'white', fontFamily: fonts.title, fontSize: 16 }}>{t('album.add')}</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        contenu = (
            <FlatList
                data={photos}
                keyExtractor={(p) => p.id}
                numColumns={COLONNES}
                columnWrapperStyle={{ gap: ESPACE }}
                contentContainerStyle={{ gap: ESPACE, paddingBottom: 24 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setIndexVu(index)}
                        accessibilityRole="imagebutton"
                        accessibilityLabel={t('album.open', { pseudo: item.auteur.pseudo })}
                        style={{ width: cote, height: cote, backgroundColor: colors.border }}
                    >
                        <Image source={{ uri: `${APIBaseURL}${item.url}` }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <View style={[s.page, { backgroundColor: colors.background }]}>
            <Stack.Screen options={options} />
            {contenu}
            <VisionneusePhotos
                photos={photos ?? []}
                indexDepart={indexVu}
                onFermer={() => setIndexVu(null)}
                onSupprimer={(photo) => supprimer(photo, () => { if ((photos?.length ?? 0) <= 1) setIndexVu(null) })}
            />
        </View>
    )
}

const s = StyleSheet.create({
    page: { flex: 1 },
    centre: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
    vide: { fontSize: 16, textAlign: 'center' },
    bouton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 18,
        height: 46,
        borderRadius: 12,
    },
})
