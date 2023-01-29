<script setup>
import { ref, onValue } from "firebase/database";

const { $database } = useNuxtApp();
// const { registerUser } = useFirebaseAuth(); // auto-imported

// const credentials = reactive({
//     email: "",
//     password: "",
// });

// async function handleRegistration() {
//     await registerUser(user.email, user.password);
// }

onMounted(() => {
    const data = ref($database, "/yawee");
    onValue(data, (snapshot) => {
        if (snapshot.val()) {
            console.log(snapshot.val());
        }
    });
    console.log(data);
    // test();
});
</script>

<template>
    <div>
        <div>hello ! test</div>
    </div>
</template>
