<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="6" md="6">
      <v-card class="mx-auto" max-width="500">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary lighten-2"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                label="Nickname"
                v-model="user.nickName"
              ></v-text-field>
              <span class="caption grey--text text--darken-1">
                This is the nickname you will see while playing
              </span>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="2">
            <v-card-text>
              <v-sheet height="100%" width="100%" tile>
                <v-slide-group
                  class="pa-4"
                  v-model="model"
                  center-active
                  show-arrows
                >
                  <v-slide-item
                    v-for="(avatar, i) in avatars"
                    :key="i"
                    v-slot:default="{ active }"
                  >
                    <v-card
                      :color="active ? 'primary' : 'grey lighten-1'"
                      class="ma-4"
                      height="200"
                      width="100"
                      @click="selectAvatar(avatar, i)"
                    >
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-img
                          :src="require(`../assets/avatars/${avatar}.png`)"
                          alt="alt"
                          max-height="200px"
                        >
                        </v-img>
                        <!-- <v-scale-transition>
                          <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                            @click="removeSelect"
                          ></v-icon>
                        </v-scale-transition> -->
                      </v-row>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-card-text>
          </v-window-item>

          <v-window-item :value="3">
            <div class="pa-4 text-center" v-if="createdRoomIsCompleted">
              <v-img
                class="mb-4"
                contain
                height="128"
                :src="require(`../assets/avatars/${user.pathAvatar}.png`)"
              ></v-img>
              <h3 class="title font-weight-light mb-2">{{ user.nickName }}</h3>
              <h3 class="title font-weight-light mb-2">
                Welcome to Game of Questions
              </h3>
              <h3 class="title font-weight-light mb-2">
                Your Pin is: {{ room.id }}
              </h3>
              <span class="caption grey--text">Have a good time!</span>
            </div>
          </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions v-if="step !== 3">
          <v-btn :disabled="step === 1" text @click="step--">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="nextStep"
          >
            Next
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="step === 3">
          <v-btn block color="primary" @click="goToRoom">
            Enter the room
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModel, RoomModel } from '@/models'
import { NewRoomService } from '@/services'
import { Container } from 'typescript-ioc'
import { ROUTES } from '../config/routes/Routes'

@Component({})
export default class NewRoom extends Vue {
  private user = new UserModel()
  private room! : RoomModel;
  private step = 1
  private model: null | number = null
  private createdRoomIsCompleted = false
  private newRoomService = Container.get(NewRoomService) as NewRoomService

  private avatars = [
    'avatar_1',
    'avatar_2',
    'avatar_3'
  ]

  private get currentTitle (): string {
    switch (this.step) {
      case 1:
        return 'Insert your Nickname'
      case 2:
        return 'Choose your avatar'
      default:
        return 'Room created'
    }
  }

  private selectAvatar (avatar: string, index: number): void {
    const removeSelection = index === this.model
    this.user.pathAvatar = removeSelection ? null : avatar
    this.model = removeSelection ? null : index
  }

  private removeSelect (): void {
    this.user.pathAvatar = null
    this.model = null
  }

  public nextStep (): void {
    const stepValue = ++this.step
    if (stepValue === 3) {
      this.generateNewRoom()
      this.addNewRomOnRepository()
      this.createdRoomIsCompleted = true
      this.step = stepValue
    }
  }

  private generateNewRoom () {
    const userAdmin = true

    this.room = new RoomModel(
      this.newRoomService.generateNewCodeToRoom(),
      this.user,
      userAdmin)
  }

  private addNewRomOnRepository (): void {
    this.newRoomService.createNewRoom(this.room)
  }

  private goToRoom (): void {
    this.$router.push({ path: `${ROUTES.Room}/${this.room.id}` })
  }
}
</script>
