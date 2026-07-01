// Components.d.ts — the complete catalog of the 12 component(s) in
// Components.bundle.js. READ THIS FILE BEFORE USING THE BUNDLE: component
// names are derived from Figma layer names (sanitized to PascalCase,
// deduplicated) and may differ from what the design calls them — the
// "figma layer" comment above each interface maps them back.
// After the bundle <script> loads, every component is a window global
// (e.g. window.Btn) and usable directly in JSX.
import * as React from 'react';

// figma layer: "互動btn" (node 1:203)
export interface BtnProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "2";
  prop?: "2" | "1";
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
}

// figma layer: "btn-text" (node 1:261)
export interface BtnText2Props {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "variant2" | "variant3";
  /** Text content; defaults to "ENTER". */
  text1?: string;
}

// figma layer: "文字框" (node 1:227)
export interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  prop?: boolean;
  property1?: "小的" | "大的";
  device?: "default" | "mb";
  /** Text content; defaults to "字". */
  text1?: string;
  /** Text content; defaults to "A". */
  text2?: string;
}

// figma layer: "dialog" (node 1:84)
export interface DialogProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "default" | "filled";
  /** Text content; defaults to "｜Type here...". */
  text1?: string;
}

// figma layer: "emoji" (node 1:90)
export interface EmojiProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "台啤" | "板凳" | "天燈" | "地瓜" | "101" | "雞排" | "臭豆腐" | "糖葫蘆" | "茄芷袋 qié zhǐ dài" | "珍奶" | "小籠包" | "蚵仔煎" | "滷肉飯" | "牛肉麵" | "作業簿 zuò yè bù" | "車輪餅" | "藍白拖";
}

// figma layer: "emoji" (node 1:162)
export interface Emoji2Props {
  className?: string;
  style?: React.CSSProperties;
  property1?: "台啤" | "板凳" | "天燈" | "地瓜" | "101" | "雞排" | "臭豆腐" | "糖葫蘆" | "茄芷袋 qié zhǐ dài" | "珍奶" | "小籠包" | "蚵仔煎" | "滷肉飯" | "牛肉麵" | "作業簿 zuò yè bù" | "車輪餅" | "藍白拖" | "歪腰郵筒";
}

// figma layer: "互動區-header" (node 1:812)
export interface HeaderProps {
  className?: string;
  style?: React.CSSProperties;
  /** Text content; defaults to "Send A Taiwan Hello". */
  text1?: string;
}

// figma layer: "icon" (node 1:17)
export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "ic:outline-search" | "lsicon:earth-outline" | "send" | "→" | "map" | "variant6" | "variant7" | "variant8" | "location" | "dropdown" | "定位" | "retry" | "dl" | "share" | "menu";
}

// figma layer: "postcard" (node 1:295)
export interface PostcardProps {
  className?: string;
  style?: React.CSSProperties;
  property1?: "en-輸入" | "emoji" | "tc-轉譯中" | "en-done" | "tc-done" | "en-轉譯中";
  /** Text content; defaults to "Greetings from Taiwan! ". */
  text1?: string;
  /** Text content; defaults to "Studying Mandarin and rocking the 'Taiwanese Gucci bag' now. ". */
  text2?: string;
  /** Text content; defaults to " |". */
  text3?: string;
  /** Text content; defaults to "收件人 Receiver". */
  text4?: string;
  /** Swappable nested instance; defaults to the design's. */
  icon1?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon3?: React.ReactNode;
  /** Swappable nested instance; defaults to the design's. */
  icon4?: React.ReactNode;
}

// figma layer: "互動1" (node 1:571)
export interface ScreenProps {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "互動2-寄信" (node 1:799)
export interface Screen2Props {
  className?: string;
  style?: React.CSSProperties;
}

// figma layer: "互動2-收信" (node 1:905)
export interface Screen3Props {
  className?: string;
  style?: React.CSSProperties;
}

declare const Btn: React.FC<BtnProps>;
declare const BtnText2: React.FC<BtnText2Props>;
declare const Component: React.FC<ComponentProps>;
declare const Dialog: React.FC<DialogProps>;
declare const Emoji: React.FC<EmojiProps>;
declare const Emoji2: React.FC<Emoji2Props>;
declare const Header: React.FC<HeaderProps>;
declare const Icon: React.FC<IconProps>;
declare const Postcard: React.FC<PostcardProps>;
declare const Screen: React.FC<ScreenProps>;
declare const Screen2: React.FC<Screen2Props>;
declare const Screen3: React.FC<Screen3Props>;
declare global {
  interface Window {
    Btn: React.FC<BtnProps>;
    BtnText2: React.FC<BtnText2Props>;
    Component: React.FC<ComponentProps>;
    Dialog: React.FC<DialogProps>;
    Emoji: React.FC<EmojiProps>;
    Emoji2: React.FC<Emoji2Props>;
    Header: React.FC<HeaderProps>;
    Icon: React.FC<IconProps>;
    Postcard: React.FC<PostcardProps>;
    Screen: React.FC<ScreenProps>;
    Screen2: React.FC<Screen2Props>;
    Screen3: React.FC<Screen3Props>;
  }
}
