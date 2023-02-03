<script setup>
const dataCandidacy = useDataCandidacy();
const searchCandidacy = useSearchCandidacy();

const candidacyWait = ref([]);

const sortCandidacyWait = (data) => {
    candidacyWait.value = data.filter(
        (candidacy) => candidacy.state === "en attente"
    );
};
onMounted(() => {
    sortCandidacyWait(dataCandidacy.value);
});
</script>

<template>
    <div class="candidacyWait">
        <h1 class="candidacyWaitTitle">
            {{ candidacyWait.length }}
            {{ candidacyWait.length > 1 ? "Candidatures" : "Candidature" }}
            en attente
        </h1>
        <div class="candidacyWaitContainer">
            <CardCandidacy
                v-for="candidacy in candidacyWait"
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

.candidacyWait {
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
