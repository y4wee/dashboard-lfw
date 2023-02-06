<script setup>
import { gsap } from "gsap";

const utilsBarIndex = useUtilsBarIndex();

const barSelectedTransition = (e) => {
    let target = e.target.dataset.barIndex;
    if (target !== utilsBarIndex.value) {
        utilsBarIndex.value = target;
        gsap.to(".utilsBarSelectedGreen", {
            yPercent: utilsBarIndex.value * 100,
            duration: 0.3,
            ease: "sine.inOut",
        });
        gsap.to(".utilsBarSelectedRed", {
            yPercent: utilsBarIndex.value * 100,
            duration: 0.5,
            ease: "sine.inOut",
        });
    }
};
</script>

<template>
    <div class="utilsBar">
        <div class="utilsBarSelected utilsBarSelectedRed"></div>
        <div class="utilsBarSelected utilsBarSelectedGreen"></div>
        <div
            class="utilsBarIcon utilsBarAll"
            @click="barSelectedTransition"
            data-bar-index="0"
        >
            All
        </div>
        <div
            class="utilsBarIcon utilsBarDay"
            @click="barSelectedTransition"
            data-bar-index="1"
        >
            <client-only>
                <font-awesome-icon :icon="['fa', 'calendar']" />
            </client-only>
            <div class="utilsBarDayDate">
                {{ String(new Date().getDate()).padStart(2, "0") }}
            </div>
        </div>
        <div
            class="utilsBarIcon utilsBarAccepted"
            @click="barSelectedTransition"
            data-bar-index="2"
        >
            <client-only>
                <font-awesome-icon :icon="['fa', 'chalkboard-user']" />
            </client-only>
        </div>
        <div
            class="utilsBarIcon utilsBarWait"
            @click="barSelectedTransition"
            data-bar-index="3"
        >
            <client-only>
                <font-awesome-icon :icon="['fa', 'hourglass-half']" />
            </client-only>
        </div>
        <div
            class="utilsBarIcon utilsBarRefus"
            @click="barSelectedTransition"
            data-bar-index="4"
        >
            <client-only>
                <font-awesome-icon :icon="['fa', 'ban']" />
            </client-only>
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

.utilsBar {
    z-index: 10;
    position: fixed;
    top: 134px;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 100vh;
    background-color: rgba($color: $colorContainer, $alpha: 0.9);
    backdrop-filter: blur(5px);
    // solution for ios fixed move while scrolling
    transform: translate3d(0, 0, 0);
    &Selected {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 60px;
        pointer-events: none;
        &Green::before {
            content: "";
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: $colorGreen;
        }
        &Red::before {
            content: "";
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: $colorRed;
        }
    }
    &Icon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        margin: 5px 0;
        color: white;
        font-size: 1.5rem;
        user-select: none;
        cursor: pointer;
        & > * {
            pointer-events: none;
        }
    }
    &DayDate {
        position: absolute;
        top: 20px;
        font-size: 0.9rem;
        font-weight: bold;
        color: $colorContainer;
    }
}
</style>
