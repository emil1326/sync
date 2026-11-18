import Icon from "@react-native-vector-icons/ionicons";
import { router, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

import { useFont } from "@/contextes/contexteFont";
import { usePalette } from "@/contextes/contextePalette";

export default function InboxLayout() {
    const { t } = useTranslation('inbox')
    const { fonts } = useFont()
    const { colors } = usePalette()
    return (
        <Stack screenOptions={{ headerTransparent: false, headerTitleStyle: { fontFamily: fonts.title } }}>
            {/* The conversations list: a header like the other tabs ("Messages"), with a
                button to write to a friend (same as the + of the tab bar) */}
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: t('title'),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.push({ pathname: '/(modals)/listeAmis', params: { type: 'message' } })}
                            hitSlop={10}
                            accessibilityRole="button"
                            accessibilityLabel={t('newMessage')}
                        >
                            <Icon name="create-outline" size={24} color={colors.text} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="[conversationId]"
                // seulement la flèche "<", sans le nom de l'écran précédent
                options={{ headerBackButtonDisplayMode: 'minimal' }}
            />
            {/* Conversation info (tap on its title) and a member's profile opened from it */}
            <Stack.Screen
                name="infos/[conversationId]"
                options={{ headerBackButtonDisplayMode: 'minimal', headerTitle: '' }}
            />
            <Stack.Screen
                name="profil/[membreId]"
                options={{ headerBackButtonDisplayMode: 'minimal', headerTitle: '' }}
            />
            {/* All the photos of a conversation (from its info; the screen sets its title) */}
            <Stack.Screen
                name="photos/[conversationId]"
                options={{ headerBackButtonDisplayMode: 'minimal' }}
            />
        </Stack>
    )
}
