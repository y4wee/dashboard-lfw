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
$colorBack: #E1D8CF;
$colorContainer: #373741;
$colorGray: #22272c;
$colorGreen: #7ed8b2;

.candidacyContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    padding-top: 100px;
    box-sizing: border-box;
}
</style>
