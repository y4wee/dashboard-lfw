<script setup>
import { gsap } from "gsap";

const dropdownOn = ref(false);

const dropdownTransition = () => {
    if (dropdownOn.value) {
        gsap.to(".headerUser", {
            clipPath:
                "polygon(0% 0%, 100% 0%, 100% calc(0% + 80px), 0% calc(0% + 80px))",
            duration: 0.3,
            ease: "sine.inOut",
            onComplete: () => (dropdownOn.value = !dropdownOn.value),
        });
    } else {
        gsap.to(".headerUser", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100%), 0% calc(100%))",
            duration: 0.3,
            ease: "sine.inOut",
            onComplete: () => (dropdownOn.value = !dropdownOn.value),
        });
    }
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
$colorBack: #0e0f0e;
$colorContainer: #22272c;
$colorGray: #424f4f;
$colorGreen: #7ed8b2;
.header {
    z-index: 50;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 80px;
    background-color: rgba($color: $colorContainer, $alpha: 0.9);
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
        clip-path: polygon(
            0% 0%,
            100% 0%,
            100% calc(0% + 80px),
            0% calc(0% + 80px)
        );
        &Container {
            display: flex;
            align-items: center;
            height: 80px;
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
