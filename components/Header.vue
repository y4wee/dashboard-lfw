<script setup></script>

<template>
    <header class="header">
        <!-- <div class="signout" @click="signOutUser">signout</div> -->
        <div class="headerUser">
            <div class="headerUserContainer">
                <div class="headerUserImg"></div>
                <div class="headerUserName">John Doe</div>

                <div class="headerUserButton">--</div>
            </div>
            <div class="headerUserDropdown">
                <div class="headerUserDropdownLink headerUserDropdownProfil">
                    <div class="headerUserDropdownIcon"></div>
                    <div class="headerUserDropdownText">Profil</div>
                </div>
                <div class="headerUserDropdownLink headerUserDropdownSignout">
                    <div class="headerUserDropdownIcon"></div>
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
    &User {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        right: 0;
        clip-path: inset(0 0 calc(100% - 80px) 0);
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
                border-radius: 50%;
                background-color: $colorGray;
            }
            &Text {
                margin: 0 10px;
            }
        }
    }
}
</style>
