interface IErrorMessage {
    ALREADY_EXIST: string;
    NOT_FOUND: string;
    SEO_DELETE_SUCCESS: string,
    BANNER_NOT_FOUND: string,
    BANNER_DELETE_SUCCESS: string,
    PAGE_NOT_FOUND: string,
    PAGE_DELETE_SUCCESS: string,
    PAGE_ALREADY_EXIST: string,
}

interface ILanguageMessages {
    en: IErrorMessage;
    hi: IErrorMessage;
}

export {
    IErrorMessage,
    ILanguageMessages
}