<script setup>
import { gsap } from "gsap";

const dropdownOn = ref(false);

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
    console.log(result);
};
</script>

<template>
    <header class="header">
        <div class="headerUser">
            <div class="headerUserContainer" @click="dropdownTransition">
                <div class="headerUserImg"></div>
                <div class="headerUserName">John Doe</div>

                <div class="headerUserButton">--</div>
            </div>
            <div class="headerUserDropdown">
                <div class="headerUserDropdownLink headerUserDropdownProfil">
                    <div class="headerUserDropdownIcon">
                        <font-awesome-icon :icon="['fas', 'gear']" />
                    </div>
                    <div class="headerUserDropdownText">Profil</div>
                </div>
                <div
                    class="headerUserDropdownLink headerUserDropdownSignout"
                    @click="signout"
                >
                    <div class="headerUserDropdownIcon">
                        <font-awesome-icon
                            :icon="['fas', 'right-from-bracket']"
                        />
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
    width: 100vw;
    height: 80px;
    background-color: rgba($color: $colorContainer, $alpha: 0.9);
    backdrop-filter: blur(5px);
    color: white;
    font-size: 1.2rem;
    user-select: none;
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
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: $colorGreen;
        }
        &Name {
            margin: 0 10px;
        }
        &Button {
            margin-right: 10px;
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
            &Signout:hover {
                background-color: rgba($color: $colorGray, $alpha: 0.9);
            }
        }
    }
}
</style>
