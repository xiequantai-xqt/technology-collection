# 结构概览

![](https://educt-files.oss-cn-shenzhen.aliyuncs.com/3c1d9555-404f-4efe-8fd0-8deb563edc1c.png)

# vue3路由跳转

> 这里用的是setup函数形式，原理都是一样的

```typescript
// 导入useRouter钩子
import { useRouter } from 'vue-router'

export default {
    setup(){
        // 创建一个路由器实例
        const router = useRouter();
        
        // 定义一个方法进行页面的路由跳转
        const navigateToPage = (routeName,params) => {
            router.push({path:path,query:query})
        }
        return {
            navigateToPage
        }
    }
}
```

# 父子组件通信

## 父传子

父组件：

> ParentComponent.vue

```vue
<template>
	<ChildComponent :message="parentMessage"/>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue'
    
const parentMessage = ref('Hello from parent')
</script>
```

子组件：

> ChildComponent.vue

> 在使用 TypeScript 的情况下，可以利用类型注解来增强类型安全，这里是使用 Composition API 的例子

```vue
<template>
	<div>{{message}}</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
    
const props = defineProps<{
    message: string;
}>()
// 在JS或TS中，可以直接使用props.message
console.log(props.message) // 这将输出从父组件传递过来的字符串
</script>
```

## 子传父

### 使用$emit的方式触发事件

子组件可以通过$emit方法触发事件，并且将需要更新的信息传递会父组件。父组件需要在子组件标签上监听这些事件，并且在事件处理器中更新自己的状态。

子组件：

> 在子组件中定义 emits 选项并使用 $emit

```vue
<template>
	<button @click="updateParent('main')">update Parent status</button>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['update-counter']);
    
function updateParent(newValue){
    emits('update-counter',newValue)
}
</script>
```

父组件：

> 父组件监听这个事件并更新状态

```vue
<template>
	<ChildComponent :counter="counter" @update-counter="handleCounterUpdate"/>
</template>

<script lang="ts" setup>
	const counter = ref(0)
    
    function handleCounterUpdate(newCounterValue){
        counter.value = newCounterValue
    }
</script>
```

### 使用v-model模型绑定的方式

原理：如果你想在子组件和父组件之间建立双向数据绑定，你可以使用 v-model。在 Vue 3 中，这通常涉及到在子组件中定义一个 modelValue prop 和一个 update:modelValue 的 emit 事件。

子组件：

```vue
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    modelValue: String,
  });

  const emits = defineEmits(['update:modelValue']);
</script>
```

父组件：

```vue
<template>
  <ChildComponent v-model="inputValue" />
</template>

<script lang="ts" setup>
  let inputValue = '';
</script>
```

