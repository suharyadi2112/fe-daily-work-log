<template>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-left">Category</h1>
            <hr>
            <nav>
                <ol class="breadcrumb">
                <router-link :to="{ name: '/'}" class="breadcrumb-item">Dashboard</router-link>
                <router-link :to="{ name: 'category'}" class="breadcrumb-item">Category</router-link>
                </ol>
            </nav>
        </div>
       
          <v-sheet class="mx-auto padTab">
            <v-btn 
            class="button-add-cat" 
            color="primary"
            > 
              Add
            </v-btn>
            
            <v-data-table 
                fixed-header
                v-model:items-per-page="itemsPerPage"
                class="text-left"
                :search="search"
                :headers="headers"
                :items-length="totalItems"
                :items="serverItems"
                :loading="loading"
                item-value="name"
                @update:options="loadItems"
            >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.task_name }}</td>
                <td>{{ item.created_at }}</td>
                <td>
                  <v-btn
                  size="x-small"
                  class="ma-2"
                  color="red"
                  icon="mdi-delete"
                  @click="showModalDel(item.id)"
                ></v-btn>
                <v-btn
                  size="x-small"
                  class="ma-2"
                  color="blue-darken-2"
                  icon="mdi-pencil"
                ></v-btn>
                </td>
              </tr>
            </template>
            </v-data-table>
        </v-sheet>
    </main><!-- End #main -->


    
<!-- Modal Delete -->
<ModalCategoryDel ref="modalCategoryDel"  @categoryDeleted="refreshData"/>
</template> 

<style scoped>
    .padTab {
        padding-left: 20px;
        padding-right: 20px;
    }
    .text-left td {
        text-align: left !important;
    }
    .button-add-cat{
      padding: 10px;
      margin: 10px;
    }

</style>

<script>
import axios from 'axios';
import ModalCategoryDel from "@/components/modal/ModalCategoryDel.vue";

export default {
  data: () => ({
    //table
    itemsPerPage: 5,
    headers: [
      {
        title: 'Task Name',
        sortable: false,
        key: 'task_name',
      },
      { title: 'Created', key: 'created_at'},
      { title: 'Action', key: 'actions'},
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    name: '',
    search: '',
    currentItemId: null,
  }),
  methods: {
    refreshData() {
      // Panggil metode loadItems atau metode lainnya untuk merefresh data
      this.loadItems({ page: 1, itemsPerPage: 5, sortBy: [] }); // Ganti dengan parameter yang sesuai
    },
    async loadItems({ page, itemsPerPage, sortBy }) {
      this.loading = true;

      try {
        
        const token = localStorage.getItem('tokenLoginDwl');

        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const UrlCategory = 'http://localhost:8881/api/category/list'
        const response = await axios.get(UrlCategory, {
          params: {
            page,
            itemsPerPage,
            sortBy,
          },
          headers: {
            'Authorization': token,
          },
        });

        const { data, msg } = response.data;
        
        if (response.data.code === 200) {
          const items = data;
          this.serverItems = items;
          this.totalItems = items.length;
        } else {
          console.error('Error in API response:', msg);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    showModalDel(id) {
      this.$refs.modalCategoryDel.openDeleteModal(id);
    },

  },
  components: {
    ModalCategoryDel,
  },
}
</script>