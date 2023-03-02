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

// const { avatar } = defineProps(["avatar"]);
const dataUser = useDataUser();

const currentColor = ref("#7ed8b2");
const currentCat = ref(0);
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
const colors = ["#7ed8b2", "#ffa45c", "#ff5959"];

const catTransition = (index) => {
    currentCat.value = index;
    let translatePercent = -100 / cats.length;
    let listcats = gsap.utils.toArray(".avatarSliderContent");

    listcats.forEach((cat) => {
        let catIndex = parseInt(cat.dataset.index);
        let catOpacity = 1 - Math.abs(catIndex - index) * 0.35;
        let catScale = 1 - Math.abs(catIndex - index) * 0.35;
        gsap.to(cat, {
            opacity: catOpacity,
            scale: catScale,
            duration: 0.2,
            ease: "sine.inOut",
        });
    });

    gsap.to(".avatarSliderContainer", {
        xPercent: translatePercent * index,
        duration: 0.2,
        ease: "sine.inOut",
    });
};

const avatarUpdating = () => {
    let newAvatar = {
        cat: currentCat.value,
        color: currentColor.value,
    };
    if (avatarChanged.value) {
        updateAvatar(newAvatar);
    }
};

const avatarChanged = computed(() => {
    if (dataUser.value[0]) {
        return dataUser.value[0].cat === currentCat.value &&
            dataUser.value[0].color === currentColor.value
            ? false
            : true;
    } else {
        return false;
    }
});

watch(dataUser, (value) => {
    if (value) {
        catTransition(value[0].cat);
        currentColor.value = value[0].color;
    }
});

onMounted(() => {
    if (dataUser.value[0]) {
        currentCat.value = dataUser.value[0].cat;
        currentColor.value = dataUser.value[0].color;
        catTransition(currentCat.value);
    }
});
</script>

<template>
    <div class="avatar">
        <h2>Changes ton Avatar</h2>
        <div class="avatarSlider">
            <div class="avatarSliderContainer">
                <div
                    class="avatarSliderContent"
                    v-for="cat in cats"
                    :key="cat.index"
                    :data-index="cat.index"
                    @click="catTransition(cat.index)"
                >
                    <div class="avatarSliderContentImage">
                        <client-only>
                            <Vue3Lottie
                                :animationData="cat.url"
                                loop
                                :autoPlay="
                                    cat.index === currentCat ? true : false
                                "
                                :pauseAnimation="
                                    cat.index === currentCat ? false : true
                                "
                            />
                        </client-only>
                    </div>

                    <div class="avatarSliderContentBack"></div>
                </div>
            </div>
        </div>
        <div class="avatarColors">
            <div
                v-for="color in colors"
                :key="color"
                :class="
                    color === currentColor
                        ? 'avatarColorsButton avatarColorsSelected'
                        : 'avatarColorsButton'
                "
                :style="{ backgroundColor: color }"
                @click="currentColor = color"
            ></div>
        </div>
        <div
            :class="
                avatarChanged ? 'avatarSave avatarSaveEnabled' : 'avatarSave'
            "
            @click="avatarUpdating"
        >
            Enregistrer
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

.avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    margin: 90px 0;
    color: $colorGray;
    overflow: hidden;
    &Slider {
        display: flex;
        justify-content: flex-start;
        height: 30vw;
        max-height: 300px;
        width: 30vw;
        max-width: 300px;
        margin: 20px 0;
        &Container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            height: 100%;
        }
        &Content {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30vw;
            max-width: 300px;
            height: 30vw;
            max-height: 300px;
            cursor: pointer;
            opacity: 0;
            &Image {
                position: absolute;
            }
            &Back {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: v-bind(currentColor);
                transition: all 0.2s ease-in-out;
            }
        }
    }
    &Colors {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 10px 0;
        &Button {
            width: 30px;
            height: 30px;
            margin: 0 10px;
            border-radius: 50%;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
        }
        &Selected {
            box-shadow: 0 0 0 3px $colorContainer;
            transform: scale(1.1);
            transition: all 0.2s ease-in-out;
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
