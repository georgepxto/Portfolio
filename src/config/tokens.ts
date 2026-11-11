export const tokens = {
  avatar: 160,
  avatarMobile: 96,
  coverMobile: 96,
  nameRow: 216,
  band: 32,
  sectionPad: 72,
} as const;

export const tokenStyle = [
  `--avatar: ${tokens.avatar}px`,
  `--avatar-mobile: ${tokens.avatarMobile}px`,
  `--cover-mobile: ${tokens.coverMobile}px`,
  `--name-row: ${tokens.nameRow}px`,
  `--band: ${tokens.band}px`,
  `--section-pad: ${tokens.sectionPad}px`,
].join('; ');
