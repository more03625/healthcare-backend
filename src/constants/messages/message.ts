import { IncomingHttpHeaders } from "http";
import { IErrorMessage } from "../../interfaces";

const message: { [key: string]: IErrorMessage } = {
    en: {
        ALREADY_EXIST: "Seo already exists with this URL!",
        NOT_FOUND: "There are no SEO Entries for the used filters!",
        SEO_DELETE_SUCCESS: "Seo has been deleted successfully!",

        // Banners
        BANNER_NOT_FOUND: "Unable to find this banner",
        BANNER_DELETE_SUCCESS: "Banner has been deleted successfully!",

    },
    hi: {
        ALREADY_EXIST: "इस URL के साथ SEO पहले से मौजूद है!",
        NOT_FOUND: "उपयोग किए गए फ़िल्टर के लिए कोई SEO प्रविष्टियाँ नहीं हैं!",
        SEO_DELETE_SUCCESS: "SEO सफलतापूर्वक हटा दिया गया है!",

        // Banners
        BANNER_NOT_FOUND: "यह बैनर ढूंढने में असमर्थ",
        BANNER_DELETE_SUCCESS: "बैनर सफलतापूर्वक हटा दिया गया है!",
    }
};

export const t = (errorName: string, headers: IncomingHttpHeaders): string => {
    const locale = headers['x-locale'] ? (Array.isArray(headers['x-locale']) ? headers['x-locale'][0] : headers['x-locale']) : 'en';
    return message[locale as keyof typeof message][errorName as keyof IErrorMessage];
};
