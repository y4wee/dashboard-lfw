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
    let listLinks = gsap.utils.toArray(".headerUserLinkContainer");

    dropdownOn.value = !dropdownOn.value;

    listLinks.forEach((link, index) => {
        gsap.to(link, {
            yPercent: dropdownOn.value ? 100 + 100 * index : 0,
            duration: 0.2 + 0.2 * index,
        });
    });
    gsap.to(".headerUserChevron", {
        rotateZ: dropdownOn.value ? 180 : 0,
        duration: 0.2,
    });
};

const signout = async () => {
    const result = await signOutUser();
};
</script>

<template>
    <header class="header">
        <div class="headerUser" v-if="dataUser[0]">
            <div class="headerUserContainer" @click="dropdownTransition">
                <div class="headerUserName">
                    {{ currentUser.name ? currentUser.name : "" }}
                </div>

                <div class="headerUserChevron">
                    <client-only>
                        <font-awesome-icon :icon="['fas', 'chevron-down']" />
                    </client-only>
                </div>
                <div
                    class="headerUserImg"
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
                <div class="headerUserLinkContainer" v-if="route.path === '/'">
                    <nuxt-link
                        to="/profil"
                        class="headerUserLink headerUserLinkProfil"
                    >
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'gear']" />
                        </client-only>
                    </nuxt-link>
                </div>

                <div class="headerUserLinkContainer" v-else>
                    <nuxt-link to="/" class="headerUserLink headerUserLinkHome">
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'house']" />
                        </client-only>
                    </nuxt-link>
                </div>

                <div class="headerUserLinkContainer">
                    <div
                        class="headerUserLink headerUserLinkSignout"
                        @click="signout"
                    >
                        <client-only>
                            <font-awesome-icon
                                :icon="['fas', 'right-from-bracket']"
                            />
                        </client-only>
                    </div>
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
        justify-content: flex-end;
        pointer-events: none;
        &Container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 80px;
            pointer-events: all;
            cursor: pointer;
        }
        &Img {
            z-index: 51;
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
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: auto;
        }
        &Chevron {
            margin: 0 10px;
        }
        &Link {
            &Container {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 80px;
            }
            display: flex;
            justify-content: center;
            align-items: center;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            text-decoration: none;
            color: $colorContainer;
            &Profil {
                background-color: $colorOrange;
            }
            &Home {
                background-color: $colorGreen;
            }
            &Signout {
                background-color: $colorRed;
            }
        }
    }
}
</style>
