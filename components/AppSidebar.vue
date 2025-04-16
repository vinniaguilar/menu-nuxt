<script setup lang="ts">
import { SquareMenu, Home, Settings } from 'lucide-vue-next'

// Menu items.
const items = [
  {
    title: 'Página principal',
    url: '/',
    icon: Home
  },
  {
    title: 'Cardápio',
    url: '/menu',
    icon: SquareMenu
  },
  {
    title: 'Configurações',
    url: '/settings',
    icon: Settings
  }
]
</script>

<template lang="pug">
  Sidebar
    SidebarContent
      SidebarGroup
        SidebarGroupLabel
          | Nome do restaurante
        SidebarGroupContent
          SidebarMenu
            SidebarMenuItem(v-for="item in items" :key="item.title")
              SidebarMenuButton(as-child)
                a(:href="item.url")
                  component(:is="item.icon")
                  span {{ item.title }}
</template>
