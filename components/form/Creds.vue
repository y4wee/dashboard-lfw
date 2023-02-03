<script setup>
const { $auth } = useNuxtApp();

const signinForm = reactive({
    email: null,
    password: null,
});
const registerForm = reactive({
    email: null,
    password: null,
});

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
const test = () => {
    console.log("test");
};
onMounted(() => {});
</script>

<template>
    <div class="creds">
        <!-- bloc connexion -->
        <div class="signin">
            <div class="credsForm">
                <h2>Sign in</h2>

                <input
                    v-model="signinForm.email"
                    type="email"
                    class="signinEmail"
                    placeholder="Email"
                    autocomplete="false"
                />
                <input
                    v-model="signinForm.password"
                    type="password"
                    class="signinPassword"
                    placeholder="Password"
                    autocomplete="false"
                />
                <div class="credsButton" @click="signin">Sign in</div>
            </div>
        </div>
        <!-- bloc inscription -->
        <div class="register">
            <div class="credsForm">
                <h2>Register</h2>
                <input
                    v-model="registerForm.email"
                    type="email"
                    class="registerEmail"
                    placeholder="Email"
                    autocomplete="false"
                />
                <input
                    v-model="registerForm.password"
                    type="password"
                    class="registerPassword"
                    placeholder="Password"
                    autocomplete="false"
                />
                <div class="credsButton" @click="register">Register</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
$colorBack: #0e0f0e;
$colorContainer: #22272c;
$colorGray: #424f4f;
$colorGreen: #7ed8b2;

.creds {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    &Form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &Button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 50px;
        background-color: gray;
        user-select: none;
        cursor: pointer;
    }
}
.signin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
}
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
}
</style>
