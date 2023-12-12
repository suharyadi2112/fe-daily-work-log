<template>
    <!-- Modal Delete -->
    <v-dialog 
    v-model="deleteModalVisible" 
    width="400" 
    persistent
    >
    <v-card>
        <v-card-title>Delete Category</v-card-title>
        <v-card-text>
        Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
        <v-btn @click="closeDeleteModal">Cancel</v-btn>
        <v-btn @click="confirmDelete()" :loading="loading" color="red" variant="tonal">Delete</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>


<script>

import axios from 'axios';

export default {
  data() {
    return {
      deleteModalVisible : false,
      loading: false,
    };
  },
  methods: {
    //modal delete
    openDeleteModal(id) {
      this.deleteModalVisible = true;
      this.currentItemId = id;
    },
    closeDeleteModal() {
      this.deleteModalVisible = false;
      this.currentItemId = null;
    },
    confirmDelete() {
      const itemId = this.currentItemId;
      this.DeleteCategory(itemId)
    },
    async DeleteCategory(id) {

          try {
              this.loading = true
              await new Promise(resolve => setTimeout(resolve, 1000));
              let data = { category_id: id,}
              
              const token = localStorage.getItem('tokenLoginDwl');
              const response = await axios.post('http://localhost:8881/api/category/delete', JSON.stringify(data),{
                  headers: {
                      'Authorization': token,
                  },
              });

              if (response.data.code === 200) {
                this.Toasttt(response.data.msg , "success")
                this.$emit('categoryDeleted');
              }
              
              console.log(response)
              
              this.loading = false
              this.closeDeleteModal();
          } catch (error) {

              if (error.response && error.response.status) {
                  if (error.response.status == 400) {
                      this.Toasttt(error.response.data.error, "error")
                  }
              }
              console.error(error);
          }
      },
      Toasttt(msg, tipe){
        const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = this.$swal.stopTimer;
                toast.onmouseleave = this.$swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: tipe,
            title: msg
        });
      },

  },
};
</script>