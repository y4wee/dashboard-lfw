export const useCurrentUser = () => useState("currentUser", () => {
    return {};
});
export const useDataCandidacy: any = () => useState("dataCandidacy", () => []);
export const useDataUser: any = () => useState("dataUser", () => []);
export const useUtilsBarIndex = () => useState("utilsBarIndex", () => '0');
export const useSearchCandidacy = () => useState("searchCandidacy", () => "");
export const useUpdateCandidacyData = () => useState("updateCandidacyData", () => null);