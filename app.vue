<script setup>
// import { ref, onValue } from "firebase/database";
const currentUser = useCurrentUser();
// const { $database } = useNuxtApp();
const { $auth } = useNuxtApp();
// const { registerUser } = useFirebaseAuth(); // auto-imported

// const credentials = reactive({
//     email: "",
//     password: "",
// });

// async function handleRegistration() {
//     await registerUser(user.email, user.password);
// }

onBeforeMount(() => {
    // const data = ref($database, "/yawee");
    // onValue(data, (snapshot) => {
    //     if (snapshot.val()) {
    //         console.log(snapshot.val());
    //     }
    // });
    initUser();
});
</script>

<template>
    <div>
        <NuxtPage v-if="currentUser" />
        <FormCreds v-else />
    </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap");
body {
    margin: 0;
    padding: 0;
    font-family: "Roboto", sans-serif;
    background-color: #0e0f0e;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
