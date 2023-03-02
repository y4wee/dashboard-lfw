<script setup>
import { gsap } from "gsap";

const updateCandidacyData = useUpdateCandidacyData();

const formUpdate = reactive({
    name: null,
    type: "annonce",
    tel: null,
    email: null,
    adress: null,
    url: null,
});
const formOn = ref(false);

const formUpdateTransition = () => {
    formOn.value = !formOn.value;
    gsap.to("body", {
        overflow: formOn.value ? "hidden" : "scroll",
        duration: 0.3,
        ease: "sine.inOut",
    });
    gsap.to(".formUpdateContainer", {
        xPercent: formOn.value ? 100 : 0,
        duration: 0.3,
        ease: "sine.inOut",
    });
    gsap.to(".formUpdateOverlay", {
        opacity: formOn.value ? 0.8 : 0,
        pointerEvents: formOn.value ? "all" : "none",
        duration: 0.3,
        ease: "sine.inOut",
        onComplete: () =>
            formOn.value ? false : (updateCandidacyData.value = null),
    });
};
const updateCandidacy = () => {
    if (!formUpdate.name) {
        alert("entreprise manquante");
        return;
    }
    let dataUpdated = Object.fromEntries(
        Object.entries(formUpdate).filter((data) => data[1])
    );
    updateDocument(updateCandidacyData.value.id, dataUpdated)
        .then(() => {
            formUpdate.name = null;
            formUpdate.email = null;
            formUpdate.tel = null;
            formUpdate.adress = null;
            formUpdate.url = null;
            formUpdateTransition();
        })
        .catch((err) => {
            console.error(err);
        });
};

watch(updateCandidacyData, (value) => {
    if (value) {
        formUpdate.name = value.name;
        formUpdate.type = value.type;
        formUpdate.tel = value.tel;
        formUpdate.email = value.email;
        formUpdate.adress = value.adress;
        formUpdate.url = value.url;
        formUpdateTransition();
    }
});
</script>

<template>
    <div class="formUpdate">
        <div class="formUpdateOverlay"></div>
        <div class="formUpdateContainer">
            <div class="formUpdateClose">
                <client-only>
                    <font-awesome-icon
                        class="formUpdateCloseIcon"
                        :icon="['fas', 'xmark']"
                        @click="formUpdateTransition"
                    />
                </client-only>
            </div>
            <div class="formUpdateCard">
                <h2>Candidature pour {{ updateCandidacyData?.name }}</h2>
                <input
                    class="formUpdateInput formUpdateName"
                    v-model="formUpdate.name"
                    type="text"
                    placeholder="entreprise"
                    autocomplete="false"
                    maxlength="20"
                />
                <input
                    class="formUpdateInput formUpdateEmail"
                    v-model="formUpdate.email"
                    type="email"
                    placeholder="Email"
                    autocomplete="false"
                />
                <input
                    class="formUpdateInput formUpdateTel"
                    v-model="formUpdate.tel"
                    type="tel"
                    placeholder="téléphone"
                    autocomplete="false"
                    maxlength="10"
                />
                <input
                    class="formUpdateInput formUpdateAdress"
                    v-model="formUpdate.adress"
                    type="text"
                    placeholder="Adresse"
                    autocomplete="false"
                />
                <input
                    class="formUpdateInput formUpdateUrl"
                    v-model="formUpdate.url"
                    type="url"
                    placeholder="Url"
                    autocomplete="false"
                />
                <div class="formUpdateInput formUpdateType">
                    <input
                        id="typeAnnonceUpdate"
                        v-model="formUpdate.type"
                        type="radio"
                        name="type"
                        value="annonce"
                        checked
                    />
                    <label for="typeAnnonceUpdate">Annonce</label>
                </div>
                <div class="formUpdateInput formUpdateType">
                    <input
                        id="typeSpontaneUpdate"
                        v-model="formUpdate.type"
                        type="radio"
                        name="type"
                        value="spontanée"
                    />
                    <label for="typeSpontaneUpdate">Spontanée</label>
                </div>
                <div class="formUpdateButton">
                    <div class="formUpdateButtonIcon" @click="updateCandidacy">
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'feather']" />
                        </client-only>
                    </div>
                </div>
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

.formUpdate {
    z-index: 100;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    pointer-events: none;
    &Overlay {
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: 0;
    }
    &Close {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 50px;
        margin: 10px 0;
        font-size: 2rem;
        color: $colorRed;
        &Icon {
            margin-right: 10px;
            cursor: pointer;
        }
    }
    &Container {
        position: absolute;
        top: 0;
        right: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;
        background-color: $colorGreen;
        color: white;
        pointer-events: all;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    &Card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100% - 20px);
        height: fit-content;
        margin-bottom: 200px;
        border-radius: 20px;
        background-color: $colorGray;
    }
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
    &Type {
        & label {
            margin-left: 15px;
        }
        & input {
            margin: 0;
        }
    }
    &Button {
        position: relative;
        top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: $colorGreen;
        user-select: none;
        &Icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: $colorGray;
            font-size: 2rem;
            cursor: pointer;
        }
    }
}
</style>
