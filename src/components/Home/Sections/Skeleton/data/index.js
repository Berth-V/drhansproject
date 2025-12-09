import partsDataEn from "./partsData";
import partsDataEs from "./partsData_es";
import i18n from "../../../../../i18n";

export function getPartsData() {
    return i18n.language === "es" ? partsDataEs : partsDataEn;
}
