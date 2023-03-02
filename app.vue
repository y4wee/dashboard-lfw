<script setup>
const route = useRoute();

onBeforeMount(() => {
    initUser();
});
</script>

<template>
    <div>
        <Header v-if="route.path !== '/log'" />
        <NuxtPage />
    </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");

$colorBack: #e1d8cf;
$colorContainer: #373741;
$colorGray: #22272c;
$colorGreen: #7ed8b2;
$colorOrange: #ffa45c;
$colorRed: #ff5959;

body {
    margin: 0;
    padding: 0;
    min-width: 300px;
    font-family: "Roboto", sans-serif;
    background-color: $colorBack;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
