<script setup>
import linkedin from "~/assets/lotties/links/linkedin.json";
import github from "~/assets/lotties/links/github.json";

const signinForm = reactive({
    email: null,
    password: null,
});
const registerForm = reactive({
    email: null,
    password: null,
});
const logSelected = ref("");
const logIntroduction = ref(true);

const logSwitch = (e) => {
    let targetData = e.target.dataset.logValue;
    if (targetData && !logIntroduction.value) {
        logSelected.value = targetData;
    }
};

const register = async () => {
    try {
        await createUser(registerForm.email, registerForm.password);
    } catch (error) {
        if (error) {
            console.error(error);
        }
    }
    registerForm.email = null;
    registerForm.password = null;
};
const signin = async () => {
    try {
        await signInUser(signinForm.email, signinForm.password);
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
                        <client-only>
                            <font-awesome-icon :icon="['fa', 'toilet-paper']" />
                        </client-only>
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
                        <client-only>
                            <font-awesome-icon :icon="['fa', 'toilet-paper']" />
                        </client-only>
                    </div>
                </div>
            </div>
        </div>

        <div class="logIntroduction" v-if="logIntroduction">
            <h1>LFW</h1>
            <div class="logIntroductionDetail">
                Hey Everyone !
                <br />
                <br />
                Here is a tool I created to help you organise and memorize
                candidacies during your research of the dream's work.
                <br />
                <br />
                That's still in development so be Cool hihi...
            </div>
            <div class="logIntroductionLinks">
                <a
                    class="logIntroductionLinksGithub"
                    href="https://github.com/y4wee"
                    target="_blank"
                >
                    <client-only>
                        <Vue3Lottie :animationData="github" loop />
                    </client-only>
                </a>
                <a
                    class="logIntroductionLinksLinkedin"
                    href="https://www.linkedin.com/in/quentin-jambert-4488ab209/"
                    target="_blank"
                >
                    <client-only>
                        <Vue3Lottie :animationData="linkedin" loop />
                    </client-only>
                </a>
            </div>

            <div class="logIntroductionClose" @click="logIntroduction = false">
                <client-only>
                    <font-awesome-icon :icon="['fas', 'xmark']" />
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

.log {
    display: grid;
    width: 100vw;
    height: 100vh;
    max-height: 100vh;
    grid-template-rows: 1fr 1fr;
    gap: 5px;
    background: $colorGray;
    transition: 0.3s ease-in-out;
    &Introduction {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: calc(100% - 20px);
        max-width: 500px;
        border-radius: 20px;
        background-color: $colorGray;
        color: $colorBack;
        transform: translate(-50%, -50%);
        & h1 {
            margin: 20px 0;
            text-decoration: $colorGray line-through 5px;
        }
        &Detail {
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
        }
        &Links {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 120px;
            margin: 20px 0;
            &Github {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 40px;
                height: 40px;
            }
            &Linkedin {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 55px;
                height: 55px;
            }
        }
        &Close {
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 1.4rem;
            color: $colorRed;
            cursor: pointer;
        }
    }
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
