<script setup>
const dataCandidacy = useDataCandidacy();

const transformDate = (currentDate) => {
    let date = new Date(currentDate * 1000);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    let dateFormated = dd + "/" + mm + "/" + yyyy;
    return dateFormated;
};
onMounted(() => {});
</script>

<template>
    <div>
        <Header />
        <FormCandidacy />
        <div class="candidacyContainer">
            <div
                class="candidacyCard"
                v-for="candidacy in dataCandidacy"
                :key="candidacy.id"
            >
                <div class="candidacyTitle">
                    <h2>
                        {{
                            candidacy.name.charAt(0).toUpperCase() +
                            candidacy.name.slice(1)
                        }}
                    </h2>
                    <div class="candidacyDate">
                        {{ transformDate(candidacy.date.seconds) }}
                    </div>
                </div>
                <p>
                    {{
                        candidacy.type.charAt(0).toUpperCase() +
                        candidacy.type.slice(1)
                    }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
$colorBack: #0e0f0e;
$colorContainer: #22272c;
$colorGray: #424f4f;
$colorGreen: #7ed8b2;

.candidacyContainer {
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    min-height: 100vh;
    padding-top: 100px;
    box-sizing: border-box;
    color: white;
}
.candidacyCard {
    width: 100%;
    max-width: 300px;
    height: fit-content;
    margin: 10px;
    background-color: rgba($color: $colorGray, $alpha: 0.9);
}
</style>
