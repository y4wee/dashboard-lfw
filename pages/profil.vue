<script setup>
const currentUser = useCurrentUser();
const dataUser = useDataUser();

const userName = ref("");
const userImage = ref("");

const changeUserName = () => {
    if (userName.value) {
        updateUser({
            displayName: userName.value,
        });
    }
};
onMounted(() => {});
</script>

<template>
    <div class="profil">
        <ProfilAvatar />
        <section class="profilInformation">
            <div class="profilForm">
                <input
                    type="text"
                    v-model="userName"
                    autocomplete="false"
                    placeholder="Pseudo"
                />
                <div class="profilFormButton" @click="changeUserName">
                    Enregistrer
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
$colorBack: #e1d8cf;
$colorContainer: #373741;
$colorGray: #22272c;
$colorGreen: #7ed8b2;
$colorOrange: #ffa45c;
$colorRed: #ff5959;

.profil {
    width: 100vw;
}
</style>
