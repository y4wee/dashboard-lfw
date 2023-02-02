<script setup>
const dataCandidacy = useDataCandidacy();

const sortedCandidacy = ref("");

onMounted(() => {
    console.log(sortedCandidacy.value);
    console.log();
});
</script>

<template>
    <div class="home">
        <Header />
        <FormCandidacy />
        <input type="text" v-model="sortedCandidacy" />
        <div class="candidacyContainer">
            <CardCandidacy
                v-for="candidacy in dataCandidacy"
                :key="candidacy.id"
                :candidacy="candidacy"
                v-show="
                    sortedCandidacy
                        ? candidacy.name
                              .toLowerCase()
                              .startsWith(sortedCandidacy.toLowerCase())
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

.home {
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding-top: 100px;
}
.candidacyContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
