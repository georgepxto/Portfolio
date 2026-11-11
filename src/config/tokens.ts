export const tokens = {
  avatar: 160,
  nameRow: 216,
  band: 32,
  titleRow: 60,
} as const;

export const mobileTokens = {
  avatar: 96,
  avatarPhoto: 94,
  cover: 120,
  band: 24,
} as const;

const desktopCover = tokens.nameRow - tokens.avatar - 1;

export const tokenCss = [
  `:root{--avatar:${tokens.avatar}px;--avatar-photo:${tokens.avatar}px;--cover:${desktopCover}px;--band:${tokens.band}px;--title-row:${tokens.titleRow}px}`,
  `@media (max-width:640px){:root{--avatar:${mobileTokens.avatar}px;--avatar-photo:${mobileTokens.avatarPhoto}px;--cover:${mobileTokens.cover}px;--band:${mobileTokens.band}px}}`,
].join('');
