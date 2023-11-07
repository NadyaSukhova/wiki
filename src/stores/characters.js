import { defineStore } from "pinia";
import axios from "axios";

export const useCharacterStore = defineStore({
  id: "CharacterStore",
  state: () => ({
    characters: [],
    characters_ids: [],
    loading: false,
    error: null,
  }),
  persist: true,
  actions: {
    firstPage() {
      if (this.characters.length === 0) {
        this.loading = true;
        try {
          axios
            .get("https://rickandmortyapi.com/api/character/?page=1")
            .then(
              (response) =>
                (this.characters = [
                  ...this.characters,
                  ...response.data.results,
                ])
            );
        } catch (error) {
          this.error = error;
        } finally {
          this.loading = false;
          this.characters_ids = Array.from(
            { length: 20 },
            (value, index) => index + 1
          );
        }
      }
    },
    pushCharacter(character) {
      
        this.characters = [...this.characters, character];
        this.characters_ids = [...this.characters_ids, character.id];
      
    },
    pushCharacterId(id) {
      this.loading = true;
      try {
        axios
          .get("https://rickandmortyapi.com/api/character/" + String(id))
          .then(
            (response) =>
              (this.characters = [...this.characters, ...response.data.results])
          );
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
        this.characters_ids.push(id);
      }
    },
  },
});
