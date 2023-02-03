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
        <div class="searchBar">
            <div class="searchBarIcon">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div>
            <input
                class="searchBarInput"
                type="text"
                placeholder="Rechercher"
                maxlength="20"
                v-model="sortedCandidacy"
            />
        </div>
        <UtilsBar />
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
    padding-top: 150px;
}
.candidacyContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-left: 50px;
}
.searchBar {
    z-index: 10;
    position: fixed;
    top: 82px;
    left: 0;
    display: flex;
    width: 100%;
    height: 50px;
    border-bottom: solid 2px white;
    &Icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        background-color: rgba($color: $colorContainer, $alpha: 0.9);
        backdrop-filter: blur(5px);
        color: white;
    }
    &Input {
        width: calc(100% - 50px);
        height: 50px;
        border: none;
        border-radius: 0;
        padding: 0 10px;
        font-size: 1.4rem;
        box-sizing: border-box;
        &:focus {
            outline: none;
        }
    }
}

// @media all and (min-width: 940px) {
//     .home {
//         padding-top: 100px;
//     }
//     .candidacyContainer {
//         padding-left: 300px;
//     }
//     .searchBar {
//         width: 300px;
//     }
//     .utilsBar {
//         width: 300px;
//     }
// }
</style>
