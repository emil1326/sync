import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTutoriel } from "@/contextes/contexteTutoriel";
import { usePalette } from "@/contextes/contextePalette";
import { useFont } from "@/contextes/contexteFont";
import {
  getEtape,
  getExplication,
  nbExplications,
} from "@/constants/etapesTutoriel";
import Radius from "@/constants/Radius";
import { SpotlightOverlay } from "./spotlightOverlay";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
  /** Ref de l'élément cible à mesurer pour le spotlight (optionnel) */
  targetRef?: React.RefObject<View>;
  /** Coordonnées manuelles du trou si pas de targetRef */
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  radius?: number;
};

/**
 * TutorielEcran : écran de guidage interactif.
 *
 * Affiche le trou lumineux sur la cible de l'étape courante, une bulle
 * explicative (titre + message), gère les explications intermédiaires
 * (clic sur l'écran → prochaine explication), et les boutons « Suivant »
 * / « Passer » (avec confirmation).
 *
 * Utilise usePalette() et useFont() pour les couleurs et polices de l'app.
 */
export function TutorielEcran({
  targetRef,
  x: xProp,
  y: yProp,
  width: wProp,
  height: hProp,
  radius = Radius.md,
}: Props) {
  const { t } = useTranslation();
  const { colors } = usePalette();
  const { fonts } = useFont();
  const {
    step,
    isCompleted,
    isTutorialMode,
    explicationIndex,
    nextExplication,
    skipTutorial,
  } = useTutoriel();
  const insets = useSafeAreaInsets();

  const etape = getEtape(step);

  // Hooks
  const [x, setX] = React.useState(xProp ?? SCREEN_WIDTH / 2 - 100);
  const [y, setY] = React.useState(yProp ?? 200);
  const [width, setWidth] = React.useState(wProp ?? 200);
  const [height, setHeight] = React.useState(hProp ?? 60);

  const mesurerCible = React.useCallback(() => {
    if (!targetRef?.current) return;
    targetRef.current.measureInWindow((fx, yPos, fw, fh) => {
      setX(fx);
      setY(yPos);
      setWidth(fw);
      setHeight(fh);
    });
  }, [targetRef]);

  React.useEffect(() => {
    mesurerCible();
  }, [step, etape?.id, mesurerCible]);

  // Guard
  if (!isTutorialMode || isCompleted || !etape) return null;

  // Texte affiché : explication courante si disponible, sinon message de l'étape
  const explication = getExplication(etape, explicationIndex);
  const afficherExplication =
    !!explication && explicationIndex < nbExplications(etape);
  const titre = afficherExplication ? t(explication.text) : t(etape.title);
  const message = afficherExplication ? "" : t(etape.message);

  return (
    <View style={styles.conteneur}>
      {/* Badge « Mode démo » */}
      <View style={styles.badge}>
        <Text style={[styles.badgeText, { fontFamily: fonts.body }]}>Tuto</Text>
      </View>

      {/* Spotlight : trou lumineux sur la cible */}
      <SpotlightOverlay
        x={x}
        y={y}
        width={width}
        height={height}
        radius={radius}
      />

      {/* Bulle explicative (positionnée au-dessus du spotlight) */}
      <View style={[styles.bulle, { backgroundColor: colors.background }]}>
        {titre && (
          <Text style={[styles.titre, { color: colors.text, fontFamily: fonts.title }]}>
            {titre}
          </Text>
        )}
        {message && (
          <Text style={[styles.message, { color: colors.text, fontFamily: fonts.body }]}>
            {message}
          </Text>
        )}
      </View>

      {/* Zone tactile pour passer à l'explication suivante / étape suivante */}
      <TouchableOpacity
        style={styles.zoneTactile}
        onPress={() => {
          nextExplication();
        }}
      />

      {/* Boutons d'action */}
      <View style={styles.boutons}>
        <TouchableOpacity
          style={styles.boutonPasser}
          onPress={() => {
            Alert.alert(
              t("tuto.passer.titre"),
              t("tuto.passer.message"),
              [
                { text: t("tuto.passer.annuler"), style: "cancel" },
                {
                  text: t("tuto.passer.confirmer"),
                  onPress: async () => {
                    await skipTutorial();
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={[styles.boutonText, { color: colors.text, fontFamily: fonts.body }]}>
            {t("tuto.bouton_passer")}
          </Text>
        </TouchableOpacity>

        {!afficherExplication && (
          <TouchableOpacity
            style={[styles.boutonSuivant, { backgroundColor: colors.primary }]}
            onPress={() => {
              // Si on a une successCondition, on attend que l'écran cible la valide.
              // Sinon (pas de condition, juste « toucher Suivant »), on avance.
              if (
                !etape.successCondition ||
                etape.successCondition.endsWith("_suivant")
              ) {
                nextExplication();
              }
            }}
          >
            <Text style={[styles.boutonText, { color: colors.text, fontFamily: fonts.body }]}>
              {t("tuto.bouton_suivant")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "transparent",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 100,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffd700",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  bulle: {
    position: "absolute",
    zIndex: 50,
    margin: 20,
    maxWidth: SCREEN_WIDTH - 40,
    borderRadius: Radius.lg,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  titre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
  },
  zoneTactile: {
    ...StyleSheet.absoluteFill,
    zIndex: 30,
    backgroundColor: "transparent",
  },
  boutons: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    zIndex: 60,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  boutonPasser: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 10,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  boutonSuivant: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignItems: "center",
  },
  boutonText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
