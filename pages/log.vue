<script setup>
import { gsap } from "gsap";

const signinForm = reactive({
    email: null,
    password: null,
});
const registerForm = reactive({
    email: null,
    password: null,
});
const logSelected = ref("");

const logSwitch = (e) => {
    let targetData = e.target.dataset.logValue;
    if (targetData) {
        logSelected.value = targetData;
    }
};

const register = async () => {
    const credentials = await createUser(
        registerForm.email,
        registerForm.password
    );
    registerForm.email = null;
    registerForm.password = null;
};
const signin = async () => {
    try {
        const credentials = await signInUser(
            signinForm.email,
            signinForm.password
        );
    } catch (error) {
        if (error) {
            console.error(error);
        }
    }
    signinForm.email = null;
    signinForm.password = null;
};
</script>

<template>
    <div class="log" :data-log-selected="logSelected" @click="logSwitch">
        <div class="logContainer logConnexion" data-log-value="connexion">
            <div class="logWay logWayConnexion">Connexion</div>
            <div class="logForm logFormConnexion">
                <h2 class="logFormTitle">Connectes toi !</h2>

                <input
                    v-model="signinForm.email"
                    type="email"
                    class="logFormInput"
                    placeholder="Em@il"
                    autocomplete="false"
                />
                <input
                    v-model="signinForm.password"
                    type="password"
                    class="logFormInput"
                    placeholder="Password"
                    autocomplete="false"
                />
                <div
                    class="logFormButtonContainer logFormButtonConnexion"
                    @click="signin"
                >
                    <div class="logFormButton">
                        <font-awesome-icon :icon="['fa', 'toilet-paper']" />
                    </div>
                </div>
            </div>
        </div>
        <div class="logContainer logInscription" data-log-value="inscription">
            <div class="logWay logWayInscription">Inscription</div>
            <div class="logForm logFormInscription">
                <h2 class="logFormTitle">Inscris toi !</h2>
                <input
                    v-model="registerForm.email"
                    type="email"
                    class="logFormInput"
                    placeholder="Email"
                    autocomplete="false"
                />
                <input
                    v-model="registerForm.password"
                    type="password"
                    class="logFormInput"
                    placeholder="Password"
                    autocomplete="false"
                />
                <div
                    class="logFormButtonContainer logFormButtonInscription"
                    @click="register"
                >
                    <div class="logFormButton">
                        <font-awesome-icon :icon="['fa', 'toilet-paper']" />
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

.log {
    display: grid;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    background: $colorGray;
    transition: 0.3s ease-in-out;
    &[data-log-selected="connexion"] {
        grid-template-rows: 1.7fr 0.3fr;
        & .logWayConnexion {
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }
        & .logFormConnexion {
            opacity: 1;
            pointer-events: all;
            transition: all 0.2s 0.1s ease-in-out;
        }
    }
    &[data-log-selected="inscription"] {
        grid-template-rows: 0.3fr 1.7fr;
        & .logWayInscription {
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }
        & .logFormInscription {
            opacity: 1;
            pointer-events: all;
            transition: all 0.2s 0.1s ease-in-out;
        }
    }
    &Container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    &Connexion {
        background: $colorGreen;
    }
    &Inscription {
        background: $colorRed;
    }
    &Form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 300px;
        margin: 0 5px;
        box-sizing: border-box;
        border-radius: 20px;
        background-color: $colorGray;
        opacity: 0;
        transition: all 0.2s ease-in-out;
        pointer-events: none;
        &Title {
            color: $colorBack;
        }
        &Input {
            height: 50px;
            margin: 10px 0;
            padding: 0 10px;
            box-sizing: border-box;
            font-size: 1.2rem;
            border: none;
            &:focus {
                outline: none;
            }
        }
        &Button {
            &Container {
                position: relative;
                top: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                user-select: none;
            }
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-color: $colorGray;
            color: $colorBack;
            font-weight: bold;
            font-size: 1.5rem;
            cursor: pointer;
            &Connexion {
                background-color: $colorGreen;
            }
            &Inscription {
                background-color: $colorRed;
            }
        }
    }
    &Way {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        border: solid 5px $colorGray;
        border-radius: 20px;
        font-weight: bold;
        font-size: 1.4rem;
        color: $colorGray;
        background-color: $colorBack;
        user-select: none;
        pointer-events: none;
        opacity: 1;
        transition: 0.2s 0.1s ease-in-out;
    }
}
</style>
