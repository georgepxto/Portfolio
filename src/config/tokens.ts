export const tokens = {
  avatar: 160,
  avatarMobile: 96,
  coverMobile: 96,
  nameRow: 216,
  band: 32,
  titleRow: 60,
} as const;

export const tokenStyle = [
  `--avatar: ${tokens.avatar}px`,
  `--avatar-mobile: ${tokens.avatarMobile}px`,
  `--cover-mobile: ${tokens.coverMobile}px`,
  `--name-row: ${tokens.nameRow}px`,
  `--band: ${tokens.band}px`,
  `--title-row: ${tokens.titleRow}px`,
].join('; ');
