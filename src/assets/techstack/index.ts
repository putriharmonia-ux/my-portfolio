// Selected tech stack icons for portfolio
import Python from './Python.svg';
import MySQL from './MySQL.svg';
import SQLite from './SQLite.svg';
import Firebase from './Firebase.svg';
import GoogleAppsScript from './GoogleAppsScript.svg';
import GoogleDataStudio from './GoogleDataStudio.svg';
import GoogleSheets from './GoogleSheets.svg';
import GoogleAppSheet from './GoogleAppSheet.svg';
import GoogleSites from './GoogleSites.svg';
import MicrosoftExcel from './MicrosoftExcel.svg';
import MicrosoftWord from './MicrosoftWord.svg';
import MicrosoftPowerPoint from './MicrosoftPowerPoint.svg';
import MicrosoftAccess from './MicrosoftAccess.svg';
import MicrosoftVisio from './MicrosoftVisio.svg';
import Arduino from './Arduino.svg';
import Odoo from './Odoo.svg';
import DrawIO from './DrawIO.svg';
import Anvil from './Anvil.svg';
import WordPress from './WordPress.svg';
import Canva from './Canva.svg';
import VSCode from './VSCode.svg';
import Tkinter from './Tkinter.svg';
import Matplotlib from './Matplotlib.svg';
import Pandas from './Pandas.svg';

export const techStackIcons = {
  Python,
  MySQL,
  SQLite,
  Firebase,
  GoogleAppsScript,
  GoogleDataStudio,
  GoogleSheets,
  GoogleAppSheet,
  GoogleSites,
  MicrosoftExcel,
  MicrosoftWord,
  MicrosoftPowerPoint,
  MicrosoftAccess,
  MicrosoftVisio,
  Arduino,
  Odoo,
  DrawIO,
  Anvil,
  WordPress,
  Canva,
  VSCode,
  Tkinter,
  Matplotlib,
  Pandas,
};

export const techStackArray = Object.entries(techStackIcons).map(([name, icon]) => ({ name, icon }));

export default techStackIcons;
