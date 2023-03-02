<script setup>
const utilsBarIndex = useUtilsBarIndex();
const searchCandidacy = useSearchCandidacy();
const currentUser = useCurrentUser();

const searchBarClearTransition = computed(() => {
    return searchCandidacy.value.length > 0
        ? "inset(0 0 0 0)"
        : "inset(0 0 0 100%)";
});
</script>

<template>
    <div class="home" v-if="currentUser">
        <FormCandidacy />
        <FormUpdate />
        <div class="searchBar">
            <div class="searchBarIcon">
                <client-only>
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </client-only>
            </div>
            <div class="searchBarClear" @click="searchCandidacy = ''">
                <client-only>
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </client-only>
            </div>
            <input
                class="searchBarInput"
                type="text"
                placeholder="Rechercher"
                maxlength="20"
                v-model="searchCandidacy"
            />
        </div>
        <UtilsBar />
        <div class="candidacyContainer">
            <CandidacyAll v-if="utilsBarIndex === '0'" />
            <CandidacyDay v-if="utilsBarIndex === '1'" />
            <CandidacyAccepted v-if="utilsBarIndex === '2'" />
            <CandidacyWait v-if="utilsBarIndex === '3'" />
            <CandidacyRefus v-if="utilsBarIndex === '4'" />
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
    justify-content: center;
    width: calc(100% - 50px);
    margin-left: 50px;
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
    &Clear {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        font-size: 2rem;
        background-color: $colorRed;
        color: $colorContainer;
        clip-path: v-bind(searchBarClearTransition);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
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
</style>
