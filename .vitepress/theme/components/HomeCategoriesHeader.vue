<script setup>
import { computed } from "vue";
import { useData } from "vitepress";

const { lang } = useData();

const translations = {
  en: { title: "Categories", subtitle: "Explore principles by the problems they solve." },
  uz: { title: "Bo'limlar", subtitle: "Tamoyillarni ular hal qiladigan muammolar bo'yicha o'rganing." },
};

const t = computed(() => translations[lang.value.split("-")[0]] ?? translations.en);
</script>

<template>
  <div class="home-section" style="padding-bottom: 0;">
    <h2 class="home-section-title">{{ t.title }}</h2>
    <p class="home-section-subtitle" style="margin-bottom: 24px;">{{ t.subtitle }}</p>
  </div>
</template>
