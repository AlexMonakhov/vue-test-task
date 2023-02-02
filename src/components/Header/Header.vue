<template>
    <header class="header">
        <div class="top-header-wrapper">
            <div class="button-wrapper">
                <button @focus="showMenu" @blur="hideMenu"
                        @mouseover="showMenu"  @mouseout="hideMenu" class="button-menu">MENU</button>
            </div>
            <div class="main-logo">Bloobloom</div>
        </div>     
        <navigation-drawer-component :show="show"></navigation-drawer-component>
        </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import NavigationDrawerComponent from './NavigationDrawer.vue';

@Component({components:{NavigationDrawerComponent}})
export default class Header extends Vue{

    show: boolean = false;
    

    showMenu(): void{
        this.show = true;
    }

    hideMenu(): void{
        this.show = false;
    }

    
}
</script>

<style lang="scss" scoped>
.button{
    &-menu{
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        outline: none;
        border: none;
        margin: 10px;
        padding: 0;
        background: white;
        &:hover, &:focus{
            border-bottom: 2px solid black;
        }
    }
    &-wrapper{
        display: flex;
        width: 30%;
        height: 60px;
        justify-content: start;
    }
}
.main-logo{
    width: 40%;
    font-size: 2em;
    text-align: center;
    line-height: 2em;
    font-weight: 700;
}
.top-header-wrapper{
    display: flex;
    width: 100%;
    height: 70px;
    border-bottom: 2px solid #555;
}

</style>