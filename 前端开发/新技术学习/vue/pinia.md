# 使用pinia将变量挂载到全局

1. 安装pinia

```shell
npm install pinia
# 或者
yarn add pinia
# 项目需要，安装uuid
npm install uuid
```

2. 创建store

> src/stores/index.ts

```typescript
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// pinia persist
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;

```

> src/stores/modules/global.ts

```typescript
import { defineStore } from "pinia";
import { GlobalState } from "@/stores/interface"; // 定义类型
import { v4 as uuidv4 } from "uuid"; // uuid
import piniaPersistConfig from "@/stores/helper/persist"; // 持久化

export const useGlobalStore = defineStore({
  id: "geeker-global",
  state: (): GlobalState => ({
    UUID: uuidv4().slice(0, 21)
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersistConfig("geeker-global")
});
```

> 持久化：src/stores/helper/persist.ts

```typescript
import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    // storage: sessionStorage,
    paths
  };
  return persist;
};

export default piniaPersistConfig;

```

> 定义类型：src/stores/interface/index.ts

```typescript
export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type AssemblySizeType = "large" | "default" | "small";

export type LanguageType = "zh" | "en" | null;

/* GlobalState */
export interface GlobalState {
  layout: LayoutType;
  assemblySize: AssemblySizeType;
  language: LanguageType;
  maximize: boolean;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  asideInverted: boolean;
  headerInverted: boolean;
  isCollapse: boolean;
  accordion: boolean;
  watermark: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  tabs: boolean;
  tabsIcon: boolean;
  footer: boolean;
  UUID: string;
}
```

3. 使用store

> main.ts

> 在你的主应用文件（通常是 `main.js` 或 `app.js`）中，设置 Pinia 并将其注入到 Vue 应用中：

```typescript
import { createApp } from 'vue';
// pinia store
import pinia from "@/stores";
import App from './App.vue';

const app = createApp(App);
app.use(pinia);
app.mount('#app');
```

4. 访问store

> src/views/home/index.vue

```typescript
<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();
const { UUID } = storeToRefs(globalStore);

onMounted(()=>{
    console.log(UUID.value)
})
</script>

```

说明：

- storeToRefs

  - `storeToRefs`是Pinia库提供的一种实用工具函数，用于将Pinia store中的响应式属性转换为响应式的Vue refs。这使得store中的状态可以像普通的Vue响应式refs一样在组件中使用和监听。

  - 具体作用：
    - **解构store的状态**：`storeToRefs`可以帮助您将store中的状态属性解构为单独的ref对象，这样可以在组件模板中直接使用这些状态而不需要通过store实例来访问。
    - **自动追踪依赖**：当您使用`storeToRefs`解构store的状态后，在计算属性或组合式API中使用这些ref时，Vue会自动追踪它们的变化。这意味着当store中的状态改变时，使用了这些状态的组件会自动更新。
    - **减少不必要的渲染**：使用`storeToRefs`可以避免由于store整个状态对象的变化导致的不必要的组件重新渲染。因为Vue只会对实际变化的ref进行重新渲染。

5. 更新Store

> 你可以定义 actions 来更新状态：

```typescript
const useMainStore = defineStore({
  // ...
  actions: {
    setGlobalVar(value) {
      this.globalVar = value;
    },
  },
});
```

> 然后在组件中调用这个 action 来更新状态：

```typescript
methods: {
  updateGlobalVar(value) {
    this.mainStore.setGlobalVar(value);
  },
},
```

这样你就实现了将变量挂载到全局的功能。每个组件都可以访问和修改这些全局变量。

