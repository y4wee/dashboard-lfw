<script setup>
import { gsap } from "gsap";

const formCandidacy = reactive({
    name: null,
    type: "annonce",
    adress: null,
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
        duration: 0.3,
        ease: "sine.inOut",
    });
    gsap.to(".formCandidacyUtilsButton", {
        rotateZ: formOn.value ? 0 : 225,
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
    if (!formCandidacy.name) {
        alert("entreprise name missing");
        return;
    }
    addToCollection(formCandidacy);
};
onMounted(() => {});
</script>

<template>
    <div class="formCandidacy">
        <div class="formCandidacyOverlay"></div>
        <div class="formCandidacyContainer">
            <input
                class="formCandidacyInput formCandidacyName"
                v-model="formCandidacy.name"
                type="text"
                placeholder="entreprise"
                autocomplete="false"
            />
            <input
                class="formCandidacyInput formCandidacyAdress"
                v-model="formCandidacy.adress"
                type="text"
                placeholder="adresse"
                autocomplete="false"
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
            <div class="formCandidacyButton" @click="addCandidacy">+</div>
        </div>
        <div class="formCandidacyUtils">
            <h1>Nouvelle Candidature</h1>
            <div class="formCandidacyUtilsButton" @click="formTransition">
                +
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.formCandidacy {
    z-index: 100;
    position: relative;
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
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 500px;
        height: 80px;
        box-sizing: border-box;
        padding-left: 10px;
        transform: translateX(50px);
        pointer-events: all;
        & h1 {
            color: white;
            margin: 0;
        }
        &Button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            font-size: 4rem;
            color: white;
            cursor: pointer;
        }
    }
    &Container {
        position: absolute;
        top: 0;
        right: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
        width: 100%;
        max-width: 500px;
        box-sizing: border-box;
        padding-top: 110px;
        background-color: #22272c;
        color: white;
        pointer-events: all;
    }
    &Input {
        display: flex;
        align-items: baseline;
        width: calc(100% - 20px);
        max-width: 300px;
        height: 30px;
        font-size: 1.2rem;
        margin: 15px 0;
        padding: 0;
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
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        margin: 15px 0;
        font-size: 2.5rem;
        color: white;
        background-color: #424f4f;
        cursor: pointer;
    }
}
</style>
