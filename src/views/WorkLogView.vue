<template>

    <main id="main" class="main">

        <div class="pagetitle">
            <h1 class="text-left">Work Log</h1>
            <hr>
            <nav>
                <ol class="breadcrumb">
                <router-link :to="{ name: '/'}" class="breadcrumb-item">Dashboard</router-link>
                <router-link :to="{ name: 'worklog'}" class="breadcrumb-item">Work log</router-link>
                </ol>
            </nav>
        </div>

        <v-card
            class="mx-auto padTab"
        >
            <v-data-table-server 
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
            </v-data-table-server>
        </v-card>

    </main><!-- End #main -->

</template> 

<style scoped>
    .padTab {
        padding-left: 20px;
        padding-right: 20px;
    }
    .text-left td {
        text-align: left !important;
    }

</style>

<script>
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
]

const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy, search }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.slice().filter(item => {
          if (search.name && !item.name.toLowerCase().includes(search.name.toLowerCase())) {
            return false
          }

          if (search.calories && !(item.calories >= Number(search.calories))) {
            return false
          }

          return true
        })

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

export default {
  data: () => ({
    //table
    itemsPerPage: 5,
    headers: [
      {
        title: 'Dessert (100g serving)',
        sortable: false,
        key: 'name',
      },
      { title: 'Calories', key: 'calories'},
      { title: 'Fat (g)', key: 'fat'},
      { title: 'Carbs (g)', key: 'carbs'},
      { title: 'Protein (g)', key: 'protein'},
      { title: 'Iron (%)', key: 'iron'},
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    name: '',
    calories: '',
    search: '',

     //breadcumb
    items: [
        {
            title: 'Dashboard',
            disabled: false,
            to: '/testing',
        },
        {
            title: 'Work Log',
            disabled: false,
            to: 'worklog',
        },
    ],


  }),
  watch: {
    name () {
      this.search = String(Date.now())
    },
    calories () {
      this.search = String(Date.now())
    },
  },
  methods: {
    loadItems ({ page, itemsPerPage, sortBy }) {
      this.loading = true
      FakeAPI.fetch({ page, itemsPerPage, sortBy, search: { name: this.name, calories: this.calories } }).then(({ items, total }) => {
        this.serverItems = items
        this.totalItems = total
        this.loading = false
      })
    },
  },
}
</script>