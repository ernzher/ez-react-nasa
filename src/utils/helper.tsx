import { FaMars, FaVenus } from "react-icons/fa";

export const convertToPounds = (kg: number): number => Math.round(kg * 2.205);

export const convertToFoot = (meters: number): string => {
  let foot = meters * 3.28084;
  let footStr = Math.ceil(foot * 10).toString();
  switch (footStr.length) {
    case 2:
      return `${footStr.charAt(0)} ' ${footStr.charAt(1)}''`;
    case 3:
      return `${footStr.substring(0, 2)} ' ${footStr.charAt(2)}''`;
    default:
      return `${footStr.substring(0, 3)} ' ${footStr.charAt(3)}''`;
  }
};

export const toCapitalCase = (text: string): string =>
  text.charAt(0).toUpperCase() + (text.length > 1 && text.slice(1));

export const processString = (text: string): string =>
  text.replace(/\f|\n|-/g, " ");

export const renderGender = (gender: string | null) => {
  switch (gender) {
    case "f":
      return <FaVenus />;
    case "m":
      return <FaMars />;
    default:
      return;
  }
};
