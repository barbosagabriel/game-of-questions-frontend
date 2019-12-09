<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="6" md="4">
      <v-card :class="[isMobile ? 'elevation-0' : 'elevation-12']">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Game of questions</v-list-item-title
            >
            <v-list-item-subtitle>Join a game</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-img src="../assets/questions.svg" max-height="400px"></v-img>
        <v-card-text> </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12">
              <div>
                <v-btn color="primary" block x-large>I have a code!</v-btn>
              </div>
              <div class="mt-4">
                <v-btn color="primary" block x-large @click="createRoomClick"
                  >Create a new room</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ROUTES } from '@/config/routes/Routes'

@Component({})
export default class Login extends Vue {
  private get isMobile (): boolean {
    return this.$vuetify.breakpoint.xs
  }

  private createRoomClick (): void {
    this.$router.push(ROUTES.NewRoom)
  }
}
</script>
