import messages from "../locale/messages.json";

export class Utils {
  protected static readonly win: Window = window;
  protected static readonly doc: Document = Utils.win.document;
  protected static readonly localStorage: Storage = Utils.win.localStorage;

  protected static readonly TOKEN_NAME = 'utk';
  protected static readonly USER_NAME = 'user';

  static getSessionToken(): string {
    return Utils.localStorage?.getItem(Utils.TOKEN_NAME) ?? '';
  }

  static isLoggedIn(): boolean {
     if (Utils.getSessionToken() === '' || !Utils.getSessionToken()) return false;
    return true;
  }

  static setSessionToken(token: string) {
    Utils.localStorage.setItem(Utils.TOKEN_NAME, token)
  }

  static setUser(user: any) {
    Utils.localStorage.setItem(Utils.USER_NAME, JSON.stringify(user))
  }

  static removeSessionToken() {
    Utils.localStorage.removeItem(Utils.TOKEN_NAME);
    Utils.localStorage.removeItem(Utils.USER_NAME);
  }

  static getUser(): any {
    return {
        ...JSON.parse(Utils.localStorage.getItem(Utils.USER_NAME) ?? '{}')
    }
  }

  static confirmAlert(message: string) {
    return Utils.win.confirm(message)
  }

  static t(message: string, lang: string = 'fr'): string {
    const translations: Record<string, string> = {...messages['translations']}
    if (!(message in translations)) return message;
    return translations[message];
  }
}
