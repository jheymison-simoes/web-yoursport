import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeTypeEnum } from 'src/app/enumerations/theme-type-enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor(private overlayContainer: OverlayContainer) {
    this.addTheme(this.theme);
  }

  get theme(): ThemeTypeEnum {
    let themeStorage = localStorage.getItem('theme');
    if(!themeStorage) return ThemeTypeEnum.Light;

    switch(themeStorage){
      case ThemeTypeEnum.Light:
        return ThemeTypeEnum.Light;
      case ThemeTypeEnum.Dark:
        return ThemeTypeEnum.Dark;
      default:
        return ThemeTypeEnum.Light;
    }
  }

  set theme(theme: ThemeTypeEnum) {
    localStorage.setItem('theme', theme);
  }

  private addTheme(theme: ThemeTypeEnum): void {
    const overlayclassList = this.overlayContainer.getContainerElement().classList;
    const themesRemove = Array.from(overlayclassList).filter((i: string) => i.includes('-theme'));

    if (themesRemove.length) {
      overlayclassList.remove(...themesRemove);
      document.body.classList.remove(...themesRemove);
    }

    overlayclassList.add(theme.toLowerCase() + '-theme');
    document.body.classList.add(theme.toLowerCase() + '-theme');

    this.theme = theme;
  }

  addThemeLight = (): void => this.addTheme(ThemeTypeEnum.Light);

  addThemeDark = (): void => this.addTheme(ThemeTypeEnum.Dark);
}
