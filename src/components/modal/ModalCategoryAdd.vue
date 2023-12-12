<!-- CategoryModal.vue -->
<template>
    <v-dialog v-model="modalVisible" max-width="400">
        <v-card>
        <v-card-title class="headline">Tambah Kategori</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submitForm">
            <v-row>
                <v-col>
                <v-text-field v-model="firstName" label="Nama Depan"></v-text-field>
                </v-col>
                <v-col>
                <v-text-field v-model="lastName" label="Nama Belakang"></v-text-field>
                </v-col>
            </v-row>
            <v-btn type="submit" color="primary">Simpan</v-btn>
            </v-form>
        </v-card-text>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
  data() {
    return {
      modalVisible: false,
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    submitForm() {
      // Lakukan tindakan yang sesuai dengan data yang telah dimasukkan
      // Misalnya, Anda bisa mengirimkan data ini ke backend atau melakukan tindakan lainnya.
      console.log('Data yang dimasukkan:', {
        firstName: this.firstName,
        lastName: this.lastName,
      });

      // Setelah menyimpan atau memproses data, Anda mungkin ingin menutup modal
      this.modalVisible = false;
    },
  },
};
</script>