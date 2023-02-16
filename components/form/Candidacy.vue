<script setup>
import { gsap } from "gsap";

const formCandidacy = reactive({
    name: null,
    type: "annonce",
    state: "en attente",
    date: null,
});
const formOn = ref(false);

const formTransition = () => {
    gsap.to(".formCandidacyContainer", {
        xPercent: formOn.value ? 0 : 100,
        duration: 0.3,
        ease: "sine.inOut",
    });
    gsap.to(".formCandidacyOverlay", {
        opacity: formOn.value ? 0 : 0.8,
        pointerEvents: formOn.value ? "none" : "all",
        duration: 0.3,
        ease: "sine.inOut",
    });
    gsap.to(".formCandidacyUtilsButton", {
        rotateZ: formOn.value ? 0 : 315,
        color: formOn.value ? "white" : "#22272c",
        duration: 0.3,
        ease: "sine.inOut",
    });
    gsap.to(".formCandidacyUtils", {
        translateX: formOn.value ? "50px" : "100%",
        duration: 0.27,
        delay: 0.03,
        ease: "sine.inOut",
        onComplete: () => (formOn.value = !formOn.value),
    });
};
const addCandidacy = () => {
    const date = new Date();
    formCandidacy.date = date;

    if (!formCandidacy.name) {
        alert("entreprise name missing");
        return;
    }
    addToCollection(formCandidacy)
        .then(() => {
            formCandidacy.name = null;
            formCandidacy.adress = null;
            formCandidacy.date = null;
            formTransition();
        })
        .catch((err) => {
            console.error(err);
        });
};
onMounted(() => {});
</script>

<template>
    <div class="formCandidacy">
        <div class="formCandidacyOverlay"></div>
        <div class="formCandidacyContainer">
            <div class="formCandidacyCard">
                <h2>Nouvelle Candidature</h2>
                <input
                    class="formCandidacyInput formCandidacyName"
                    v-model="formCandidacy.name"
                    type="text"
                    placeholder="entreprise"
                    autocomplete="false"
                    maxlength="20"
                />
                <div class="formCandidacyInput formCandidacyType">
                    <input
                        id="typeAnnonce"
                        v-model="formCandidacy.type"
                        type="radio"
                        name="type"
                        value="annonce"
                        checked
                    />
                    <label for="typeAnnonce">Annonce</label>
                </div>
                <div class="formCandidacyInput formCandidacyType">
                    <input
                        id="typeSpontane"
                        v-model="formCandidacy.type"
                        type="radio"
                        name="type"
                        value="spontanée"
                    />
                    <label for="typeSpontane">Spontanée</label>
                </div>
                <div class="formCandidacyButton">
                    <div class="formCandidacyButtonIcon" @click="addCandidacy">
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'plus']" />
                        </client-only>
                    </div>
                </div>
            </div>
        </div>
        <div class="formCandidacyUtils">
            <div class="formCandidacyUtilsButton" @click="formTransition">
                <client-only>
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </client-only>
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

.formCandidacy {
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
    &Utils {
        position: absolute;
        top: 0;
        right: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        max-width: 500px;
        height: 80px;
        box-sizing: border-box;
        padding-left: 10px;
        transform: translateX(50px);
        pointer-events: all;
        &Button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            user-select: none;
        }
    }
    &Container {
        position: absolute;
        top: 0;
        right: 100%;
        display: flex;
        justify-content: center;
        height: 100%;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;
        padding-top: 110px;
        background-color: $colorOrange;
        color: white;
        pointer-events: all;
    }
    &Card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: fit-content;
        margin: 0 10px;
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
        background-color: $colorOrange;
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
