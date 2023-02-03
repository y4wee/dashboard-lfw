<script setup>
const dataCandidacy = useDataCandidacy();
const searchCandidacy = useSearchCandidacy();

const candidacyRefus = computed(() => {
    return dataCandidacy.value.filter(
        (candidacy) => candidacy.state === "refus"
    );
});
</script>

<template>
    <div class="candidacyRefus">
        <h1 class="candidacyRefusTitle">
            {{ candidacyRefus.length }}
            {{
                candidacyRefus.length > 1
                    ? "Candidatures rejetées"
                    : "Candidature rejetée"
            }}
        </h1>
        <div class="candidacyRefusContainer">
            <CardCandidacy
                v-for="candidacy in candidacyRefus"
                :key="candidacy.id"
                :candidacy="candidacy"
                v-show="
                    searchCandidacy
                        ? candidacy.name
                              .toLowerCase()
                              .startsWith(searchCandidacy.toLowerCase())
                        : true
                "
            />
        </div>
    </div>
</template>

<style lang="scss">
$colorBack: #e1d8cf;
$colorContainer: #373741;
$colorGray: #22272c;
$colorGreen: #7ed8b2;
$colorOrange: #ffa45c;
$colorRed: #ff5959;

.candidacyRefus {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    &Title {
        color: $colorGray;
        text-align: center;
        text-decoration: underline $colorGreen;
    }
    &Container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }
}
</style>
