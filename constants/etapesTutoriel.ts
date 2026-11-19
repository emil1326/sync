/**
 * Définition des 11 étapes du tutoriel interactif Sync.
 *
 * Chaque étape :
 * - id            : numéro d'étape (1..11)
 * - screen        : nom de la route Expo Router ciblée
 * - target        : testID de l'élément à éclairer par le trou lumineux
 * - title         : clé de traduction pour le titre de la bulle
 * - message       : clé de traduction pour le message de la bulle
 * - successCondition : condition qui fait avancer (action réelle requise)
 * - explications? : tableau d'explications intermédiaires affichées avant
 *                   la condition de succès. Chaque explication a une
 *                   position de bulle et un texte. Clic sur l'écran ou
 *                   flèche → explication suivante. Quand il n'y en a
 *                   plus, on attend la successCondition.
 */
export type ExplicationTutoriel = {
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  target?: string;
  text: string; // clé de traduction
};

export type EtapeTutoriel = {
  id: number;
  screen: string;
  target: string;
  title: string; // clé de traduction
  message: string; // clé de traduction
  successCondition: string;
  explications?: ExplicationTutoriel[];
};

export const ETAPES_TUTORIEL: EtapeTutoriel[] = [
  
  //1 Accueil et timelines
  {
    id: 1,
    screen: '(tabs)/home',
    target: 'tuto-ecran-accueil',
    title: 'tuto.etape1.titre',
    message: 'tuto.etape1.message',
    successCondition: 'tuto.etape1.suivant',
    explications:[
      {
        position: {x: 20, y: 200, width: 500, height: 500},
        text:'tuto.etape1.explication1',
        target: 'tuto-timeline',
      }
    ]
  },

  // 2 Indisponibilité (sommeil)
  {
    id: 2,
    screen: '(tabs)/home/create',
    target: 'tuto-bouton-creer-indisponibilite',
    title: 'tuto.etape2.titre',
    message: 'tuto.etape2.message',
    successCondition: 'indisponibilite_creee', // indisponibilité créée (pré-remplie, récurrente)
    explications: [
      {
        position: { x: 20, y: 200, width: 300, height: 60 },
        text: 'tuto.etape2.explication1',
      },
    ],
  },

  // 3 Création d'événement
  {
    id: 3,
    screen: '(tabs)/home/create',
    target: 'tuto-bouton-creer-evenement',
    title: 'tuto.etape3.titre',
    message: 'tuto.etape3.message',
    successCondition: 'evenement_cree', // événement créé avec un seul créneau commun proposé
  },

  // 4 Effet sur la timeline
  {
    id: 4,
    screen: '(tabs)',
    target: 'tuto-bloc-evenement-timeline',
    title: 'tuto.etape4.titre',
    message: 'tuto.etape4.message',
    successCondition: 'tuto.etape4.suivant', // toucher « Suivant » après l'animation
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 5 — Inviter un ami
  // ─────────────────────────────────────────────────────────────
  {
    id: 5,
    screen: '(modals)/ajouterAmi',
    target: 'tuto-choix-ami-lea',
    title: 'tuto.etape5.titre',
    message: 'tuto.etape5.message',
    successCondition: 'invitation_envoyee', // ami choisi et invité (acceptation auto)
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 6 — Groupe de discussion
  // ─────────────────────────────────────────────────────────────
  {
    id: 6,
    screen: '(tabs)',
    target: 'tuto-onglet-messages',
    title: 'tuto.etape6.titre',
    message: 'tuto.etape6.message',
    successCondition: 'groupe_ouvert', // page des messages + groupe de l'événement ouverte
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 7 — Profil
  // ─────────────────────────────────────────────────────────────
  {
    id: 7,
    screen: '(tabs)',
    target: 'tuto-onglet-profil',
    title: 'tuto.etape7.titre',
    message: 'tuto.etape7.message',
    successCondition: 'profil_ouvert', // page profil ouverte
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 8 — Ajouter un ami (QR)
  // ─────────────────────────────────────────────────────────────
  {
    id: 8,
    screen: 'scanQR',
    target: 'tuto-bouton-qr',
    title: 'tuto.etape8.titre',
    message: 'tuto.etape8.message',
    successCondition: 'modal_qr_ouvert', // modal du code QR ouvert
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 9 — Réglages et import de calendrier
  // ─────────────────────────────────────────────────────────────
  {
    id: 9,
    screen: '(tabs)',
    target: 'tuto-onglet-reglages',
    title: 'tuto.etape9.titre',
    message: 'tuto.etape9.message',
    successCondition: 'ecran_import_ouvert', // réglages puis écran d'import ouverts
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 10 — Thème
  // ─────────────────────────────────────────────────────────────
  {
    id: 10,
    screen: '(tabs)',
    target: 'tuto-option-theme',
    title: 'tuto.etape10.titre',
    message: 'tuto.etape10.message',
    successCondition: 'option_theme_ouverte', // option du thème ouverte
  },

  // ─────────────────────────────────────────────────────────────
  // Étape 11 — Conclusion
  // ─────────────────────────────────────────────────────────────
  {
    id: 11,
    screen: '(tabs)',
    target: 'tuto-bouton-terminer',
    title: 'tuto.etape11.titre',
    message: 'tuto.etape11.message',
    successCondition: 'tuto_termine', // terminer → base fictive supprimée, flag = true
  },
];

export const getEtape = (id: number): EtapeTutoriel | undefined =>
  ETAPES_TUTORIEL.find((e) => e.id === id);

export const getEtapeCourante = (step: number): EtapeTutoriel | undefined =>
  getEtape(step);

export const getExplication = (
  etape: EtapeTutoriel,
  index: number
): ExplicationTutoriel | undefined =>
  etape.explications?.[index];

export const nbExplications = (etape: EtapeTutoriel): number =>
  etape.explications?.length ?? 0;
