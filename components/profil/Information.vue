<script setup>
const currentUser = useCurrentUser();

const userName = ref("");
const userImage = ref("");

const changeUserName = () => {
    if (userName.value && infoChanged.value) {
        updateUser({
            displayName: userName.value,
        });
    }
};

const infoChanged = computed(() => {
    if (currentUser.value) {
        return userName.value.length < 1 ||
            currentUser.value.name === userName.value
            ? false
            : true;
    } else {
        return false;
    }
});
</script>

<template>
    <div class="information">
        <div class="informationForm">
            <h2>Changes ton pseudo</h2>
            <input
                type="text"
                v-model="userName"
                autocomplete="false"
                placeholder="Pseudo"
                class="informationFormInput"
            />
            <div
                :class="
                    infoChanged
                        ? 'informationSave informationSaveEnabled'
                        : 'informationSave'
                "
                @click="changeUserName"
            >
                Enregistrer
            </div>
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

.information {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 90px;
    &Form {
        display: flex;
        flex-direction: column;
        align-items: center;
        &Input {
            display: flex;
            align-items: baseline;
            width: calc(100% - 20px);
            max-width: 300px;
            height: 50px;
            font-size: 1.5rem;
            margin: 15px 0;
            padding: 0 10px;
            box-sizing: border-box;
            &:focus {
                outline: none;
            }
        }
    }
    &Save {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 50px;
        margin: 10px 0;
        background-color: $colorContainer;
        color: $colorOrange;
        font-size: 1.2rem;
        user-select: none;
        clip-path: inset(0 100% 0 0);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
        &Enabled {
            clip-path: inset(0 0 0 0);
            transition: all 0.2s ease-in-out;
        }
    }
}
</style>
