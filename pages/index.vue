<script setup>
const dataCandidacy = useDataCandidacy();

onMounted(() => {});
</script>

<template>
    <div class="home">
        <Header />
        <FormCandidacy />
        <div class="candidacyContainer">
            <CardCandidacy
                v-for="candidacy in dataCandidacy"
                :key="candidacy.id"
                :candidacy="candidacy"
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
}
.candidacyContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 100px;
}
</style>
