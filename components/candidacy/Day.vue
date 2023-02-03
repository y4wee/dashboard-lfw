<script setup>
const dataCandidacy = useDataCandidacy();
const searchCandidacy = useSearchCandidacy();

const transformDate = (currentDate) => {
    let date = new Date(currentDate * 1000);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    let dateFormated = dd + "/" + mm + "/" + yyyy;
    return dateFormated;
};

const today = transformDate(new Date() / 1000);
const candidacyDaily = computed(() => {
    return dataCandidacy.value.filter(
        (candidacy) => transformDate(candidacy.date.seconds) === today
    );
});
</script>

<template>
    <div class="candidacyDay">
        <h1 class="candidacyDayTitle">
            {{ candidacyDaily.length }}
            {{ candidacyDaily.length > 1 ? "Candidatures" : "Candidature" }}
            pour aujourd'hui
        </h1>
        <div class="candidacyDayContainer">
            <CardCandidacy
                v-for="candidacy in candidacyDaily"
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

.candidacyDay {
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
