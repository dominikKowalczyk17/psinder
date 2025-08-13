/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */


import { useTheme } from '../stores/ThemeContext';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const { theme, themeType } = useTheme();
  const colorFromProps = props[themeType];

  // Try to resolve color from props, then from theme object
  if (colorFromProps) {
    return colorFromProps;
  }
  // Try to resolve nested keys (e.g. 'text.primary')
  const keys = colorName.split('.');
  let color: any = theme;
  for (const key of keys) {
    if (color && key in color) {
      color = color[key];
    } else {
      color = undefined;
      break;
    }
  }
  if (typeof color === 'string') {
    return color;
  }
  // fallback
  return '#000';
}
