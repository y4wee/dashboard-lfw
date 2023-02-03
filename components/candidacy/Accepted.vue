<script setup>
const dataCandidacy = useDataCandidacy();
const searchCandidacy = useSearchCandidacy();

const candidacyAccepted = ref([]);

const sortCandidacyAccepted = (data) => {
    candidacyAccepted.value = data.filter(
        (candidacy) => candidacy.state === "entretien"
    );
    console.log(candidacyAccepted.value);
};
onMounted(() => {
    sortCandidacyAccepted(dataCandidacy.value);
});
</script>

<template>
    <div class="candidacyAccepted">
        <h1 class="candidacyAcceptedTitle">
            {{ candidacyAccepted.length }}
            {{ candidacyAccepted.length > 1 ? "Entretiens" : "Entretien" }}
            de prévu
        </h1>
        <div class="candidacyAcceptedContainer">
            <CardCandidacy
                v-for="candidacy in candidacyAccepted"
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

.candidacyAccepted {
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
