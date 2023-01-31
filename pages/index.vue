<script setup>
// const signout = async () => {
//     const result = await signOutUser();
//     console.log(result);
// };
onMounted(() => {});
</script>

<template>
    <div>
        <Header />
        <FormCandidacy />
    </div>
</template>

<style lang="scss">
.signout {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 50px;
    background-color: rgb(19, 48, 61);
    color: white;
    cursor: pointer;
}
</style>
