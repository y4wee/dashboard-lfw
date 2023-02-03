export const useCurrentUser = () => useState("currentUser", () => null);
export const useDataCandidacy: any = () => useState("dataCandidacy", () => []);
export const useUtilsBarIndex = () => useState("utilsBarIndex", () => '0');
export const useSearchCandidacy = () => useState("searchCandidacy", () => "");