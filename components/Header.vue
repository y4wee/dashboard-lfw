<script setup>
import { gsap } from "gsap";

import cat1 from "~/assets/lotties/cats/cat1.json"; // couché balle
import cat2 from "~/assets/lotties/cats/cat2.json"; // turn orange
import cat3 from "~/assets/lotties/cats/cat3.json"; // sleep stars
import cat5 from "~/assets/lotties/cats/cat5.json"; // turn white
import cat6 from "~/assets/lotties/cats/cat6.json"; // sleep bull
import cat7 from "~/assets/lotties/cats/cat7.json"; // levitation
import cat9 from "~/assets/lotties/cats/cat9.json"; // yin yang
import cat10 from "~/assets/lotties/cats/cat10.json"; // alone standing up

const currentUser = useCurrentUser();
const dataUser = useDataUser();
const route = useRoute();

const dropdownOn = ref(false);

const cats = [
    { index: 0, url: cat1 },
    { index: 1, url: cat2 },
    { index: 2, url: cat3 },
    { index: 3, url: cat5 },
    { index: 4, url: cat6 },
    { index: 5, url: cat7 },
    { index: 6, url: cat9 },
    { index: 7, url: cat10 },
];

const dropdownTransition = () => {
    dropdownOn.value = !dropdownOn.value;
    gsap.to(".headerUserDropdown", {
        clipPath: dropdownOn.value ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        duration: 0.3,
        ease: "sine.inOut",
    });
};

const signout = async () => {
    const result = await signOutUser();
};
</script>

<template>
    <header class="header">
        <div class="headerUser">
            <div class="headerUserContainer" @click="dropdownTransition">
                <div class="headerUserName">
                    {{ currentUser.name ? currentUser.name : "" }}
                </div>

                <div class="headerUserButton">
                    <client-only>
                        <font-awesome-icon :icon="['fas', 'chevron-down']" />
                    </client-only>
                </div>
                <div
                    class="headerUserImg"
                    v-if="dataUser[0]"
                    :style="{ backgroundColor: dataUser[0].color }"
                >
                    <client-only>
                        <Vue3Lottie
                            v-for="cat in cats"
                            :key="cat.index"
                            :animationData="cat.url"
                            autoPlay
                            loop
                            v-show="dataUser[0].cat === cat.index"
                        />
                    </client-only>
                </div>
            </div>

            <div class="headerUserDropdown">
                <div
                    class="headerUserDropdownLink headerUserDropdownProfil"
                    v-if="route.path === '/'"
                >
                    <div class="headerUserDropdownIcon">
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'gear']" />
                        </client-only>
                    </div>
                    <div class="headerUserDropdownText">
                        <nuxt-link to="/profil" @click="dropdownTransition">
                            Profil
                        </nuxt-link>
                    </div>
                </div>

                <div
                    class="headerUserDropdownLink headerUserDropdownHome"
                    v-else
                >
                    <div class="headerUserDropdownIcon">
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'house']" />
                        </client-only>
                    </div>
                    <div class="headerUserDropdownText">
                        <nuxt-link to="/" @click="dropdownTransition">
                            Accueil
                        </nuxt-link>
                    </div>
                </div>

                <div
                    class="headerUserDropdownLink headerUserDropdownSignout"
                    @click="signout"
                >
                    <div class="headerUserDropdownIcon">
                        <client-only>
                            <font-awesome-icon
                                :icon="['fas', 'right-from-bracket']"
                            />
                        </client-only>
                    </div>
                    <div class="headerUserDropdownText">Sign Out</div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
$colorBack: #e1d8cf;
$colorContainer: #373741;
$colorGray: #22272c;
$colorGreen: #7ed8b2;
$colorOrange: #ffa45c;
$colorRed: #ff5959;

.header {
    z-index: 50;
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 80px;
    background-color: rgba($color: $colorContainer, $alpha: 0.9);
    backdrop-filter: blur(5px);
    color: white;
    font-size: 1.2rem;
    user-select: none;
    border-bottom: 2px solid white;
    &User {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        pointer-events: none;
        &Container {
            display: flex;
            align-items: center;
            height: 80px;
            pointer-events: all;
        }
        &Img {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 60px;
            margin-right: 10px;
            border-radius: 50%;
        }
        &Name {
            text-align: center;
        }
        &Button {
            margin: 0 10px;
        }
        &Dropdown {
            display: flex;
            flex-direction: column;
            background-color: rgba($color: $colorContainer, $alpha: 0.9);
            clip-path: inset(0 0 100% 0);
            pointer-events: all;
            &Link {
                display: flex;
                align-items: center;
                height: 80px;
                width: 100%;
            }
            &Icon {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                font-size: 1.4rem;
            }
            &Text {
                margin: 0 10px;
            }
            &Profil:hover {
                background-color: rgba($color: $colorGray, $alpha: 0.9);
            }
            &Home:hover {
                background-color: rgba($color: $colorGray, $alpha: 0.9);
            }
            &Signout:hover {
                background-color: rgba($color: $colorGray, $alpha: 0.9);
            }
        }
    }
}
</style>
