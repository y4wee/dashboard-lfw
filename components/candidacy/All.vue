<script setup>
const dataCandidacy = useDataCandidacy();
const searchCandidacy = useSearchCandidacy();
</script>

<template>
    <div class="candidacyAll">
        <h1 class="candidacyAllTitle">{{ dataCandidacy.length }} Candidatures au total</h1>
        <div class="candidacyAllContainer">
            <CardCandidacy
                v-for="candidacy in dataCandidacy"
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

.candidacyAll {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    &Title {
        color: $colorGray;
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
