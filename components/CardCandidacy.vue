<script setup>
import { gsap } from "gsap";

const { candidacy } = defineProps(["candidacy"]);

const cardUtilsOn = ref(false);

const transformDate = (currentDate) => {
    let date = new Date(currentDate * 1000);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    let dateFormated = dd + "/" + mm + "/" + yyyy;
    return dateFormated;
};

const cardUtilsTransition = () => {
    cardUtilsOn.value = !cardUtilsOn.value;
    gsap.to(`.cardCandidacy${candidacy.id.slice(1, 4)} .cardCandidacyUtils`, {
        clipPath: cardUtilsOn.value
            ? "circle(175px at 160px 160px)"
            : "circle(25px at 160px 160px)",
        duration: 0.3,
        ease: "sine.inOut",
    });
};

const updateState = (e) => {
    if (e.target.dataset.state !== candidacy.state) {
        updateDocument(candidacy.id, {
            state: e.target.dataset.state,
        });
        candidacy.state = e.target.dataset.state;
    }
};

const deleteCandidacy = (id) => {
    if (confirm("do you really want to delete ?")) {
        deleteDocument(id);
    }
};
</script>

<template>
    <div :class="'cardCandidacy cardCandidacy' + candidacy.id.slice(1, 4)">
        <h2 class="cardCandidacyName">
            {{
                candidacy.name.charAt(0).toUpperCase() + candidacy.name.slice(1)
            }}
        </h2>
        <div class="cardCandidacyDate">
            {{ transformDate(candidacy.date.seconds) }}
        </div>
        <p class="cardCandidacyType">
            {{
                candidacy.type.charAt(0).toUpperCase() + candidacy.type.slice(1)
            }}
        </p>
        <div class="cardCandidacyState">
            <font-awesome-icon
                v-if="candidacy.state === 'entretien'"
                :icon="['fa', 'chalkboard-user']"
            />
            <font-awesome-icon
                v-if="candidacy.state === 'en attente'"
                :icon="['fas', 'hourglass-half']"
            />
            <font-awesome-icon
                v-if="candidacy.state === 'refus'"
                :icon="['fas', 'ban']"
            />
        </div>

        <div class="cardCandidacyUtils">
            <div class="cardCandidacyUtilsContainer">
                <div
                    class="cardCandidacyUtilsIcon cardCandidacyUtilsButton"
                    @click="cardUtilsTransition"
                >
                    <font-awesome-icon :icon="['fas', 'gear']" />
                </div>
                <div
                    class="cardCandidacyUtilsIcon cardCandidacyUtilsDelete"
                    @click="deleteCandidacy(candidacy.id)"
                >
                    <font-awesome-icon
                        class="cardCandidacyUtilsIconSvg cardCandidacyUtilsDeleteRotate"
                        :icon="['fas', 'trash']"
                    />
                </div>
                <!-- icon refus -->
                <div
                    class="cardCandidacyUtilsIcon cardCandidacyUtilsNo"
                    data-state="refus"
                    @click="updateState"
                >
                    <font-awesome-icon
                        :class="
                            candidacy.state === 'refus'
                                ? 'cardCandidacyUtilsIconSvg cardCandidacyUtilsNoRotate stateSelected'
                                : 'cardCandidacyUtilsIconSvg cardCandidacyUtilsNoRotate'
                        "
                        :icon="['fas', 'ban']"
                    />
                </div>
                <!-- icon en attente -->
                <div
                    class="cardCandidacyUtilsIcon cardCandidacyUtilsWait"
                    data-state="en attente"
                    @click="updateState"
                >
                    <font-awesome-icon
                        :class="
                            candidacy.state === 'en attente'
                                ? 'cardCandidacyUtilsIconSvg cardCandidacyUtilsWaitRotate stateSelected'
                                : 'cardCandidacyUtilsIconSvg cardCandidacyUtilsWaitRotate'
                        "
                        :icon="['fas', 'hourglass-half']"
                    />
                </div>
                <!-- icon entretien -->
                <div
                    class="cardCandidacyUtilsIcon cardCandidacyUtilsYes"
                    data-state="entretien"
                    @click="updateState"
                >
                    <font-awesome-icon
                        :class="
                            candidacy.state === 'entretien'
                                ? 'cardCandidacyUtilsIconSvg cardCandidacyUtilsYesRotate stateSelected'
                                : 'cardCandidacyUtilsIconSvg cardCandidacyUtilsYesRotate'
                        "
                        :icon="['fa', 'chalkboard-user']"
                    />
                </div>
                <div class="cardCandidacyUtilsIcon cardCandidacyUtilsModify">
                    <font-awesome-icon
                        class="cardCandidacyUtilsIconSvg cardCandidacyUtilsModifyRotate"
                        :icon="['fas', 'pen']"
                    />
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

.cardCandidacy {
    position: relative;
    width: 100%;
    max-width: 300px;
    height: 200px;
    margin: 10px;
    background-color: rgba($color: $colorGray, $alpha: 0.9);
    color: white;
    border-radius: 20px;
    border-bottom-right-radius: 0;
    overflow: hidden;
    &Name {
        text-align: center;
        color: $colorOrange;
    }
    &Utils {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 350px;
        height: 350px;
        border-radius: 50%;
        transform: translate(50%, 50%);
        background-color: $colorBack;
        clip-path: circle(25px at 160px 160px);
        &Container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        &Button {
            transform: translate(-15px, -15px);
        }
        &Icon {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 1.1rem;
            background-color: $colorGray;
            color: $colorBack;
            cursor: pointer;
            &Svg {
                pointer-events: none;
            }
        }
        &Delete {
            transform: rotateZ(6deg) translateX(-150px);
            &Rotate {
                transform: rotateZ(-6deg);
            }
        }
        &No {
            transform: rotateZ(25.5deg) translateX(-150px);
            &Rotate {
                transform: rotateZ(-25.5deg);
            }
        }
        &Wait {
            transform: rotateZ(45deg) translateX(-150px);
            &Rotate {
                transform: rotateZ(-45deg);
            }
        }
        &Yes {
            transform: rotateZ(64.5deg) translateX(-150px);
            &Rotate {
                transform: rotateZ(-64.5deg);
            }
        }
        &Modify {
            transform: rotateZ(84deg) translateX(-150px);
            &Rotate {
                transform: rotateZ(-84deg);
            }
        }
    }
}
</style>