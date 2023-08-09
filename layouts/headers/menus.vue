<template>
  <ul>
    <li
      v-for="(menu, i) in menuData"
      :key="i"
      :class="`${menu.hasDropdown ? 'has-dropdown': ''}${menu.megaMenu ? 'has-dropdown has-mega-menu' : ''}`"
    >
      <NuxtLink :to="menu.link">
        {{ menu.title }}
      </NuxtLink>
      <ul v-if="menu.hasDropdown" class="submenu">
        <li v-for="(sub, i) in menu.submenus" :key="i" class="submenu-item">
          <NuxtLink :to="sub.link">
            {{ sub.title }}
            <hr style="width:100%;color:#ddd;padding:0px;margin:0;">
          </NuxtLink>
         
        </li>
      </ul>
      <ul v-if="menu.mega_menus" class="mega-menu">
        <li v-for="(mega, i) in menu.mega_menus" :key="i">
          <NuxtLink :to="mega.link" class="mega-menu-title">
            {{ mega.title }}
          </NuxtLink>
          <ul>
            <li v-for="(sub_mega, i) in mega.submenus" :key="i">
              <NuxtLink :to="sub_mega.link">
                {{ sub_mega.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import menuData from "~~/mixins/menuData";

export default {
  mixins: [menuData],
};
</script>

<style scoped>
.main-menu-4 ul li:hover > a {
    color: #000;
}

.main-menu-4 ul li:hover > a::after {
    color: #000;
}


.main-menu ul li .submenu li a::before {
    display: none
}

.main-menu ul li .submenu li:hover > a {
    padding-left: 25px;
}

/* .submenu-item {
    border-bottom: solid 1px #efefef;
    
} */
/* .main-menu ul li:hover > .submenu {
   line-height: 2.5em;
} */

.main-menu ul li .submenu {
    min-width: 250px;
    line-height: 2.5em;
}
</style>