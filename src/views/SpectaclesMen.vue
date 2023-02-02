<template>
  <layout-component :collectionName="'spectacles-men'"></layout-component>
</template>

<script lang="ts">

import Vue from 'vue';
import Component from 'vue-class-component';
import LayoutComponent from '@/components/Layout/Layout.vue';


@Component({components:{LayoutComponent}})
export default class SpectaclesMenView extends Vue{
  
}
</script>