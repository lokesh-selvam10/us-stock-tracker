// import { Basic, NormalTheme, DarkTheme } from './themes/';
import Basic from "./themes//basic"
import NormalTheme from "./themes/normalTheme"
import DarkTheme from "./themes/darkTheme"
import Themes from "./themes.js";

export const getThemes = themeName => {
  // console.log("getheme",themeName)
  switch (themeName) {
    case Themes.NormalTheme:
      return NormalTheme;
    case Themes.DarkTheme: return DarkTheme;
    default: return Basic
  }
};