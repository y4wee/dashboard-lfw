<script setup>
const { $auth } = useNuxtApp();
// const { registerUser } = useFirebaseAuth(); // auto-imported

const credentials = reactive({
    email: "",
    password: "",
});

// async function handleRegistration() {
//     await registerUser(user.email, user.password);
// }

onMounted(() => {
    console.log($auth);
    // test();
});
</script>

<template>
    <div>
        <div>hello ! test</div>
    </div>
</template>
